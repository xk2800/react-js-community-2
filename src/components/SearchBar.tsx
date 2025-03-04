import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchRepositories } from '../features/repositories/repositoriesSlice'
import { Label } from './ui/label'
import { Input } from './ui/input'

const SearchBar = ({ userSearchTerm }: { userSearchTerm?: string }) => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce search to avoid too many API calls while typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        dispatch(searchRepositories(searchTerm))
      }
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, dispatch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(searchRepositories(searchTerm))
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="w-full md:w-3/12 mb-4">
        <div className="relative">
          <Label htmlFor='text' className='mb-2'>Search for repositories</Label>
          <Input
            placeholder="Enter your search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus-visible:ring-[#49f627]"
          />
        </div>
      </form>

      {userSearchTerm && (
        <h2 className="text-xl font-semibold mb-4">
          Search results for: "{userSearchTerm}"
        </h2>
      )}
    </div>
  )
}

export default SearchBar