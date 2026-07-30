export default function PollutionInsights({ insights }) {

    if (!insights) {

        return (

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

                <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
                        🤖
                    </span>
                    <h2 className="text-xl font-bold text-slate-800">
                        AI Pollution Insights
                    </h2>
                </div>

                <div className="flex items-center gap-3 py-6">
                    <span className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-cyan-500 animate-spin" />
                    <p className="text-slate-400">
                        Loading AI insights...
                    </p>
                </div>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
                    🤖
                </span>
                <h2 className="text-xl font-bold text-slate-800">
                    AI Pollution Insights
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">

                {/* Selected City */}

                <div className="bg-blue-50/60 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                    <div className="flex items-center gap-2 text-blue-600">
                        <span className="text-lg">📍</span>
                        <h3 className="text-sm font-semibold uppercase tracking-wide">
                            Selected City
                        </h3>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-slate-800">
                        {insights.selected_city}
                    </p>

                </div>

                {/* Average PM10 */}

                <div className="bg-emerald-50/60 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                    <div className="flex items-center gap-2 text-emerald-600">
                        <span className="text-lg">📊</span>
                        <h3 className="text-sm font-semibold uppercase tracking-wide">
                            Average PM10
                        </h3>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-slate-800">
                        {insights.average_pm10} µg/m³
                    </p>

                </div>

                {/* Health Risk */}

                <div className="bg-rose-50/60 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                    <div className="flex items-center gap-2 text-rose-600">
                        <span className="text-lg">❤️</span>
                        <h3 className="text-sm font-semibold uppercase tracking-wide">
                            Health Risk
                        </h3>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-slate-800">
                        {insights.health_risk}
                    </p>

                </div>

                {/* Recommendation */}

                <div className="md:col-span-3 bg-amber-50/60 rounded-2xl p-6">

                    <div className="flex items-center gap-2 text-amber-600 mb-3">
                        <span className="text-lg">💡</span>
                        <h3 className="text-sm font-semibold uppercase tracking-wide">
                            AI Recommendation
                        </h3>
                    </div>

                    <p className="text-slate-600 leading-7">
                        {insights.recommendation}
                    </p>

                </div>

            </div>

        </div>

    );

}