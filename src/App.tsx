import Header from './components/Header'
import RepoList from './pages/RepoList'
import RepoDetail from './pages/RepoDetail'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

const App = () => {
  // State to track which repository is currently selected for detail view

  return (
    <>
      <Header />
      <main className="container mx-auto pt-16 mt-10">
        <Routes>
          <Route path='/' element={<RepoList />} />

          <Route path='/repo/:repoId' element={<RepoDetail />} />

          {/* 404 page */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App