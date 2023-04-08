import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoReducers from './todos/todoSlice'
import { persistReducer, persistStore } from 'redux-persist'
import { reduxStorage } from '../Facades/StorageFacade'

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
}

const reducers = combineReducers({
  todos: todoReducers
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch