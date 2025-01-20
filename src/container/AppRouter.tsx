import { useRoutes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AdminRoutes } from "./AdminRoutes";

const AppRouter = () => {
  const routes = useRoutes([
    ...PublicRoutes,
    ...AuthRoutes,
    ...ProtectedRoutes,
    ...AdminRoutes,
  ]);
  return routes;
};

export default AppRouter;
