import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ExternalLink } from "lucide-react";

interface Repository {
  html_url: string;
  homepage?: string;
}

const ExternalLinkCard = ({ selectedRepository }: { selectedRepository: Repository }) => {
  const handleExternalLink = (url: string) => {
    // For external URLs, open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>
          Like clicking buttons?
        </CardTitle>
        <CardDescription>
          Try clicking on a button to be transported to another website!
          <p className='text-xs'>psssss....But why would you even want to leave this cool website?</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button onClick={() => handleExternalLink(selectedRepository.html_url)} className="border-1 border-[#49f627] hover:bg-[#49f627] hover:border-black hover:text-black transition-all duration-300 ease-in-out cursor-pointer w-full h-full">
                  <Link
                    to={selectedRepository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-wrap flex gap-2 items-center'
                  >
                    View on GitHub <ExternalLink />
                  </Link>
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent className='text-[#49f627]'>
              <p>Leaving so soon?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


        {selectedRepository.homepage && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button onClick={() => selectedRepository.homepage && handleExternalLink(selectedRepository.homepage)} className="border-1 border-[#49f627] hover:bg-[#49f627] hover:border-black hover:text-black transition-all duration-300 ease-in-out cursor-pointer w-full h-full">
                    <Link
                      to={selectedRepository.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-wrap flex gap-2 items-center'
                    >
                      View the website <ExternalLink />
                    </Link>
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent className='text-[#49f627]'>
                <p>Leaving so soon?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

      </CardFooter>
    </Card>
  );
}

export default ExternalLinkCard;