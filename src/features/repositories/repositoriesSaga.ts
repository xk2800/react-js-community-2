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

function* fetchRepositoriesSaga(): Generator<Effect, void, Repository[]> {
  try {
    const repositories: Repository[] = yield call(fetchRepositoriesByOrg)
    yield put(fetchRepositoriesSuccess(repositories))
  } catch (error) {
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

function* loadMoreRepositoriesSaga(): Generator<Effect, void> {
  try {
    const { page, searchTerm } = yield select((state: RootState) => state.repositories)

    let repositories: Repository[]

    if (searchTerm) {
      repositories = yield call(searchRepositoriesByName, searchTerm, page)
    } else {
      repositories = yield call(fetchRepositoriesByOrg, 'reactjs', page)
    }

    yield put(loadMoreRepositoriesSuccess(repositories))
  } catch (error) {
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

function* searchRepositoriesSaga(action: ReturnType<typeof searchRepositories>): Generator<Effect, void> {
  try {
    const repositories: Repository[] = yield call(
      searchRepositoriesByName,
      action.payload
    )
    yield put(searchRepositoriesSuccess(repositories))
  } catch (error) {
    yield put(fetchRepositoriesFailure((error as Error).message))
  }
}

// New saga for fetching a repository by ID
function* fetchRepositoryByIdSaga(action: ReturnType<typeof fetchRepositoryById>): Generator<Effect, void> {
  try {
    // First, check if the repository is already in the state
    const { repositories } = yield select((state: RootState) => state.repositories)
    let repo: Repository | undefined = repositories.find((r: Repository) => r.id === action.payload)

    // If not found in state, fetch from API
    if (!repo) {
      repo = yield call(fetchRepositoryByIdAPI, action.payload)
    }

    yield put(fetchRepositoryByIdSuccess(repo))
  } catch (error) {
    yield put(fetchRepositoryByIdFailure((error as Error).message))
  }
}

export function* repositoriesSaga(): Generator<Effect, void> {
  yield takeLatest(fetchRepositories.type, fetchRepositoriesSaga)
  yield takeLatest(loadMoreRepositories.type, loadMoreRepositoriesSaga)
  yield takeLatest(searchRepositories.type, searchRepositoriesSaga)
  yield takeLatest(fetchRepositoryById.type, fetchRepositoryByIdSaga)
}