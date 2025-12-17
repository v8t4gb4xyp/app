from typing import Literal

import pydantic


class SortColumn(pydantic.BaseModel):
    """Column sorting specification."""

    column_name: str
    sort_descending: bool


# SortColumn(column_name="example_column", sort_descending=True).model_dump(mode="json")


class StringFilter(pydantic.BaseModel):
    """String filter specification."""

    type: Literal["string"]
    kind: Literal["EQUALS", "STARTS_WITH", "ENDS_WITH", "CONTAINS", "IS_EMPTY"]
    is_negative: bool


class NumberFilter(pydantic.BaseModel):
    type: Literal["number"]
    kind: Literal["EQUALS", "LESS_THAN", "GREATER_THAN", "IS_EMPTY"]
    is_negative: bool


class DateFilter(pydantic.BaseModel):
    type: Literal["date"]
    kind: Literal[
        "TIME_FOR_INTERVAL_DURATION",
        "TIME_FOR_DATE_DURATION",
        "BEFORE",
    ]
    isFiscal: bool
    is_negative: bool
    left_side: str | None
    right_side: str | None
    offset_interval_string: str | None


class NullFilter(pydantic.BaseModel):
    type: Literal["null"]
    is_negative: bool


type Filter = StringFilter | NumberFilter | DateFilter | NullFilter


class CompositeFilter(pydantic.BaseModel):
    """Model for composite filter with multiple conditions"""

    filters: list[Filter]
    conjunction: Literal["AND", "OR"]


type Filters = Filter | CompositeFilter


class QueryPayload(pydantic.BaseModel):
    """Model for query payload with filters, sorts, and field selections"""

    modelId: str = pydantic.Field("", description="Data Model Identifier")
    table: str
    fields: list[str]
    filters: dict[str, Filters] | None
    limit: int
    sorts: list[SortColumn]
