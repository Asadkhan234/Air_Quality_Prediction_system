import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useAQI } from "../context/AQIContext";

const COLORS = ["#22d3ee", "#0d9488", "#f59e0b", "#3b82f6"];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100 px-4 py-3">
      <p className="text-sm font-semibold text-slate-700">{entry.name}</p>
      <p className="text-sm text-slate-500 mt-0.5">
        Value:{" "}
        <span className="font-semibold" style={{ color: entry.payload.fill }}>
          {entry.value}
        </span>
      </p>
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-slate-500">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AQIPieChart() {
  const { history } = useAQI();
  const latest = history[history.length - 1];

  const CardShell = ({ children }) => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
          🥧
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Latest Prediction Distribution
          </h2>
          <p className="text-sm text-slate-400">Pollution composition breakdown</p>
        </div>
      </div>
      {children}
    </div>
  );

  if (!latest) {
    return (
      <CardShell>
        <div className="h-[320px] flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2">🌤</span>
          <p className="text-slate-400 text-sm">No prediction available yet</p>
        </div>
      </CardShell>
    );
  }

  const data = [
    { name: "PM10", value: Number(latest.pm10) || 0 },
    { name: "PM2.5", value: Number(latest.pm2_5) || 0 },
    { name: "Temperature", value: Number(latest.temperature) || 0 },
    { name: "Humidity", value: Number(latest.humidity) || 0 },
  ];

  return (
    <CardShell>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            paddingAngle={2}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </CardShell>
  );
}