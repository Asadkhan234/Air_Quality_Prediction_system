import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from database import get_db
from models import User
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)


# ================= PASSWORD =================

def hash_password(password: str):
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


# ================= JWT =================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


# ================= CURRENT USER =================

def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):

    credentials_exception = HTTPException(

        status_code=401,

        detail="Could not validate credentials",

        headers={"WWW-Authenticate": "Bearer"}

    )

    try:

        print("\n========== TOKEN RECEIVED ==========")
        print(token)

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )

        print("\n========== PAYLOAD ==========")
        print(payload)

        email = payload.get("sub")

        print("\n========== EMAIL ==========")
        print(email)

        if email is None:

            raise credentials_exception

    except JWTError as e:

        print("\n========== JWT ERROR ==========")
        print(str(e))

        raise credentials_exception

    user = (

        db.query(User)

        .filter(User.email == email)

        .first()

    )

    print("\n========== USER ==========")
    print(user)

    if user is None:

        print("\n========== USER NOT FOUND ==========")

        raise credentials_exception

    return user