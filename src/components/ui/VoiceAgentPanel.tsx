"use client";

import { useState, useEffect, useRef } from 'react';
import { LiveKitRoom, useRoomContext, useVoiceAssistant, RoomAudioRenderer } from '@livekit/components-react';
import type { AgentState } from '@livekit/components-react';
import { Mic, MicOff, PhoneOff, Loader2, Sparkles, Volume2, AlertTriangle } from 'lucide-react';
import { RoomEvent } from 'livekit-client';
import { useRouter, usePathname } from 'next/navigation';

export function VoiceAgentPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const pathname = usePathname();
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  
  const handleStartDemo = () => {
    setIsOpen(true);
    startSession();
  };

  useEffect(() => {
    window.addEventListener('start-voice-demo', handleStartDemo);
    return () => {
      window.removeEventListener('start-voice-demo', handleStartDemo);
    };
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setShowFloatingButton(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const startSession = async () => {
    setConnectionError(null);
    setSessionToken(null);
    setServerUrl(null);
    try {
      const response = await fetch('/api/livekit/token');
      if (!response.ok) {
        throw new Error('Failed to retrieve voice session token');
      }
      const data = await response.json();
      setSessionToken(data.token);
      setServerUrl(data.url);
    } catch (err: any) {
      console.error(err);
      setConnectionError(err.message || 'Failed to initialize AI session');
    }
  };

  const handleDisconnect = () => {
    setSessionToken(null);
    setServerUrl(null);
    setIsOpen(false);
  };

  if (!isOpen) {
    if (!showFloatingButton) return null;
    return (
      <button
        onClick={handleStartDemo}
        className="fixed top-6 right-6 z-50 bg-zinc-950/85 backdrop-blur-md border border-white/10 hover:border-[#fe8989]/40 hover:bg-zinc-900 text-white px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(86,6,255,0.15)] hover:shadow-[0_0_30px_rgba(254,137,137,0.35)] hover:-translate-y-0.5 cursor-pointer active:scale-95 group"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe8989] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fe8989]"></span>
        </span>
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
        Talk to AI Twin
      </button>
    );
  }

  return (
    <>
      {(!sessionToken || !serverUrl) ? (
        <HudFrame state={connectionError ? 'error' : 'connecting'}>
          {/* Top HUD Banner */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-4 bg-zinc-950/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#fe8989] animate-pulse" />
              <span className="font-bold tracking-tight text-xs uppercase font-mono text-zinc-300">AI Twin Interface</span>
            </div>
            <button 
              onClick={handleDisconnect}
              className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <PhoneOff className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center status card */}
          <div className="m-auto pointer-events-auto bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_20px_50px_rgba(86,6,255,0.2)]">
            {connectionError ? (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Connection Error</h3>
                <p className="text-xs text-zinc-400">{connectionError}</p>
                <button 
                  onClick={startSession}
                  className="w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl text-xs font-semibold transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 py-4">
                <Loader2 className="w-8 h-8 text-[#5606ff] animate-spin" />
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Establishing Voice Link...</span>
                  <p className="text-xs text-zinc-500">Initializing secure twin connection</p>
                </div>
              </div>
            )}
          </div>
        </HudFrame>
      ) : (
        <LiveKitRoom
          token={sessionToken}
          serverUrl={serverUrl}
          connect={true}
          audio={true}
          video={false}
          onDisconnected={handleDisconnect}
          onError={(err) => setConnectionError(err.message)}
        >
          <VoiceSessionContent onDisconnect={handleDisconnect} />
          <RoomAudioRenderer />
        </LiveKitRoom>
      )}
    </>
  );
}

