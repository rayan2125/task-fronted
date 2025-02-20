const { configureStore, combineReducers } = require("@reduxjs/toolkit");

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import profileReducer from './Reducers/profileReducers';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['err'],
}
const reducer = combineReducers({
  profile: profileReducer,

})

const persistReducers = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store