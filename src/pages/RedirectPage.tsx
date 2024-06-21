import { useGlobalState } from "@reactivers/use-global-state";
import { Navigate, useLocation } from "react-router-dom";

export const RedirectPage = ({ children }: any) => {
  const { globalState } = useGlobalState();
  const location = useLocation();

  if (location.pathname === "/sign-in" && globalState.token) {
    return <Navigate to="/" />;
  }
  if (location.pathname === "/sign-up" && globalState.token) {
    return <Navigate to="/" />;
  }
  if (!globalState.token && location.pathname !== "/sign-in" && location.pathname !== "/sign-up") {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};
