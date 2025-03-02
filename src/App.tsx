import { useState } from 'react'
import Header from './components/Header'
import RepoList from './components/RepoList'
import RepoDetail from './components/RepoDetail'
import { Repository } from './types/types'
import { Route, Router, Routes } from 'react-router-dom'

const App = () => {
  // State to track which repository is currently selected for detail view
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path='/' element={<RepoList />} />

          <Route path='/repo/:repoId' element={<RepoDetail />} />

          {/* 404 page */}
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App