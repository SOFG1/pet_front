import { useGlobalState } from "@reactivers/use-global-state";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handle } from "../api";
import { User } from "../api/user";
import { logErrors } from "../utils/logErrors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

export const SignUpPage = () => {
  const { setGlobalState } = useGlobalState();
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");

  const handleSignUp = async () => {
    if (pass !== pass2) {
      alert("Passwords don't match");
      return;
    }
    const [res, err] = await handle(User.signUp(login, pass));
    if (res) {
      setGlobalState((p: any) => ({ ...p, user: res }));
    }
    if (err) {
      logErrors(err);
    }
  };

  return (
    <Wrapper>
      <StyledTitle>Sign up</StyledTitle>
      <input
        type="text"
        value={login}
        placeholder="Login"
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        value={pass}
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />
      <input
        type="password"
        value={pass2}
        placeholder="Password confirmation"
        onChange={(e) => setPass2(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <Link to="/sign-in">Sign in</Link>
    </Wrapper>
  );
};
