import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface RepositoryStatCardProps {
  title: ReactNode | ((isHovered: boolean) => ReactNode)
  value: string | number
  className?: string
}

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
      <CardContent>{value}</CardContent>
    </Card>
  );
};

export default RepositoryStatCard;
