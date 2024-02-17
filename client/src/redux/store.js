import { configureStore,combineReducers } from '@reduxjs/toolkit'
import UserReducer from './user/UserSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user:UserReducer})

const persistConfig = {
  key:'root',
  storage,
  version:1,

}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: {user:persistedReducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})


export const persistor = persistStore(store)