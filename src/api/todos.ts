import axios from "axios";
import { apiUrl } from ".";

export const Todos = {
  getAllTodos: async (token: string) => {
    return await axios.get(`${apiUrl}/todos`, {
      headers: {
        authorization: token,
      },
    });
  },
  addTodo: async (token: string, text: string) => {
    return await axios.post(
      `${apiUrl}/todos/`,
      { text },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  deleteTodo: async (token: string, id: number) => {
    return await axios.delete(`${apiUrl}/todos/${id}`, {
      headers: {
        authorization: token,
      },
    });
  },
  editTodo: async (token: string, id: number, text: string) => {
    return await axios.patch(
      `${apiUrl}/todos/${id}`,
      { text },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
};
