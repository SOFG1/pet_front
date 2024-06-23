import { useEffect, useState } from "react";
import styled from "styled-components";
import { handle } from "../api";
import { useToken } from "../hooks/useToken";
import { Users } from "../api/users";

const StyledPage = styled.div`
  padding: 0 30px;
`;

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 40px;
`;

export const HomePage = () => {
  const token = useToken();
  const [isFetching, setIsFetching] = useState<boolean>(false)


  const getUsers = async () => {
    setIsFetching(true)
    const [res, err] = await handle(Users.getUsers(token, 0));
    setIsFetching(false)
    if(res) {
        console.log(res)
    }
    if(err) {
        console.log(err)
    }
  };


  useEffect(() => {
    getUsers()
  }, [])

  return (
    <StyledPage>
      <StyledTitle>You may like</StyledTitle>
      {isFetching && <p>Loading...</p>}
    </StyledPage>
  );
};
