export default function SummaryCard({
    title,
    value,
    icon,
    color
}) {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-400 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-slate-800">
                        {value}
                    </h2>

                </div>

                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl ${color}`}>
                    {icon}
                </div>

            </div>

        </div>
    )
}