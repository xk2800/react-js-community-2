import { combineReducers } from '@reduxjs/toolkit'
import repositoriesReducer from '../features/repositories/repositoriesSlice'

// Combines all individual reducers into a single root reducer.
const rootReducer = combineReducers({
  repositories: repositoriesReducer   // Handles all repository-related state
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer