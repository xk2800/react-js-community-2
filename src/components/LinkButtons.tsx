import React from 'react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// Define the repository interface
interface Repository {
  html_url: string;
  homepage?: string;
}

interface GitHubButtonsProps {
  selectedRepository: Repository;
}

const LinkButtons: React.FC<GitHubButtonsProps> = ({ selectedRepository }) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button className="border border-green-500 hover:bg-green-500 hover:border-black hover:text-black transition-all duration-300 ease-in-out cursor-pointer w-full h-full">
                <Link
                  to={selectedRepository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wrap"
                >
                  View on GitHub
                </Link>
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent className="text-green-500">
            <p>Leaving so soon?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {selectedRepository.homepage && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button className="border border-green-500 hover:bg-green-500 hover:border-black hover:text-black transition-all duration-300 ease-in-out cursor-pointer w-full h-full">
                  <Link
                    to={selectedRepository.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wrap"
                  >
                    View the website
                  </Link>
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent className="text-green-500">
              <p>Leaving so soon?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default LinkButtons;