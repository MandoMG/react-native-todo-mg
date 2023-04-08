/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { persistor, store } from './Redux/store'
import { Provider } from 'react-redux'
import TodoMainPage from './Screens/TodoScreen';
import { PersistGate } from 'redux-persist/integration/react';

/* TODOS:
 * Add Redux
 * Set is edit based on item selected
*/

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoMainPage />
      </PersistGate>
    </Provider>
  );
}

export default App;
