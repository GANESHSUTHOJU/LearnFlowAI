import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <BrainCircuit {...props} />
  );
}
