import { Repository } from '../types/types'
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface RepoCardProps {
  repo: Repository
  counter: number
  onClick: () => void
}

const RepoCard = ({ repo, onClick, counter }: RepoCardProps) => {
  return (
    <>
      <Card onClick={onClick} className='cursor-pointer hover:shadow-xl hover:shadow-rose-900 hover:-translate-2 transition-all duration-300 ease-in-out justify-between'>
        <CardHeader>
          <CardTitle>{counter}. {repo.name}</CardTitle>
          <CardDescription>{repo.description || 'No description available'}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-xs'>{repo.language || 'No Language available'}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default RepoCard