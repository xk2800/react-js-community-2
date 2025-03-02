import { Repository } from '../types/types'

interface RepoCardProps {
  repo: Repository
  onClick: () => void
}

const RepoCard = ({ repo, onClick }: RepoCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-blue-600 mb-2 truncate">
        {repo.name}
      </h3>
      <p className="text-gray-600 mb-4 h-12 overflow-hidden">
        {repo.description || 'No description available'}
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <span className="flex items-center mr-4">
          {/* <svg
            className="h-4 w-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg> */}
          {/* {repo.stargazers_count} */}
        </span>
        <span className="flex items-center">
          {/* <svg
            className="h-4 w-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg> */}
          {/* {repo.language || 'Unknown'} */}
        </span>
      </div>
    </div>
  )
}

export default RepoCard