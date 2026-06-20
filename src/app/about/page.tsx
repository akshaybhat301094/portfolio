"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Camera, Plane, Music, Headphones, Mic2, MapPin, Globe, Heart, Briefcase, ArrowLeft, Dog, Mail } from 'lucide-react';
import { AboutShader } from '@/components/shaders/AboutShader';
import { AdobeIcon } from '@/components/icons/AdobeIcon';
import { NagarroIcon } from '@/components/icons/NagarroIcon';
import { InfosysIcon } from '@/components/icons/InfosysIcon';

export default function About() {
  const calculateAge = () => {
    const dob = new Date(1994, 9, 30); // Month is 0-indexed, so 9 is October
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#5606ff] selection:text-white p-8 md:p-24 overflow-hidden relative">
      <AboutShader variant="page" />
      
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none backdrop-blur-[2px]" />

      <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group relative z-10 w-fit">
        <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Matrix
      </Link>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
          {/* Profile Picture Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(86,6,255,0.4)] mb-8 bg-zinc-900/80 backdrop-blur-sm">
              <Image 
                src="/akshay.webp" 
                alt="Akshay Bhat" 
                fill 
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-white/90">Quick Facts</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="flex items-center text-zinc-500"><MapPin className="w-4 h-4 mr-2"/> Origin</span>
                  <span className="text-white text-right">Jammu and Kashmir</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="flex items-center text-zinc-500"><Globe className="w-4 h-4 mr-2"/> Location</span>
                  <span className="text-white text-right">India</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="flex items-center text-zinc-500"><Heart className="w-4 h-4 mr-2"/> Status</span>
                  <span className="text-white text-right">Married</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="flex items-center text-zinc-500"><Briefcase className="w-4 h-4 mr-2"/> Role</span>
                  <span className="text-white text-right">
                    Computer Scientist 2<br/>
                    <span className="flex items-center justify-end gap-1 mt-1 text-zinc-400">
                      @ <AdobeIcon className="w-12 h-auto text-[#eb1000] drop-shadow-[0_0_8px_rgba(235,16,0,0.5)]" />
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Awards Section */}
            <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full shadow-xl mt-6">
              <h3 className="text-xl font-bold mb-4 text-white/90">Awards</h3>
              <div className="space-y-4 text-sm">
                <div className="flex flex-col border-b border-white/5 pb-3">
                  <span className="font-semibold text-white flex items-center h-6">
                    <AdobeIcon className="w-12 h-auto text-[#eb1000]" />
                  </span>
                  <span className="text-zinc-400 mt-1">Org-level Hackathon Winner, 3x Spot Award</span>
                </div>
                <div className="flex flex-col border-b border-white/5 pb-3">
                  <span className="font-semibold text-white flex items-center h-6 mt-1">
                    <NagarroIcon className="w-24 h-auto" />
                  </span>
                  <span className="text-zinc-400 mt-2">A-Team Award, Cheerboard Award</span>
                </div>
                <div className="flex flex-col pt-1">
                  <span className="font-semibold text-white flex items-center h-6">
                    <InfosysIcon className="w-16 h-auto text-white" />
                  </span>
                  <span className="text-zinc-400 mt-2">3x Insta Award</span>
                </div>
              </div>
            </div>

            {/* Socials Section */}
            <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full shadow-xl mt-6">
              <h3 className="text-xl font-bold mb-4 text-white/90">Connect</h3>
              <div className="space-y-1 text-sm flex flex-col">
                <a 
                  href="mailto:akshaybhat301094@gmail.com"
                  className="flex items-center text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group w-fit"
                >
                  <Mail className="w-5 h-5 mr-3 text-zinc-500 group-hover:text-[#fe8989] transition-colors" />
                  akshaybhat301094@gmail.com
                </a>
                <a 
                  href="https://in.linkedin.com/in/akshaybhat301094" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group w-fit"
                >
                  <svg className="w-5 h-5 mr-3 text-zinc-500 group-hover:text-[#0077b5] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/akshaybhat301094/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group w-fit"
                >
                  <svg className="w-5 h-5 mr-3 text-zinc-500 group-hover:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Bio Content Section */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">About Me.</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-[#5606ff] to-[#fe8989] rounded-full mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-zinc-300 leading-relaxed bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
              <p>
                Hi, I'm <span className="text-white font-semibold">Akshay Bhat</span>. I am currently <span className="text-[#fe8989] font-bold">{calculateAge()} years old</span> (you can wish me a happy birthday every year on October 30th).
              </p>
              
              <p>
                Professionally, I work as a <span className="text-white font-semibold">Computer Scientist 2 at Adobe</span>, where I specialize in frontend architecture, Angular development, and engineering complex, scalable AI workflows.
              </p>

              <p>
                Originally from the beautiful valleys of <span className="text-white font-semibold">Jammu and Kashmir</span>, I'm married and navigating the balance between cutting-edge technology and personal passions.
              </p>

              <div className="pt-6 border-t border-white/10 mt-6">
                <h3 className="text-xl font-bold mb-4 text-white">Interests & Hobbies</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://instagram.com/travegram.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 mr-2 text-zinc-300" /> Photography
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex items-center whitespace-nowrap">
                      <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">@travegram.in</span>
                    </div>
                  </a>
                  <div className="relative group">
                    <a 
                      href="https://youtu.be/XirVFfeOty0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Plane className="w-4 h-4 mr-2 text-zinc-300" /> Traveling
                    </a>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 aspect-video p-1 bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 flex items-center justify-center overflow-hidden invisible group-hover:visible">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/XirVFfeOty0?autoplay=1&mute=1&loop=1&playlist=XirVFfeOty0" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        className="rounded-lg pointer-events-none"
                      ></iframe>
                    </div>
                  </div>
                  <span className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default">
                    <Music className="w-4 h-4 mr-2 text-zinc-300" /> Techno
                  </span>
                  <span className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default">
                    <Headphones className="w-4 h-4 mr-2 text-zinc-300" /> Deep House
                  </span>
                  <span className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default">
                    <Mic2 className="w-4 h-4 mr-2 text-zinc-300" /> Hip Hop
                  </span>
                  <div className="relative group">
                    <span className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default">
                      <Dog className="w-4 h-4 mr-2 text-zinc-300" /> Pets
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col">
                      <span className="text-sm font-bold text-white">Volunteer</span>
                      <span className="text-xs font-semibold text-[#fe8989] mt-0.5">People for Animals</span>
                      <span className="text-[10px] font-mono text-zinc-500 mt-1">Apr 2017 — Present</span>
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                        Assisting with on-site animal rescues, coordinating adoption drives, and organizing awareness campaigns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <iframe 
                  style={{ borderRadius: '12px' }} 
                  src="https://open.spotify.com/embed/playlist/5KdI0G6qeYh1wKGZHofziP?utm_source=generator&theme=0" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="shadow-xl"
                ></iframe>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <h3 className="text-xl font-bold mb-4 text-white">Education</h3>
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white">B.M. Institute of Engineering and Technology</span>
                    <span className="text-sm text-zinc-300 mt-1">Bachelor of Technology (BTech), Electronics and Communications Engineering</span>
                    <span className="text-xs font-mono text-zinc-500 mt-2">2012 — 2016</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white">Udacity</span>
                    <span className="text-sm text-zinc-300 mt-1">Frontend Developer Nanodegree</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white capitalize">Army Public School Udhampur</span>
                    <span className="text-xs font-mono text-zinc-500 mt-2">2003 — 2012</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
