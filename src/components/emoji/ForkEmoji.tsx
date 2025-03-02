import { GitFork } from "lucide-react";

const ForkEmoji = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-lg size-5 transition-transform duration-300 ease-in-out">
        {isHovered ? "🍴" : <GitFork className="size-5" />}
      </div>
    </div>
  );
};

export default ForkEmoji;