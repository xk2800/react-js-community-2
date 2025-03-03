import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repository, RepositoriesState } from '../../types/types'

/**
 * Initial state for the repositories slice of the Redux store.
 * Defines the structure and default values for repository-related state.
**/
const initialState: RepositoriesState = {
  repositories: [],             // Array to store all fetched repositories
  selectedRepository: null,     // Currently selected repository (for detailed view)
  loading: false,               // Loading state for async operations
  error: null,                  // Error message if any operation fails
  page: 1,                      // Current page for pagination
  hasMore: true,                // Indicating if more repositories can be loaded
  searchTerm: ''                // Search term to filter repositories by name (if user is searching)
}

/**
 * Redux slice for managing repositories state.
 * Contains reducers for all repository-related actions.
**/
const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    /**
     * Action to initiate repositories fetch.
     * Resets state and sets loading to true.
    **/
    fetchRepositories: (state) => {
      state.loading = true
      state.error = null
      state.repositories = []
      state.page = 1
      state.hasMore = true
      state.searchTerm = ''
    },

    /**
     * Action dispatched when repositories are successfully fetched.
     * Updates repositories array and sets loading to false.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<Repository[]>} action - Action containing repositories data
    **/
    fetchRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
      state.loading = false
      /**
       * Assumes GitHub API returns 30 items per page by default
       * If fewer than 30 items are returned, there are no more pages to load
      **/
      state.hasMore = action.payload.length === 30
    },

    /**
     * Action dispatched when repository fetch fails.
     * Sets error message and turns off loading state.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<string>} action - Action containing error message
    **/
    fetchRepositoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    /**
      * Action to load more repositories.
      * Increments page counter and sets loading state to true.
      * Only triggers if more repositories are available and not loading state is not true.
    **/
    loadMoreRepositories: (state) => {
      if (state.hasMore && !state.loading) {
        state.loading = true
        state.page += 1
      }
    },

    /**
     * Action dispatched when additional repositories are successfully loaded.
     * Appends new repositories to existing array.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<Repository[]>} action - Action containing additional repositories
    **/
    loadMoreRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      // Append new repositories to existing array
      state.repositories = [...state.repositories, ...action.payload]
      state.loading = false
      state.hasMore = action.payload.length === 30
    },

    /**
    * Action to initiate repository search by searchTerm.
    * Resets repositories and sets search term.
    * @param {RepositoriesState} state - Current state
    * @param {PayloadAction<string>} action - Action containing search term
   **/
    searchRepositories: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
      state.repositories = []
      state.page = 1
      state.hasMore = true
      state.searchTerm = action.payload
    },

    /**
     * Action dispatched when search results are successfully fetched.
     * Updates repositories array with search results.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<Repository[]>} action - Action containing search results
    **/
    searchRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
      state.loading = false
      state.hasMore = action.payload.length === 30
    },

    /**
     * Action to fetch a single repository by ID.
     * Sets loading state and initializes selectedRepository with ID.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<number>} action - Action containing repository ID
    **/
    fetchRepositoryById: (state, action: PayloadAction<number>) => {
      state.loading = true
      state.error = null
      state.selectedRepository = null
      // Initialize selectedRepository with just the ID for reference
      // Full repository data will be set in fetchRepositoryByIdSuccess
      state.selectedRepository = { id: action.payload } as Repository
    },

    /**
     * Action dispatched when repository fetch by ID successes.
     * Updates selectedRepository with full repository data.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<Repository>} action - Action containing repository data
    **/
    fetchRepositoryByIdSuccess: (state, action: PayloadAction<Repository>) => {
      state.selectedRepository = action.payload
      state.loading = false
    },

    /**
     * Action dispatched when repository fetch by ID fails.
     * Sets error message and turns off loading state.
     * @param {RepositoriesState} state - Current state
     * @param {PayloadAction<string>} action - Action containing error message
    **/
    fetchRepositoryByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})


// Export each action creatores for use in components and sagas
export const {
  fetchRepositories,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  loadMoreRepositories,
  loadMoreRepositoriesSuccess,
  searchRepositories,
  searchRepositoriesSuccess,
  fetchRepositoryById,
  fetchRepositoryByIdSuccess,
  fetchRepositoryByIdFailure
} = repositoriesSlice.actions

// Export reducer to be included in the store
export default repositoriesSlice.reducer