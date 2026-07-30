import { useAQI } from "../context/AQIContext";

export default function StatisticsCards() {

    const { history } = useAQI();

    const totalPredictions = history.length;

    const avgPM25 =
        history.length > 0
            ? (
                  history.reduce((sum, item) => sum + Number(item.pm2_5), 0) /
                  history.length
              ).toFixed(2)
            : 0;

    const highestPM10 =
        history.length > 0
            ? Math.max(...history.map(item => Number(item.pm10)))
            : 0;

    const count = {};

    history.forEach(item => {
        count[item.prediction] = (count[item.prediction] || 0) + 1;
    });

    const mostFrequentAQI =
        Object.keys(count).length > 0
            ? Object.keys(count).reduce((a, b) =>
                  count[a] > count[b] ? a : b
              )
            : "No Data";

    const cards = [
        {
            title: "Total Predictions",
            value: totalPredictions,
            icon: "📊",
            gradient: "from-blue-400 to-cyan-500",
            tint: "bg-blue-50/60"
        },
        {
            title: "Average PM2.5",
            value: avgPM25,
            icon: "🌫️",
            gradient: "from-cyan-400 to-teal-500",
            tint: "bg-teal-50/60"
        },
        {
            title: "Highest PM10",
            value: highestPM10,
            icon: "🔴",
            gradient: "from-rose-400 to-red-500",
            tint: "bg-rose-50/60"
        },
        {
            title: "Most Frequent AQI",
            value: mostFrequentAQI,
            icon: "🏆",
            gradient: "from-violet-400 to-purple-500",
            tint: "bg-violet-50/60"
        }
    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className={`${card.tint} border border-slate-100 rounded-3xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                >

                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-lg shadow-sm mb-4`}>
                        {card.icon}
                    </div>

                    <h3 className="text-sm font-medium text-slate-500">
                        {card.title}
                    </h3>

                    <h1 className="text-3xl font-bold mt-1 text-slate-800">
                        {card.value}
                    </h1>

                </div>

            ))}

        </div>

    );
}