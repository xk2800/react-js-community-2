import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchRepositories } from '../features/repositories/repositoriesSlice'

const SearchBar = () => {
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
    <form onSubmit={handleSearch} className="w-full md:w-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg> */}
      </div>
    </form>
  )
}

export default SearchBar