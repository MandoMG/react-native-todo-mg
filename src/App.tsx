/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import TodoMainPage from './Screens/TodoScreen';

/* TODOS:
 * Add Redux
 * Set is edit based on item selected
*/

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <TodoMainPage />
    </Provider>
  );
}

export default App;
