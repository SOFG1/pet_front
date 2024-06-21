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
  onDelete: (id: number) => void
  onEdit: (id: number, text: string) => void
}

export const TodoComponent = ({ todo, onDelete, onEdit }: IProps) => {
  const [val, setVal] = useState<string>(todo.text);
  const [editing, setEditing] = useState<boolean>(false);

  const onSave = () => {
    setEditing(false);
    onEdit(todo.id, val)
  };

  return (
    <StyledTodo>
      {!editing && (
        <>
          <p>{todo.text}</p>
          <button onClick={() => setEditing(true)}>EDIT</button>
          <button onClick={() => onDelete(todo.id)}>DELETE</button>
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
