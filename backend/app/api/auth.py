from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import UserRegisterSchema, UserLoginSchema, TokenSchema
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

# In-memory transient runtime state storage mapping users before database connection is introduced
MEMORY_USER_DB = {}

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegisterSchema):
    if user_data.email in MEMORY_USER_DB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Identity provisioning conflict: Email is already mapped."
        )

    MEMORY_USER_DB[user_data.email] = {
        "email": user_data.email,
        "hashed_password": hash_password(user_data.password)
    }

    return {
        "status": "success",
        "detail": "Identity provision configuration completed."
    }

@router.post("/login", response_model=TokenSchema)
async def login(user_data: UserLoginSchema):
    user = MEMORY_USER_DB.get(user_data.email)

    if not user or not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed: Invalid credentials provided."
        )

    token = create_access_token(data={"sub": user["email"]})

    return TokenSchema(token=token)
