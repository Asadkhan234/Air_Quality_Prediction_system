from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)

from datetime import datetime

from database import Base

#============================== User ================================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    password = Column(
        String,
        nullable=False
    )
    
    profile_image = Column(
    String,
    nullable=True,
    default=None
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    
    #=============================== Prediction ======================
    
    
class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    date = Column(String)

    city = Column(String)

    aqi = Column(String)

    pm10 = Column(Float)

    pm2_5 = Column(Float)

    temperature = Column(Float)

    humidity = Column(Float)

    pressure = Column(Float)

    wind_speed = Column(Float)
    
    #===================== PasswordReset ====================
    
class PasswordReset(Base):

    __tablename__ = "password_resets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        nullable=False,
        index=True
    )

    otp = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    expires_at = Column(
        DateTime,
        nullable=False
    )

    is_used = Column(
        Boolean,
        default=False
    )