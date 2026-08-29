import { DollarSign, Briefcase, CheckCircle, Star } from "lucide-react";

const stats = [
  {
    key: "hourlyRate",
    title: "Hourly Rate",
    icon: DollarSign,
    suffix: "/hr",
    iconClass: "text-green-600",
  },
  {
    key: "completedProjects",
    title: "Completed Projects",
    icon: Briefcase,
    suffix: "",
    iconClass: "text-blue-600",
  },
  {
    key: "successRate",
    title: "Success Rate",
    icon: CheckCircle,
    suffix: "%",
    iconClass: "text-purple-600",
  },
  {
    key: "rating",
    title: "Rating",
    icon: Star,
    suffix: "",
    iconClass: "text-yellow-500",
  },
];

export default function ProfileStats({ profile }) {
  const values = {
    hourlyRate: profile.hourlyRate ?? 0,
    completedProjects: 0,
    successRate: 0,
    rating: 0,
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Icon size={19} className={stat.iconClass} />
              </div>
            </div>

            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {values[stat.key]}
              </span>

              {stat.suffix && (
                <span className="text-sm text-gray-500">{stat.suffix}</span>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        );
      })}
    </section>
  );
}
