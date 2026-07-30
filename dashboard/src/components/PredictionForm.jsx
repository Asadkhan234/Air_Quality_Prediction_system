import { useState } from "react";
import { predictAQI } from "../api/predict";
import { AQI_INFO } from "../utils/aqiInfo";
import { useAQI } from "../context/AQIContext";
import toast from "react-hot-toast";

const cityCoordinates = {
    "Faisalabad": { latitude: 31.4504, longitude: 73.135 },
    "Islamabad": { latitude: 33.6844, longitude: 73.0479 },
    "Karachi": { latitude: 24.8607, longitude: 67.0011 },
    "Lahore": { latitude: 31.5204, longitude: 74.3587 },
    "Multan": { latitude: 30.1575, longitude: 71.5249 },
    "Peshawar": { latitude: 34.0151, longitude: 71.5249 },
    "Quetta": { latitude: 30.1798, longitude: 66.9750 },
    "Rahim Yar Khan": { latitude: 28.4212, longitude: 70.2989 },
    "Rawalpindi": { latitude: 33.5651, longitude: 73.0169 },
    "Sialkot": { latitude: 32.4945, longitude: 74.5229 }
};

// Reusable text input for the grouped cards
function FieldInput({ label, name, value, onChange, placeholder, required }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-slate-600">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
            />
        </div>
    );
}

// Card wrapper used for each grouped section
function SectionCard({ icon, title, accent, children }) {
    return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
                    {icon}
                </span>
                <h2 className={`text-lg font-bold ${accent}`}>{title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {children}
            </div>
        </div>
    );
}

