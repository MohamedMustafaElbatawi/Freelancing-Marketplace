import { UserRound, Badge, ShieldCheck, Bell, CreditCard } from "lucide-react";

const settingsItems = [
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    id: "account",
    label: "Account",
    icon: Badge,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
];

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <nav className="w-full lg:w-64 shrink-0">
      <div className="space-y-1">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />

              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
