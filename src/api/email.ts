import axios from "axios";
import { apiUrl } from ".";
import { IEmail } from "../types";

export const Email = {
  sendEmail: async (token: string, data: IEmail) => {
    return await axios.post(
      `${apiUrl}/mail`,
      { ...data },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
};
