import { useState } from "react";
import SettingsHeader from "@/pages/client/Settings/components/SettingsHeader";
import SettingsSidebar from "@/pages/client/Settings/components/SettingsSidebar";
import ProfileSettings from "@/pages/client/Settings/components/ProfileSettings";
import AccountSettings from "@/pages/client/Settings/components/AccountSettings";
import SecuritySettings from "@/pages/client/Settings/components/SecuritySettings";
import NotificationSettings from "@/pages/client/Settings/components/NotificationSettings";
import BillingSettings from "@/pages/client/Settings/components/BillingSettings";

export default function Setting() {
  // const [activeTab, setActiveTab] = useState("profile");
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
    <div className="w-full">
      <SettingsHeader />

      <div className="flex flex-col lg:flex-row gap-8 mt-8 ">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>
    </div>
  );
}
