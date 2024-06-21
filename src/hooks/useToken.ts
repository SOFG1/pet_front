import { useGlobalState } from "@reactivers/use-global-state";

export const useToken = () => {
  const { globalState } = useGlobalState();
  return globalState?.user?.token
};

