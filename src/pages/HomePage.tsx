import { useEffect, useState } from "react";
import styled from "styled-components";
import { handle, hostUrl } from "../api";
import { useToken } from "../hooks/useToken";
import { Users } from "../api/users";
import { IUser } from "../types";
import { Pagination } from "@mui/material";

const StyledPage = styled.div`
  padding: 0 30px;
`;

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 40px;
`;

const StyledBox = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 20px;
`;

const StyledUser = styled.div`
  padding: 10px;
  box-shadow: 2px 2px 4px #00000057;
  border-radius: 10px;
  img {
    width: 100%;
    height: calc((100vw / 5) - 30px);
    object-fit: cover;
  }
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

export const HomePage = () => {
  const token = useToken();
  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState<{ count: number; users: IUser[] }>({
    count: 0,
    users: [],
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getUsers = async (page: number) => {
    setIsFetching(true);
    const [res, err] = await handle(Users.getUsers(token, page * 5));
    setIsFetching(false);
    if (res) {
      setUsers(res);
    }
    if (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <StyledPage>
      <StyledTitle>You may like</StyledTitle>
      {isFetching && <p>Loading...</p>}
      <StyledBox>
        {users.users.map((u) => {
          return (
            <StyledUser key={u.login}>
              <img src={`${hostUrl}${u.photoName}`} alt="" />
              <p>{u.login}</p>
            </StyledUser>
          );
        })}
      </StyledBox>
      <StyledPagination
        count={Math.ceil(users.count / 5)}
        page={page + 1}
        onChange={(e, v) => setPage(v - 1)}
      />
    </StyledPage>
  );
};
