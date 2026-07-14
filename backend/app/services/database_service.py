from sqlalchemy.orm import Session

from app.entities.analysis import Analysis


def save_analysis(
    db: Session,
    user_email: str,
    file_name: str,
    content_type: str,
    confidence: float,
    status: str,
    source: str
):

    analysis = Analysis(
        user_email=user_email,
        file_name=file_name,
        content_type=content_type,
        confidence=confidence,
        status=status,
        source=source
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis

def get_analysis_history(db: Session):

    return (
        db.query(Analysis)
        .order_by(Analysis.id.desc())
        .all()
    )