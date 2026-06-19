import Link from 'next/link';
import { motion } from 'framer-motion';
import { SkillsShader } from '@/components/shaders/SkillsShader';

// Simple SVGs for logos
const techStack = [
  { name: 'Angular', color: '#DD0031', svg: '<svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><path d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" fill="#dd0031"/><path d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1z" fill="#c3002f"/><path d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 133.6H108l17-42.5 17 42.5z" fill="#fff"/></svg>' },
  { name: 'React', color: '#61DAFB', svg: '<svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>' },
  { name: 'TypeScript', color: '#3178C6', svg: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#3178C6" d="M2.748 0h122.504c1.516 0 2.748 1.232 2.748 2.748v122.504c0 1.516-1.232 2.748-2.748 2.748H2.748C1.232 128 0 126.768 0 125.252V2.748C0 1.232 1.232 0 2.748 0z"/><path fill="#FFF" d="M72.046 64.912c-5.83-2.613-8.814-4.524-8.814-8.125 0-3.328 2.872-5.748 7.558-5.748 5.485 0 8.788 2.215 11.236 5.86l8.802-6.52c-3.69-5.59-8.917-9.39-20.038-9.39-11.854 0-19.467 6.843-19.467 16.536 0 10.155 7.42 14.28 17.067 18.5 6.786 2.96 10.378 5.253 10.378 9.324 0 4.195-3.393 6.643-8.814 6.643-6.61 0-11.134-3.13-14.398-7.98l-9.18 6.452c4.323 7.026 10.978 11.536 23.633 11.536 12.825 0 20.897-6.842 20.897-17.332 0-10.428-7.393-14.545-18.86-19.756zM32.88 43.12V100H44.8V53.646h17.92V43.12H32.88z"/></svg>' },
  { name: 'Vue.js', color: '#4FC08D', svg: '<svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h51.2L128 132.48z"/><path fill="#35495E" d="M204.8 0H153.6L128 44.16 102.4 0H51.2L128 132.48z"/></svg>' },
  { name: 'JavaScript', color: '#F7DF1E', svg: '<svg viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg"><path fill="#f7df1e" d="M0 0h630v630H0z"/><path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/></svg>' },
  { name: 'Nx', color: '#143055', svg: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path d="M50.419 70.366l31.11-47.01h26.49l-44.3 66.86-13.3-19.85z" fill="#0F172A"/><path d="M72.039 120L11.98 29.356v90.643H0V0h13.279L73.34 90.643V0h11.98v120z" fill="#0EA5E9"/></svg>' }
];

export default function Skills() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#5606ff] selection:text-white pb-20">
      <SkillsShader variant="page" />
      <div className="relative z-10 p-8 md:p-24">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Matrix
        </Link>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Core Technical Skills</h1>
          <p className="text-xl text-zinc-400 mb-16 max-w-2xl">Specialist in Angular and modern JavaScript ecosystems, with deep expertise in state management, mono-repos, and Web Components.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-800/50 flex flex-col items-center justify-center gap-6 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: tech.color }} />
                <div 
                  className="w-16 h-16 relative z-10 transition-transform duration-500 group-hover:scale-110"
                  dangerouslySetInnerHTML={{ __html: tech.svg }}
                />
                <span className="font-medium tracking-wide relative z-10">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
