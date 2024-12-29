import { LucideIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: "default" | "destructive" | null | undefined;
}

const CustomAlert = ({
  icon: Icon,
  title,
  description,
  className = "default",
}: AlertProps) => {
  return (
    <div className="h-screen w-screen bg-transparent flex items-center justify-center absolute z-50">
      <Alert variant={className} className="bg-white w-2/6">
        {Icon && <Icon className="h-4 w-4" />}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    </div>
  );
};

export default CustomAlert;