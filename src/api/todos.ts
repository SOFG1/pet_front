import axios from "axios"
import { baseUrl } from "."


export const Todos = {
    getAllTodos: async  () => {
        return await axios.get(`${baseUrl}/todos/`)
    },
    addTodo: async (text: string) => {
        return await axios.post(`${baseUrl}/todos/`, {text})
    }
}