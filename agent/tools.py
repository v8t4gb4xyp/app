"""Tools for interacting with a semantic data model."""

from typing import Literal
from collections.abc import Sequence

import pydantic


class Field(pydantic.BaseModel):
    """Metadata about a field in the data model."""

    name: str
    type: Literal["STRING", "NUMBER", "DATE", "BOOLEAN"]
    kind: Literal["DIMENSION", "MEASURE"]
    usage_count: int
    sample_values: list[str]


def list_db_fields(model_id: str, table: str) -> list[Field]:
    """List available fields in the data model.

    Args:
        model_id: The identifier of the data model.
        table: The name of the table within the data model.
    Returns:
        db_fields: A list of Field objects containing metadata about each field.
    """
    # Placeholder implementation
    return [
        Field(
            name="products.category",
            type="STRING",
            kind="DIMENSION",
            usage_count=42,
            sample_values=["T-Shirt", "Pants", "Shoes"],
        ),
        Field(
            name="products.price",
            type="NUMBER",
            kind="DIMENSION",
            usage_count=100,
            sample_values=["19.99", "29.99", "39.99"],
        ),
        Field(
            name="products.count",
            type="NUMBER",
            kind="MEASURE",
            usage_count=57,
            sample_values=[],
        ),
        Field(
            name="distribution_centers.name",
            type="STRING",
            kind="DIMENSION",
            usage_count=15,
            sample_values=["East DC", "West DC"],
        ),
    ]


def field_value_search(
    model_id: str, table: str, field: str, search_term: str
) -> Sequence[str]:
    """Search for specific values within a given field.

    Args:
        model_id: The identifier of the data model.
        table: The name of the table within the data model.
        field: The field to search within.
        search_terms: The value(s) to search for.
    Returns:
        A list of matching record values.
    """
    return {
        "products.category": ["T-Shirt"],
        "distribution_centers.name": ["East DC"],
    }.get(field, [])
