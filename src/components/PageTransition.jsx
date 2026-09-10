import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children, pageKey }) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
