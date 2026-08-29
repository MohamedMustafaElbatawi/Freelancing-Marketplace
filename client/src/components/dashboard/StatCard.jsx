export default function StatCard({
  title,
  value,
  badge,
  badgeColor,
  color,
  iconColor,
  Icon,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex justify-between mb-5">

        <div
          className={`w-12 h-12 rounded-xl ${color} flex justify-center items-center`}
        >
          <Icon className={iconColor} size={22} />
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>

      </div>

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}