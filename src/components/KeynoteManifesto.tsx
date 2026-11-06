import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Radio,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export interface ManifestoAct {
  id: string;
  actNumber: string;
  timecode: string;
  startSec: number;
  endSec: number;
  title: string;
  subtitle: string;
  theme: string;
  quote: string;
  transcript: string[];
  bulletPoints: string[];
}

export const MANIFESTO_ACTS: ManifestoAct[] = [
  {
    id: "act-1",
    actNumber: "ACT I",
    timecode: "0:00 - 0:45",
    startSec: 0,
    endSec: 45,
    title: "The Commodity Trap",
    subtitle: "Speed Without Velocity is Just Friction",
    theme: "Market Inefficiency & Pilot Proliferation",
    quote: "Speed without velocity is just friction.",
    transcript: [
      "For two years, the enterprise ran faster than it has ever run in history.",
      "Every board demanded an AI strategy. Every CIO signed purchase orders for foundational models, copilot seats, and cloud vector layers. Every business unit stood up an isolated pilot. We celebrated the speed. We tallied up the experiments.",
      "And yet, behind closed boardroom doors, a quiet, uncomfortable truth began to set in: We were moving at blinding speed... but we hadn't moved an inch.",
      "Because speed without velocity is just friction."
    ],
    bulletPoints: [
      "Uncoordinated procurement creates technical debt across business units",
      "Point solutions proliferate without unified identity, data context, or brand guardrails",
      "Activity metrics (pilots stood up) mask the absence of enterprise business velocity"
    ]
  },
  {
    id: "act-2",
    actNumber: "ACT II",
    timecode: "0:45 - 1:30",
    startSec: 45,
    endSec: 90,
    title: "The Transformation Void",
    subtitle: "The Seductive Fantasy of Tool Adoption",
    theme: "The Software Myth & Silent Steering Committee",
    quote: "It wasn't the holy grail. Hell, it wasn't even the map.",
    transcript: [
      "The industry sold you a seductive fantasy: that if you bought the software, the transformation would follow.",
      "They told you that the tool was the holy grail. It wasn’t the holy grail. Hell, it wasn't even the map.",
      "So what happened? Enterprises built a minefield of trial-and-error projects. Rogue business units testing prompts in silos. Multi-million-dollar software licenses sitting dormant. A few isolated projects launched with momentary velocity... but without the full weight of the business in sync, they didn't propel the enterprise forward. They just created drag.",
      "A slow, gentle torpedoing of the enterprise—eroding capital, exhausting teams, until the company drifts toward becoming... just another brand we used to know. And when the steering committee asks for the return on capital... the room goes silent.",
      "Because in the rush to adopt the tools, nobody stopped to answer the most fundamental question in business: Where are you going?"
    ],
    bulletPoints: [
      "Software licenses alone never generate compounding competitive advantage",
      "Disconnected experiments create organizational drag and capital exhaustion",
      "Absence of executive north star leaves steering committees with zero measurable ROI"
    ]
  },
  {
    id: "act-3",
    actNumber: "ACT III",
    timecode: "1:30 - 2:30",
    startSec: 90,
    endSec: 150,
    title: "The Space Between",
    subtitle: "The Chasm Between Executive Why and Engineering How",
    theme: "The Strategic & Architectural Nirvana",
    quote: "That space is our nirvana. We live in it. We master it.",
    transcript: [
      "Here is what seventeen years in the enterprise trenches taught me: Software is a commodity. Algorithms are table stakes. Tools do not transform enterprises. Operating models do.",
      "Between the boardroom's mandate—the executive Why... and the engineering pipeline—the technical How... lies the most treacherous chasm in digital transformation: The Space Between.",
      "That space is where uncoordinated budgets die. It’s where data context gets lost. It’s where governance turns into bureaucratic concrete, or where the lack of it exposes the brand to catastrophic risk.",
      "Most consultancies fear that space. They hand you a 200-page deck from 30,000 feet and walk away. Most systems integrators drown it in billable engineering hours.",
      "But for us? That space is our nirvana. We don't fear it. We live in it. We master it. Because the space between is where the real architecture happens."
    ],
    bulletPoints: [
      "Traditional consultancies deliver static slide decks detached from delivery codebases",
      "Traditional systems integrators maximize billable hours without strategic governance",
      "Continuum DX bridges executive strategy and real-time execution in one synchronized plane"
    ]
  },
  {
    id: "act-4",
    actNumber: "ACT IV",
    timecode: "2:30 - 3:15",
    startSec: 150,
    endSec: 195,
    title: "The Operating Model as the Moat",
    subtitle: "Center of Excellence in a Box & Project-Overlay Delivery",
    theme: "Deterministic Governance & Compounding Scale",
    quote: "Your moat is the governance discipline you build inside your walls.",
    transcript: [
      "Your competitive moat in the age of AI will not be the software you lease from someone else.",
      "Your moat is the governance discipline you build inside your walls. It is the map. It is the operating overlay that synchronizes Marketing, Product, and IT into a single, unstoppable delivery engine.",
      "We don’t ask executive committees for speculative budgets. We embed directly inside your active, funded initiatives—your platform rollouts, your composable migrations, your customer portals.",
      "We infuse verified prompt registries, automated QA guardrails, and human-in-the-loop workflows directly into your active sprints. We turn a single project beachhead into a turnkey Center of Excellence in a Box—scaling governance, velocity, and brand safety across every business unit in your portfolio. We replace pilot paralysis with compounding enterprise value."
    ],
    bulletPoints: [
      "Zero speculative committee delays: embedded directly into active, funded initiatives",
      "Living prompt registries, deterministic guardrails, and sub-100ms latency verification",
      "Compounding cross-BU saturation turns single projects into enterprise-wide governance standards"
    ]
  },
  {
    id: "act-5",
    actNumber: "ACT V",
    timecode: "3:15 - 3:42",
    startSec: 195,
    endSec: 222,
    title: "The Continuum Mandate",
    subtitle: "Software is the Commodity. Governance is the Holy Grail.",
    theme: "The Executive Call to Clarity",
    quote: "Software is the commodity. Governance is the holy grail. We own the space between.",
    transcript: [
      "Before you sign another software contract... know where you are going.",
      "Before you launch another disconnected pilot... build the model.",
      "Software is the commodity. Governance is the holy grail.",
      "We are Continuum DX Advisory. And we own the space between."
    ],
    bulletPoints: [
      "Establish the living operating model prior to signing vendor commitments",
      "Transform AI adoption from speculative hype into deterministic balance sheet gravity",
      "Continuum DX Advisory: The executive control plane for the enterprise"
    ]
  }
];

