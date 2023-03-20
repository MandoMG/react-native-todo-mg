/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Alert,
  AlertButton,
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  TextInput,
  FlatList,
} from 'react-native';

import { TodoItem } from './Types';
import Todo from './Components/Todo/TodoItem';
import useDynamicColors from './Styles/useColors';
import CommonStyles from './Styles';

const App = (): JSX.Element => {
  const Colors = useDynamicColors();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [selectedTodo, setSelectedTodo] = useState<TodoItem>();
  const [todoValue, setTodoValue] = useState<string>();
  const [todoList, setTodoList] = useState<TodoItem[]>();

  const backgroundStyle = {
    backgroundColor: Colors.backgroundColor,
  };

  const textStyle = {
    backgroundColor: Colors.inputBackgroundColor,
    color: Colors.textColor,
  };

  //TODO - Add ID generator
  const createTodoFromString = (strValue: string): TodoItem => {
    return {
      id: `${strValue}`,
      title: strValue,
      isCompleted: false
    }
  }

  //TODO - Check for unique ID
  //TODO - Check for To do Title
  const onAddPress = () => {
    if (!todoValue) {
      return;
    };

    setTodoList(currentTodoState => {
      if (!currentTodoState || !currentTodoState.length) {
        return [createTodoFromString(todoValue || '')];
      }

      return [...currentTodoState, createTodoFromString(todoValue || '')];
    });
    setTodoValue('');
  };

  const onSavePress = () => {
    if (!todoValue || !selectedTodo) {
      return;
    };

    setTodoList(currentTodoState => {
      return currentTodoState?.map(item => {
        if (item.id === selectedTodo?.id) {
          return {
            ...item,
            title: todoValue
          }
        };

        return item;
      });
    });

    setTodoValue('');
    setSelectedTodo(undefined);
    setIsEdit(false);
  };

  const onChange = (text: string) => {
    setTodoValue(text);
  }

  const onDeleteConfirm = (todoID: string) => {
    setTodoList(currentTodoState => {
      return currentTodoState?.filter(item => item.id !== todoID);
    });
  }

  const onDelete = (todoID: string) => {
    if (isEdit) {
      return;
    };

    const title = 'Deleting Item';
    const message = 'Are you sure you want to delete this todo?';
    const cancelButton: AlertButton = { text: 'Cancel' };
    const deleteButton: AlertButton = { text: 'Delete', onPress: () => onDeleteConfirm(todoID) };
    const alertButtons = [cancelButton, deleteButton];

    Alert.alert(title, message, alertButtons);
  }

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

  const onEdit = (todo: TodoItem) => {
    setTodoValue(todo.title);
    setSelectedTodo(todo);
    setIsEdit(true);
  };

  //TODO - Add key generator
  return (
    <SafeAreaView style={[CommonStyles.flexOne, backgroundStyle]}>
      <View style={styles.todoInputWrapper}>
        <TextInput value={todoValue} style={[styles.todoInputField, textStyle]} onChangeText={onChange} />
        {isEdit ? (
          <Button onPress={onSavePress} title="Save" />
        ) : (
          <Button onPress={onAddPress} title="Add" />
        )}
      </View>
      <FlatList data={todoList} renderItem={({ item }) => {
        return (
          <Todo todoItem={item} toggleComplete={onItemToggle} onDelete={onDelete} onEdit={onEdit} />
        )
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  todoInputWrapper: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 10
  },
  todoInputField: {
    flex: 1,
    backgroundColor: '#666666',
    borderRadius: 16,
    padding: 10,
  },
  todoList: {
    backgroundColor: '#666666',
    borderRadius: 16,
    marginHorizontal: 20
  }
});

export default App;
