import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repository, RepositoriesState } from '../../types/types'

const initialState: RepositoriesState = {
  repositories: [],
  selectedRepository: null,
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchTerm: ''
}

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    fetchRepositories: (state) => {
      state.loading = true
      state.error = null
      state.repositories = []
      state.page = 1
      state.hasMore = true
      state.searchTerm = ''
    },
    fetchRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
      state.loading = false
      state.hasMore = action.payload.length === 30
    },
    fetchRepositoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    loadMoreRepositories: (state) => {
      if (state.hasMore && !state.loading) {
        state.loading = true
        state.page += 1
      }
    },
    loadMoreRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = [...state.repositories, ...action.payload]
      state.loading = false
      state.hasMore = action.payload.length === 30
    },
    searchRepositories: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
      state.repositories = []
      state.page = 1
      state.hasMore = true
      state.searchTerm = action.payload
    },
    searchRepositoriesSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload
      state.loading = false
      state.hasMore = action.payload.length === 30
    },
    // New actions for fetching a single repository by ID
    // fetchRepositoryById: (state) => {
    fetchRepositoryById: (state, action: PayloadAction<number>) => {
      state.loading = true
      state.error = null
      state.selectedRepository = null
      // Store the repository ID for reference
      state.selectedRepository = { id: action.payload } as Repository
    },
    fetchRepositoryByIdSuccess: (state, action: PayloadAction<Repository>) => {
      state.selectedRepository = action.payload
      state.loading = false
    },
    fetchRepositoryByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

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

export default repositoriesSlice.reducer