import {
  LineChart,
  Line,
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
      <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm text-slate-500">
          {entry.name}:{" "}
          <span className="font-semibold" style={{ color: entry.stroke }}>
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

export default function PollutionLineChart() {
  const { history } = useAQI();

  // Convert history into chart data
  const data = history.map((item, index) => ({
    prediction: `P${index + 1}`,
    pm25: item.pm2_5,
    pm10: item.pm10,
  }));

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
          📈
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">PM2.5 Trend</h2>
          <p className="text-sm text-slate-400">PM2.5 vs PM10 across predictions</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2">🌤</span>
          <p className="text-slate-400 text-sm">No prediction history available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#cbd5e1", strokeDasharray: "4 4" }} />

            <Legend wrapperStyle={{ fontSize: "13px", color: "#64748b" }} />

            <Line
              type="monotone"
              dataKey="pm25"
              stroke="#22d3ee"
              strokeWidth={3}
              name="PM2.5"
              dot={{ r: 3, fill: "#22d3ee", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="pm10"
              stroke="#0d9488"
              strokeWidth={3}
              name="PM10"
              dot={{ r: 3, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}