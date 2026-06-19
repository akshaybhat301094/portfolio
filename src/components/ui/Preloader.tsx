"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const words = [
  "Hello", 
  "Bonjour", 
  "Ciao", 
  "Olá", 
  "やあ", 
  "Hallå", 
  "Guten tag", 
  "Hallo"
];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      exit="exit" 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white"
    >
      {dimension.width > 0 && (
        <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none">
          <motion.path 
            variants={curve} 
            initial="initial" 
            exit="exit" 
            fill="#09090b"
          />
        </svg>
      )}

      <div className="flex items-center justify-center text-4xl md:text-5xl font-medium tracking-tight relative z-10">
        <div className="relative h-16 w-64 flex items-center justify-center text-center">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute m-0 w-full text-center"
          >
            {words[index]}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