export default function PredictionForm() {

    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);

    const {
    setAQIData,
    history,
    setHistory
} = useAQI();

    const [formData, setFormData] = useState({

        city: "Faisalabad",

        latitude: cityCoordinates["Faisalabad"].latitude,
        longitude: cityCoordinates["Faisalabad"].longitude,

        pm10: "",
        pm2_5: "",
        carbon_monoxide: "",
        nitrogen_dioxide: "",
        sulphur_dioxide: "",
        ozone: "",
        dust: "",
        temperature: "",
        humidity: "",
        precipitation: "",
        wind_speed: "",
        wind_direction: "",
        pressure: "",
        month: "",
        year: "",
        season: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        // When the city changes, auto-fill latitude/longitude from cityCoordinates
        if (name === "city") {

            const coord = cityCoordinates[value];

            setFormData((prev) => ({
                ...prev,
                city: value,
                latitude: coord ? coord.latitude : prev.latitude,
                longitude: coord ? coord.longitude : prev.longitude
            }));

            return;

        }

        setFormData({

            ...formData,
            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.pm10 ||
            !formData.pm2_5 ||
            !formData.temperature ||
            !formData.humidity ||
            !formData.month ||
            !formData.year ||
            !formData.latitude ||
            !formData.longitude
        ) {

            toast.error("Please fill all required fields.");
            return;

        }

        setLoading(true);

        const payload = {
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),

            pm10: Number(formData.pm10),
            pm2_5: Number(formData.pm2_5),
            carbon_monoxide: Number(formData.carbon_monoxide),
            nitrogen_dioxide: Number(formData.nitrogen_dioxide),
            sulphur_dioxide: Number(formData.sulphur_dioxide),
            ozone: Number(formData.ozone),
            dust: Number(formData.dust),
            temperature: Number(formData.temperature),
            humidity: Number(formData.humidity),
            precipitation: Number(formData.precipitation),
            wind_speed: Number(formData.wind_speed),
            wind_direction: Number(formData.wind_direction),
            pressure: Number(formData.pressure),
            month: Number(formData.month),
            year: Number(formData.year),
            season: Number(formData.season),

            city_Faisalabad: formData.city === "Faisalabad" ? 1 : 0,
            city_Islamabad: formData.city === "Islamabad" ? 1 : 0,
            city_Karachi: formData.city === "Karachi" ? 1 : 0,
            city_Lahore: formData.city === "Lahore" ? 1 : 0,
            city_Multan: formData.city === "Multan" ? 1 : 0,
            city_Peshawar: formData.city === "Peshawar" ? 1 : 0,
            city_Quetta: formData.city === "Quetta" ? 1 : 0,
            city_Rahim_Yar_Khan: formData.city === "Rahim Yar Khan" ? 1 : 0,
            city_Rawalpindi: formData.city === "Rawalpindi" ? 1 : 0,
            city_Sialkot: formData.city === "Sialkot" ? 1 : 0

        };

        try {

            const result = await predictAQI(payload);

            setPrediction(result.prediction);

            setAQIData({
                prediction: result.prediction,
                city: formData.city,
                latitude: formData.latitude,
                longitude: formData.longitude,
                pm10: formData.pm10,
                pm2_5: formData.pm2_5,
                carbon_monoxide: formData.carbon_monoxide,
                nitrogen_dioxide: formData.nitrogen_dioxide,
                sulphur_dioxide: formData.sulphur_dioxide,
                ozone: formData.ozone,
                dust: formData.dust,
                temperature: formData.temperature,
                humidity: formData.humidity,
                precipitation: formData.precipitation,
                wind_speed: formData.wind_speed,
                wind_direction: formData.wind_direction,
                pressure: formData.pressure,
                month: formData.month,
                year: formData.year,
                season: formData.season
            });

            setHistory([
                ...history,
                {
                    date: new Date().toLocaleString(),

                    city: formData.city,

                    latitude: Number(formData.latitude),
                    longitude: Number(formData.longitude),

                    prediction: result.prediction,

                    pm10: Number(formData.pm10),
                    pm2_5: Number(formData.pm2_5),

                    temperature: Number(formData.temperature),
                    humidity: Number(formData.humidity),

                    pressure: Number(formData.pressure),

                    wind_speed: Number(formData.wind_speed)
                }
]);

toast.success("Prediction Completed"); // ✅ add it here

        }

        catch (error) {

            console.log(error);

            toast.error("Prediction Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-7xl mx-auto">

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10">

                <div className="flex items-center gap-3 mb-8">
                    <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xl shadow-sm shadow-cyan-500/20">
                        🌍
                    </span>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Air Quality Prediction
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Pollution Data */}
                    <SectionCard icon="🌫️" title="Pollution Data" accent="text-slate-800">

                        <FieldInput
                            label="PM10"
                            name="pm10"
                            value={formData.pm10}
                            onChange={handleChange}
                            placeholder="e.g. 80"
                            required
                        />

                        <FieldInput
                            label="PM2.5"
                            name="pm2_5"
                            value={formData.pm2_5}
                            onChange={handleChange}
                            placeholder="e.g. 45"
                            required
                        />

                        <FieldInput
                            label="Carbon Monoxide"
                            name="carbon_monoxide"
                            value={formData.carbon_monoxide}
                            onChange={handleChange}
                            placeholder="CO"
                        />

                        <FieldInput
                            label="Nitrogen Dioxide"
                            name="nitrogen_dioxide"
                            value={formData.nitrogen_dioxide}
                            onChange={handleChange}
                            placeholder="NO₂"
                        />

                        <FieldInput
                            label="Sulphur Dioxide"
                            name="sulphur_dioxide"
                            value={formData.sulphur_dioxide}
                            onChange={handleChange}
                            placeholder="SO₂"
                        />

                        <FieldInput
                            label="Ozone"
                            name="ozone"
                            value={formData.ozone}
                            onChange={handleChange}
                            placeholder="O₃"
                        />

                        <FieldInput
                            label="Dust"
                            name="dust"
                            value={formData.dust}
                            onChange={handleChange}
                            placeholder="e.g. 12"
                        />

                    </SectionCard>

                    {/* Weather Data */}
                    <SectionCard icon="🌤️" title="Weather Data" accent="text-slate-800">

                        <FieldInput
                            label="Temperature (°C)"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleChange}
                            placeholder="e.g. 28"
                            required
                        />

                        <FieldInput
                            label="Humidity (%)"
                            name="humidity"
                            value={formData.humidity}
                            onChange={handleChange}
                            placeholder="e.g. 60"
                            required
                        />

                        <FieldInput
                            label="Pressure"
                            name="pressure"
                            value={formData.pressure}
                            onChange={handleChange}
                            placeholder="hPa"
                        />

                        <FieldInput
                            label="Wind Speed"
                            name="wind_speed"
                            value={formData.wind_speed}
                            onChange={handleChange}
                            placeholder="km/h"
                        />

                        <FieldInput
                            label="Wind Direction"
                            name="wind_direction"
                            value={formData.wind_direction}
                            onChange={handleChange}
                            placeholder="degrees"
                        />

                        <FieldInput
                            label="Precipitation"
                            name="precipitation"
                            value={formData.precipitation}
                            onChange={handleChange}
                            placeholder="mm"
                        />

                    </SectionCard>

                    {/* Location & Time */}
                    <SectionCard icon="📍" title="Location & Time" accent="text-slate-800">

                        <div className="flex flex-col gap-1">
                            <label htmlFor="city" className="text-sm font-medium text-slate-600">
                                City
                            </label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                            >
                                {Object.keys(cityCoordinates).map(city => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <FieldInput
                            label="Latitude"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            placeholder="e.g. 31.4504"
                            required
                        />

                        <FieldInput
                            label="Longitude"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            placeholder="e.g. 73.135"
                            required
                        />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="month" className="text-sm font-medium text-slate-600">
                                Month <span className="text-rose-500">*</span>
                            </label>
                            <select
                                id="month"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                            >
                                <option value="">Select Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <FieldInput
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="e.g. 2026"
                            required
                        />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="season" className="text-sm font-medium text-slate-600">
                                Season
                            </label>
                            <select
                                id="season"
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                            >
                                <option value="">Select Season</option>
                                <option value="0">Autumn</option>
                                <option value="1">Winter</option>
                            </select>
                        </div>

                    </SectionCard>

                    <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-2 flex items-center justify-center gap-3 py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-sm
                        ${
                            loading
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/20 hover:shadow-lg"
                        }`}
                >
                    {loading ? (
                        <>
                            {/* Spinner */}
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                            Predicting AQI...
                        </>
                    ) : (
                        <>
                            🤖 Predict AQI
                        </>
                    )}
                </button>

                </form>

                {prediction && (

                    <div className="mt-10">

                        <div className={`${AQI_INFO[prediction].color} rounded-3xl shadow-sm border border-white/40 p-8`}>

                            <h2 className={`text-xl font-bold ${AQI_INFO[prediction].text}`}>
                                Prediction Result
                            </h2>

                            <div className="flex items-center gap-5 mt-6">

                                <span className="text-6xl">
                                    {AQI_INFO[prediction].icon}
                                </span>

                                <h1 className={`text-4xl font-bold ${AQI_INFO[prediction].text}`}>
                                    {prediction}
                                </h1>

                            </div>

                            <p className={`mt-6 text-lg ${AQI_INFO[prediction].text} opacity-90`}>
                                {AQI_INFO[prediction].advice}
                            </p>


                          

                        </div>

                    </div>

                )}
                

            </div>

        </div>

    );

}