import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="fixed bg-background top-0 w-full z-50">
      <div className="relative flex flex-col md:flex-row justify-between items-center p-4">
        <h1 className="text-2xl font-bold">
          <Link to={'/'}>
            React Community Repositories
          </Link>
        </h1>
      </div>
    </header>
  )
}

export default Header