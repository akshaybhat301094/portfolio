"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { HeroShader } from '@/components/shaders/HeroShader';
import { ProjectShader } from '@/components/shaders/ProjectShader';
import { Preloader } from '@/components/ui/Preloader';
import { StickyCardStack } from '@/components/ui/StickyCardStack';
import { MatrixRain } from '@/components/ui/MatrixRain';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem('hasVisited');
    if (visited) {
      setHasVisited(true);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#5606ff] selection:text-white font-sans">
      {!hasVisited && (
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
      )}
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <HeroShader />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 space-y-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 drop-shadow-2xl">
            Akshay Bhat
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl font-light tracking-wide">
            Senior Frontend Architect.
            <br className="hidden md:block"/> Angular Specialist. AI Workflow Pioneer.
          </p>
          
          <button 
            id="start-demo-btn"
            className="mt-12 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 shadow-[0_0_40px_rgba(86,6,255,0.3)] hover:shadow-[0_0_60px_rgba(254,137,137,0.5)] transform hover:-translate-y-1"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe8989] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe8989]"></span>
            </span>
            Start AI Demo
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-white/50">
           <span className="text-xs uppercase tracking-widest mb-2 font-semibold">Explore</span>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
        </div>
      </section>

      {/* Bento Grid Content Section */}
      <section className="relative z-10 bg-black py-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="sticky top-0 w-full h-screen">
            <MatrixRain />
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Matrix.</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">A mapping of my professional knowledge graph. The AI Demo Agent will navigate these nodes dynamically based on your conversation.</p>
          </div>

          <StickyCardStack 
            cards={[
              {
                id: 'experience',
                title: 'Professional Experience',
                description: 'My career journey from Infosys to Adobe, leading large-scale infrastructure migrations, optimizing performance, and integrating AI workflows.',
                route: '/experience',
                tags: ['#adobe', '#nagarro', '#fidelity', '#infosys'],
                shaderType: 'experience'
              },
              {
                id: 'projects',
                title: 'Featured Projects',
                description: 'Live interactive previews of my recent architectural and frontend projects including NameApp and AI Resume Builder.',
                route: '/projects',
                tags: ['#nameapp', '#resume-builder'],
                shaderType: 'project'
              },
              {
                id: 'skills',
                title: 'Core Skills',
                description: 'Specialist in Angular, React, Vue, TypeScript, and RxJS.',
                route: '/skills',
                tags: ['#angular', '#react', '#typescript'],
                shaderType: 'skills'
              },
              {
                id: 'contact',
                title: 'Contact Me',
                description: 'Get in touch for architecture consulting or collaborations.',
                route: '/contact',
                tags: ['#contact-form'],
                shaderType: 'contact'
              }
            ]}
          />
        </div>
      </section>
    </main>
  );
}
