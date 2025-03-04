import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RepositoryStatCardProps } from "@/types/types";
// import { cn } from "@/lib/utils";
import { useState } from "react";


const RepositoryStatCard: React.FC<RepositoryStatCardProps> = ({ title, value, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`transition-transform duration-300 ease-in-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {typeof title === "function" ? title(isHovered) : title}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-semibold text-xl text-[#49f627]/80">{value}</CardContent>
    </Card>
  );
};

export default RepositoryStatCard;
