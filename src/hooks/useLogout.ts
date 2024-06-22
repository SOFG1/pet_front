import { useGlobalState } from "@reactivers/use-global-state";

export const useLogout = () => {
  const { setGlobalState } = useGlobalState();

  const logout = () => {
    setGlobalState((p: any) => ({ ...p, user: null }));
    localStorage.removeItem("token");
  };

  return logout;
};
