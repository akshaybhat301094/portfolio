import Link from 'next/link';
import { ProjectShader } from '@/components/shaders/ProjectShader';

const projects = [
  {
    name: 'NameApp',
    url: 'https://nameapp.in/',
    description: 'A platform to help you discover and purchase the perfect domain name for your next big idea.'
  },
  {
    name: 'AI Resume Builder',
    url: 'https://resume-ai-six-ashen.vercel.app/',
    description: 'An intelligent application that uses AI to help you construct a professional, high-impact resume in minutes.'
  },
  {
    name: 'EqLens',
    url: 'https://www.eqlens.co.in/',
    description: 'Advanced Market Ripple Explorer. Trace news impacts and cascading effects across Indian and Global equities with AI-driven intelligence.'
  },
  {
    name: 'Flokk',
    url: 'https://www.flokk.in/',
    description: 'A community-driven travel platform that helps people connect through travel.'
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 overflow-hidden relative">
      <ProjectShader variant="page" />
      <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group relative z-10">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Matrix
      </Link>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Featured Projects</h1>
        <p className="text-xl text-zinc-400 mb-16 max-w-2xl">Live previews of some of my recent work. Feel free to interact with them directly inside these embedded browsers.</p>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div key={project.name} id={`project-card-${idx+1}`} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
                  <p className="text-zinc-400 max-w-xl">{project.description}</p>
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:text-[#fe8989] transition-colors text-sm font-medium">
                  Open in new tab
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Browser Mockup Wrapper */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-2xl">
                {/* Browser Header */}
                <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="mx-auto bg-black/50 px-4 py-1 rounded-md text-xs text-zinc-500 font-mono select-all flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {project.url}
                  </div>
                </div>
                
                {/* iframe */}
                <div className="w-full h-[400px] bg-white relative">
                  <iframe 
                    src={project.url}
                    className="w-full h-full border-0"
                    title={project.name}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
