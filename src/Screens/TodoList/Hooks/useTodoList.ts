import { useEffect, useState } from 'react';
import { Alert, AlertButton } from 'react-native';
import { getObject } from "../../../Facades/StorageFacade";
import { TodoItem } from '../../../Types';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, setSelectedTodo } from '../../../Redux/todos/todoSlice';
import { StorageKeys } from '../../../Types/enums';
import { getSelectedTodo } from '../../../Redux/todos/todoSelectors';

const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>();
  const selectedTodo = useSelector(getSelectedTodo);
  const dispatch = useDispatch();

  const onDeleteConfirm = (todoID: string) => {
    dispatch(removeTodo(todoID))
  }

  const onDelete = (todoID: string) => {
    if (selectedTodo) {
      return;
    };

    const title = 'Deleting Item';
    const message = 'Are you sure you want to delete this todo?';
    const cancelButton: AlertButton = { text: 'Cancel' };
    const deleteButton: AlertButton = { text: 'Delete', onPress: () => onDeleteConfirm(todoID) };
    const alertButtons = [cancelButton, deleteButton];

    Alert.alert(title, message, alertButtons);
  }

  const onEdit = (todo: TodoItem) => {
    dispatch(setSelectedTodo(todo));
  };

  const onItemToggle = (todo: TodoItem) => {
    setTodoList(currentTodoState => {
      return currentTodoState?.map(item => {
        if (item.id === todo.id) {
          return {
            ...item,
            isCompleted: !todo.isCompleted
          }
        };

        return item;
      });
    });
  }

  const retrieveItemsFromStorage = () => {
    const listItems = getObject<TodoItem[]>(StorageKeys.TodoList);
    setTodoList(listItems);
  };

  useEffect(() => {
    retrieveItemsFromStorage();
  }, []);

  return {
    todoList,
    onDelete,
    onEdit,
    onItemToggle
  }
};

export default useTodoList;