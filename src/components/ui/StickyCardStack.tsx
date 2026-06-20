"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ExperienceShader } from "@/components/shaders/ExperienceShader";
import { ProjectShader } from "@/components/shaders/ProjectShader";
import { SkillsShader } from "@/components/shaders/SkillsShader";
import { ContactShader } from "@/components/shaders/ContactShader";
import { AboutShader } from "@/components/shaders/AboutShader";

interface CardData {
  id: string;
  title: string;
  description: string;
  route: string;
  tags: string[];
  shaderType: string;
}

interface StickyCardProps {
  card: CardData;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StickyCard = ({ card, i, progress, range, targetScale }: StickyCardProps) => {
  const containerRef = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 pointer-events-none">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 30}px)` }}
        className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-900 shadow-2xl origin-top pointer-events-auto"
      >
        <Link href={card.route} className="block w-full h-full relative group">
          <div className="absolute inset-0 z-0">
            {card.shaderType === 'experience' && <ExperienceShader variant="card" />}
            {card.shaderType === 'project' && <ProjectShader variant="card" />}
            {card.shaderType === 'skills' && <SkillsShader variant="card" />}
            {card.shaderType === 'contact' && <ContactShader variant="card" />}
            {card.shaderType === 'about' && <AboutShader variant="card" />}
          </div>

          <div className="relative z-20 h-full flex flex-col p-8 md:p-14 bg-black/40 backdrop-blur-[2px]">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex text-xs font-mono px-4 py-2 rounded-full bg-black/60 border border-zinc-700 text-[#fe8989]">
                {card.route}
              </div>
              <div className="text-zinc-500 group-hover:text-[#5606ff] transition-colors p-2 bg-black/40 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
            </div>

            <h3 className="font-bold tracking-tight mb-4 text-3xl md:text-5xl text-white">
              {card.title}
            </h3>
            
            <p className="text-zinc-300 leading-relaxed mb-8 flex-grow text-base md:text-xl max-w-3xl">
              {card.description}
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-3 pt-6 border-t border-zinc-800/50">
                {card.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 md:px-4 rounded-md bg-black/60 border border-zinc-800 text-xs md:text-sm text-zinc-400 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export function StickyCardStack({ cards }: { cards: CardData[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative w-full mt-20">
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <StickyCard
            key={card.id}
            i={i}
            card={card}
            progress={scrollYProgress}
            range={[i * (1 / cards.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
