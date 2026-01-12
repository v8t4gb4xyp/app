import dspy  # pyright: ignore[reportMissingTypeStubs]

from agent import types


class FieldSelector(dspy.Signature):
    """Choose only the relevant fields to answer the user question. Do not try to filter data here or perform any other action to answer the question."""

    user_question: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    model_id: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    table: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    db_fields: list[str] = dspy.OutputField(description="Selected database fields.")  # pyright: ignore[reportUnknownMemberType]


class FilterBuilder(dspy.Signature):
    """Build filters for querying a data model based on the user question."""

    user_question: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    model_id: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    table: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    filters: list[types.StringFilter | types.NumberFilter | types.DateFilter | types.NullFilter] = dspy.OutputField(description="Built Filters.")  # pyright: ignore[reportUnknownMemberType]
    


class QueryAgent(dspy.Signature):
    """Build a query based on the user_question."""

    user_question: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    model_id: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    table: str = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    db_fields: list[str] = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    filters: list[types.StringFilter | types.NumberFilter | types.DateFilter | types.NullFilter] = dspy.InputField()  # pyright: ignore[reportUnknownMemberType]
    query: types.QueryPayload = dspy.OutputField(  # pyright: ignore[reportUnknownMemberType]
        description="Final JSON object representing the query."
    )
