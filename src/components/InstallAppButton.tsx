import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { Download } from "lucide-react";

interface InstallAppButtonProps {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
  className?: string;
}

export function InstallAppButton({
  variant = "outline",
  size = "sm",
  showLabel = true,
  className,
}: InstallAppButtonProps) {
  const { isInstallable, install, installing } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={install}
            disabled={installing}
            className={className}
          >
            <Download className="h-4 w-4" />
            {showLabel && (
              <span className="ml-1.5">{installing ? "Installera..." : "Installera appen"}</span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Lägg till Håll koll på Tempen på enheten och öppna som app</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
