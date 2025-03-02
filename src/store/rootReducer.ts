import { combineReducers } from '@reduxjs/toolkit'
import repositoriesReducer from '../features/repositories/repositoriesSlice'

const rootReducer = combineReducers({
  repositories: repositoriesReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer