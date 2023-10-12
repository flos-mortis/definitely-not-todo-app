import { legacy_createStore as createStore} from 'redux'

import taskReducer from './reducers/taskReducer'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
  preloadedState = {
    tasks: JSON.parse(persistedTodosString)
  }
}

const store = createStore(taskReducer, preloadedState)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
