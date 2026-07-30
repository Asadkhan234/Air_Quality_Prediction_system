import { useEffect, useState } from "react";

import PakistanPollutionMap from "../components/PakistanPollutionMap";
import PollutionInsights from "../components/PollutionInsights";

import {
    getTopCities,
    getAIInsights
} from "../api/analyticsCharts";

export default function GeoAnalytics() {

    const [topCities, setTopCities] = useState([]);
    const [insights, setInsights] = useState(null);

    const [city, setCity] = useState("");
    const [year, setYear] = useState("");
    const [season, setSeason] = useState("");

    useEffect(() => {

        async function loadData() {

            try {

                // Pakistan Map Data
                const cities = await getTopCities();
                setTopCities(cities);

                // Dynamic AI Insights
                const ai = await getAIInsights({
                    city,
                    year,
                    season
                });

                setInsights(ai);

            } catch (error) {

                console.log(error);

            }

        }

        loadData();

    }, [city, year, season]);

    return (

        <div className="min-h-screen bg-slate-50 p-6 md:p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                    Geo & AI Analytics
                </h1>
                <p className="text-slate-400 mt-1">
                    Pollution levels across Pakistan with AI-generated insights.
                </p>
            </div>

            {/* Filters */}

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8">

                <div className="flex items-center gap-3 mb-5">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-base shadow-sm">
                        🔍
                    </span>
                    <h2 className="text-lg font-bold text-slate-800">
                        Filters
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-5">

                    {/* City */}

                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                    >

                        <option value="">
                            All Cities
                        </option>

                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Sialkot">Sialkot</option>

                    </select>

                    {/* Year */}

                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                    >

                        <option value="">
                            All Years
                        </option>

                        <option value="2025">
                            2025
                        </option>

                        <option value="2026">
                            2026
                        </option>

                    </select>

                    {/* Season */}

                    <select
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                    >

                        <option value="">
                            All Seasons
                        </option>

                        <option value="0">
                            Autumn
                        </option>

                        <option value="1">
                            Winter
                        </option>

                    </select>

                </div>

            </div>

            {/* Pakistan Pollution Map */}

            <PakistanPollutionMap
                data={topCities}
            />

            {/* AI Insights */}

            <div className="mt-8">

                <PollutionInsights
                    insights={insights}
                />

            </div>

        </div>

    );

}