import styled from "styled-components";
import { ITodo } from "../types";
import { useState } from "react";

const StyledTodo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

interface IProps {
  todo: ITodo;
}

export const TodoComponent = ({ todo }: IProps) => {
  const [val, setVal] = useState<string>(todo.text);
  const [editing, setEditing] = useState<boolean>(false);

  const onSave = () => {
    setEditing(false);
  };

  return (
    <StyledTodo>
      {!editing && (
        <>
          <p>{todo.text}</p>
          <button onClick={() => setEditing(true)}>EDIT</button>
          <button>DELETE</button>
        </>
      )}
      {editing && (
        <>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button onClick={() => setEditing(false)}>CANCEL</button>
          <button onClick={onSave}>SAVE</button>
        </>
      )}
    </StyledTodo>
  );
};
