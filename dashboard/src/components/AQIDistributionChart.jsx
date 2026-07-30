import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getAQIDistribution } from "../api/analyticsCharts";

const COLORS = [
  "#22c55e", // Good
  "#facc15", // Moderate
  "#fb923c", // Unhealthy for Sensitive Groups
  "#ef4444", // Unhealthy
  "#8b5cf6", // Very Unhealthy
  "#1f2937", // Hazardous
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-100 px-4 py-3">
      <p className="text-sm font-semibold text-slate-700">{entry.name}</p>
      <p className="text-sm text-slate-500 mt-0.5">
        Count: <span className="font-semibold" style={{ color: entry.payload.fill }}>{entry.value}</span>
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

export default function AQIDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getAQIDistribution();
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
          🥧
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">AQI Distribution</h2>
          <p className="text-sm text-slate-400">Share of readings by category</p>
        </div>
      </div>

      {loading ? (
        <div className="h-[350px] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-slate-100 border-t-cyan-500 animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="h-[350px] flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-2">🌤</span>
          <p className="text-slate-400 text-sm">No AQI data yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              outerRadius={120}
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
      )}
    </div>
  );
}