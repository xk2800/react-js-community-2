import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { fetchRepositoryById } from '../features/repositories/repositoriesSlice'
import LoadingIndicator from './LoadingIndicator'

const RepoDetail = () => {
  const { repoId } = useParams<{ repoId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedRepository, loading, error } = useSelector(
    (state: RootState) => state.repositories
  )

  // Fetch repository details when component mounts or repoId changes
  useEffect(() => {
    if (repoId) {
      dispatch(fetchRepositoryById(parseInt(repoId)))
    }
  }, [repoId, dispatch])

  // Navigate back to the repository list
  const handleBack = () => {
    navigate('/')
  }

  // Loading state
  if (loading) {
    return <LoadingIndicator />
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to repositories
        </button>
      </div>
    )
  }

  // Repository not found state
  if (!selectedRepository) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Repository not found</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to repositories
        </button>
      </div>
    )
  }

  // Display repository details
  return (
    <div>
      <button
        onClick={handleBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to repositories
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedRepository.name}</h2>

        <p className="text-gray-600 mb-6">
          {selectedRepository.description || 'No description available'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Stars</p>
            <p className="text-xl font-semibold">{selectedRepository.stargazers_count}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Forks</p>
            <p className="text-xl font-semibold">{selectedRepository.forks_count}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Watchers</p>
            <p className="text-xl font-semibold">{selectedRepository.watchers_count}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Language</p>
            <p className="text-xl font-semibold">{selectedRepository.language || 'Unknown'}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <a
            href={selectedRepository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default RepoDetail