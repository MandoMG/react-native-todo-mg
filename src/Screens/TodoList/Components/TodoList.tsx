import { FlatList } from "react-native";
import useTodoList from "../Hooks/useTodoList";
import Todo from "./TodoItem";

const TodoList = () => {
  const { todoList, onDelete, onEdit, onItemToggle } = useTodoList();

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