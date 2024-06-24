import styled from "styled-components";
import { handle, hostUrl } from "../api";
import { IUser } from "../types";
import { Button } from "@mui/material";
import { useToken } from "../hooks/useToken";
import { useState } from "react";
import { Users } from "../api/users";
import { logErrors } from "../utils/logErrors";
import { useGlobalState } from "@reactivers/use-global-state";

const StyledUser = styled.div`
  position: relative;
  padding: 10px;
  box-shadow: 2px 2px 4px #00000057;
  border-radius: 10px;
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled(Button)``;

interface IProps {
  user: IUser;
  onUpdate: (u: IUser) => void;
}
export const UserComponent = ({ user, onUpdate }: IProps) => {
  const { globalState } = useGlobalState();
  const token = useToken();
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const setLike = async () => {
    setIsLiking(true);
    const [res, err] = await handle(Users.setLike(token, user._id));
    setIsLiking(false);
    if (res) {
      onUpdate(res);
    }
    if (err) {
      logErrors(err);
    }
  };

  const liked = user.likes.includes(globalState.user._id);

  return (
    <StyledUser key={user.login}>
      <img src={`${hostUrl}${user.photoName}`} alt="" />
      <p>{user.login}</p>
      <StyledFooter>
        <p>Likes: {user.likes.length} Exp: {user.experience}</p>
        {globalState.user._id !== user._id && (
          <LikeButton
            disabled={isLiking}
            onClick={setLike}
            variant={liked ? "contained" : "text"}
          >
            Like
          </LikeButton>
        )}
      </StyledFooter>
    </StyledUser>
  );
};
