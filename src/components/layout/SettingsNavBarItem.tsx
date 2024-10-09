import { Link, useLocation } from "react-router-dom";

const SettingsNavBarItem = ({
  name,
  route,
}: {
  name: string;
  route: string;
}) => {
  const location = useLocation();
  return (
    <Link
      to={route}
      className={`flex flex-col gap-[17px] items-center transition `}
    >
      <p
        className={`px-[5px] font-[500] text-[14px] text-[#667085] transition ${
          location.pathname === route && " text-darkGreen"
        } `}
      >
        {name}
      </p>
      <div
        className={`w-full h-[1px] bg-darkGreen transition invisible ${
          location.pathname === route && " !visible"
        }`}
      ></div>
    </Link>
  );
};

export default SettingsNavBarItem;
