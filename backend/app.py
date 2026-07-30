from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import numpy as np
import pandas as pd
import joblib
import os

from database import Base, engine
import models
from auth import router as auth_router


from sqlalchemy.orm import Session
from fastapi import Depends

from database import get_db
from security import get_current_user

from models import Prediction, User
from datetime import datetime




# clude changes
from fastapi.staticfiles import StaticFiles
import os
# =========================

app = FastAPI()

os.makedirs("uploads", exist_ok=True)

app.mount(

    "/uploads",

    StaticFiles(directory="uploads"),

    name="uploads"

)

app.include_router(auth_router)

Base.metadata.create_all(bind=engine)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "model.pkl"
)

SCALER_PATH = os.path.join(
    BASE_DIR,
    "model",
    "scaler.pkl"
)

model = joblib.load(MODEL_PATH)

scaler = joblib.load(SCALER_PATH)

# Load Dataset

DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "data",
    "pakistan_air_quality_final_clean.csv"
)

df = pd.read_csv(DATA_PATH)

class AQIData(BaseModel):

    latitude: float
    longitude: float
    pm10: float
    pm2_5: float
    carbon_monoxide: float
    nitrogen_dioxide: float
    sulphur_dioxide: float
    ozone: float
    dust: float
    temperature: float
    humidity: float
    precipitation: float
    wind_speed: float
    wind_direction: float
    pressure: float
    month: int
    year: int
    season: int

    city_Faisalabad: int
    city_Islamabad: int
    city_Karachi: int
    city_Lahore: int
    city_Multan: int
    city_Peshawar: int
    city_Quetta: int
    city_Rahim_Yar_Khan: int
    city_Rawalpindi: int
    city_Sialkot: int


@app.get("/")
def home():
    return {
        "message": "Air Quality Prediction API",
        "status": "Running"
    }


@app.post("/predict")
def predict(
    data: AQIData,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    features = np.array([[

        data.latitude,
        data.longitude,
        data.pm10,
        data.pm2_5,
        data.carbon_monoxide,
        data.nitrogen_dioxide,
        data.sulphur_dioxide,
        data.ozone,
        data.dust,
        data.temperature,
        data.humidity,
        data.precipitation,
        data.wind_speed,
        data.wind_direction,
        data.pressure,
        data.month,
        data.year,
        data.season,

        data.city_Faisalabad,
        data.city_Islamabad,
        data.city_Karachi,
        data.city_Lahore,
        data.city_Multan,
        data.city_Peshawar,
        data.city_Quetta,
        data.city_Rahim_Yar_Khan,
        data.city_Rawalpindi,
        data.city_Sialkot

    ]])

    # Scale Features
    features = scaler.transform(features)

    # Predict AQI
    prediction = model.predict(features)[0]

    # Detect Selected City

    city = "Unknown"

    if data.city_Faisalabad == 1:
        city = "Faisalabad"

    elif data.city_Islamabad == 1:
        city = "Islamabad"

    elif data.city_Karachi == 1:
        city = "Karachi"

    elif data.city_Lahore == 1:
        city = "Lahore"

    elif data.city_Multan == 1:
        city = "Multan"

    elif data.city_Peshawar == 1:
        city = "Peshawar"

    elif data.city_Quetta == 1:
        city = "Quetta"

    elif data.city_Rahim_Yar_Khan == 1:
        city = "Rahim Yar Khan"

    elif data.city_Rawalpindi == 1:
        city = "Rawalpindi"

    elif data.city_Sialkot == 1:
        city = "Sialkot"

    # Save Prediction History

    history = Prediction(

        user_id=current_user.id,

        date=datetime.now().strftime(
            "%d-%b-%Y %I:%M:%S %p"
        ),

        city=city,

        aqi=prediction,

        pm10=data.pm10,

        pm2_5=data.pm2_5,

        temperature=data.temperature,

        humidity=data.humidity,

        pressure=data.pressure,

        wind_speed=data.wind_speed

    )

    db.add(history)

    db.commit()

    db.refresh(history)

    # Return Prediction

    return {

        "prediction": prediction

    }


@app.get("/analytics")
def analytics(
    city: str = Query(None),
    year: int = Query(None),
    season: int = Query(None)
):

    filtered_df = df.copy()

    if city:
        filtered_df = filtered_df[filtered_df["city"] == city]

    if year is not None:
        filtered_df = filtered_df[filtered_df["year"] == year]

    if season is not None:
        filtered_df = filtered_df[filtered_df["season"] == season]

    return {
        "total_records": len(filtered_df),
        "total_cities": filtered_df["city"].nunique(),
        "total_years": filtered_df["year"].nunique(),
        "average_pm10": round(filtered_df["pm10"].mean(), 2),
        "average_pm25": round(filtered_df["pm2_5"].mean(), 2),
        "average_temperature": round(filtered_df["temperature"].mean(), 2),
        "average_humidity": round(filtered_df["humidity"].mean(), 2),
        "cities": sorted(df["city"].unique().tolist()),
        "years": sorted(df["year"].unique().tolist())
    }
    
    
    
  
    
@app.get("/analytics/aqi-distribution")
def aqi_distribution():

    distribution = (
        df["aqi_category"]
        .value_counts()
        .reset_index()
    )

    distribution.columns = [
        "category",
        "count"
    ]

    return distribution.to_dict(orient="records")



@app.get("/analytics/pm10-city")
def pm10_city():

    city_data = (
        df.groupby("city")["pm10"]
        .mean()
        .reset_index()
    )

    city_data["pm10"] = city_data["pm10"].round(2)

    return city_data.to_dict(orient="records")



@app.get("/analytics/monthly-trend")
def monthly_trend():

    trend = (
        df.groupby("month")["pm2_5"]
        .mean()
        .reset_index()
    )

    trend["pm2_5"] = trend["pm2_5"].round(2)

    month_names = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }

    trend["month"] = trend["month"].map(month_names)

    return trend.to_dict(orient="records")




