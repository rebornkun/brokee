import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../../../store/store";
// import WithdrawDraw from "./WithdrawDraw";
import TransactionsDraw from "./TransactionsDraw";
import { AdminRoutesUrl, ProtectedRoutesUrl } from "../../../container/Routes";
import MakeDepositDraw from "./MakeDepositDraw";
import MakeWithdrawal from "./MakeWithdrawal";
import CopyTraderDraw from "./CopyTraderDraw";
import AddTraderDraw from "./AddTraderDraw";
import AddCurrencyDraw from "./AddCurrencyDraw";
import AddTradeDraw from "./AddTradeDraw";

const Drawer = () => {
  const isDrawerOpen = useAppStore((state) => state.isDrawerOpen);
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const drawerType = useAppStore((state) => state.drawerType);
  const setDrawerType = useAppStore((state) => state.setDrawerType);
  const drawerId = useAppStore((state) => state.drawerId);
  const drawContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { pathname } = location;

  const getDrawerComponent = () => {
    if (
      pathname === ProtectedRoutesUrl.DASHBOARD &&
      drawerType === "dashboard"
    ) {
      // return <DashBoardDraw />;
    } else if (
      pathname === ProtectedRoutesUrl.DEPOSITS &&
      drawerType === "makeDeposit"
    ) {
      return <MakeDepositDraw />;
    } else if (
      pathname === ProtectedRoutesUrl.DEPOSITS &&
      drawerType === "viewDeposit"
    ) {
      return <TransactionsDraw />;
    } else if (
      pathname === ProtectedRoutesUrl.WITHDRAWALS &&
      drawerType === "withdraw"
    ) {
      return <MakeWithdrawal />;
    } else if (
      pathname === ProtectedRoutesUrl.TRADES &&
      drawerType === "copyTrade"
    ) {
      return <CopyTraderDraw />;
    } else if (
      pathname === AdminRoutesUrl.TRADES &&
      drawerType === "addTrader"
    ) {
      return <AddTraderDraw />;
    } else if (
      pathname === AdminRoutesUrl.TRADES &&
      drawerType === "addCurrency"
    ) {
      return <AddCurrencyDraw />;
    } else if (
      pathname === AdminRoutesUrl.TRADES &&
      drawerType === "createTrade"
    ) {
      return <AddTradeDraw />;
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      //scroll to top
      if (drawContentRef?.current) drawContentRef.current.scrollTop = 0;
    } else {
      //refresh the drawer when it closes
      setTimeout(() => {
        setDrawerType("none");
      }, 300);
    }
  }, [isDrawerOpen]);

  return (
    <div
      className={`drawer ${
        isDrawerOpen ? "open" : ""
      } w-full h-full fixed top-0 left-0 bottom-0 right-0 m-auto z-[1001]`}
    >
      <div
        className={`w-full h-full drawer-back ${
          isDrawerOpen ? "open" : ""
        } transition-all delay-100 `}
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      ></div>
      <div
        className={`drawer-container ${
          isDrawerOpen ? "open" : "close"
        } w-[550px] max-lg:w-[60%] max-md:w-[87.5%] absolute right-0 top-0 h-full`}
      >
        <div
          className={`bg-white rounded-full p-2 absolute max-md:left-[-2.75rem] left-[-3rem] top-[0.5rem] cursor-pointer `}
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        >
          <RxCross2 className="text-[20px] text-darkYellow " />
        </div>
        <div
          ref={drawContentRef}
          className={` h-full w-full bg-white rounded-tl-[8px] rounded-bl-[8px] overflow-y-auto overflow-x-hidden `}
        >
          {getDrawerComponent()}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
