/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import { TodoItem } from './Types';
import useDynamicColors from './Styles/useColors';
import CommonStyles from './Styles';

/* TODOS:
 * Add Redux
 * Set is edit based on item selected
*/

const App = (): JSX.Element => {
  const Colors = useDynamicColors();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [todoValue, setTodoValue] = useState<string>();

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

  const onChange = (text: string) => {
    setTodoValue(text);
  }

  // TODO: Replace this with Redux Actions
  const onAddPress = () => { };
  const onSavePress = () => { };

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
