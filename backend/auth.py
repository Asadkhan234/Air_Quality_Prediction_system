from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from datetime import datetime
from database import get_db

from models import User

from schemas import UserCreate

from models import PasswordReset
from schemas import (
    ForgotPassword,
    VerifyOTP,
    ResetPassword
)


from fastapi import UploadFile
from fastapi import File
import os
import shutil

# clude changes

from fastapi import UploadFile, File
from models import Prediction
import shutil, uuid, os

#--------------------------------

from schemas import UpdateProfile
from schemas import ProfileResponse

from otp_utils import generate_otp
from email_utils import send_otp_email

from datetime import datetime, timedelta

from schemas import ChangePassword
from security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)


router = APIRouter()


#  ========================  SIGNUP END POINT ==========================

@router.post("/signup")

def signup(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    existing_user = (

        db.query(User)

        .filter(

            User.email == user.email

        )

        .first()

    )

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"

        )

    new_user = User(

        name=user.name,

        email=user.email,

        password=hash_password(

            user.password

        )

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message":

        "User created successfully"

    }
    
    

#  ========================  LOGIN END POINT ==========================


from schemas import UserLogin
from security import (
    verify_password,
    create_access_token
)

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {

        "access_token": token,
        "token_type": "bearer",

        "user": {

            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "profile_image": db_user.profile_image

        }

    }
    
    
    
    
# ========================= CHANGED PASSWORD END POINT ====================
    
    
@router.post("/change-password")
def change_password(

    data: ChangePassword,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    # Check current password
    if not verify_password(
        data.current_password,
        current_user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    # Check new password confirmation
    if data.new_password != data.confirm_password:

        raise HTTPException(
            status_code=400,
            detail="Passwords do not match"
        )

    # Optional: prevent using the same password
    if verify_password(
        data.new_password,
        current_user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="New password cannot be the same as the current password"
        )

    # Hash and update password
    current_user.password = hash_password(
        data.new_password
    )

    db.commit()

    return {
        "message": "Password changed successfully"
    }
    
    
    
    
    
# ========================= PROFILE =========================

@router.get(
    "/profile",
    response_model=ProfileResponse
)
def get_profile(

    current_user: User = Depends(get_current_user)

):

    return current_user





# ========================= UPDATE PROFILE =========================

@router.put(
    "/profile",
    response_model=ProfileResponse
)
def update_profile(

    data: UpdateProfile,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    current_user.name = data.name

    if data.email and data.email != current_user.email:

        existing = db.query(User).filter(

            User.email == data.email,

            User.id != current_user.id

        ).first()

        if existing:

            raise HTTPException(

                status_code=400,

                detail="Email already in use"

            )

        current_user.email = data.email

    db.commit()

    db.refresh(current_user)

    return current_user

    
    
    
# ========================= UPLOAD PROFILE IMAGE =========================

@router.post("/profile/upload")

def upload_profile_picture(

    file: UploadFile = File(...),

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    # Create uploads folder if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    # Allowed image types
    allowed_extensions = [

        ".jpg",

        ".jpeg",

        ".png",

        ".webp"

    ]

    extension = os.path.splitext(

        file.filename

    )[1].lower()

    if extension not in allowed_extensions:

        raise HTTPException(

            status_code=400,

            detail="Only JPG, PNG and WEBP images are allowed."

        )

    # Create unique filename
    filename = f"user_{current_user.id}{extension}"

    filepath = os.path.join(

        "uploads",

        filename

    )

    # Save file
    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(

            file.file,

            buffer

        )

    # Save filename in database
    current_user.profile_image = filename

    db.commit()

    db.refresh(current_user)

    return {

        "message": "Profile picture uploaded successfully",

        "profile_image": filename

    }


    
# ================= FORGOT PASSWORD End Point=================

@router.post("/forgot-password")
def forgot_password(

    data: ForgotPassword,

    db: Session = Depends(get_db)

):

    # Check user exists

    user = (

        db.query(User)

        .filter(User.email == data.email)

        .first()

    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail="Email not found"

        )

    # Generate OTP

    otp = generate_otp()

    # Delete old OTPs

    db.query(PasswordReset).filter(

        PasswordReset.email == data.email

    ).delete()

    # Create expiry

    expires = datetime.utcnow() + timedelta(minutes=10)

    # Save OTP

    reset = PasswordReset(

        email=data.email,

        otp=otp,

        expires_at=expires

    )

    db.add(reset)

    db.commit()

    # Send email (currently prints in terminal)

    send_otp_email(

        data.email,

        otp

    )

    return {

        "message": "OTP sent successfully"

    }
    
    
    
    
# ================= VERIFY OTP =================

@router.post("/verify-otp")
def verify_otp(

    data: VerifyOTP,

    db: Session = Depends(get_db)

):

    otp_record = (

        db.query(PasswordReset)

        .filter(

            PasswordReset.email == data.email,

            PasswordReset.otp == data.otp,

            PasswordReset.is_used == False

        )

        .first()

    )

    if not otp_record:

        raise HTTPException(

            status_code=400,

            detail="Invalid OTP"

        )

    if datetime.utcnow() > otp_record.expires_at:

        raise HTTPException(

            status_code=400,

            detail="OTP expired"

        )

    return {

        "message": "OTP verified"

    }
    
    
    
    
    
    
    
    
# ================= RESET PASSWORD =================

@router.post("/reset-password")
def reset_password(

    data: ResetPassword,

    db: Session = Depends(get_db)

):

    if data.new_password != data.confirm_password:

        raise HTTPException(

            status_code=400,

            detail="Passwords do not match"

        )

    otp_record = (

        db.query(PasswordReset)

        .filter(

            PasswordReset.email == data.email,

            PasswordReset.otp == data.otp,

            PasswordReset.is_used == False

        )

        .first()

    )

    if not otp_record:

        raise HTTPException(

            status_code=400,

            detail="Invalid OTP"

        )

    if datetime.utcnow() > otp_record.expires_at:

        raise HTTPException(

            status_code=400,

            detail="OTP expired"

        )

    user = (

        db.query(User)

        .filter(User.email == data.email)

        .first()

    )

    user.password = hash_password(

        data.new_password

    )

    otp_record.is_used = True

    db.commit()

    return {

        "message": "Password reset successfully"

    }
    
    
    
    
    
    
    
    
    
# ================= RESEND OTP =================

@router.post("/resend-otp")
def resend_otp(

    data: ForgotPassword,

    db: Session = Depends(get_db)

):

    db.query(PasswordReset).filter(

        PasswordReset.email == data.email

    ).delete()

    db.commit()

    otp = generate_otp()

    expires = datetime.utcnow() + timedelta(minutes=10)

    new_otp = PasswordReset(

        email=data.email,

        otp=otp,

        expires_at=expires

    )

    db.add(new_otp)

    db.commit()

    send_otp_email(

        data.email,

        otp

    )

    return {

        "message": "New OTP sent"

    }
    
    
    

    
