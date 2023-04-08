import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TodoItem } from '../../Types';

export interface TodoState {
  todoList: TodoItem[];
  selectedTodo: TodoItem | undefined;
}

const initialState: TodoState = {
  todoList: [],
  selectedTodo: undefined
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todoList.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(item => item.id !== action.payload);
    },
    setSelectedTodo: (state, action: PayloadAction<TodoItem | undefined>) => {
      state.selectedTodo = action.payload;
    },
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todoList = state.todoList?.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            title: action.payload.title
          }
        };

        return item;
      });
    }
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, setSelectedTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer