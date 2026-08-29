import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <Settings size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Account Settings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information, security preferences, and
            notification settings.
          </p>
        </div>
      </div>
    </div>
  );
}