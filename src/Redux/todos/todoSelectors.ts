import { RootState } from "../store";

export const getTodos = (state: RootState) => state.todos.todoList;

export const getSelectedTodo = (state: RootState) => state.todos.selectedTodo;
