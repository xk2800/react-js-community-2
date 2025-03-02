import { all, fork } from 'redux-saga/effects'
import { repositoriesSaga } from '../features/repositories/repositoriesSaga'

export default function* rootSaga() {
  yield all([
    fork(repositoriesSaga)
  ])
}