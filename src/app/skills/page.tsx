"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillsShader } from '@/components/shaders/SkillsShader';
import {
  AngularIcon,
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  ClaudeIcon,
  CursorIcon,
  CodexIcon,
  AntigravityIcon,
  CopilotIcon,
  HTML5Icon,
  CSSIcon,
} from '@/components/icons';

const techStack = [
  { name: 'Angular', color: '#DD0031', Icon: AngularIcon },
  { name: 'React', color: '#61DAFB', Icon: ReactIcon },
  { name: 'TypeScript', color: '#3178C6', Icon: TypeScriptIcon },
  { name: 'HTML5', color: '#E34F26', Icon: HTML5Icon },
  { name: 'CSS3', color: '#1572B6', Icon: CSSIcon },
  { name: 'JavaScript', color: '#F7DF1E', Icon: JavaScriptIcon }
];

const aiTools = [
  { name: 'Claude', color: '#D97757', Icon: ClaudeIcon },
  { name: 'Cursor', color: '#FFFFFF', Icon: CursorIcon },
  { name: 'Codex', color: '#10B981', Icon: CodexIcon },
  { name: 'Antigravity', color: '#8B5CF6', Icon: AntigravityIcon },
  { name: 'Copilot', color: '#6366F1', Icon: CopilotIcon }
];

function SkillShowcase({ items, placeholder }: { items: any[], placeholder: string }) {
  const [hoveredItem, setHoveredItem] = useState<any | null>(null);

  const isLongWord = hoveredItem && hoveredItem.name.length > 8;
  const activeTextClass = isLongWord
    ? "text-[10vw] md:text-[6rem] lg:text-[8rem]"
    : "text-[13vw] md:text-[8rem] lg:text-[11rem]";
  
  const defaultTextClass = "text-[13vw] md:text-[8rem] lg:text-[11rem]";

  return (
    <div className="flex flex-col items-center justify-center mb-24 w-full">
      <div className="flex flex-wrap justify-center items-end gap-3 mb-8 relative z-20 h-32">
        {items.map((item) => {
          const isHovered = hoveredItem?.name === item.name;
          return (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-20 h-20 rounded-2xl bg-zinc-900 border transition-all duration-300 ease-out flex items-center justify-center cursor-pointer origin-bottom
                ${isHovered ? 'scale-150 border-zinc-400 bg-zinc-800 z-20 shadow-2xl mx-4' : 'border-zinc-800 opacity-60 hover:opacity-100 z-10'}
              `}
            >
              <div className="w-10 h-10 transition-transform duration-300">
                <item.Icon className="w-full h-full" style={{ color: isHovered ? item.color : '#888' }} />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="h-32 md:h-64 w-full flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {hoveredItem ? (
            <motion.h2
              key={hoveredItem.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`${activeTextClass} w-full text-center leading-none font-black uppercase tracking-tighter drop-shadow-2xl text-white`}
            >
              {hoveredItem.name}
            </motion.h2>
          ) : (
            <motion.h2
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${defaultTextClass} w-full text-center leading-none font-black uppercase tracking-tighter text-white drop-shadow-2xl mix-blend-overlay`}
            >
              {placeholder}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#5606ff] selection:text-white pb-20 overflow-hidden">
      <SkillsShader variant="page" />
      <div className="relative z-10 p-8 md:p-24">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Matrix
        </Link>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-xl text-zinc-400 max-w-2xl mt-8 mb-24">Hover over the icons below to reveal the technologies I use to build robust applications and accelerate development.</p>

          <SkillShowcase items={techStack} placeholder="SKILLS" />
          <SkillShowcase items={aiTools} placeholder="TOOLS" />
        </div>
      </div>
    </main>
  );
}
