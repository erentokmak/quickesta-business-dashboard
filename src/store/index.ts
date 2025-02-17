import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import accountsReducer from './accountsSlice'

const migrations = {
  0: (state: any) => {
    return {
      ...state,
      accounts: state.accounts || [],
      activeAccountId: state.activeAccountId || null,
    }
  },
}

const persistConfig = {
  key: 'root',
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
  timeout: 0,
  throttle: 0,
}

const persistedReducer = persistReducer(persistConfig, accountsReducer)

export const store = configureStore({
  reducer: {
    accounts: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
