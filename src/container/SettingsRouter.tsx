import { ReactElement, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ProtectedRoutesUrl } from "./Routes";
import Settings from "../pages/In-app/Settings/Settings";

export function SettingsRouter(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === ProtectedRoutesUrl.SETTINGS ||
      location.pathname === "/settings/"
    ) {
      navigate(ProtectedRoutesUrl.PROFILE);
    }
  }, []);
  return (
    <div className="w-full">
      <Settings />
      <Outlet />
    </div>
  );
}
