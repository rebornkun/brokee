import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import { ToastStatus } from "../enums/react-hot-toast";
import { QueryKeys } from "../enums/react-query";
import Deposits from "../pages/In-app/Deposits/Deposits";
import Billing from "../pages/In-app/Settings/Billing";
import Messages from "../pages/In-app/Settings/Messages";
import Profile from "../pages/In-app/Settings/Profile";
import Trades from "../pages/In-app/Trades/Trades";
import Withdrawals from "../pages/In-app/Withdrawals/Withdrawals";
import { logOutUser } from "../services/auth/auth.service";
import { getUserData, getUserWallet } from "../services/user/user.service";
import { useAppStore } from "../store/store";
import { ProtectedRoutesUrl } from "./Routes";
import { SettingsRouter } from "./SettingsRouter";
import Drawer from "../components/layout/Drawer/Drawer";
import Modal from "../components/layout/Modal/Modal";
import Account from "../pages/In-app/Settings/Account";
import { validatePlan } from "../services/plans/plans.service";
import Kyc from "../pages/In-app/Settings/Kyc";

const DashBoard = React.lazy(
  () => import("../pages/In-app/DashBoard/DashBoard")
);
const Chart = React.lazy(() => import("../pages/In-app/Chart/Chart"));

const WebRouter = () => {
  const localData = localStorage.getItem("user");
  const [isAuth, setIsAuth] = useState(localData);
  const setUserData = useAppStore((state) => state.setUserData);
  const setUserWallet = useAppStore((state) => state.setUserWallet);
  const setUserDataIsLoading = useAppStore(
    (state) => state.setUserDataIsLoading
  );
  const navigate = useNavigate();

  //get user data
  const {
    // isLoading,
    // error,
    // data
  } = useQuery({
    queryKey: [QueryKeys.GETUSERDATA],
    queryFn: async () => {
      setUserDataIsLoading(true);
      const res = await getUserData();
      if (res.data.payload) {
        //check if user is suspended
        if (
          res.data.payload?.state === "inactive" ||
          res.data.payload?.role === "ADMIN"
        ) {
          logOutUser();
        }
        setUserData(res.data.payload);
      }
      setUserDataIsLoading(false);
      return res.data;
    },
  });

  //get user wallet data
  const {
    // isLoading,
    // error,
    // data
  } = useQuery({
    queryKey: [QueryKeys.GETUSERWALLETDATA],
    queryFn: async () => {
      setUserDataIsLoading(true);
      const res = await getUserWallet();
      if (res.data.payload) {
        setUserWallet(res.data.payload);
      }
      setUserDataIsLoading(false);
      return res.data;
    },
  });

  //validate user plan
  const {
    // isLoading,
    // error,
    // data
  } = useQuery({
    queryKey: [QueryKeys.VALIDATEUSERPLAN],
    queryFn: async () => {
      setUserDataIsLoading(true);
      const res = await validatePlan();
      setUserDataIsLoading(false);
      return res.data;
    },
  });

  useEffect(() => {
    const logOut = async () => {
      const logOutAuth = await logOutUser();
      if (logOutAuth.data.alert?.type === ToastStatus.SUCCESS) {
        navigate("/", { replace: true });
      }
    };
    if (!isAuth) {
      //logout user
      logOut();
      navigate("/", { replace: true });
    }
  }, [isAuth]);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex h-full w-full">
          <SideBar />
          <div className="flex-1 p-2 px-4 flex flex-col w-full bg-white Noto">
            <TopBar />
            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
          <Drawer />
          <Modal />
        </div>
      </Suspense>
    </>
  );
};

export const ProtectedRoutes = [
  {
    path: ProtectedRoutesUrl.ACCOUNT,
    element: <WebRouter />,
    children: [
      {
        path: ProtectedRoutesUrl.DASHBOARD,
        name: "Dashboard",
        element: <DashBoard />,
      },
      {
        path: ProtectedRoutesUrl.CHART,
        name: "Chart",
        element: <Chart />,
      },
      {
        path: ProtectedRoutesUrl.TRADES,
        name: "Trades",
        element: <Trades />,
      },
      {
        path: ProtectedRoutesUrl.DEPOSITS,
        name: "Deposits",
        element: <Deposits />,
      },
      {
        path: ProtectedRoutesUrl.WITHDRAWALS,
        name: "Withdrawals",
        element: <Withdrawals />,
      },
      {
        path: ProtectedRoutesUrl.SETTINGS,
        name: "Settings",
        element: <SettingsRouter />,
        children: [
          {
            path: ProtectedRoutesUrl.PROFILE,
            name: "Profile",
            element: <Profile />,
          },
          {
            path: ProtectedRoutesUrl.MESSAGES,
            name: "Messages",
            element: <Messages />,
          },
          // {
          //   path: ProtectedRoutesUrl.NOTIFICATIONS,
          //   name: "Notifications",
          //   element: <Notifications />,
          // },
          {
            path: ProtectedRoutesUrl.BILLING,
            name: "Billing",
            element: <Billing />,
          },
          {
            path: ProtectedRoutesUrl.KYC,
            name: "KYC",
            element: <Kyc />,
          },
          {
            path: ProtectedRoutesUrl.ACCOUNTS,
            name: "Account",
            element: <Account />,
          },
        ],
      },
      {
        path: "*",
        name: "Invalid",
        element: <Navigate to={ProtectedRoutesUrl.DASHBOARD} replace={true} />,
      },
    ],
  },
];
