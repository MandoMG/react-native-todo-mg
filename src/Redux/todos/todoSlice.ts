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
    setSelectedTodo: (state, action: PayloadAction<TodoItem>) => {
      console.log('Action: ', action);
      state.selectedTodo = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer