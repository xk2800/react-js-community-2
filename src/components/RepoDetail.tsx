import { Repository } from '../types/types'

interface RepoDetailProps {
  repo: Repository
}

const RepoDetail = ({ repo }: RepoDetailProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{repo.name}</h2>

      <p className="text-gray-600 mb-6">
        {repo.description || 'No description available'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Stars</p>
          <p className="text-xl font-semibold">{repo.stargazers_count}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Forks</p>
          <p className="text-xl font-semibold">{repo.forks_count}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Watchers</p>
          <p className="text-xl font-semibold">{repo.watchers_count}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Language</p>
          <p className="text-xl font-semibold">{repo.language || 'Unknown'}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default RepoDetail