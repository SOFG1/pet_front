import { useState } from "react";
import styled from "styled-components";
import { handle } from "../api";
import { User } from "../api/user";
import { useToken } from "../hooks/useToken";
import { useGlobalState } from "@reactivers/use-global-state";
import { logErrors } from "../utils/logErrors";

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const AccountPage = () => {
  const token = useToken();
  const { setGlobalState } = useGlobalState();
  const [deletePass, setDeletePass] = useState<string>("");

  const handleDeleteProfile = async () => {
    const [, err] = await handle(User.deleteProfile(token, deletePass));
    if (!err) {
      alert("Deleted");
      setGlobalState((p: any) => ({ ...p, user: null }));
      localStorage.removeItem("token");
    }
    if (err) {
      logErrors(err);
    }
  };

  return (
    <>
      <StyledTitle>Account settings</StyledTitle>

      <StyledBox>
        <input
          type="text"
          placeholder="Password"
          value={deletePass}
          onChange={(e) => setDeletePass(e.target.value)}
        />
        <button disabled={!deletePass} onClick={handleDeleteProfile}>
          Permanently delete profile
        </button>
      </StyledBox>
    </>
  );
};
