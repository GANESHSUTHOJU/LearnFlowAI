import { BrainCircuit } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return <BrainCircuit className={className} />;
};
