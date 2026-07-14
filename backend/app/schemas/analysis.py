from typing import Dict, Optional
from pydantic import BaseModel, Field


class TextAnalysisRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=5,
        description="Raw text submitted for AI authenticity analysis."
    )


class AnalysisResponseSchema(BaseModel):
    id: str
    name: str

    type: str = Field(
        ...,
        description="Content modality."
    )

    # ----------------------------
    # Existing fields (keep them)
    # ----------------------------
    score: float = Field(
        ...,
        description="Overall confidence score."
    )

    risk: str = Field(
        ...,
        description="Compatibility field for existing frontend."
    )

    # ----------------------------
    # New AI fields
    # ----------------------------
    status: Optional[str] = Field(
        default=None,
        description="Authentic or AI Generated."
    )

    detected_model: Optional[str] = Field(
        default=None,
        description="Predicted AI model."
    )
    provider: Optional[str] = Field(
        default=None,
        description="Display name of detected source (GPT, Claude, Llama, Human, etc.)."
)

    confidence: Optional[float] = Field(
        default=None,
        description="Prediction confidence percentage."
    )

    probabilities: Optional[Dict[str, float]] = Field(
        default=None,
        description="Probability for every supported class."
    )