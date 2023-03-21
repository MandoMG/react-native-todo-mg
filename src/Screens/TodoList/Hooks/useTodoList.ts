import { useEffect, useState } from 'react';
import { Alert, AlertButton } from 'react-native';
import { getObject, setObject } from "../../../Facades/StorageFacade";
import { TodoItem } from '../../../Types';

enum StorageKeys {
  TodoList = 'todo-list'
}

const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>();
  const [selectedTodo, setSelectedTodo] = useState<TodoItem>();

  const onDeleteConfirm = (todoID: string) => {
    setTodoList(currentTodoState => {
      return currentTodoState?.filter(item => item.id !== todoID);
    });
  }

  // TODO: Define is edit with selected todo
  const onDelete = (todoID: string) => {
    // if (isEdit) {
    //   return;
    // };

    const title = 'Deleting Item';
    const message = 'Are you sure you want to delete this todo?';
    const cancelButton: AlertButton = { text: 'Cancel' };
    const deleteButton: AlertButton = { text: 'Delete', onPress: () => onDeleteConfirm(todoID) };
    const alertButtons = [cancelButton, deleteButton];

    Alert.alert(title, message, alertButtons);
  }

  const onEdit = (todo: TodoItem) => {
    // setTodoValue(todo.title);
    setSelectedTodo(todo);
    // setIsEdit(true);
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

  const setItemsIntoStorage = () => {
    setObject(StorageKeys.TodoList, todoList);
  };

  const retrieveItemsFromStorage = () => {
    const listItems = getObject<TodoItem[]>(StorageKeys.TodoList);
    setTodoList(listItems);
  };

  useEffect(() => {
    setItemsIntoStorage();
  }, [todoList]);

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