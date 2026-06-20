"use client";

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { ExperienceShader } from '@/components/shaders/ExperienceShader';
import { AdobeIcon } from '@/components/icons/AdobeIcon';
import { NagarroIcon } from '@/components/icons/NagarroIcon';
import { InfosysIcon } from '@/components/icons/InfosysIcon';
import { FidelityIcon } from '@/components/icons/FidelityIcon';
import { ZetaIcon } from '@/components/icons/ZetaIcon';

const experiences = [
  {
    company: 'Adobe',
    role: 'Computer Scientist 2',
    period: 'Oct 2021 - Present',
    location: 'Bengaluru, India',
    bullets: [
      'Infrastructure Leadership: Led the transition of Adobe Advertising Cloud from legacy architecture to a next-gen Nx mono-repo, drastically increasing developer velocity and reducing build times.',
      'UI System Overhaul: Standardized the UI layer by migrating 30+ custom components to Web Components, ensuring alignment with the Adobe Spectrum design system.',
      'Team Management: Directed a high-performing team of 6+ engineers across the full feature lifecycle, from initial architecture to global production delivery.',
      'AI Workflow Engineering: Pioneered the use of AI-driven tools (Devin, Cursor) to automate boilerplate and accelerate rapid prototyping for complex features.'
    ]
  },
  {
    company: 'Zeta Suite',
    role: 'SDE-2',
    period: 'Aug 2021 - Oct 2021',
    location: 'Bengaluru, India',
    bullets: [
      'Sodexo Project: Worked on building a comprehensive marketplace store using Vue.js during a fast-paced short stint.'
    ]
  },
  {
    company: 'Nagarro',
    role: 'Associate Staff Engineer',
    period: 'Aug 2019 - Aug 2021',
    location: 'Gurugram, India',
    bullets: [
      'System Development: Spearheaded the end-to-end design and implementation of complex UI systems, including high-volume data grids and a custom Document Viewer.',
      'Performance Gains: Achieved a 30% performance improvement in data processing by offloading complex operations to background processing threads.',
      'Memory Management: Conducted expert-level memory profiling using Chrome DevTools to identify and eliminate critical memory leaks in legacy modules.'
    ]
  },
  {
    company: 'Fidelity International',
    role: 'Analyst Programmer',
    period: 'May 2019 - Aug 2019',
    location: 'Gurugram, India',
    bullets: [
      'Financial Systems: Engineered a pension tracking and transfer tool for UK-based users, integrating it into a major new investment management platform.'
    ]
  },
  {
    company: 'Infosys',
    role: 'Senior Systems Engineer',
    period: 'Dec 2016 - Apr 2019',
    location: 'Bangalore, India',
    bullets: [
      'Application Delivery: Successfully launched high-impact features for new applications, including a Google Maps-based community interface and a responsive planning framework.'
    ]
  }
];

