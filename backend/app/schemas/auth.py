from pydantic import BaseModel, EmailStr, Field

class UserRegisterSchema(BaseModel):
    email: EmailStr = Field(..., description="Unique terminal user registration identifier.")
    password: str = Field(..., min_length=8, description="Cryptographic key phrase.")

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class TokenSchema(BaseModel):
    token: str
    token_type: str = "bearer"
    