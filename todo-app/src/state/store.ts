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

export {store, persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
