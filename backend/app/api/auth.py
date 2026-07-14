from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import UserRegisterSchema, UserLoginSchema, TokenSchema
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.user_service import (
    get_user_by_email,
    create_user
)

router = APIRouter()

# In-memory transient runtime state storage mapping users before database connection is introduced


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserRegisterSchema,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(db, user_data.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identity provisioning conflict: Email is already mapped."
        )

    create_user(
        db=db,
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )

    return {
        "status": "success",
        "detail": "Identity provision configuration completed."
    }

@router.post("/login", response_model=TokenSchema)
async def login(
    user_data: UserLoginSchema,
    db: Session = Depends(get_db)
):
    user = get_user_by_email(db, user_data.email)

    if not user or not verify_password(
        user_data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed: Invalid credentials provided."
        )

    token = create_access_token(
        data={"sub": user.email}
    )

    return TokenSchema(token=token)