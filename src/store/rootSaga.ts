import { all, fork } from 'redux-saga/effects'
import { repositoriesSaga } from '../features/repositories/repositoriesSaga'

/**
 * Root saga combines all individual sagas in the application.
 * Acts as the entry point for all saga middleware functionality.
 * @yields {Generator} A generator that forks all individual sagas
**/
export default function* rootSaga() {
  yield all([
    // To allow multiple sagas to run in parallel.
    fork(repositoriesSaga)
  ])
}