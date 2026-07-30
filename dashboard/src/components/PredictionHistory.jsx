import { useState } from "react";
import { useAQI } from "../context/AQIContext";
import { AQI_INFO } from "../utils/aqiInfo";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function PredictionHistory() {

    const { history, clearHistory } = useAQI();

    const [search, setSearch] = useState("");
    const [filterAQI, setFilterAQI] = useState("");

    // Filter data
    const filteredHistory = history.filter((item) => {

        const cityMatch = item.city
            .toLowerCase()
            .includes(search.toLowerCase());

        const aqiMatch =
            filterAQI === "" ||
            item.prediction === filterAQI;

        return cityMatch && aqiMatch;

    });

    // Export Excel
    const exportExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(filteredHistory);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Predictions"
        );

        const excelBuffer = XLSX.write(
            workbook,
            {
                bookType: "xlsx",
                type: "array"
            }
        );

        const data = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

        saveAs(data, "AQI_History.xlsx");

    };

    return (

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mt-10">

            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
                        📋
                    </span>
                    <h2 className="text-xl font-bold text-slate-800">
                        Prediction History
                    </h2>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={exportExcel}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200"
                    >
                        📥 Export Excel
                    </button>

                    {history.length > 0 && (

                        <button
                            onClick={clearHistory}
                            className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                        >
                            🗑 Clear History
                        </button>

                    )}

                </div>

            </div>

            {/* Search + Filter */}

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="🔍 Search by City..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                />

                <select
                    value={filterAQI}
                    onChange={(e) => setFilterAQI(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white"
                >

                    <option value="">All AQI Categories</option>

                    <option>Good</option>

                    <option>Moderate</option>

                    <option>Unhealthy for Sensitive Groups</option>

                    <option>Unhealthy</option>

                    <option>Very Unhealthy</option>

                    <option>Hazardous</option>

                </select>

            </div>

            {/* Empty State */}

            {filteredHistory.length === 0 ? (

                <div className="text-center py-16">

                    <span className="text-4xl mb-3 block">🌤</span>

                    <h3 className="text-xl font-semibold text-slate-500">
                        No Prediction Found
                    </h3>

                    <p className="text-slate-400 mt-1 text-sm">
                        Try another city or AQI filter.
                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto rounded-2xl border border-slate-100">

                    <table className="min-w-full">

                        <thead className="bg-slate-50">

                            <tr>

                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">#</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">City</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">AQI</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">PM10</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">PM2.5</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Temperature</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Humidity</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Pressure</th>
                                <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Wind Speed</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredHistory.map((item, index) => (

                                <tr
                                    key={index}
                                    className="text-center border-t border-slate-100 hover:bg-slate-50/80 transition-colors"
                                >

                                    <td className="p-3 text-sm text-slate-400">
                                        {index + 1}
                                    </td>

                                    <td className="p-3 text-sm text-slate-500">
                                        {item.date}
                                    </td>

                                    <td className="p-3 font-semibold text-slate-800 text-sm">
                                        {item.city}
                                    </td>

                                    <td className="p-3">

                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${AQI_INFO[item.prediction]?.color} ${AQI_INFO[item.prediction]?.text}`}
                                        >

                                            {AQI_INFO[item.prediction]?.icon}{" "}
                                            {item.prediction}

                                        </span>

                                    </td>

                                    <td className="p-3 text-sm text-slate-600">
                                        {item.pm10}
                                    </td>

                                    <td className="p-3 text-sm text-slate-600">
                                        {item.pm2_5}
                                    </td>

                                    <td className="p-3 text-sm text-slate-600">
                                        {item.temperature} °C
                                    </td>

                                    <td className="p-3 text-sm text-slate-600">
                                        {item.humidity} %
                                    </td>

                                    <td className="p-3 text-sm text-slate-600">
                                        {item.pressure}
                                    </td>

                                    <td className="p-3 text-sm text-slate-600">
                                        {item.wind_speed}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

}