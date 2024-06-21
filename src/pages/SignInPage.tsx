import { useGlobalState } from "@reactivers/use-global-state";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export const SignInPage = () => {
  const { globalState, setGlobalState } = useGlobalState();
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");



  const handleSignIn = () => {
    setGlobalState((p: any) => ({...p, token: "test"}))
  }


  console.log(globalState)

  return (
    <Wrapper>
      <StyledTitle>Sign in</StyledTitle>
      <input
        type="text"
        value={login}
        placeholder="Login"
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="text"
        value={pass}
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign in</button>
      <Link to="/sign-up">Sign up</Link>
    </Wrapper>
  );
};
