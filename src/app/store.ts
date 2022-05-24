import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import authReducer from "./features/auth/authSlice"
import storage from "./sync-storage"
import { userApi } from "./services/userApi"
import { blogApi } from "./services/blogApi"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
}

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(blogApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
