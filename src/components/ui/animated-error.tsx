"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const AnimatedError = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive"
    >
      <XCircle className="h-5 w-5 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
};

export default AnimatedError;
