/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { persistor, store } from './Redux/store'
import { Provider } from 'react-redux'
import TodoMainPage from './Screens/TodoScreen';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBAx-hvoMnNGpUGVRHpNu1h1__5i0Z1fDY",
  authDomain: "rn-todo-app-68b6d.firebaseapp.com",
  databaseURL: "https://rn-todo-app-68b6d-default-rtdb.firebaseio.com",
  projectId: "rn-todo-app-68b6d",
  storageBucket: "rn-todo-app-68b6d.appspot.com",
  messagingSenderId: "215087350785",
  appId: "1:215087350785:web:9ef500383f2bb02fa5ec00",
  measurementId: "G-QGXLG9PF24"
};

const App = (): JSX.Element => {
  useEffect(() => {
    (async () => await firebase.initializeApp(firebaseConfig))()
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoMainPage />
      </PersistGate>
    </Provider>
  );
}

export default App;
