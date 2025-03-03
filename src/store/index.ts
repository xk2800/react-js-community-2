import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

/**
 * Configuration for redux-persist.
 * Defines how and what parts of the Redux state should be persisted.
**/
const persistConfig = {
  key: 'root',                    // Key used for the persisted data in storage
  storage,                        // Storage engine (set localStorage by default)
  whitelist: ['repositories']     // Only persist repositories state, other slices will not be saved
}

/**
 * Create a persisted reducer by wrapping the root reducer with redux-persist.
 * This enables the app to save and restore state from localStorage.
**/
const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * Create the Redux-Saga middleware.
**/
const sagaMiddleware = createSagaMiddleware()

/**
 * Configure and create the Redux store.
 * Combines the reducers, middleware, and enhancers into a single store.
**/
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializability check to prevent warnings
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(sagaMiddleware)   // Adding the saga middleware to the default middleware
})

/**
 * Create a persistor object from the store.
 * Manages the persisting and rehydrating of the store.
**/
export const persistor = persistStore(store)

/**
 * Run the root saga
**/
sagaMiddleware.run(rootSaga)