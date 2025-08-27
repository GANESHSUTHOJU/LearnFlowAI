
"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxAnimationProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  maxRotation?: number;
  scale?: number;
  transitionSpeed?: number;
}

const ParallaxAnimation: React.FC<ParallaxAnimationProps> = ({
  children,
  className,
  perspective = 1000,
  maxRotation = 5,
  scale = 1.05,
  transitionSpeed = 0.3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('none');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const xPercent = (x / width - 0.5) * 2;
      const yPercent = (y / height - 0.5) * 2;

      const rotateY = xPercent * maxRotation;
      const rotateX = -yPercent * maxRotation;
      
      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
    };

    const handleMouseLeave = () => {
      setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    };
    
    const handleMouseEnter = () => {
        container.style.transition = `transform ${transitionSpeed}s cubic-bezier(0.23, 1, 0.32, 1)`;
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [perspective, maxRotation, scale, transitionSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn("transform-style-3d", className)}
      style={{
        transform: transform,
        transition: `transform ${transitionSpeed}s cubic-bezier(0.23, 1, 0.32, 1)`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxAnimation;
