import os
from unittest import result
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status

from app.schemas.analysis import (
    TextAnalysisRequest,
    AnalysisResponseSchema
)

from app.core.security import validate_token
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.database_service import (
    save_analysis,
    get_analysis_history
)

from app.services.audio_service import analyze_audio
from app.services.text_service import analyze_text_content

router = APIRouter()

SUPPORTED_AUDIO_EXTENSIONS = {".mp3", ".wav"}


@router.post(
    "/file",
    response_model=AnalysisResponseSchema,
    dependencies=[Depends(validate_token)]
)
async def analyze_file(
    file: UploadFile = File(...),
    modality_type: str = Form(...),
    db: Session = Depends(get_db)
):

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in SUPPORTED_AUDIO_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{extension} files are not currently supported."
    )

    # ------------------------------------------
    # Save uploaded file temporarily
    # ------------------------------------------

    temp_dir = "temp_uploads"
    os.makedirs(temp_dir, exist_ok=True)

    temp_path = os.path.join(
        temp_dir,
        file.filename
    )

    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())

    result = analyze_audio(temp_path)

# Save to database
    save_analysis(
        db=db,
        user_email="demo@echoproof.com",
        file_name=result["name"],
        content_type=result["type"],
        confidence=result["confidence"],
        status=result["status"],
        source=result["provider"]
    )

# Delete temp file
    os.remove(temp_path)

    return AnalysisResponseSchema(**result)

@router.post(
    "/text",
    response_model=AnalysisResponseSchema,
    dependencies=[Depends(validate_token)]
)
async def analyze_text(
    request: TextAnalysisRequest,
    db: Session = Depends(get_db)
):

    result = analyze_text_content(request.text)

    save_analysis(
        db=db,
        user_email="demo@echoproof.com",
        file_name=result["name"],
        content_type=result["type"],
        confidence=result["confidence"],
        status=result["status"],
        source=result["detected_model"]
    )

    return AnalysisResponseSchema(**result)

@router.get(
    "/history",
    dependencies=[Depends(validate_token)]
)
def history(
    db: Session = Depends(get_db)
):

    history = get_analysis_history(db)

    return history
