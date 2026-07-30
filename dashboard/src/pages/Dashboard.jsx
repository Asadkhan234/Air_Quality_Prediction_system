import SummaryCard from "../components/SummaryCard";
import AQIPieChart from "../components/AQIPieChart";
import PollutionLineChart from "../components/PollutionLineChart";
import PollutionBarChart from "../components/PollutionBarChart";
import PredictionHistory from "../components/PredictionHistory";
import StatisticsCards from "../components/StatisticsCards";

import { useAQI } from "../context/AQIContext";
import { AQI_INFO } from "../utils/aqiInfo";

import {
  FaSmog,
  FaTemperatureHigh,
  FaTint,
  FaHeart,
  FaMapMarkerAlt,
  FaWind,
} from "react-icons/fa";

export default function Dashboard() {
  const { aqiData } = useAQI();

  const healthStatus = () => {
    switch (aqiData.prediction) {
      case "Good":
        return "Excellent";
      case "Moderate":
        return "Safe";
      case "Unhealthy for Sensitive Groups":
        return "Sensitive";
      case "Unhealthy":
        return "Poor";
      case "Very Unhealthy":
        return "Danger";
      case "Hazardous":
        return "Emergency";
      default:
        return "-";
    }
  };

  const info = AQI_INFO[aqiData.prediction];

  const detailStats = [
    { label: "City", value: aqiData.city, icon: FaMapMarkerAlt, iconColor: "text-blue-500" },
    { label: "PM10", value: aqiData.pm10 },
    { label: "PM2.5", value: aqiData.pm2_5 },
    { label: "Wind Speed", value: aqiData.wind_speed, icon: FaWind, iconColor: "text-teal-500" },
    { label: "Pressure", value: aqiData.pressure },
    { label: "Temperature", value: `${aqiData.temperature} °C` },
    { label: "Humidity", value: `${aqiData.humidity} %` },
    {
      label: "Season",
      value:
        aqiData.season === "0" ? "Autumn" : aqiData.season === "1" ? "Winter" : "-",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Live air quality overview and prediction history.
        </p>
      </div>

      <StatisticsCards />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <SummaryCard
          title="AQI Category"
          value={aqiData.prediction}
          icon={<FaSmog />}
          color="text-amber-500"
        />
        <SummaryCard
          title="Temperature"
          value={`${aqiData.temperature} °C`}
          icon={<FaTemperatureHigh />}
          color="text-rose-500"
        />
        <SummaryCard
          title="Humidity"
          value={`${aqiData.humidity}%`}
          icon={<FaTint />}
          color="text-blue-500"
        />
        <SummaryCard
          title="Health"
          value={healthStatus()}
          icon={<FaHeart />}
          color="text-emerald-500"
        />
      </div>

      {/* Live Prediction */}
      <div className="mt-8 rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className={`p-8 ${info?.color || "bg-slate-100"}`}>
          <div className="flex items-center gap-4">
            <span className="text-5xl leading-none">{info?.icon || "🌍"}</span>
            <div>
              <h2 className={`text-2xl font-bold ${info?.text || "text-slate-800"}`}>
                Current Air Quality
              </h2>
              <p className={`${info?.text || "text-slate-600"} opacity-90`}>
                {info?.advice || "Predict AQI to view details."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          {detailStats.map(({ label, value, icon: Icon, iconColor }) => (
            <div
              key={label}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {Icon && <Icon className={`text-xl mb-2 ${iconColor}`} />}
              <p className="text-slate-400 text-sm">{label}</p>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5">{value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <AQIPieChart />
        <PollutionLineChart />
      </div>

      <div className="mt-8">
        <PollutionBarChart />
      </div>

      <div className="mt-8">
        <PredictionHistory />
      </div>
    </div>
  );
}