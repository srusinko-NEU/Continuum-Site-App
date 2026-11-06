import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight, 
  Presentation,
  Radio,
  Film,
  ExternalLink
} from 'lucide-react';

export interface KeynoteMovement {
  id: string;
  movementNumber: string;
  startSec: number;
  endSec: number;
  timecode: string;
  title: string;
  quote: string;
  monologue: string;
}

export const KEYNOTE_MOVEMENTS: KeynoteMovement[] = [
  {
    id: "mov-1",
    movementNumber: "01",
    startSec: 0,
    endSec: 45,
    timecode: "0:00 - 0:45",
    title: "The Commodity Trap",
    quote: "Speed without velocity is just friction.",
    monologue: "For two years, the enterprise ran faster than it has ever run in history. Every board demanded an AI strategy. Every CIO signed purchase orders for models, copilot seats, and cloud vector layers. Every business unit stood up a pilot. We celebrated the speed. We tallied up the experiments. And yet, behind closed boardroom doors, a quiet, uncomfortable truth began to set in: We were moving at blinding speed... but we hadn't moved an inch. Because speed without velocity is just friction."
  },
  {
    id: "mov-2",
    movementNumber: "02",
    startSec: 45,
    endSec: 90,
    timecode: "0:45 - 1:30",
    title: "The Transformation Void",
    quote: "It wasn't the holy grail. Hell, it wasn't even the map.",
    monologue: "The industry sold you a seductive fantasy: that if you bought the software, the transformation would follow. They told you that the tool was the holy grail. It wasn’t the holy grail. Hell, it wasn't even the map. So what happened? Enterprises built a minefield of trial-and-error projects. Rogue business units testing prompts in silos. Multi-million-dollar software licenses sitting dormant. A few isolated projects launched with momentary velocity... but without the full weight of the business in sync, they didn't propel the enterprise forward. They just created drag. A slow, gentle torpedoing of the enterprise—eroding capital, exhausting teams, until the company drifts toward becoming... just another brand we used to know. And when the steering committee asks for the return on capital... the room goes silent. Because in the rush to adopt the tools, nobody stopped to answer the most fundamental question in business: Where are you going?"
  },
  {
    id: "mov-3",
    movementNumber: "03",
    startSec: 90,
    endSec: 150,
    timecode: "1:30 - 2:30",
    title: "The Space Between",
    quote: "That space is our nirvana. We live in it. We master it.",
    monologue: "Here is what seventeen years in the enterprise trenches taught me: Software is a commodity. Algorithms are table stakes. Tools do not transform enterprises. Operating models do. Between the boardroom's mandate—the executive Why... and the engineering pipeline—the technical How... lies the most treacherous chasm in digital transformation. The Space Between. That space is where uncoordinated budgets die. It’s where data context gets lost. It’s where governance turns into bureaucratic concrete, or where the lack of it exposes the brand to catastrophic risk. Most consultancies fear that space. They hand you a 200-page deck from 30,000 feet and walk away. Most systems integrators drown it in billable engineering hours. But for us? That space is our nirvana. We don't fear it. We live in it. We master it. Because the space between is where the real architecture happens."
  },
  {
    id: "mov-4",
    movementNumber: "04",
    startSec: 150,
    endSec: 195,
    timecode: "2:30 - 3:15",
    title: "The Operating Model as the Moat",
    quote: "Your moat is the governance discipline you build inside your walls.",
    monologue: "Your competitive moat in the age of AI will not be the software you lease from someone else. Your moat is the governance discipline you build inside your walls. It is the map. It is the operating overlay that synchronizes Marketing, Product, and IT into a single, unstoppable delivery engine. We don’t ask executive committees for speculative budgets. We embed directly inside your active, funded initiatives—your platform rollouts, your composable migrations, your customer portals. We infuse verified prompt registries, automated QA guardrails, and human-in-the-loop workflows directly into your active sprints. We turn a single project beachhead into a turnkey Center of Excellence in a Box—scaling governance, velocity, and brand safety across every business unit in your portfolio. We replace pilot paralysis with compounding enterprise value."
  },
  {
    id: "mov-5",
    movementNumber: "05",
    startSec: 195,
    endSec: 222,
    timecode: "3:15 - 3:42",
    title: "The Continuum Mandate",
    quote: "Software is the commodity. Governance is the holy grail.",
    monologue: "Before you sign another software contract... know where you are going. Before you launch another disconnected pilot... build the model. Software is the commodity. Governance is the holy grail. We are Continuum DX Advisory. And we own the space between."
  }
];

