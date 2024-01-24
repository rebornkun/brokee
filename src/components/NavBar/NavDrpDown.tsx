import { Dropdown } from "antd";
import { ArrowDownSvg } from "../../assets/svg/svg";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavDrpDown = () => {
  const location = useLocation();
  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/services"
          className={`font-[500] text-[0.9rem]  ${
            location.pathname == "/services"
              ? "text-green hover:text-green"
              : "text-darkGrey hover:text-grey"
          }`}
        >
          Services
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/pricing"
          className={`font-[500] text-[0.9rem]  ${
            location.pathname == "/pricing"
              ? "text-green hover:text-green"
              : "text-darkGrey hover:text-grey"
          }`}
        >
          Pricing
        </Link>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      rootClassName="NavDrpDown"
    >
      <a
        onClick={(e) => e.preventDefault()}
        className={`flex items-center gap-2 font-[500] text-[0.9rem] cursor-pointer ${
          location.pathname == "/pricing" || location.pathname == "/services"
            ? "text-green hover:text-green"
            : "text-darkGrey hover:text-grey"
        }`}
      >
        Pages
        <ArrowDownSvg className="" />
      </a>
    </Dropdown>
  );
};

export default NavDrpDown;
