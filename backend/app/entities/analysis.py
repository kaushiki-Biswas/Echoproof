from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Analysis(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)

    user_email = Column(String, nullable=False)

    file_name = Column(String, nullable=False)

    content_type = Column(String, nullable=False)

    confidence = Column(Float, nullable=False)

    status = Column(String, nullable=False)

    source = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )