import SettingsNavBar from "../../../components/layout/SettingsNavBar";
import SettingsGreeting from "../../../components/Settings/SettingsGreeting";

const Settings = () => {
  return (
    <div className="w-full">
      <SettingsGreeting />
      <div className="">
        <SettingsNavBar />
      </div>
    </div>
  );
};

export default Settings;
