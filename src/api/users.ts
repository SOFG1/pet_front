import axios from "axios";
import { apiUrl } from ".";

export const Users = {
  getUsers: async (token: string, offset: number) => {
    return await axios.get(`${apiUrl}/users/`, {
      params: {
        offset,
      },
      headers: {
        authorization: token,
      },
    });
  },
};
