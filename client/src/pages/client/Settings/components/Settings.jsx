import { useState } from "react";

import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import BillingSettings from "@/components/settings/BillingSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;

      case "account":
        return <AccountSettings />;

      case "security":
        return <SecuritySettings />;

      case "notifications":
        return <NotificationSettings />;

      case "billing":
        return <BillingSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-8">
      <SettingsHeader />

      <div className="flex flex-col lg:flex-row gap-8">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}