export default function Experience() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#5606ff] selection:text-white p-6 md:p-24 overflow-hidden relative">
      <ExperienceShader variant="page" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-border-flow {
          animation: borderFlow 3s linear infinite;
        }
      `}} />



      <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group relative z-10">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Matrix
      </Link>

      <div className="max-w-4xl mx-auto relative z-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Experience Timeline</h1>

        <div className="mb-16 max-w-3xl text-lg text-zinc-400 leading-relaxed border-l-2 border-[#5606ff] pl-6 py-2 bg-gradient-to-r from-[#5606ff]/10 to-transparent rounded-r-xl">
          <p>
            With over <strong className="text-white">9 years of professional experience</strong>, I specialize in building robust frontend architectures and enterprise-grade applications. From spearheading next-generation <strong className="text-white">Nx mono-repos</strong> and <strong className="text-white">Web Components</strong> at Adobe, to engineering high-performance interfaces at Nagarro, Zeta Suite, and Fidelity International, my journey is defined by a passion for creating seamless, scalable, and AI-powered user experiences.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent pt-12">
          
          {/* Top Node (2026) */}
          <div className="relative flex items-center justify-between group w-full mb-16 z-20">
            {/* Left side (Desktop) */}
            <div className="hidden md:flex w-[calc(50%-3rem)] justify-end pr-8">
              <span className="text-3xl font-bold font-mono text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                2026
              </span>
            </div>
            
            {/* Center Node */}
            <div className="absolute left-[1.25rem] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#5606ff] bg-black shadow-[0_0_15px_#5606ff] z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>

            {/* Right side (Mobile) */}
            <div className="md:hidden ml-16 text-2xl font-bold font-mono text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              2026
            </div>
          </div>

          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              id={exp.company.toLowerCase()}
              className="relative flex items-center justify-between group is-active animate-fade-up focus:outline-none cursor-pointer"
              style={{ animationDelay: `${0.2 + (index * 0.15)}s` }}
              tabIndex={0}
            >
              {/* Glowing Timeline Segment on Hover/Focus */}
              <div className="absolute top-0 bottom-0 left-[1.25rem] md:left-1/2 w-0.5 -translate-x-px md:-translate-x-1/2 bg-[#ff810a] opacity-0 group-hover:opacity-100 group-focus:opacity-100 shadow-[0_0_15px_#ff810a] transition-opacity duration-500 z-0" />

              {/* Date (Left Side - Desktop Only) */}
              <div className="hidden md:flex w-[calc(50%-3rem)] justify-end pr-8 relative z-20">
                <span className="text-2xl font-mono text-[#73bfc4] font-semibold tracking-wider group-hover:text-white group-focus:text-white transition-colors duration-300 drop-shadow-md">
                  {exp.period.split(' - ')[0]}
                </span>
              </div>

              {/* Node (Center) */}
              <div className="absolute left-[1.25rem] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-zinc-900 group-hover:scale-125 group-focus:scale-125 group-hover:bg-[#ff810a] group-focus:bg-[#ff810a] group-hover:border-[#ff810a]/30 group-focus:border-[#ff810a]/30 group-hover:shadow-[0_0_20px_rgba(255,129,10,0.6)] group-focus:shadow-[0_0_20px_rgba(255,129,10,0.6)] text-white shadow shrink-0 transition-all duration-300 z-20">
                <div className="w-2 h-2 rounded-full bg-white group-hover:scale-150 group-focus:scale-150 transition-transform duration-300" />
                
                {/* Horizontal Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-8 h-0.5 bg-zinc-800 group-hover:bg-[#ff810a] group-focus:bg-[#ff810a] group-hover:shadow-[0_0_10px_#ff810a] group-focus:shadow-[0_0_10px_#ff810a] transition-all duration-300 -z-10" />
              </div>

              {/* Card (Right Side) */}
              <div className="w-[calc(100%-4rem)] ml-[4rem] md:ml-0 md:w-[calc(50%-3rem)] relative p-[1px] rounded-2xl transition-all duration-300 group-hover:-translate-y-2 group-focus:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(255,129,10,0.15)] group-focus:shadow-[0_15px_40px_rgba(255,129,10,0.15)] z-10 group/card">
                {/* Default border */}
                <div className="absolute inset-0 rounded-2xl border border-zinc-800/50 group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-300" />
                
                {/* Animated gradient background (acting as glowing border) */}
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,transparent,rgba(255,129,10,0.8),rgba(86,6,255,0.8),transparent)] bg-[length:200%_100%] animate-border-flow opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />
                
                {/* Inner Card Content */}
                <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-5 md:p-6">
                  <div className="flex flex-col mb-4">
                  {/* Top Row: Logo and Date */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3 sm:gap-0">
                    <span className="flex items-center h-8">
                      {exp.company === 'Adobe' ? <AdobeIcon className="w-20 h-auto text-[#eb1000] drop-shadow-[0_0_8px_rgba(235,16,0,0.5)]" /> :
                        exp.company === 'Zeta Suite' ? <ZetaIcon className="w-12 h-auto" /> :
                          exp.company === 'Nagarro' ? <NagarroIcon className="w-[135px] h-auto" /> :
                            exp.company === 'Fidelity International' ? <FidelityIcon className="w-[115px] h-auto text-white" /> :
                              exp.company === 'Infosys' ? <InfosysIcon className="w-24 h-auto text-white" /> :
                                exp.company}
                    </span>
                    <div className="text-left sm:text-right shrink-0 mt-2 sm:mt-0">
                      <span className="md:hidden text-[#73bfc4] font-mono text-sm block">{exp.period}</span>
                      <span className="hidden md:block text-zinc-500 font-mono text-xs uppercase tracking-wider">{exp.period}</span>
                    </div>
                  </div>
                  
                  {/* Bottom Row: Role and Location */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
                    <h3 className="text-xl md:text-2xl font-bold pr-4">{exp.role}</h3>
                    <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit shrink-0 backdrop-blur-md transition-all group-hover:border-white/20 group-focus:border-white/20 group-hover:bg-white/10 group-focus:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] group-focus:shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#ff810a] group-focus:text-[#ff810a] transition-colors" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, i) => {
                    const [title, desc] = bullet.split(': ');
                    return (
                      <li key={i} className="text-zinc-400 text-sm leading-relaxed">
                        {desc ? (
                          <>
                            <strong className="text-zinc-200">{title}: </strong>
                            {desc}
                          </>
                        ) : (
                          bullet
                        )}
                      </li>
                    );
                  })}
                </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
