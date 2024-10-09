import { useRoutes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

const AppRouter = () => {
  const routes = useRoutes([
    ...PublicRoutes,
    ...AuthRoutes,
    ...ProtectedRoutes,
  ]);
  return routes;
};

export default AppRouter;
