import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ProtectedRoutesUrl } from "./Routes";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import Trades from "../pages/In-app/Trades/Trades";
import Deposits from "../pages/In-app/Deposits/Deposits";
import Withdrawals from "../pages/In-app/Withdrawals/Withdrawals";
import { SettingsRouter } from "./SettingsRouter";
import Profile from "../pages/In-app/Settings/Profile";
import Messages from "../pages/In-app/Settings/Messages";
import Billing from "../pages/In-app/Settings/Billing";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../config/firebase";
import { useAppStore } from "../store/store";
import { QueryKeys } from "../enums/react-query";
import { getUserData, logOutUser } from "../services/auth/auth.service";
import { ToastStatus } from "../enums/react-hot-toast";

const DashBoard = React.lazy(
  () => import("../pages/In-app/DashBoard/DashBoard")
);
const Chart = React.lazy(() => import("../pages/In-app/Chart/Chart"));

const WebRouter = () => {
  const [isAuth, setIsAuth] = useState(auth.currentUser);
  const setUserData = useAppStore((state) => state.setUserData);
  const navigate = useNavigate();

  //get user data
  const {
    // isLoading,
    // error,
    // data
  } = useQuery({
    queryKey: [QueryKeys.GETUSERDATA],
    queryFn: async () => {
      const res = await getUserData();
      console.log(res.data.payload);
      if (res.data.payload) setUserData(res.data.payload);
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
    console.log(auth.currentUser);
    if (!isAuth) {
      console.log("no auth");
      //logout user
      // logOut();
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
          // {
          //   path: ProtectedRoutesUrl.ACCOUNT,
          //   name: "Account",
          //   element: <Account />,
          // },
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
