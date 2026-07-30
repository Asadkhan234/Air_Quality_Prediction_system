import { useEffect, useState } from "react";

import { getAnalytics } from "../api/analytics";


import {
    getAQIDistribution,
    getPM10City,
    getMonthlyTrend,
    getTopCities
} from "../api/analyticsCharts";


import MonthlyTrendChart from "../components/MonthlyTrendChart";
import TopPollutedCitiesTable from "../components/TopPollutedCitiesTable";

import AnalyticsCard from "../components/AnalyticsCard";
import AQIDistributionChart from "../components/AQIDistributionChart";
import AnalyticsPM10BarChart from "../components/AnalyticsPM10BarChart";

export default function Analytics() {

    const [data, setData] = useState(null);

    const [city, setCity] = useState("");
    const [year, setYear] = useState("");
    const [season, setSeason] = useState("");

    // Charts Data

    const [aqiDistribution, setAQIDistribution] = useState([]);

    const [pm10City, setPM10City] = useState([]);

    const [monthlyTrend, setMonthlyTrend] = useState([]);

    const [topCities, setTopCities] = useState([]);

    useEffect(() => {

        const loadAnalytics = async () => {

            try {

                // Summary Cards

                const result = await getAnalytics({

                    city,
                    year,
                    season

                });

                setData(result);

                // Pie Chart

                const pie = await getAQIDistribution();

                setAQIDistribution(pie);

                // PM10 Bar Chart

                const bar = await getPM10City();

                setPM10City(bar);

                console.log("PM10 City:", bar);

                // Next Phases

                const line = await getMonthlyTrend();

                setMonthlyTrend(line);

                const table = await getTopCities();

                setTopCities(table);

            }

            catch (error) {

                console.log(error);

            }

        };

        loadAnalytics();

    }, [city, year, season]);

    if (!data) {

        return (

            <div className="flex flex-col justify-center items-center min-h-screen gap-4">

                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-cyan-500 animate-spin" />

                <p className="text-slate-400 font-medium">
                    Loading Analytics...
                </p>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50 p-6 md:p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                    Analytics Dashboard
                </h1>
                <p className="text-slate-400 mt-1">
                    Filter and explore pollution trends across cities and time.
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* City */}

                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                    >

                        <option value="">

                            All Cities

                        </option>

                        {data.cities.map((c) => (

                            <option
                                key={c}
                                value={c}
                            >

                                {c}

                            </option>

                        ))}

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

                        {data.years.map((y) => (

                            <option
                                key={y}
                                value={y}
                            >

                                {y}

                            </option>

                        ))}

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

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                <AnalyticsCard
                    title="Total Records"
                    value={data.total_records}
                    color="text-blue-600"
                />

                <AnalyticsCard
                    title="Cities"
                    value={data.total_cities}
                    color="text-emerald-600"
                />

                <AnalyticsCard
                    title="Years"
                    value={data.total_years}
                    color="text-violet-600"
                />

                <AnalyticsCard
                    title="Average PM10"
                    value={data.average_pm10}
                    unit="µg/m³"
                    color="text-amber-600"
                />

                <AnalyticsCard
                    title="Average PM2.5"
                    value={data.average_pm25}
                    unit="µg/m³"
                    color="text-rose-600"
                />

                <AnalyticsCard
                    title="Average Temperature"
                    value={data.average_temperature}
                    unit="°C"
                    color="text-pink-600"
                />

                <AnalyticsCard
                    title="Average Humidity"
                    value={data.average_humidity}
                    unit="%"
                    color="text-cyan-600"
                />

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-6 mt-8">

                <AQIDistributionChart
                    data={aqiDistribution}
                />

                <AnalyticsPM10BarChart
                    data={pm10City}
                />

            </div>

            {/* Monthly Trend */}

            <div className="mt-8">

                <MonthlyTrendChart
                    data={monthlyTrend}
                />

            </div>

            {/* Top Polluted Cities Table */}

            <div className="mt-8">

                <TopPollutedCitiesTable
                    data={topCities}
                />

            </div>




        </div>

    );

}