import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repository, RepositoriesState } from '../../types/types'

// Initial state for repositories
const initialState: RepositoriesState = {
  repositories: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchTerm: ''
}

// Create repository slice
const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    // Action to initiate repository fetching
    fetchRepositories: (state) => {
      state.loading = true
      state.error = null
      // Reset if this is a new fetch (not loading more)
      state.repositories = []
      state.page = 1
      state.hasMore = true
      state.searchTerm = ''
    },
    // Action when repositories are successfully fetched
    fetchRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
      state.loading = false
      state.hasMore = action.payload.length === 30 // If we got less than requested, no more pages
    },
    // Action when repository fetching fails
    fetchRepositoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    // Action to load more repositories (for infinite scrolling)
    loadMoreRepositories: (state) => {
      if (state.hasMore && !state.loading) {
        state.loading = true
        state.page += 1
      }
    },
    // Action when more repositories are successfully loaded
    loadMoreRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = [...state.repositories, ...action.payload]
      state.loading = false
      state.hasMore = action.payload.length === 30 // If we got less than requested, no more pages
    },
    // Action to initiate repository search
    searchRepositories: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
      state.repositories = []
      state.page = 1
      state.hasMore = true
      state.searchTerm = action.payload
    },
    // Action when search results are successfully fetched
    searchRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
      state.loading = false
      state.hasMore = action.payload.length === 30 // If we got less than requested, no more pages
    }
  }
})

// Export actions
export const {
  fetchRepositories,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  loadMoreRepositories,
  loadMoreRepositoriesSuccess,
  searchRepositories,
  searchRepositoriesSuccess
} = repositoriesSlice.actions

// Export reducer
export default repositoriesSlice.reducer