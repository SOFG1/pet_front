import axios from "axios";
import { baseUrl } from ".";

export const Todos = {
  getAllTodos: async (token: string) => {
    return await axios.get(`${baseUrl}/todos/`, {
      headers: {
        authorization: token,
      },
    });
  },
  addTodo: async (token: string, text: string) => {
    return await axios.post(
      `${baseUrl}/todos/`,
      { text },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  deleteTodo: async (token: string, id: number) => {
    return await axios.delete(`${baseUrl}/todos/${id}`, {
      headers: {
        authorization: token,
      },
    });
  },
  editTodo: async (token: string, id: number, text: string) => {
    return await axios.patch(
      `${baseUrl}/todos/${id}`,
      { text },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
};
