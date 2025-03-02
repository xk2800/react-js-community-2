import { Code } from "lucide-react";

const LanguageEmoji = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-lg size-5 transition-transform duration-300 ease-in-out">
        {isHovered ? "👨🏻‍💻" : <Code className="size-5" />}
      </div>
    </div>
  );
};

export default LanguageEmoji;