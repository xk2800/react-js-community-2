import { useState } from 'react'
import Header from './components/Header'
import RepoList from './components/RepoList'
import RepoDetail from './components/RepoDetail'
import { Repository } from './types/types'

const App = () => {
  // State to track which repository is currently selected for detail view
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {selectedRepo ? (
          // When a repository is selected, show the detail view
          <div>
            <button
              onClick={() => setSelectedRepo(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to repositories
            </button>
            <RepoDetail repo={selectedRepo} />
          </div>
        ) : (
          // Otherwise show the repository list
          <RepoList onRepoSelect={setSelectedRepo} />
        )}
      </main>
    </div>
  )
}

export default App