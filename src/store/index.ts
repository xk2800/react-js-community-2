import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['repositories'] // Only persist repositories state
}

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create saga middleware
const sagaMiddleware = createSagaMiddleware()

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializability check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(sagaMiddleware)
})

// Create persistor
export const persistor = persistStore(store)

// Run the root saga
sagaMiddleware.run(rootSaga)