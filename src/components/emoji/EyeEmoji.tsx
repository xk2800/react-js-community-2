import { Eye } from "lucide-react";

const EyeEmoji = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-lg size-5 transition-transform duration-300 ease-in-out">
        {isHovered ? "👀" : <Eye className="size-5" />}
      </div>
    </div>
  );
};

export default EyeEmoji;