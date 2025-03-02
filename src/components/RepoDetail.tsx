import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { fetchRepositoryById } from '../features/repositories/repositoriesSlice'
import LoadingIndicator from './LoadingIndicator'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { MoveLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import RepositoryStatCard from './RepositoryStatCard'
import EyeEmoji from './emoji/EyeEmoji'
import StarEmoji from './emoji/StarEmoji'
import ForkEmoji from './emoji/ForkEmoji'
import LanguageEmoji from './emoji/LanguageEmoji'

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
      <motion.div
        whileHover="hover"
        className="inline-flex items-center gap-2 mb-4"
      >
        <Button variant="link" onClick={handleBack} className="flex items-center gap-2 pl-2 transition-all duration-300 ease-in-out cursor-pointer hover:no-underline text-rose-500 hover:text-white">
          <motion.div
            variants={{ hover: { x: -5 } }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MoveLeft />
          </motion.div>
          Back to repositories
        </Button>
      </motion.div>

      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>
            {selectedRepository.name}
          </CardTitle>
          <CardDescription>
            {selectedRepository.description || 'No description available'}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className='border-1 border-rose-500 hover:bg-rose-500 hover:border-white transition-all duration-300 ease-in-out cursor-pointer'>
            <Link
              to={selectedRepository.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className='grid grid-cols-4 gap-4'>
        <RepositoryStatCard
          title={(isHovered) => (
            <>
              <StarEmoji isHovered={isHovered} /> Stars
            </>
          )}
          value={selectedRepository.stargazers_count}
        />

        <RepositoryStatCard
          title={(isHovered) => (
            <>
              <EyeEmoji isHovered={isHovered} /> Watchers
            </>
          )}
          value={selectedRepository.watchers_count}
        />

        <RepositoryStatCard
          title={(isHovered) => (
            <>
              <ForkEmoji isHovered={isHovered} /> Forks
            </>
          )}
          value={selectedRepository.forks_count}
        />

        <RepositoryStatCard
          title={(isHovered) => (
            <>
              <LanguageEmoji isHovered={isHovered} /> Language
            </>
          )}
          value={selectedRepository.language || 'No Language available'}
        // className='max-md:col-span-2'
        />
      </div>
    </div>
  )
}

export default RepoDetail