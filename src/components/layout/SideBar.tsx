import { useEffect, useState } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import {
  AdArrowUpIconSvg,
  DepositSvg,
  WithdrawalSvg,
} from "../../assets/svg/svg";
import { RiDashboardFill } from "react-icons/ri";
import { useAppStore } from "../../store/store";
import { ProtectedRoutesUrl } from "../../container/Routes";
import MenuBtn from "./MenuBtn";
import "../../assets/NavigationBar.css";
import { FaChartLine } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

function SideBarItem({
  icon,
  name,
  route,
}: {
  icon: JSX.Element;
  name: string;
  route: string;
}) {
  const location = useLocation();

  const [isAnimate, setIsAnimate] = useState(false);
  const setMobileMenuIsOpen = useAppStore((state) => state.setMobileMenuIsOpen);

  useEffect(() => {
    if (location.pathname === route) {
      setIsAnimate(true);
    } else {
      setIsAnimate(false);
    }
  }, [location.pathname, route]);

  const checkIfNavItemIsActive = (route: string) => {
    const trueRoute = route.split("/");
    const truePath = location.pathname.split("/");
    // return location.pathname.startsWith(route);
    return trueRoute[2] === truePath[2];
  };

  return (
    <Link
      to={route}
      className={`flex px-4 py-[12px] gap-[12px] rounded-[10px] items-center hover:bg-navGreen transition ${
        checkIfNavItemIsActive(route) && "bg-navGreen activeSideNav"
      } ${isAnimate && `animate${name}Icon`} `}
      onClick={() => {
        setTimeout(() => {
          setMobileMenuIsOpen(false);
        }, 600);
      }}
    >
      {icon}
      <p
        className={`font-[300] text-[14px] 2xl:text-[16px] transition ${
          checkIfNavItemIsActive(route) && " text-darkGreen font-[500]"
        }`}
      >
        {name}
      </p>
    </Link>
  );
}

function AdBoard() {
  return (
    <div className="w-full h-[120px] relative">
      <div className="bg-navGreen absolute bottom-[10px] left-[10px] w-full h-full z-[1] rounded-[8px]" />
      <div className="bg-darkGreen absolute w-full h-full z-[2] rounded-[8px] overflow-hidden">
        <div className="designBox h-[75px] w-[96px] bg-gradient-to-r from-[#efefef6E] to-[#F8F2E800] rotate-[115deg] absolute bottom-[-40px]  " />
        <div className="designBox h-[75px] w-[96px] bg-gradient-to-r from-[#efefef6E] to-[#F8F2E800] rotate-[-123deg] absolute top-[-20px] right-[-10px]  " />

        <div className="w-full h-full absolute z-[2] flex justify-between items-center py-6 px-4 cursor-pointer">
          <div className="flex flex-col justify-between gap-4">
            <p className="text-[12px] 2xl:text-[14px] text-white">
              Unlock advanced features and reduce fees! Upgrade now
            </p>
            <div className="flex gap-6 items-center">
              <p className="text-[12px] 2xl:text-[14px] text-white">
                Learn more
              </p>
              <MdOutlineArrowForward className="text-[12px] 2xl:text-[14px] text-white" />
            </div>
          </div>
          <AdArrowUpIconSvg className="min-h-[50px] min-w-[50px] max-w-[50px] max-h-[50px]" />
        </div>
      </div>
    </div>
  );
}

function SideBar() {
  const mobileMenuIsOpen = useAppStore((state) => state.mobileMenuIsOpen);
  return (
    <aside
      className={`${
        mobileMenuIsOpen && "max-xl:translate-x-[0%]"
      } transition-all max-xl:fixed relative max-xl:translate-x-[-100%] w-[250px] lg:w-[290px] 2xl:w-[300px] h-full bg-lightGreen px-2 pr-4 py-4 flex flex-col justify-between gap-2 border-l border-[1px] border-lightGrey z-[1000]`}
    >
      <div
        className={`${
          mobileMenuIsOpen &&
          "rounded-full p-[15px] bg-white shadow top-[18px] right-[-70px]"
        } transition-all absolute m-auto top-[34px] right-[-40px] w-fit h-fit z-[1000] flex items-center justify-center`}
      >
        <MenuBtn />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full px-2 py-2 flex gap-[3px] items-center ">
          <img
            src="/tradex.png"
            alt="logo"
            className="eLogo w-fit max-md:h-[45px] h-[40px] m-0"
          />
        </div>
        <div className="w-[90%] mx-auto h-[1px] bg-lightGrey" />
        <nav className="flex flex-col gap-2">
          <SideBarItem
            icon={
              <RiDashboardFill className="sideIcon transition-all text-[20px]" />
            }
            name="Dashboard"
            route={ProtectedRoutesUrl.DASHBOARD}
          />
          <SideBarItem
            icon={
              <FaChartLine className="sideIcon transition-all text-[20px]" />
            }
            name="Chart"
            route={ProtectedRoutesUrl.CHART}
          />
          <SideBarItem
            icon={
              <FaMoneyBillTransfer className="sideIcon transition-all text-[20px]" />
            }
            name="Trades"
            route={ProtectedRoutesUrl.TRADES}
          />
          <SideBarItem
            icon={
              <DepositSvg className="sideIcon transition-all w-[20px] h-[20px]" />
            }
            name="Deposits"
            route={ProtectedRoutesUrl.DEPOSITS}
          />
          <SideBarItem
            icon={
              <WithdrawalSvg className="sideIcon transition-all w-[20px] h-[20px]" />
            }
            name="Withdrawals"
            route={ProtectedRoutesUrl.WITHDRAWALS}
          />
          <SideBarItem
            icon={
              <IoSettingsOutline className="sideIcon transition-all text-[20px]" />
            }
            name="Settings"
            route={ProtectedRoutesUrl.SETTINGS}
          />
        </nav>
      </div>
      <AdBoard />
    </aside>
  );
}

export default SideBar;
