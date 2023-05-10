import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { TodoItem } from '../Types';
import useDynamicColors from '../Styles/useColors';
import CommonStyles from '../Styles';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, setSelectedTodo, updateTodo } from '../Redux/todos/todoSlice';
import TodoList from './TodoList/Components/TodoList';
import { getSelectedTodo } from '../Redux/todos/todoSelectors';

import firestore from "@react-native-firebase/firestore";

const TodoMainPage = () => {
  const Colors = useDynamicColors();
  const dispatch = useDispatch();
  const selectedTodo = useSelector(getSelectedTodo);

  const [todoValue, setTodoValue] = useState<string>();

  const backgroundStyle = {
    backgroundColor: Colors.backgroundColor,
  };

  const textStyle = {
    backgroundColor: Colors.inputBackgroundColor,
    color: Colors.textColor,
  };

  //TODO - Add ID generator
  const createTodoFromString = (): TodoItem => {
    return {
      id: `${todoValue}`,
      title: todoValue || '',
      isCompleted: false
    }
  }

  const onChange = (text: string) => {
    setTodoValue(text);
  }

  const onAddPress = () => {
    const newTodo = createTodoFromString();

    firestore().collection('Todos').doc().set({
      title: newTodo.title,
      isCompleted: newTodo.isCompleted
    }).then(() => { console.log('TODO Added!') })

    dispatch(addTodo(newTodo))
  };

  const onSavePress = () => {
    if (!selectedTodo) {
      return;
    }

    const editedTodo: TodoItem = {
      ...selectedTodo,
      title: todoValue || ''
    }

    dispatch(updateTodo(editedTodo))
    dispatch(setSelectedTodo(undefined));
  };

  useEffect(() => {
    console.log('Selected Todo: ', selectedTodo);
    if (selectedTodo) {
      setTodoValue(selectedTodo.title);
    }
  }, [selectedTodo])

  return (
    <SafeAreaView style={[CommonStyles.flexOne, backgroundStyle]}>
      <View style={styles.todoInputWrapper}>
        <TextInput value={todoValue} style={[styles.todoInputField, textStyle]} onChangeText={onChange} />
        {!!selectedTodo ? (
          <Button onPress={onSavePress} title="Save" />
        ) : (
          <Button onPress={onAddPress} title="Add" />
        )}
      </View>
      <TodoList />
    </SafeAreaView>
  )
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

export default TodoMainPage;