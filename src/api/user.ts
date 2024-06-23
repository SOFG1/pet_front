import axios from "axios";
import { apiUrl } from ".";

export const User = {
  signUp: async (login: string, pass: string) => {
    return await axios.post(`${apiUrl}/user/sign-up`, { login, pass });
  },
  signIn: async (login: string, pass: string) => {
    return await axios.post(`${apiUrl}/user/sign-in`, { login, pass });
  },
  auth: async (token: string) => {
    return await axios.get(`${apiUrl}/user/auth`, {
      headers: {
        authorization: token,
      },
    });
  },
  deleteProfile: async (token: string, pass: string) => {
    return await axios.delete(`${apiUrl}/user`, {
      params: {
        pass,
      },
      headers: {
        authorization: token,
      },
    });
  },
  resetPass: async (token: string, oldPass: string, newPass: string) => {
    return await axios.post(`${apiUrl}/user/reset-password`, { oldPass, newPass }, {
        headers: {
          authorization: token,
        },
      });
  },
  uploadImage: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file)
    return await axios.post(`${apiUrl}/user/upload-photo`, formData, {
        headers: {
          authorization: token,
        },
      });
  },
};