export interface KeynoteManifestoProps {
  asModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onStartDiagnostic?: () => void;
}

export const KeynoteManifesto: React.FC<KeynoteManifestoProps> = ({
  asModal = false,
  isOpen = true,
  onClose,
  onStartDiagnostic
}) => {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [audioSource, setAudioSource] = useState<'suno-embed' | 'local-score'>('suno-embed');
  const [currentTime, setCurrentTime] = useState(0);
  const [isLocalAudioMuted, setIsLocalAudioMuted] = useState(false);
  const totalDuration = 222; // 3:42 total duration

  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const actRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeAct = MANIFESTO_ACTS[activeActIndex] || MANIFESTO_ACTS[0];

  // Initialize local score audio (fallback / alternative to Suno embed)
  useEffect(() => {
    if (audioSource !== 'local-score') {
      if (localAudioRef.current) {
        localAudioRef.current.pause();
      }
      return;
    }

    const audio = new Audio('/assets/audio/the_space_between_score.mp3');
    audio.loop = true;
    audio.volume = 0.8;
    audio.muted = isLocalAudioMuted;
    localAudioRef.current = audio;

    audio.play().catch(() => {});

    const handleTime = () => {
      setCurrentTime(audio.currentTime);
      const idx = MANIFESTO_ACTS.findIndex(
        (a) => audio.currentTime >= a.startSec && audio.currentTime < a.endSec
      );
      if (idx !== -1) {
        setActiveActIndex(idx);
      }
    };

    audio.addEventListener('timeupdate', handleTime);

    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.pause();
      audio.src = '';
    };
  }, [audioSource, isLocalAudioMuted]);

  // Handle act click & scroll
  const handleSelectAct = (index: number) => {
    setActiveActIndex(index);
    const targetSec = MANIFESTO_ACTS[index].startSec;
    if (audioSource === 'local-score' && localAudioRef.current) {
      localAudioRef.current.currentTime = targetSec;
      setCurrentTime(targetSec);
    }
    const targetElement = actRefs.current[index];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Keyboard escape handler if modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (asModal && isOpen && e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [asModal, isOpen, onClose]
  );

  useEffect(() => {
    if (asModal && isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [asModal, isOpen, handleKeyDown]);

  if (asModal && !isOpen) return null;

  const content = (
    <div className="relative w-full max-w-6xl mx-auto bg-[#090A0F] text-slate-100 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
      {/* 1. Header Bar: Title, Source Selector, Close */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/90 backdrop-blur-md gap-4 z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
              Continuum DX Advisory · 5-Act Keynote Experience
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
              The Space Between: Keynote Manifesto
            </h2>
          </div>
        </div>

        {/* Audio Engine Selector & Controls */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => setAudioSource('suno-embed')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                audioSource === 'suno-embed'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>Suno Stream</span>
            </button>
            <button
              type="button"
              onClick={() => setAudioSource('local-score')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                audioSource === 'local-score'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Direct Audio</span>
            </button>
          </div>

          {audioSource === 'local-score' && (
            <button
              type="button"
              onClick={() => {
                const next = !isLocalAudioMuted;
                setIsLocalAudioMuted(next);
                if (localAudioRef.current) localAudioRef.current.muted = next;
              }}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition cursor-pointer"
              title={isLocalAudioMuted ? 'Unmute' : 'Mute'}
            >
              {isLocalAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          )}

          {asModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Sticky Suno Audio Stream HUD / Player Section */}
      <div className="bg-gradient-to-b from-blue-950/40 to-slate-950/80 border-b border-white/10 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {audioSource === 'suno-embed' ? (
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg">
              <iframe 
                src="https://suno.com/embed/0s8gNHvw5k9aGQ8q" 
                width="100%" 
                height="120" 
                frameBorder="0" 
                allow="autoplay; encrypted-media"
                title="Continuum DX Master Score - Suno Stream"
                className="w-full block"
              />
            </div>
            <div className="sm:max-w-xs text-left text-xs font-mono text-slate-400 space-y-1">
              <div className="text-white font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Original Master Soundtrack</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Acoustic + Cinematic Master (3:42) synchronized across the 5 Strategic Movements.
              </p>
              <a 
                href="https://suno.com/s/0s8gNHvw5k9aGQ8q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 pt-0.5"
              >
                <span>Open in Suno</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                  Direct Compressed Master Stream (3:42)
                </div>
                <div className="text-sm font-bold text-white">
                  {activeAct.actNumber}: {activeAct.title} ({activeAct.timecode})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (localAudioRef.current) {
                    localAudioRef.current.currentTime = 0;
                    setCurrentTime(0);
                    setActiveActIndex(0);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. 5-Act Interactive Navigation Selector */}
      <div className="px-6 py-3 border-b border-white/10 bg-slate-900/60 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {MANIFESTO_ACTS.map((act, idx) => {
            const isActive = activeActIndex === idx;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => handleSelectAct(idx)}
                className={`px-3.5 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-950/40 ring-1 ring-blue-500/50'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-[10px] font-mono">
                  <span className={isActive ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                    {act.actNumber}
                  </span>
                  <span className="text-slate-400 text-[9px]">{act.timecode}</span>
                </div>
                <div className="text-xs font-bold tracking-tight mt-0.5 truncate max-w-[140px]">
                  {act.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Act Cards Showcase: Synchronized Narrative & Transcripts */}
      <div className="p-6 sm:p-8 overflow-y-auto max-h-[58vh] space-y-8 bg-[#090A0F]">
        {MANIFESTO_ACTS.map((act, index) => {
          const isActive = activeActIndex === index;
          return (
            <div
              key={act.id}
              ref={(el) => { actRefs.current[index] = el; }}
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-white/[0.04] border-blue-500/60 shadow-xl shadow-blue-950/30 ring-1 ring-blue-500/30'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {act.actNumber}
                  </span>
                  <span className="text-xs font-mono text-cyan-300">
                    {act.timecode}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    · {act.theme}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectAct(index)}
                  className={`text-xs font-mono transition flex items-center gap-1 ${
                    isActive ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Focus Act</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mb-1">
                {act.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
                {act.subtitle}
              </p>

              {/* Central Keynote Monologue Excerpt */}
              <blockquote className="p-4 sm:p-5 rounded-xl bg-blue-950/20 border-l-2 border-blue-500 mb-6 text-base sm:text-lg font-serif italic text-blue-100 leading-snug">
                "{act.quote}"
              </blockquote>

              {/* Full Unabridged Monologue Transcript */}
              <div className="space-y-3.5 mb-6 text-sm text-slate-300 leading-relaxed font-sans">
                {act.transcript.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Architectural Takeaways */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2.5">
                  Enterprise Implications
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {act.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Footer Call-to-Action Bar */}
      <div className="p-6 border-t border-white/10 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-white font-semibold">
            Sean Rusinko · Founder &amp; Principal Creative Technologist
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Continuum DX Advisory · 17+ Years Enterprise DX Leadership
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              if (onStartDiagnostic) onStartDiagnostic();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-500/25 transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span>Schedule Architecture Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  if (asModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="The Space Between Keynote Manifesto"
      >
        {content}
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#090A0F]">
      {content}
    </section>
  );
};
