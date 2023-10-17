import { legacy_createStore as createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

import taskReducer from './reducers/taskReducer'
import commentReducer from './reducers/commentReducer'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  taskReducer: taskReducer, 
  commentReducer: commentReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

export {store, persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
