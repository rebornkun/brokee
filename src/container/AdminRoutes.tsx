import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Drawer from "../components/layout/Drawer/Drawer";
import Modal from "../components/layout/Modal/Modal";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import { ToastStatus } from "../enums/react-hot-toast";
import { QueryKeys } from "../enums/react-query";
import AdminDeposits from "../pages/In-app/Deposits/AdminDeposits";
import Trades from "../pages/In-app/Trades/Trades";
import Users from "../pages/In-app/Users/Users";
import Withdrawals from "../pages/In-app/Withdrawals/Withdrawals";
import { logOutUser } from "../services/auth/auth.service";
import { validatePlan } from "../services/plans/plans.service";
import { getUserData, getUserWallet } from "../services/user/user.service";
import { useAppStore } from "../store/store";
import { AdminRoutesUrl } from "./Routes";
import AdminWithdrawals from "../pages/In-app/Withdrawals/AdminWithdrawals";
import AdminTrades from "../pages/In-app/Trades/AdminTrades";

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
        setUserData(res.data.payload);
        if (res.data.payload?.role === "USER") {
          logOutUser();
        }
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
    console.log(isAuth);
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

export const AdminRoutes = [
  {
    path: AdminRoutesUrl.ADMIN,
    element: <WebRouter />,
    children: [
      {
        path: AdminRoutesUrl.USERS,
        name: "Users",
        element: <Users />,
      },
      {
        path: AdminRoutesUrl.TRADES,
        name: "Trades",
        element: <AdminTrades />,
      },
      {
        path: AdminRoutesUrl.DEPOSITS,
        name: "Deposits",
        element: <AdminDeposits />,
      },
      {
        path: AdminRoutesUrl.WITHDRAWALS,
        name: "Withdrawals",
        element: <AdminWithdrawals />,
      },
      {
        path: "*",
        name: "Invalid",
        element: <Navigate to={AdminRoutesUrl.USERS} replace={true} />,
      },
    ],
  },
];
