export default function TopPollutedCitiesTable({ data }) {

    return (

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
                    📋
                </span>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">
                        Top Polluted Cities
                    </h2>
                    <p className="text-sm text-slate-400">Ranked by average PM10</p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Rank</th>

                            <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">City</th>

                            <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Average PM10</th>

                            <th className="p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Average PM2.5</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((city, index) => (

                            <tr
                                key={city.city}
                                className="border-t border-slate-100 text-center hover:bg-slate-50/80 transition-colors"
                            >

                                <td className="p-3">
                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                        index === 0
                                            ? "bg-rose-100 text-rose-600"
                                            : index === 1
                                            ? "bg-amber-100 text-amber-600"
                                            : index === 2
                                            ? "bg-cyan-100 text-cyan-600"
                                            : "bg-slate-100 text-slate-500"
                                    }`}>
                                        {index + 1}
                                    </span>
                                </td>

                                <td className="p-3 font-semibold text-slate-800 text-sm">
                                    {city.city}
                                </td>

                                <td className="p-3 text-sm text-slate-600">
                                    {city.average_pm10}
                                </td>

                                <td className="p-3 text-sm text-slate-600">
                                    {city.average_pm25}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}