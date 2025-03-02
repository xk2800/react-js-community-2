import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRepositories, loadMoreRepositories } from '../features/repositories/repositoriesSlice'
import { RootState } from '../store/rootReducer'
import RepoCard from './RepoCard'
import LoadingIndicator from './LoadingIndicator'
import { Repository } from '../types/types'
import SearchBar from './SearchBar'

interface RepoListProps {
  onRepoSelect: (repo: Repository) => void
}

const RepoList = ({ onRepoSelect }: RepoListProps) => {
  const dispatch = useDispatch()
  const {
    repositories,
    loading,
    hasMore,
    error,
    searchTerm
  } = useSelector((state: RootState) => state.repositories)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastRepoElementRef = useCallback((node: HTMLDivElement | null) => {
    // Skip if loading or no more repos to load
    if (loading || !hasMore) return

    // Disconnect previous observer if it exists
    if (observer.current) observer.current.disconnect()

    // Create new observer for infinite scrolling
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(loadMoreRepositories())
      }
    })

    // Observe the last element
    if (node) observer.current.observe(node)
  }, [loading, hasMore, dispatch])

  // Initial load of repositories
  useEffect(() => {
    dispatch(fetchRepositories())
  }, [dispatch])

  // If there's an error, display it
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => dispatch(fetchRepositories())}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <SearchBar />
      {/* Show search results indication if searching */}
      {searchTerm && (
        <h2 className="text-xl font-semibold mb-4">
          Search results for: "{searchTerm}"
        </h2>
      )}

      {/* Show empty state if no repositories */}
      {repositories.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No repositories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo, index) => {
            // Apply ref to last element for infinite scrolling
            if (repositories.length === index + 1) {
              return (
                <div ref={lastRepoElementRef} key={repo.id}>
                  <RepoCard
                    repo={repo}
                    onClick={() => onRepoSelect(repo)}
                    counter={index + 1}
                  />
                </div>
              )
            } else {
              return (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  onClick={() => onRepoSelect(repo)}
                  counter={index + 1}
                />
              )
            }
          })}
        </div>
      )}

      {/* Loading indicator */}
      {loading && <LoadingIndicator />}
    </div>
  )
}

export default RepoList