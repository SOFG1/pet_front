import { Route, Routes } from "react-router-dom";
import { TodosPage } from "./pages/TodosPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { RedirectPage } from "./pages/RedirectPage";

function App() {
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
