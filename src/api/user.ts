import axios from "axios"
import { baseUrl } from "."

export const User = {
    signUp: async (login: string, pass: string) => {
        return await axios.post(`${baseUrl}/user/`, {login, pass})
    },
}