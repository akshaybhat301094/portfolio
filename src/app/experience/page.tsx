"use client";

import Link from 'next/link';
import { ExperienceShader } from '@/components/shaders/ExperienceShader';

const experiences = [
  {
    company: 'Adobe',
    role: 'Computer Scientist 2 (Senior Engineer)',
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
    <main className="min-h-screen bg-black text-white selection:bg-[#5606ff] selection:text-white p-8 md:p-24 overflow-hidden relative">
      <ExperienceShader variant="page" />
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}} />



      <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group relative z-10">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Matrix
      </Link>

      <div className="max-w-4xl mx-auto relative z-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-5xl md:text-7xl font-bold mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Experience Timeline</h1>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              id={exp.company.toLowerCase()}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-fade-up"
              style={{ animationDelay: `${0.2 + (index * 0.15)}s` }}
            >

              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-zinc-900 group-hover:bg-[#ff810a] group-hover:border-[#ff810a]/30 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 relative z-10">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors backdrop-blur-md shadow-2xl">
                <div className="flex flex-col mb-4">
                  <span className="text-[#73bfc4] font-mono text-sm mb-1">{exp.period}</span>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl text-zinc-300">{exp.company}</span>
                    <span className="text-sm text-zinc-500">{exp.location}</span>
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
          ))}
        </div>
      </div>
    </main>
  );
}
