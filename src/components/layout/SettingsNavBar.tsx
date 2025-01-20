import { ProtectedRoutesUrl } from "../../container/Routes";
import SettingsNavBarItem from "./SettingsNavBarItem";

const SettingsNavBar = () => {
  return (
    <nav className="w-full h-fit flex flex-col justify-between ">
      <div className="flex gap-[46px] max-md:gap-[20px] overflow-auto">
        <SettingsNavBarItem name="Profile" route={ProtectedRoutesUrl.PROFILE} />
        {/* <SettingsNavBarItem
          name="Messages"
          route={ProtectedRoutesUrl.MESSAGES}
        /> */}
        {/* <SettingsNavBarItem
          name="Notifications"
          route={ProtectedRoutesUrl.NOTIFICATIONS}
        /> */}
        <SettingsNavBarItem name="Billing" route={ProtectedRoutesUrl.BILLING} />
        <SettingsNavBarItem
          name="Accounts/beneficiary"
          route={ProtectedRoutesUrl.ACCOUNTS}
        />
      </div>
      <div className="w-full h-[1px] bg-[#EAECF0]"></div>
    </nav>
  );
};

export default SettingsNavBar;
