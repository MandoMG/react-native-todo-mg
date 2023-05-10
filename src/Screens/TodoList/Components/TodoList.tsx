import { FlatList } from "react-native";
import useTodoList from "../Hooks/useTodoList";
import Todo from "./TodoItem";
import { useSelector } from "react-redux";
import { getTodos } from "../../../Redux/todos/todoSelectors";
import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

const TodoList = () => {
  const { onDelete, onEdit, onItemToggle } = useTodoList();
  const todoList = useSelector(getTodos);
  // const [todoList, setTodoList] = useState();

  // useEffect(() => {
  //   (async () => {
  //     const firebaseTodos = await firestore().collection('Todos').get();
  //     setTodoList(firebaseTodos.docs);
  //   })()
  // }, [])

  //TODO - Add key generator
  return (
    <FlatList data={todoList} renderItem={({ item }) => {
      return (
        <Todo todoItem={item} toggleComplete={onItemToggle} onDelete={onDelete} onEdit={onEdit} />
      )
    }} />
  )
};

export default TodoList;