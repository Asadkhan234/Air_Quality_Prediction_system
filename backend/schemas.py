from pydantic import BaseModel, EmailStr
from datetime import datetime

# ==========================
# USER SIGNUP
# ==========================

class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str


# ==========================
# USER LOGIN
# ==========================

class UserLogin(BaseModel):

    email: EmailStr

    password: str


# ==========================
# CHANGE PASSWORD
# ==========================

class ChangePassword(BaseModel):

    current_password: str

    new_password: str

    confirm_password: str


# ==========================
# FORGOT PASSWORD
# ==========================

class ForgotPassword(BaseModel):

    email: EmailStr


# ==========================
# VERIFY OTP
# ==========================

class VerifyOTP(BaseModel):

    email: EmailStr

    otp: str


# ==========================
# RESET PASSWORD
# ==========================

class ResetPassword(BaseModel):

    email: EmailStr

    otp: str

    new_password: str

    confirm_password: str
    
    
    
    
    
# ==========================
# PROFILE
# ==========================

class UpdateProfile(BaseModel):
    name: str
    email: str | None = None


class ProfileResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    profile_image: str | None = None

    created_at: datetime

    class Config:
        from_attributes = True