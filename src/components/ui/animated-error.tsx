
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { GlassCard, CardContent } from "@/components/ui/glass-card";
import { RotateCcw } from "lucide-react";

interface AnimatedErrorProps {
  message: string;
  onReset: () => void;
}

export default function AnimatedError({ message, onReset }: AnimatedErrorProps) {
  return (
    <GlassCard>
      <CardContent className="p-8 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <Logo className="w-20 h-20 text-destructive animate-float-subtle" />
          <div className="absolute inset-0 -z-10 bg-destructive/30 rounded-full animate-pulse-glow" />
        </div>
        <h3 className="text-xl font-headline font-bold text-destructive-foreground">An Error Occurred</h3>
        <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
          {message}
        </p>
        <Button onClick={onReset} variant="destructive">
          <RotateCcw className="mr-2" />
          Try Again
        </Button>
      </CardContent>
    </GlassCard>
  );
}