interface LasVegasKeynoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDiagnostic?: () => void;
}

export const LasVegasKeynoteModal: React.FC<LasVegasKeynoteModalProps> = ({
  isOpen,
  onClose,
  onStartDiagnostic
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioScoreRef = useRef<HTMLAudioElement | null>(null);
  const [viewMode, setViewMode] = useState<'film' | 'suno'>('film');
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 222; // 3:42 total duration

  const activeMovement = KEYNOTE_MOVEMENTS.find(
    (m) => currentTime >= m.startSec && currentTime < m.endSec
  ) || KEYNOTE_MOVEMENTS[0];

  // Initialize backing acoustic/orchestral soundtrack
  useEffect(() => {
    if (!isOpen) return;

    if (viewMode === 'suno') {
      if (audioScoreRef.current) {
        audioScoreRef.current.pause();
      }
      return;
    }

    const audio = new Audio('/assets/audio/the_space_between_score.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    audioScoreRef.current = audio;

    audio.play().catch(() => {});

    const handleTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTime);

    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.pause();
      audio.src = '';
    };
  }, [isOpen, viewMode]);

  // Handle Mute / Unmute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioScoreRef.current) {
      audioScoreRef.current.muted = nextMuted;
      if (!nextMuted && audioScoreRef.current.paused && viewMode === 'film') {
        audioScoreRef.current.play().catch(() => {});
      }
    }
  };

  const handleSelectMode = (mode: 'film' | 'suno') => {
    setViewMode(mode);
    if (mode === 'suno' && audioScoreRef.current) {
      audioScoreRef.current.pause();
    } else if (mode === 'film' && audioScoreRef.current && !isMuted) {
      audioScoreRef.current.play().catch(() => {});
    }
  };

  // Seek across timecode (0 - 222s)
  const handleSeek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, totalDuration));
    if (audioScoreRef.current) {
      audioScoreRef.current.currentTime = clamped;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = clamped % 16;
    }
    setCurrentTime(clamped);
    if (audioScoreRef.current && !isMuted && audioScoreRef.current.paused) {
      audioScoreRef.current.play().catch(() => {});
    }
  };

  // Keyboard navigation & lock scroll
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Executive Keynote Briefing"
    >
      <div className="relative w-full max-w-5xl bg-[#151B17] border border-[#364339]/50 rounded-3xl overflow-hidden shadow-2xl my-auto text-slate-100 flex flex-col max-h-[94vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151B17]/95 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B85233] animate-pulse" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E28D75]">
                Executive Keynote Briefing
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Operating Models Beat AI Point Tools
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => handleSelectMode('film')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'film' ? 'bg-[#B85233] text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" />
                <span className="hidden sm:inline">Film</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectMode('suno')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'suno' ? 'bg-[#B85233] text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3 h-3" />
                <span>Suno</span>
              </button>
            </div>

            {/* Audio Toggle (when in film mode) */}
            {viewMode === 'film' && (
              <button
                type="button"
                onClick={handleToggleMute}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-300 hover:text-white transition cursor-pointer"
                title={isMuted ? 'Enable Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sound: Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#E28D75]" />
                    <span className="text-[#E28D75]">Sound: On</span>
                  </>
                )}
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Close Keynote Briefing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Container: Film mode (ambient auto-play) or Suno Stream mode */}
        {viewMode === 'suno' ? (
          <div className="w-full bg-black/40 p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <div className="flex-1 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-xl">
              <iframe 
                src="https://suno.com/embed/0s8gNHvw5k9aGQ8q" 
                width="100%" 
                height="150" 
                frameBorder="0" 
                allow="autoplay; encrypted-media"
                title="Suno Master Score"
                className="w-full block"
              />
            </div>
            <div className="sm:max-w-xs text-xs font-mono text-slate-400 space-y-1 text-left">
              <div className="text-white font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B85233] animate-ping" />
                <span>Original Master Score (3:42)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Direct Suno cloud stream synchronized with the 5 strategic keynote movements.
              </p>
              <a 
                href="https://suno.com/s/0s8gNHvw5k9aGQ8q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#E28D75] hover:text-white pt-1"
              >
                <span>Open in Suno</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-video sm:max-h-[46vh] bg-black overflow-hidden flex-shrink-0">
            <video
              ref={videoRef}
              src="/assets/videos/continuum_commercial_loretta.mp4"
              poster="/assets/sean_keynote_continuum.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />

            {/* Filmic Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151B17] via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Scrub & Timecode Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 z-10">
              {/* Scrubber Progress Bar */}
              <div 
                className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer mb-2.5 group/scrub"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  handleSeek(pos * totalDuration);
                }}
                title="Click or drag to seek"
              >
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#B85233] via-[#D96B43] to-[#2D6A4F] rounded-full transition-all"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md transition-all pointer-events-none group-hover/scrub:scale-125"
                  style={{ left: `calc(${(currentTime / totalDuration) * 100}% - 7px)` }}
                />
              </div>

              {/* Timecode Info */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#E28D75] font-bold">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>
                  <span className="text-slate-400 hidden sm:inline text-[11px]">
                    · <strong className="text-white">{activeMovement.title}</strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSeek(0)}
                  className="p-1 text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restart</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Narrative Movements & Unabridged Transcript */}
        <div className="p-6 overflow-y-auto bg-[#151B17] space-y-6">
          {/* Movement Tabs */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center justify-between">
              <span>Keynote Transcript Sections</span>
              <span className="text-[#E28D75] font-semibold">{activeMovement.timecode}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {KEYNOTE_MOVEMENTS.map((m) => {
                const isActive = activeMovement.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSeek(m.startSec)}
                    className={`text-left p-3 rounded-xl border transition cursor-pointer ${
                      isActive 
                        ? 'bg-[#B85233]/25 border-[#B85233] text-white shadow-lg' 
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={isActive ? 'text-[#E28D75] font-bold' : 'text-slate-400'}>
                        {m.movementNumber}
                      </span>
                      <span className="text-slate-400 text-[9px]">{m.timecode}</span>
                    </div>
                    <div className="text-xs font-bold truncate">{m.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Transcript Box */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#B85233]/40 backdrop-blur-md space-y-3.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#E28D75]">
              Section {activeMovement.movementNumber} · {activeMovement.title} ({activeMovement.timecode})
            </div>

            {/* Key Quote */}
            <p className="text-base font-serif italic text-white font-medium leading-snug">
              "{activeMovement.quote}"
            </p>

            {/* Full Monologue */}
            <p className="text-sm text-slate-300 leading-relaxed font-sans pt-1">
              {activeMovement.monologue}
            </p>

            <div className="pt-2 text-xs text-slate-400 font-mono flex items-center justify-between border-t border-white/10">
              <span>Sean Rusinko, Founder &amp; Principal Advisor</span>
              <span className="text-[#E28D75]">Continuum DX Advisory</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-slate-400">
              Ready to transition from speculative pilots to a compounding operating model?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onStartDiagnostic) onStartDiagnostic();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#B85233] hover:bg-[#9E4429] text-white font-semibold text-xs tracking-wide shadow-sm transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                <span>Request Advisory Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
