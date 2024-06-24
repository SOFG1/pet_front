import { useState } from "react";
import styled from "styled-components";
import { handle, hostUrl } from "../api";
import { User } from "../api/user";
import { useToken } from "../hooks/useToken";
import { logErrors } from "../utils/logErrors";
import { ResetPasswordData } from "../types";
import { useLogout } from "../hooks/useLogout";
import { useGlobalState } from "@reactivers/use-global-state";

const StyledPage = styled.div`
  padding: 0 30px;
`;

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledText = styled.p`
  margin-bottom: 10px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 150px;
  margin-bottom: 30px;
`;

const ImageInput = styled.input`
  margin-bottom: 40px;
`;
const StyledPhoto = styled.img`
  object-fit: cover;
  height: 300px;
  width: 300px;
`;

export const AccountPage = () => {
  const token = useToken();
  const logout = useLogout();
  const { globalState, setGlobalState } = useGlobalState();
  const [deletePass, setDeletePass] = useState<string>("");
  const [resetPass, setResetPass] = useState<ResetPasswordData>({
    old: "",
    new: "",
    newConfirm: "",
  });
  const [isLoadingPhoto, setIsLoadingPhoto] = useState<boolean>(false);

  const handleDeleteProfile = async () => {
    const [, err] = await handle(User.deleteProfile(token, deletePass));
    if (!err) {
      alert("Deleted");
      logout();
    }
    if (err) {
      logErrors(err);
    }
  };

  const handleResetPassword = async () => {
    if (resetPass.new !== resetPass.newConfirm) {
      alert("Passwords don't match");
      return;
    }
    const [, err] = await handle(
      User.resetPass(token, resetPass.old, resetPass.new)
    );
    if (!err) {
      logout();
      alert("Successfully updated");
    }
    if (err) {
      logErrors(err);
    }
  };

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    setIsLoadingPhoto(true);
    const [res, err] = await handle(User.uploadImage(token, file));
    setIsLoadingPhoto(false);
    if (res) {
      setGlobalState((p: any) => ({ ...p, user: res }));
    }
    if (err) {
      console.log(err);
    }
  };

  return (
    <StyledPage>
      <StyledTitle>Account settings</StyledTitle>
      <StyledTitle>{globalState.user?.login}</StyledTitle>
      <p>Experience: {globalState.user?.experience}</p>
      <StyledColumn>
        <StyledText>Profile photo</StyledText>
        {globalState.user?.photoName && !isLoadingPhoto && (
          <StyledPhoto
            src={`${hostUrl}${globalState.user?.photoName}?t=${Date.now()}`}
          />
        )}
        {!globalState.user?.photoName && !isLoadingPhoto && (
          <p>No photo added</p>
        )}
        {!isLoadingPhoto && (
          <ImageInput
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleUploadImage}
          />
        )}
        {isLoadingPhoto && <p>Loading...</p>}
      </StyledColumn>

      <StyledText>Reset password</StyledText>
      <StyledColumn>
        <input
          type="text"
          placeholder="Old password"
          autoComplete="new-password"
          value={resetPass.old}
          onChange={(e) => setResetPass((p) => ({ ...p, old: e.target.value }))}
        />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          value={resetPass.new}
          onChange={(e) => setResetPass((p) => ({ ...p, new: e.target.value }))}
        />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          value={resetPass.newConfirm}
          onChange={(e) =>
            setResetPass((p) => ({ ...p, newConfirm: e.target.value }))
          }
        />
        <button
          disabled={!resetPass.old || !resetPass.new || !resetPass.newConfirm}
          onClick={handleResetPassword}
        >
          Reset password
        </button>
      </StyledColumn>
      <StyledText>Permanently delete profile</StyledText>
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
    </StyledPage>
  );
};
