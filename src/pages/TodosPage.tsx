import { useState } from "react";
import styled from "styled-components";
import { TodoComponent } from "../components/TodoComponent";

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

const todos = [
  { id: 1, text: "123123" },
  { id: 2, text: "213wedwqdew" },
  { id: 3, text: "scsswq123123" },
  { id: 4, text: "ssw312qwdqw2" },
];

export const TodosPage = () => {
  const [todo, setTodo] = useState<string>("");

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
