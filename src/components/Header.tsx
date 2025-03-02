import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          React Community Repositories
        </h1>
      </div>
    </header>
  )
}

export default Header