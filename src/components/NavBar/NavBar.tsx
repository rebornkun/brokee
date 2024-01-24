import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/tradex.png";
import { LocationSvg, TimeSvg } from "../../assets/svg/svg";
import Btn from "../Elements/Btn";
import NavDrpDown from "./NavDrpDown";

const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="flex gap-8 items-center">
      <div className="logo !h-fit !p-0">
        <img src={logo} alt="logo" className="w-[180px]" />
      </div>

      <div className="flex flex-col flex-auto gap-5">
        <div className="flex justify-center gap-10">
          <p className="text-[0.9rem] flex gap-2 items-center">
            <TimeSvg className="" />
            <span className="text-grey font-[500]">Everyday 9 AM – 5 PM</span>
          </p>
          <p className="text-[0.9rem] flex gap-2 items-center">
            <LocationSvg className="" />
            <span className="text-grey font-[500]">
              66 Great Suffolk Street, LDN, UK.
            </span>
          </p>
        </div>
        <div className="h-[1px] bg-otherGrey w-full"></div>
        <div className="navLinks flex w-full justify-evenly">
          <Link
            to="/home"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/home"
                ? "text-green hover:text-green"
                : "text-darkGrey hover:text-grey"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/about"
                ? "text-green hover:text-green"
                : "text-darkGrey hover:text-grey"
            }`}
          >
            About
          </Link>
          <NavDrpDown />
          <Link
            to="/contact"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/contact"
                ? "text-green hover:text-green"
                : "text-darkGrey hover:text-grey"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/faq"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/faq"
                ? "text-green hover:text-green"
                : "text-darkGrey hover:text-grey"
            }`}
          >
            FAQ
          </Link>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <Btn text="Login" type="default" className="login"></Btn>
        <Btn text="Sign Up" type="primary" className="signup"></Btn>
      </div>
    </nav>
  );
};

export default NavBar;