function HudFrame({ 
  state, 
  children 
}: { 
  state: 'connecting' | 'error' | AgentState; 
  children: React.ReactNode;
}) {
  // Map states to gradient background glow styles
  const getBgGradient = (s: typeof state) => {
    switch (s) {
      case 'connecting':
        return 'bg-[radial-gradient(circle_at_center,rgba(86,6,255,0.02)_0%,rgba(86,6,255,0.08)_100%)]';
      case 'error':
        return 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.02)_0%,rgba(239,68,68,0.08)_100%)]';
      case 'listening':
        return 'bg-[radial-gradient(circle_at_center,rgba(86,6,255,0.03)_0%,rgba(86,6,255,0.12)_100%)]';
      case 'speaking':
        return 'bg-[radial-gradient(circle_at_center,rgba(254,137,137,0.03)_0%,rgba(254,137,137,0.12)_100%)]';
      case 'thinking':
        return 'bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,rgba(245,158,11,0.12)_100%)]';
      case 'idle':
      default:
        return 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.01)_0%,rgba(16,185,129,0.05)_100%)]';
    }
  };

  const getBracketColor = (s: typeof state) => {
    switch (s) {
      case 'connecting': return 'border-[#5606ff]/60';
      case 'error': return 'border-red-500/60';
      case 'listening': return 'border-[#5606ff]/80';
      case 'speaking': return 'border-[#fe8989]/80';
      case 'thinking': return 'border-amber-500/80';
      case 'idle':
      default:
        return 'border-emerald-500/50';
    }
  };

  const getHudBorderClass = (s: typeof state) => {
    switch (s) {
      case 'connecting': return 'hud-border-connecting';
      case 'error': return 'hud-border-error';
      case 'listening': return 'hud-border-listening';
      case 'speaking': return 'hud-border-speaking';
      case 'thinking': return 'hud-border-thinking';
      case 'idle':
      default:
        return 'hud-border-idle';
    }
  };

  const bgGradient = getBgGradient(state);
  const bracketColor = getBracketColor(state);
  const hudBorderClass = getHudBorderClass(state);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 text-white">
      {/* Background vignette & gradient glow */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 mix-blend-screen ${bgGradient}`} />
      
      {/* Screen vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />

      {/* Main glowing border frame */}
      <div className={`absolute inset-6 rounded-3xl border transition-all duration-750 ${hudBorderClass} pointer-events-none`} />

      {/* Edge-aligned dotted particle glow pattern */}
      <div 
        className="absolute inset-6 rounded-3xl pointer-events-none transition-all duration-1000 mix-blend-screen opacity-50"
        style={{
          backgroundImage: `radial-gradient(${
            state === 'listening' ? 'rgba(86,6,255,0.75)' : 
            state === 'speaking' ? 'rgba(254,137,137,0.75)' : 
            state === 'thinking' ? 'rgba(245,158,11,0.75)' : 
            state === 'error' ? 'rgba(239,68,68,0.75)' :
            state === 'connecting' ? 'rgba(59,130,246,0.75)' :
            'rgba(16,185,129,0.5)'
          } 1.5px, transparent 1.5px)`,
          backgroundSize: '12px 12px',
          WebkitMaskImage: 'radial-gradient(circle, transparent 50%, black 100%)',
          maskImage: 'radial-gradient(circle, transparent 50%, black 100%)',
        }}
      />

      {/* Corner Brackets */}
      <div className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 transition-all duration-700 rounded-tl-lg ${bracketColor}`} />
      <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 transition-all duration-700 rounded-tr-lg ${bracketColor}`} />
      <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 transition-all duration-700 rounded-bl-lg ${bracketColor}`} />
      <div className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 transition-all duration-700 rounded-br-lg ${bracketColor}`} />

      {/* Subtle scanning HUD pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20" />

      {children}
    </div>
  );
}

function VoiceSessionContent({ onDisconnect }: { onDisconnect: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const room = useRoomContext();
  const [agentState, setAgentState] = useState<AgentState>('disconnected');
  const router = useRouter();
  const [spotlightId, setSpotlightId] = useState<string | null>(null);
  const [cursorTarget, setCursorTarget] = useState({ visible: false, clicking: false });
  const activeElementRef = useRef<Element | null>(null);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  const { state: voiceAssistantState, agentTranscriptions } = useVoiceAssistant();

  useEffect(() => {
    if (voiceAssistantState) {
      setAgentState(voiceAssistantState);
    }
  }, [voiceAssistantState]);

  useEffect(() => {
    if (!cursorTarget.visible) return;

    let active = true;

    // Set initial position to center of viewport when cursor first becomes visible
    currentPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updateLoop = () => {
      if (!active) return;

      if (activeElementRef.current) {
        const rect = activeElementRef.current.getBoundingClientRect();
        targetPosRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      }

      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;
      
      // 0.08 speed factor ensures a beautiful smooth glide
      const speed = 0.08;

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        currentPosRef.current.x += dx * speed;
        currentPosRef.current.y += dy * speed;
      } else {
        currentPosRef.current.x = targetPosRef.current.x;
        currentPosRef.current.y = targetPosRef.current.y;
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentPosRef.current.x}px`;
        cursorRef.current.style.top = `${currentPosRef.current.y}px`;
      }

      requestAnimationFrame(updateLoop);
    };

    updateLoop();
    return () => {
      active = false;
    };
  }, [cursorTarget.visible]);

  const triggerVisualEffects = (selector: string) => {
    let attempts = 0;
    const findAndTrigger = () => {
      const element = document.querySelector(selector);
      if (element) {
        activeElementRef.current = element;

        // Scroll the element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add spotlight target class to elevate it
        element.classList.add('spotlight-target');
        setSpotlightId(selector);

        // Turn on cursor visibility
        setCursorTarget({ visible: true, clicking: false });

        // Trigger click/tap pulse after cursor glides close (around 1.2s)
        setTimeout(() => {
          setCursorTarget(prev => ({ ...prev, clicking: true }));
          setTimeout(() => {
            setCursorTarget(prev => ({ ...prev, clicking: false }));
          }, 600);
        }, 1200);

        // Clean up after 4.5 seconds
        setTimeout(() => {
          setSpotlightId(null);
          element.classList.remove('spotlight-target');
          setCursorTarget({ visible: false, clicking: false });
          activeElementRef.current = null;
        }, 4500);
      } else if (attempts < 10) {
        attempts++;
        setTimeout(findAndTrigger, 150);
      }
    };

    findAndTrigger();
  };

  useEffect(() => {
    const handleDataReceived = (payload: Uint8Array) => {
      try {
        const text = new TextDecoder().decode(payload);
        const data = JSON.parse(text);
        console.log('Received agent data:', data);

        if (data.action === 'navigate' && data.route) {
          console.log(`Navigating to ${data.route}`);
          router.push(data.route);
        } else if (data.action === 'scroll' && data.id) {
          console.log(`Scrolling to ${data.id}`);
          triggerVisualEffects(data.id);
        } else if (data.action === 'highlight' && data.id) {
          console.log(`Highlighting element ${data.id}`);
          triggerVisualEffects(data.id);
        }
      } catch (err) {
        console.error('Failed to parse data message from agent:', err);
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room, router]);

  const toggleMute = async () => {
    if (room.localParticipant) {
      const isCurrentlyMuted = room.localParticipant.isMicrophoneEnabled === false;
      await room.localParticipant.setMicrophoneEnabled(isCurrentlyMuted);
      setIsMuted(isCurrentlyMuted);
    }
  };

  return (
    <>
      {/* Page Spotlight Dark Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-[1.5px] z-40 transition-opacity duration-700 pointer-events-none
          ${spotlightId ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Animated Holographic Cursor */}
      {cursorTarget.visible && (
        <div 
          ref={cursorRef}
          className="fixed pointer-events-none z-50"
          style={{
            transform: `translate(-50%, -50%) scale(${cursorTarget.clicking ? 0.8 : 1})`,
            transition: 'transform 0.2s ease',
            left: `${currentPosRef.current.x}px`,
            top: `${currentPosRef.current.y}px`
          }}
        >
          {/* Pulsing ring around cursor */}
          <div className={`absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 bg-cyan-400/5 transition-all duration-300
            ${cursorTarget.clicking ? 'animate-[ping_0.5s_ease-in-out_infinite]' : 'animate-pulse'}
          `} />
          
          {/* Holographic Arrow Cursor */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] filter"
          >
            <path 
              d="M4.5 3V17L9 12.5L13.5 21L16.5 19.5L12 11L17.5 11.5L4.5 3Z" 
              fill="currentColor" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <HudFrame state={agentState}>
        {/* Top HUD Banner */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-6 bg-zinc-950/80 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
              agentState === 'listening' ? 'bg-[#5606ff] animate-ping' :
              agentState === 'speaking' ? 'bg-[#fe8989] animate-ping' :
              agentState === 'thinking' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
            }`} />
            <span className="font-bold tracking-wider text-xs uppercase font-mono text-zinc-300">
              {agentState === 'idle' && 'Twin Agent Online'}
              {agentState === 'listening' && 'Twin Listening'}
              {agentState === 'thinking' && 'Twin Thinking'}
              {agentState === 'speaking' && 'Twin Speaking'}
            </span>
          </div>
          <button 
            onClick={onDisconnect}
            className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <PhoneOff className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Command Center Console */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto w-full max-w-2xl bg-zinc-950/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
          
          {/* Left Side: Avatar/Visualizer */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 shadow-inner shrink-0">
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_6s_linear_infinite]" />
              
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#5606ff] to-[#fe8989] blur-md opacity-25 scale-90 transition-transform duration-700
                ${agentState === 'listening' ? 'animate-pulse scale-100' : ''}
                ${agentState === 'speaking' ? 'animate-[ping_1.5s_ease-in-out_infinite] scale-95' : ''}
                ${agentState === 'thinking' ? 'animate-pulse' : ''}
              `} />

              <div className="relative w-11 h-11 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center z-10">
                <Volume2 className={`w-5 h-5 text-zinc-400 transition-colors
                  ${agentState === 'speaking' ? 'text-[#fe8989]' : ''}
                  ${agentState === 'listening' ? 'text-[#5606ff]' : ''}
                `} />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Status</span>
              <span className="text-sm font-semibold font-mono text-zinc-200 capitalize">
                {agentState === 'idle' && 'Ready for Input'}
                {agentState === 'listening' && 'Awaiting Speech'}
                {agentState === 'thinking' && 'Processing Context'}
                {agentState === 'speaking' && 'Streaming Response'}
              </span>
            </div>
          </div>

          {/* Center: Transcript text */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Live Transcript</span>
            {agentTranscriptions && agentTranscriptions.length > 0 ? (
              <p className="text-xs text-zinc-300 font-mono italic line-clamp-2 leading-relaxed">
                &ldquo;{agentTranscriptions[agentTranscriptions.length - 1]?.text}&rdquo;
              </p>
            ) : (
              <p className="text-xs text-zinc-500 font-mono">
                Try asking about projects, experience, or skills...
              </p>
            )}
          </div>

          {/* Right Side: Controls & Audio Wave */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-end justify-center gap-0.5 h-5 w-16">
              {Array.from({ length: 7 }).map((_, i) => {
                let heightClass = "h-1";
                if (agentState === 'listening') {
                  heightClass = i % 2 === 0 ? "animate-[pulse_0.8s_infinite_alternate] h-2.5" : "animate-[pulse_1s_infinite_alternate] h-3.5";
                } else if (agentState === 'speaking') {
                  heightClass = i % 3 === 0 ? "animate-[bounce_0.6s_infinite] h-4.5" : i % 2 === 0 ? "animate-[bounce_0.8s_infinite] h-2.5" : "animate-[bounce_0.5s_infinite] h-3.5";
                } else if (agentState === 'thinking') {
                  heightClass = "animate-pulse h-1.5";
                }
                return (
                  <div 
                    key={i} 
                    className={`w-0.5 bg-gradient-to-t from-[#5606ff] to-[#fe8989] rounded-full transition-all duration-300 ${heightClass}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center
                  ${isMuted 
                    ? 'bg-red-500/20 border-red-500/30 text-red-500 hover:bg-red-500/30' 
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                  }
                `}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={onDisconnect}
                className="p-2.5 rounded-xl bg-red-600/20 border border-red-600/30 text-red-500 hover:text-white hover:bg-red-600 transition-all duration-300 flex items-center justify-center"
                title="End session"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </HudFrame>
    </>
  );
}
