import { stats } from "../../data/dashboardData";
import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          value={item.value}
          badge={item.badge}
          badgeColor={item.badgeColor}
          color={item.color}
          iconColor={item.iconColor}
          Icon={item.icon}
        />
      ))}

    </section>
  );
}