import { Route, Routes } from "react-router-dom";
import { TodosPage } from "./pages/TodosPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { RedirectPage } from "./pages/RedirectPage";
import { handle } from "./api";
import { User } from "./api/user";
import { useEffect, useState } from "react";
import { useGlobalState } from "@reactivers/use-global-state";

function App() {
  const { setGlobalState } = useGlobalState();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const checkAuth = async (token: string) => {
    setIsFetching(true)
    const [res, err] = await handle(User.auth(token));
    setIsFetching(false)
    if (res) {
      setGlobalState((p: any) => ({...p, user: res}))
    }
    if (err) {
      setGlobalState((p: any) => ({...p, user: null}))
      localStorage.removeItem("token")
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth(token);
    }
  }, []);

  if(isFetching) return <p>Loading...</p>
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectPage>
              <TodosPage />
            </RedirectPage>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <RedirectPage>
              <SignInPage />
            </RedirectPage>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="sign-up"
          element={
            <RedirectPage>
              <SignUpPage />
            </RedirectPage>
          }
        />
      </Routes>
    </>
  );
}

export default App;
