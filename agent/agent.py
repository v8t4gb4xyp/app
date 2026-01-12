import asyncio
import logging
from typing import cast

import dspy  # type: ignore
from mlflow.genai import agent_server
from mlflow.types import responses
from mlflow.types import responses_helpers

from agent import signatures, types
from agent import tools


class QueryAgent(dspy.Module):
    def __init__(self):
        self.fields_agent = dspy.ReAct(
            signature=signatures.FieldSelector, tools=[tools.list_db_fields], max_iters=5
        )
        self.filters_agent = dspy.ReAct(
            signature=signatures.FilterBuilder,
            tools=[tools.list_db_fields, tools.field_value_search],
            max_iters=5,
        )
        self.query_agent = dspy.ChainOfThought(signature=signatures.QueryAgent)

    async def aforward(
        self,
        user_question: str,
        model_id: str,
        table: str,
    ) -> dspy.Prediction:
        async with asyncio.TaskGroup() as tg:
            fields_task = tg.create_task(
                self.fields_agent.acall(  # pyright: ignore[reportUnknownMemberType]
                    user_question=user_question,
                    model_id=model_id,
                    table=table,
                )
            )
            filters_task = tg.create_task(
                self.filters_agent.acall(  # pyright: ignore[reportUnknownMemberType]
                    user_question=user_question,
                    model_id=model_id,
                    table=table,
                )
            )
            try:
                fields_prediction = await fields_task
            except asyncio.CancelledError as e:
                logging.exception("Error in parallel tasks", stack_info=True)
                print(e.__context__)
                raise e
            filters_prediction = await filters_task
        return await self.query_agent.acall(  # pyright: ignore[reportUnknownMemberType]
            user_question=user_question,
            model_id=model_id,
            table=table,
            db_fields=fields_prediction.db_fields,  # pyright: ignore[reportUnknownMemberType,reportUnknownArgumentType]
            filters=filters_prediction.filters,  # pyright: ignore[reportUnknownMemberType,reportUnknownArgumentType]
        )


@agent_server.invoke()
async def query_agent(
    request: responses.ResponsesAgentRequest,
) -> responses.ResponsesAgentResponse:
    user_input = next(
        i.content
        for i in request.input
        if isinstance(i, responses_helpers.Message)
        and i.role == "user"
        and isinstance(i.content, str)
    )
    custom_inputs = request.custom_inputs or {}
    query_agent = QueryAgent()
    response = await query_agent.acall(  # pyright: ignore[reportUnknownMemberType]
        user_question=user_input,
        model_id=custom_inputs["model_id"],
        table=custom_inputs["table"],
    )

    query = cast(types.QueryPayload, response.query) # pyright: ignore[reportUnknownMemberType]
    return responses.ResponsesAgentResponse(
        output=[],
        custom_outputs=query.model_dump(mode="json"),  # pyright: ignore[reportUnknownArgumentType,reportUnknownMemberType]
    )
