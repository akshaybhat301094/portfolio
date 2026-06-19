"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ContactShader } from '@/components/shaders/ContactShader';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      await fetch("https://formsubmit.co/ajax/akshaybhat301094@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      });
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 overflow-hidden relative flex flex-col">
      <ContactShader variant="page" />

      <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-12 group relative z-10 w-fit">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Matrix
      </Link>

      <div className="max-w-xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Let's Connect</h1>
          <p className="text-xl text-zinc-400">Open to discussing frontend architecture consulting, AI workflow implementation, and other exciting opportunities.</p>
        </div>

        {status === 'success' ? (
          <div className="p-8 rounded-2xl border border-[#4FC08D]/50 bg-[#4FC08D]/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-[#4FC08D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(79,192,141,0.5)]">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-[#4FC08D]">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-[#5606ff] focus:ring-1 focus:ring-[#5606ff] outline-none transition-all text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-[#5606ff] focus:ring-1 focus:ring-[#5606ff] outline-none transition-all text-white"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
              <textarea 
                id="message" 
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-[#5606ff] focus:ring-1 focus:ring-[#5606ff] outline-none transition-all text-white resize-none"
                placeholder="How can I help you?"
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>

      <div className="relative z-10 mt-16 text-center">
        <p className="text-zinc-500 mb-6">Or find me on</p>
        <div className="flex items-center justify-center gap-6">
          <a 
            href="https://in.linkedin.com/in/akshaybhat301094" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-white hover:text-[#0077b5] transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="font-medium">LinkedIn</span>
          </a>
          <a 
            href="https://www.instagram.com/akshaybhat301094/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-white hover:text-[#E1306C] transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-medium">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
