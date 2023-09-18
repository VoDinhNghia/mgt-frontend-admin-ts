/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { routes, userRoles } from "../constants/constant";

const ProtectedRoutes = ({ children }: any) => {
  const user = getCurrentUser();
  if (user?.role === userRoles.SUPPER_ADMIN || user?.role === userRoles.ADMIN) {
    return children;
  }
  return Navigate({ to: routes.login, replace: true });
};

export default ProtectedRoutes;
