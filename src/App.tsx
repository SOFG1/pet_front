import { Route, Routes } from "react-router-dom";
import { TodosPage } from "./pages/TodosPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { RedirectPage } from "./pages/RedirectPage";
import { handle } from "./api";
import { User } from "./api/user";
import { useEffect, useState } from "react";
import { useGlobalState } from "@reactivers/use-global-state";
import { Header } from "./components/Header";
import { AccountPage } from "./pages/AccountPage";
import styled from "styled-components";
import { useLogout } from "./hooks/useLogout";
import { EmailPage } from "./pages/EmailPage";
import { HomePage } from "./pages/HomePage";

const StyledLogout = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
`;

function App() {
  const { setGlobalState, globalState } = useGlobalState();
  const logout = useLogout();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const checkAuth = async (token: string) => {
    setIsFetching(true);
    const [res, err] = await handle(User.auth(token));
    setIsFetching(false);
    if (res) {
      setGlobalState((p: any) => ({ ...p, user: res }));
    }
    if (err) {
      setGlobalState((p: any) => ({ ...p, user: null }));
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth(token);
    }
  }, []);        
   
  if (isFetching) return <p>Loading...</p>;
  return (
    <>
      {globalState.user && (
        <>
          <Header />
          <StyledLogout onClick={logout}>Log out</StyledLogout>
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <RedirectPage>
              <HomePage />
            </RedirectPage>
          }
        />
        <Route
          path="/todos"
          element={
            <RedirectPage>
              <TodosPage />
            </RedirectPage>
          }
        />
        <Route
          path="/account"
          element={
            <RedirectPage>
              <AccountPage />
            </RedirectPage>
          }
        />
        <Route
          path="/email"
          element={
            <RedirectPage>
              <EmailPage />
            </RedirectPage>
          }
        />
        <Route
          path="/sign-in"
          element={
            <RedirectPage>
              <SignInPage />
            </RedirectPage>
          }
        />
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
