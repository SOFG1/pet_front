import { useEffect, useState } from "react";
import styled from "styled-components";
import { handle } from "../api";
import { useToken } from "../hooks/useToken";
import { Users } from "../api/users";
import { IUser } from "../types";
import { Pagination } from "@mui/material";
import { UserComponent } from "../components/UserComponent";

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

  const onUpdate = (u: IUser, i: number) => {
    const copy = [...users.users]
    copy[i] = u
    setUsers(p => ({...p, users: copy}))
  }

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <StyledPage>
      <StyledTitle>You may like</StyledTitle>
      {isFetching && <p>Loading...</p>}
      {!isFetching && (
        <>
          <StyledBox>
            {users.users.map((u, i) => {
              return (
                <UserComponent key={u._id} user={u} onUpdate={(u) => onUpdate(u, i)} />
              );
            })}
          </StyledBox>
          <StyledPagination
            count={Math.ceil(users.count / 5)}
            page={page + 1}
            onChange={(e: any) => setPage(Number(e.target.innerText) - 1)}
          />
        </>
      )}
    </StyledPage>
  );
};