@app.get("/analytics/top-polluted-cities")
def top_polluted_cities():

    cities = (
        df.groupby("city")
        .agg(
            average_pm10=("pm10", "mean"),
            average_pm25=("pm2_5", "mean")
        )
        .reset_index()
    )

    cities["average_pm10"] = cities["average_pm10"].round(2)
    cities["average_pm25"] = cities["average_pm25"].round(2)

    cities = cities.sort_values(
        by="average_pm10",
        ascending=False
    )

    return cities.to_dict(orient="records")

from fastapi import Query


from fastapi import Query

@app.get("/analytics/ai-insights")
def ai_insights(

    city: str = Query(None),
    year: int = Query(None),
    season: str = Query(None)

):

    # Copy Dataset

    filtered_df = df.copy()

    # -------------------------
    # Filter City
    # -------------------------

    if city:

        filtered_df = filtered_df[
            filtered_df["city"] == city
        ]

    # -------------------------
    # Filter Year
    # -------------------------

    if year is not None:

        filtered_df = filtered_df[
            filtered_df["year"] == year
        ]

    # -------------------------
    # Filter Season
    # -------------------------

    if season:

        season_map = {

            "0": "Autumn",

            "1": "Winter"

        }

        selected_season = season_map.get(
            season,
            season
        )

        filtered_df = filtered_df[
            filtered_df["season"]
            .astype(str)
            .str.strip()
            .str.lower()
            ==
            selected_season.strip().lower()
        ]

    # -------------------------
    # No Data
    # -------------------------

    if filtered_df.empty:

        return {

            "selected_city": city,

            "most_polluted_city": "No Data",

            "highest_pm10": 0,

            "cleanest_city": "No Data",

            "lowest_pm10": 0,

            "average_pm10": 0,

            "health_risk": "Unknown",

            "recommendation": "No records found for selected filters."

        }

    # -------------------------
    # Calculate Statistics
    # -------------------------

    city_data = (

        filtered_df
        .groupby("city")["pm10"]
        .mean()
        .reset_index()

    )

    city_data["pm10"] = city_data["pm10"].round(2)

    highest = city_data.loc[
        city_data["pm10"].idxmax()
    ]

    lowest = city_data.loc[
        city_data["pm10"].idxmin()
    ]

    average_pm10 = round(

        filtered_df["pm10"].mean(),

        2

    )

    # -------------------------
    # AI Recommendation
    # -------------------------

    if average_pm10 < 50:

        health_risk = "Low"

        recommendation = (
            "Air quality is good. Outdoor activities are safe."
        )

    elif average_pm10 < 100:

        health_risk = "Moderate"

        recommendation = (
            "Moderate pollution detected. Sensitive groups should reduce prolonged outdoor exposure."
        )

    elif average_pm10 < 150:

        health_risk = "High"

        recommendation = (
            "High pollution detected. Wear an N95 mask and reduce outdoor activities."
        )

    else:

        health_risk = "Very High"

        recommendation = (
            "Hazardous pollution levels. Avoid outdoor activities."
        )

    # -------------------------
    # Selected City
    # -------------------------

    if city:

        return {

            "selected_city": city,

            "average_pm10": average_pm10,

            "health_risk": health_risk,

            "recommendation": recommendation

        }

    # -------------------------
    # All Cities
    # -------------------------

    return {

        "selected_city": None,

        "most_polluted_city": highest["city"],

        "highest_pm10": highest["pm10"],

        "cleanest_city": lowest["city"],

        "lowest_pm10": lowest["pm10"],

        "average_pm10": average_pm10,

        "health_risk": health_risk,

        "recommendation": recommendation

    }