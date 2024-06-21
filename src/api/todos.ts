import axios from "axios"
import { baseUrl } from "."


export const Todos = {
    getAllTodos: async  () => {
        return await axios.get(`${baseUrl}/todos/`)
    },
    addTodo: async (text: string) => {
        return await axios.post(`${baseUrl}/todos/`, {text})
    },
    deleteTodo: async (id: number) => {
        return await axios.delete(`${baseUrl}/todos/${id}`)
    },
    editTodo: async (id: number, text: string) => {
        return await axios.patch(`${baseUrl}/todos/${id}`, {text})
    },
}