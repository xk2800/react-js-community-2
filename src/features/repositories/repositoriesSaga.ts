import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
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
} from './repositoriesSlice'
import {
  fetchRepositoriesByOrg,
  searchRepositoriesByName,
  fetchRepositoryById as fetchRepositoryByIdAPI
} from './repositoriesAPI'
import { RootState } from '../../store/rootReducer'
import { Repository } from '../../types/types'
import { Effect } from 'redux-saga/effects'

const VITE_ORGANIZATION_NAME = import.meta.env.VITE_ORGANIZATION_NAME || 'default-org-name'

/**
 * Saga to fetch all public repositories from Github for an organization.
 * Dispatches success action with repositories or failure action with error message.
 * @returns { Generator } A generator function handled by redux - saga middleware
**/
function* fetchRepositoriesSaga(): Generator<Effect, void, Repository[]> {
  try {
    // Call API to fetch repositories
    const repositories: Repository[] = yield call(fetchRepositoriesByOrg)
    // Dispatch success action with fetched repositories
    yield put(fetchRepositoriesSuccess(repositories))
  } catch (error) {
    // Handle errors by dispatching failure action with error message
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

/**
 * Saga to load more repositories (pagination).
 * Will either fetch more repositories or search based on current state.
 * @returns {Generator} A generator function handled by redux-saga middleware
**/
function* loadMoreRepositoriesSaga(): Generator<Effect, void> {
  try {
    // Get current page number & search term from Redux state
    const { page, searchTerm } = yield select((state: RootState) => state.repositories)

    let repositories: Repository[]

    // If search term exist, fetch the repositories by name and add pagination
    if (searchTerm) {
      repositories = yield call(searchRepositoriesByName, searchTerm, page)
    } else {
      // Else fetch all repositories by organization and add pagination
      repositories = yield call(fetchRepositoriesByOrg, VITE_ORGANIZATION_NAME, page)
    }

    // Dispatch success action with fetched repositories
    yield put(loadMoreRepositoriesSuccess(repositories))
  } catch (error) {
    // Handle errors by dispatching failure action
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}


/**
 * Saga to search repositories by name.
 * Takes the search term from action payload and dispatches results.
 * @param {ReturnType<typeof searchRepositories>} action - Redux action containing search term
 * @returns {Generator} A generator function handled by redux-saga middleware
**/
function* searchRepositoriesSaga(action: ReturnType<typeof searchRepositories>): Generator<Effect, void> {
  try {
    // Call API to search repositories by name using the search term from action payload
    const repositories: Repository[] = yield call(
      searchRepositoriesByName,
      action.payload
    )
    // Dispatch success action with search results
    yield put(searchRepositoriesSuccess(repositories))
  } catch (error) {
    // Handle errors by dispatching failure action
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

/**
 * Saga for fetching a repository by ID.
 * First checks if repository exists in state to avoid unnecessary API calls.
 * @param {ReturnType<typeof fetchRepositoryById>} action - Redux action containing repository ID
 * @returns {Generator} A generator function handled by redux-saga middleware
**/
function* fetchRepositoryByIdSaga(action: ReturnType<typeof fetchRepositoryById>): Generator<Effect, void> {
  try {
    // First, check if the repository is already in the state. This is to avoid unnecessary API calls.
    const { repositories } = yield select((state: RootState) => state.repositories)
    let repo: Repository | undefined = repositories.find((r: Repository) => r.id === action.payload)

    // If not found in state, fetch from API
    if (!repo) {
      repo = yield call(fetchRepositoryByIdAPI, action.payload)
    }

    // If repository is still not found after API call, throw error
    if (!repo) {
      throw new Error('Repository not found')
    }

    // Dispatch success action with the repository
    yield put(fetchRepositoryByIdSuccess(repo))
  } catch (error) {
    // Handle error by dispatching failure action
    yield put(fetchRepositoryByIdFailure((error as Error).message))
  }
}

/**
 * Root saga that combines all repository-related sagas.
 * Uses takeLatest to ensure only the most recent action is processed.
**/
export function* repositoriesSaga(): Generator<Effect, void> {
  yield takeLatest(fetchRepositories.type, fetchRepositoriesSaga)
  yield takeLatest(loadMoreRepositories.type, loadMoreRepositoriesSaga)
  yield takeLatest(searchRepositories.type, searchRepositoriesSaga)
  yield takeLatest(fetchRepositoryById.type, fetchRepositoryByIdSaga)
}