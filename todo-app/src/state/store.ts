import { legacy_createStore as createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import taskReducer from './reducers/taskReducer'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, taskReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

/* const persistedTasksString = localStorage.getItem('tasksStore');
const preloadedState = persistedTasksString ? { tasks: JSON.parse(persistedTasksString) } : undefined;
 */

// Subscribe to changes and update localStorage
/* store.subscribe(() => {
  const tasks = store.getState().tasks; // Access the tasks array
  localStorage.setItem('tasksStore', JSON.stringify(tasks)); // Update localStorage with tasks
});
 */
/* function saveToLocalStorage(state: RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
 */

export {store, persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
