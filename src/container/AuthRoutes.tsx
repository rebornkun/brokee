import React, { Suspense, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthRoutesUrl, PublicRoutesUrl } from "./Routes";

const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));

const AuthRouter = () => {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     navigate(AuthRoutesUrl.LOGIN);
  //   }, []);
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const AuthRoutes = [
  {
    path: PublicRoutesUrl.HOME,
    element: <AuthRouter />,
    children: [
      {
        path: AuthRoutesUrl.LOGIN,
        name: "Login",
        element: <Login />,
      },
      {
        path: AuthRoutesUrl.REGISTER,
        name: "Register",
        element: <Register />,
      },
      {
        path: "*",
        name: "Invalid",
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
];
