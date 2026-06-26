from pydantic import BaseModel, Field

class TextAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=5, description="Raw text payload array block.")

class AnalysisResponseSchema(BaseModel):
    id: str
    name: str
    score: float = Field(..., description="Aggregated fusion integrity percentage metric.")
    risk: str = Field(..., description="Evaluation label classification output.")
    type: str = Field(..., description="Target system operational modality stream.")