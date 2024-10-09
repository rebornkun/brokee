import { useState } from "react";
import { GoX } from "react-icons/go";
import { RiMenu4Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import logoTra from "../../assets/img/logoTra.png";
import logo from "../../assets/img/tradex.png";
import { LocationSvg, TimeSvg } from "../../assets/svg/svg";
import Btn from "../Elements/Btn";
import NavDrpDown from "./NavDrpDown";

const NavBar = () => {
  const location = useLocation();
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <nav className="flex gap-8 items-center justify-between container max-md:px-[15px] mx-auto py-[2rem]">
      <div className="logo !h-fit !p-0">
        <img src={logo} alt="logo" className="w-[180px]" />
      </div>

      <div className="flex flex-col flex-auto gap-5 max-lg:hidden">
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

      <div className="flex flex-row gap-4  max-lg:hidden">
        <Link to="/login">
          <Btn text="Login" type="default" className="login w-[120px]"></Btn>
        </Link>
        <Link to="/register">
          <Btn text="Sign Up" type="primary" className="signup w-[120px]"></Btn>
        </Link>
      </div>

      <div
        className="lg:hidden border-[1px] border-lightGrey rounded-[5px] h-[50px] w-[50px] flex items-center justify-center cursor-pointer "
        onClick={() => {
          setNavIsOpen(true);
        }}
      >
        <RiMenu4Line className="text-[25px] text-green" />
      </div>

      <div
        className="fixed max-w-[360px] w-full h-full z-[10] bg-[#2E2E2E] p-[20px] left-0 top-0 transition-all duration-[300ms] ease-in-out "
        style={{ transform: navIsOpen ? "" : "translateX(-100%)" }}
      >
        <div className="flex justify-between items-center pt-[1rem] pb-[2rem] ">
          <img src={logoTra} alt="logo" className=" m-0 w-[160px]" />
          <div
            className="bg-green w-[40px] h-[40px] rounded-[5px] flex items-center justify-center cursor-pointer "
            onClick={() => {
              setNavIsOpen(false);
            }}
          >
            <GoX className="text-white text-[25px] " />
          </div>
        </div>
        <div className="navLinks flex flex-col items-center py-[2rem] gap-[1.5rem] w-full justify-evenly">
          <Link
            to="/home"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/home"
                ? "text-green hover:text-green"
                : "text-white hover:text-grey"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/about"
                ? "text-green hover:text-green"
                : "text-white hover:text-grey"
            }`}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/services"
                ? "text-green hover:text-green"
                : "text-white hover:text-grey"
            }`}
          >
            Services
          </Link>
          <Link
            to="/pricing"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/pricing"
                ? "text-green hover:text-green"
                : "text-white hover:text-grey"
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/contact"
                ? "text-green hover:text-green"
                : "text-white hover:text-grey"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/faq"
            className={`font-[500] text-[0.9rem]  ${
              location.pathname == "/faq"
                ? "text-green hover:text-green"
                : "text-white hover:text-grey"
            }`}
          >
            FAQ
          </Link>
        </div>
        <div className="flex flex-col py-6 gap-4 w-[100%] items-center  ">
          <Link to="/login">
            <Btn text="Login" type="default" className="login w-[120px]"></Btn>
          </Link>
          <Link to="/register">
            <Btn
              text="Sign Up"
              type="primary"
              className="signup w-[120px]"
            ></Btn>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
