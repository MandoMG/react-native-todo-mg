import { FlatList } from "react-native";
import useTodoList from "../Hooks/useTodoList";
import Todo from "./TodoItem";
import { useSelector } from "react-redux";
import { getTodos } from "../../../Redux/todos/todoSelectors";

const TodoList = () => {
  const { onDelete, onEdit, onItemToggle } = useTodoList();
  const todoList = useSelector(getTodos);

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