"use client";

import React from "react";
import Parallax from "react-parallax-mouse";

const ParallaxAnimation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Parallax.MouseParallax>
      <Parallax.MouseParallaxChild
        factorX={0.02}
        factorY={0.02}
        className="transition-transform duration-500 ease-out"
      >
        {children}
      </Parallax.MouseParallaxChild>
    </Parallax.MouseParallax>
  );
};

export default ParallaxAnimation;
