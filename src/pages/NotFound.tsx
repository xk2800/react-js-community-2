import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden">
      <p className="mb-4 text-2xl">Looks like we hit a stang, we were not able to find the page you were looking for.</p>
      <p className="mb-2 text-xl">Let's try that again.</p>
      <Button
        asChild
        className="border-1 border-[#49f627] hover:bg-[#49f627] hover:border-black hover:text-black transition-all duration-300 ease-in-out cursor-pointer"
      >
        <Link to={'/'}>Homepage</Link>
      </Button>
    </div>
  );
}

export default NotFound;