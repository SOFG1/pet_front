import { useEffect, useState } from "react";
import styled from "styled-components";
import { TodoComponent } from "../components/TodoComponent";
import { handle } from "../api";
import { Todos } from "../api/todos";
import { ITodo } from "../types";
import { useGlobalState } from "@reactivers/use-global-state";
import { logErrors } from "../utils/logErrors";

const StyledTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledLogout = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
`

export const TodosPage = () => {
  const { setGlobalState } = useGlobalState();
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)



  const fetchTodos = async () => {
    setIsFetching(true)
    const [res] = await handle(Todos.getAllTodos())
    setIsFetching(false)
    if(res) {
      setTodos(res)
    }
  }

  const addTodo = async () => {
    setIsFetching(true)
    const [res,err] = await handle(Todos.addTodo(todo))
    setIsFetching(false)
    if(res) {
      setTodo("")
      setTodos(p => ([...p, res]))
    }
    if(err) {
      logErrors(err)
    }
  }

  
  const deleteTodo = async (id: number) => {
    setIsFetching(true)
    const [,err] = await handle(Todos.deleteTodo(id))
    setIsFetching(false)
    if(!err) {
      setTodos(p => p.filter(t => t.id !== id))
    }
    if(err) {
      logErrors(err)
    }
  }


  const editTodo = async (id: number, text: string) => {
    setIsFetching(true)
    const [res,err] = await handle(Todos.editTodo(id, text))
    setIsFetching(false)
    if(res) {
      fetchTodos()
    }
    if(err) {
      logErrors(err)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.keyCode === 13 && todo) {
      addTodo()

    }
  }


  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
    <StyledLogout onClick={() => setGlobalState((p: any) => ({...p, user: null}))}>Log out</StyledLogout>
      <StyledTitle>Todos:</StyledTitle>
      {todos.map((t) => (
        <TodoComponent onEdit={editTodo} key={t.id} onDelete={deleteTodo} todo={t} />
      ))}
      <input
        type="text"
        value={todo}
        onKeyDown={onKeyDown}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button disabled={isFetching} onClick={addTodo}>Add todo</button>
    </>
  );
};
