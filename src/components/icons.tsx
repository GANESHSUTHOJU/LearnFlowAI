import {
    Circle,
    Star,
    CheckCircle,
    XCircle,
    LucideIcon,
  } from 'lucide-react';
  
  export const Icons = {
    circle: Circle,
    star: Star,
    check: CheckCircle,
    cross: XCircle,
  };
  
  export type IconKey = keyof typeof Icons;
  
  export const getIcon = (key: IconKey): LucideIcon => {
    return Icons[key];
  };
