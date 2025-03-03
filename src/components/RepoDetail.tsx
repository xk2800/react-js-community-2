import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { fetchRepositoryById } from '../features/repositories/repositoriesSlice'
import LoadingIndicator from './LoadingIndicator'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { MoveLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import RepositoryStatCard from './RepositoryStatCard'
import EyeEmoji from './emoji/EyeEmoji'
import StarEmoji from './emoji/StarEmoji'
import ForkEmoji from './emoji/ForkEmoji'
import LanguageEmoji from './emoji/LanguageEmoji'
import ExternalLinkCard from './ExternalLinksCard'

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
        <Button variant="link" onClick={handleBack} className="flex items-center gap-2 pl-2 transition-all duration-300 ease-in-out cursor-pointer hover:no-underline text-[#49f627] hover:text-white">
          <motion.div
            variants={{ hover: { x: -5 } }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MoveLeft />
          </motion.div>
          Back to repositories
        </Button>
      </motion.div>

      <Card className='mb-4 border-none'>
        <CardHeader className='p-0'>
          <CardTitle className='text-2xl'>
            {selectedRepository.name}
          </CardTitle>
          <CardDescription className='text-lg'>
            {selectedRepository.description || "We've looked high and low, unfortunately it looks like there is no description."}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
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
          value={selectedRepository.language || 'Opps, I think think there is no language for this'}
        // className='max-md:col-span-2'
        />
      </div>

      <ExternalLinkCard selectedRepository={selectedRepository} />
    </div>
  )
}

export default RepoDetail