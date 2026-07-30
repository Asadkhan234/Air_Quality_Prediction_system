import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useAQI } from "../context/AQIContext";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100 px-4 py-3">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p className="text-sm text-slate-500 mt-0.5">
        {payload[0].payload.city} — PM10:{" "}
        <span className="font-semibold text-cyan-600">{payload[0].value}</span>
      </p>
    </div>
  );
}

export default function PollutionBarChart() {
  const { history } = useAQI();

  // Convert history into chart data
  const data = history.map((item, index) => ({
    prediction: `P${index + 1}`,
    city: item.city,
    pm10: item.pm10,
  }));

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
          📊
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">PM10 Comparison</h2>
          <p className="text-sm text-slate-400">Across your prediction history</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2">🌤</span>
          <p className="text-slate-400 text-sm">No prediction history available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pm10BarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

            <XAxis
              dataKey="prediction"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />

            <Legend wrapperStyle={{ fontSize: "13px", color: "#64748b" }} />

            <Bar
              dataKey="pm10"
              fill="url(#pm10BarGradient)"
              name="PM10"
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}