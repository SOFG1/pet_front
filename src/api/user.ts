import axios from "axios"
import { baseUrl } from "."

export const User = {
    signUp: async (login: string, pass: string) => {
        return await axios.post(`${baseUrl}/user/sign-up`, {login, pass})
    },
    signIn: async (login: string, pass: string) => {
        return await axios.post(`${baseUrl}/user/sign-in`, {login, pass})
    },
    auth: async (token: string) => {
        return await axios.get(`${baseUrl}/user/auth`, {
            headers: {
                authorization: token
            }
        })
    },
}