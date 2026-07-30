export default function AnalyticsCard({
  title,
  value,
  unit = "",
  color = "text-cyan-600",
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <p className="text-slate-400 text-sm font-medium">{title}</p>

      <h2 className={`text-4xl font-bold mt-3 ${color} flex items-baseline gap-2`}>
        {value}
        {unit && <span className="text-lg font-medium text-slate-400">{unit}</span>}
      </h2>
    </div>
  );
}