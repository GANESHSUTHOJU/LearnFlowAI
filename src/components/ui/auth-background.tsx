"use client";
import React from 'react';
import { motion } from 'framer-motion';

const AuthBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 -z-10 h-full w-full overflow-hidden"
    >
      <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-x-slow-1"></div>
      <div className="absolute -right-40 -bottom-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float-x-slow-2"></div>
      <div className="absolute left-1/3 top-1/4 h-56 w-56 rounded-full bg-primary/10 blur-2xl animate-float-x-fast-1"></div>
      <div className="absolute right-1/3 bottom-1/4 h-56 w-56 rounded-full bg-accent/10 blur-2xl animate-float-x-fast-2"></div>
    </motion.div>
  );
};

export default AuthBackground;
