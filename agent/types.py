from typing import List, Dict, Any

import pydantic


class SortColumn(pydantic.BaseModel):
    """Model for sort column specification"""
    column_name: str
    sort_descending: bool


class QueryPayload(pydantic.BaseModel):
    """Model for query payload with filters, sorts, and field selections"""
    modelId: str
    fields: list[str]
    limit: int
    sorts: list[SortColumn]
    table: str
    filters: dict[str, Any] = pydantic.Field(default_factory=dict)
