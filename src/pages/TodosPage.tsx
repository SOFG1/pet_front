import { useEffect, useState } from "react";
import styled from "styled-components";
import { TodoComponent } from "../components/TodoComponent";
import { handle } from "../api";
import { Todos } from "../api/todos";
import { ITodo } from "../types";

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

export const TodosPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([])


  const fetchTodos = async () => {
    const [res] = await handle(Todos.getAllTodos())
    if(res) {
      setTodos(res)
    }
  }


  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      <StyledTitle>Todos:</StyledTitle>
      {todos.map((t) => (
        <TodoComponent key={t.id} todo={t} />
      ))}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>Add todo</button>
    </>
  );
};
