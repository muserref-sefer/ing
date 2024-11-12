import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import employeesReducer from './slices/employee/employeeSlice';
import languageReducer from './slices/language/languagceSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'employees'], 
};

const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);
const persistedEmployeesReducer = persistReducer(persistConfig, employeesReducer);

const store = configureStore({
  reducer: {
    language: persistedLanguageReducer,
    employees: persistedEmployeesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
