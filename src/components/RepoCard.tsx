import { RepoCardProps } from '../types/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { parseISO, format } from 'date-fns'


const RepoCard = ({ repo, onClick, counter }: RepoCardProps) => {

  const date = parseISO(repo.updated_at)
  const formattedDate = format(date, 'dd MMMM yyyy')

  return (
    <>
      <Card onClick={onClick} className='cursor-pointer hover:shadow-xl hover:shadow-[#49f627] hover:-translate-2 transition-all duration-300 ease-in-out justify-between'>
        <CardHeader>
          <CardTitle>{counter}. {repo.name}</CardTitle>
          <CardDescription>{repo.description || 'No description available'}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm'>{repo.language || 'Opps, I think there is no language for this'}</p>
        </CardContent>
        <CardFooter className='text-xs'>
          Last updated at: {formattedDate}
        </CardFooter>
      </Card>
    </>
  )
}

export default RepoCard