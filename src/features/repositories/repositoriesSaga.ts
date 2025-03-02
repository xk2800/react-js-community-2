import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  fetchRepositories,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  loadMoreRepositories,
  loadMoreRepositoriesSuccess,
  searchRepositories,
  searchRepositoriesSuccess
} from './repositoriesSlice'
import { fetchRepositoriesByOrg, searchRepositoriesByName } from './repositoriesAPI'
import { RootState } from '../../store/rootReducer'
import { Repository } from '../../types/types'

// Worker saga for fetching repositories
function* fetchRepositoriesSaga() {
  try {
    // Call API to fetch repositories
    const repositories: Repository[] = yield call(fetchRepositoriesByOrg)
    // Dispatch success action with fetched repositories
    yield put(fetchRepositoriesSuccess(repositories))
  } catch (error) {
    // Dispatch failure action with error message
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

// Worker saga for loading more repositories
function* loadMoreRepositoriesSaga() {
  try {
    // Get current page and search term from state
    const { page, searchTerm } = yield select((state: RootState) => state.repositories)

    let repositories: Repository[]

    if (searchTerm) {
      // If searching, load more search results
      repositories = yield call(searchRepositoriesByName, searchTerm, page)
    } else {
      // Otherwise load more regular repositories
      repositories = yield call(fetchRepositoriesByOrg, 'reactjs', page)
    }

    // Dispatch success action with fetched repositories
    yield put(loadMoreRepositoriesSuccess(repositories))
  } catch (error) {
    // Dispatch failure action with error message
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

// Worker saga for searching repositories
function* searchRepositoriesSaga(action: ReturnType<typeof searchRepositories>) {
  try {
    // Call API to search repositories
    const repositories: Repository[] = yield call(
      searchRepositoriesByName,
      action.payload
    )
    // Dispatch success action with search results
    yield put(searchRepositoriesSuccess(repositories))
  } catch (error) {
    // Dispatch failure action with error message
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

// Watcher saga
export function* repositoriesSaga() {
  // Watch for these actions and call the corresponding saga
  yield takeLatest(fetchRepositories.type, fetchRepositoriesSaga)
  yield takeLatest(loadMoreRepositories.type, loadMoreRepositoriesSaga)
  yield takeLatest(searchRepositories.type, searchRepositoriesSaga)
}