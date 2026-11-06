/**
 * CinematicKeynoteSection.tsx
 * Continuum DX Advisory — Cinematic Keynote Experience
 * 
 * Full-bleed, enterprise-grade keynote video section.
 * References the real mixed audio master already in /assets/audio/
 * and real photography from /assets/commercial/ and /assets/aistudio/
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

// ─── Act Data ───────────────────────────────────────────────────────────────

interface Act {
  id: string;
  number: string;
  startSec: number;
  endSec: number;
  timecode: string;
  title: string;
  quote: string;
  sonicCue: string;
  bodyText: string;
  visualSrc: string;
  accentColor: string;
  accentBg: string;
}

const ACTS: Act[] = [
  {
    id: 'act-1',
    number: 'ACT I',
    startSec: 0,
    endSec: 42,
    timecode: '0:00 – 0:42',
    title: 'The Commodity Trap',
    quote: 'Speed without velocity is just friction.',
    sonicCue: 'Sparse Felt Piano · 32Hz Sub-Bass',
    bodyText:
      'For two years, the enterprise ran faster than it has ever run in history. Every board demanded an AI strategy. Every CIO signed purchase orders for models, copilot seats, and cloud vector layers. Every business unit stood up a pilot. We celebrated the speed. We tallied up the experiments. And yet, behind closed boardroom doors, a quiet, uncomfortable truth began to set in: We were moving at blinding speed… but we hadn\'t moved an inch.',
    visualSrc: '/assets/commercial/boardroom_monolith.jpg',
    accentColor: '#E2E8F0',
    accentBg: 'rgba(226, 232, 240, 0.08)',
  },
  {
    id: 'act-2',
    number: 'ACT II',
    startSec: 42,
    endSec: 95,
    timecode: '0:42 – 1:35',
    title: 'The Torpedoed Whale',
    quote: "It wasn't the holy grail. Hell, it wasn't even the map.",
    sonicCue: 'Acoustic Cello Enters · Harmonic Tension',
    bodyText:
      'The industry sold you a seductive fantasy: that if you bought the software, the transformation would follow. So what happened? A minefield of disconnected pilots. Multi-million-dollar software licenses sitting dormant. A slow, gentle torpedoing of the enterprise—eroding capital, exhausting teams, until the company drifts toward becoming just another brand we used to know. And when the steering committee asks for the return on capital… the room goes silent.',
    visualSrc: '/assets/commercial/scene2_the_friction.jpg',
    accentColor: '#F97316',
    accentBg: 'rgba(249, 115, 22, 0.08)',
  },
  {
    id: 'act-3',
    number: 'ACT III',
    startSec: 95,
    endSec: 165,
    timecode: '1:35 – 2:45',
    title: 'The Space Between',
    quote: 'That space is our nirvana. We live in it. We master it.',
    sonicCue: 'Modular Synth Pulse 108 BPM · Forward Momentum',
    bodyText:
      'Here is what seventeen years in the enterprise trenches taught me: Software is a commodity. Algorithms are table stakes. Tools do not transform enterprises. Operating models do. Between the boardroom\'s mandate—the executive Why—and the engineering pipeline—the technical How—lies the most treacherous chasm in digital transformation: The Space Between. Most consultancies fear that space. They hand you a 200-page deck from 30,000 feet and walk away. For us? That space is our nirvana.',
    visualSrc: '/assets/commercial/skybridge_dawn.jpg',
    accentColor: '#2563EB',
    accentBg: 'rgba(37, 99, 235, 0.10)',
  },
  {
    id: 'act-4',
    number: 'ACT IV',
    startSec: 165,
    endSec: 207,
    timecode: '2:45 – 3:27',
    title: 'The Operating Model as the Moat',
    quote: 'Your moat is the governance discipline you build inside your walls.',
    sonicCue: 'Full Orchestral Apex · Acoustic Toms & Cello',
    bodyText:
      'Your competitive moat in the age of AI will not be the software you lease from someone else. We don\'t ask executive committees for speculative budgets. We embed directly inside your active, funded initiatives—your platform rollouts, your composable migrations, your customer portals. We infuse verified prompt registries, automated QA guardrails, and human-in-the-loop workflows directly into your active sprints. We turn a single project beachhead into a turnkey Center of Excellence in a Box.',
    visualSrc: '/assets/commercial/warroom_telemetry.jpg',
    accentColor: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.08)',
  },
  {
    id: 'act-5',
    number: 'ACT V',
    startSec: 207,
    endSec: 232,
    timecode: '3:27 – 3:52',
    title: 'The Continuum Mandate',
    quote: 'Software is the commodity. Governance is the holy grail.',
    sonicCue: 'Harmonic Ring-Out · Cathedral Decay',
    bodyText:
      'Before you sign another software contract… know where you are going. Before you launch another disconnected pilot… build the model. Software is the commodity. Governance is the holy grail. We are Continuum DX Advisory. And we own the space between.',
    visualSrc: '/assets/commercial/scene4_the_payoff.jpg',
    accentColor: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.08)',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function getActForTime(secs: number): Act {
  return ACTS.find((a) => secs >= a.startSec && secs < a.endSec) ?? ACTS[ACTS.length - 1];
}

// ─── Component ───────────────────────────────────────────────────────────────

interface CinematicKeynoteSectionProps {
  onScheduleBriefing?: () => void;
}

export const CinematicKeynoteSection: React.FC<CinematicKeynoteSectionProps> = ({
  onScheduleBriefing,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [duration, setDuration] = useState(232);
  const [activeActId, setActiveActId] = useState(ACTS[0].id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.9);

  const activeAct = ACTS.find((a) => a.id === activeActId) ?? ACTS[0];

  // ── Audio sync ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentSec(t);
      const act = getActForTime(t);
      setActiveActId(act.id);
    };

    const onLoaded = () => {
      setDuration(audio.duration || 232);
      setIsLoaded(true);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentSec(0);
      audio.currentTime = 0;
      setActiveActId(ACTS[0].id);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // ── Volume sync ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  // ── Play/Pause ─────────────────────────────────────────────────────────────
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked — user will retry
      }
    }
  }, [isPlaying]);

  // ── Seek by clicking act ───────────────────────────────────────────────────
  const seekToAct = useCallback(
    async (act: Act) => {
      const audio = audioRef.current;
      if (!audio) return;
      setHasInteracted(true);
      setActiveActId(act.id);
      audio.currentTime = act.startSec;
      setCurrentSec(act.startSec);
      if (!isPlaying) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          /* blocked */
        }
      }
    },
    [isPlaying]
  );

  // ── Scrubber click ─────────────────────────────────────────────────────────
  const handleScrubClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressRef.current;
      const audio = audioRef.current;
      if (!bar || !audio) return;
      const rect = bar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const newTime = pct * duration;
      audio.currentTime = newTime;
      setCurrentSec(newTime);
    },
    [duration]
  );

  const progressPct = duration > 0 ? (currentSec / duration) * 100 : 0;

  return (
    <section
      id="keynote"
      ref={sectionRef}
      className="scroll-mt-20 relative overflow-hidden"
      style={{ background: '#06070A' }}
    >
      {/* ── Hidden Audio Element ─────────────────────────────────────────── */}
      <audio
        ref={audioRef}
        preload="metadata"
        src="/assets/audio/the_space_between_master_keynote.mp3"
      />

      {/* ── Ambient Background ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%),
                       radial-gradient(ellipse 60% 40% at 80% 100%, rgba(16,185,129,0.04) 0%, transparent 60%)`,
        }}
      />
      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        {/* ── Section Header ───────────────────────────────────────────────── */}
        <div className="mb-16 max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border"
            style={{
              background: 'rgba(245,158,11,0.08)',
              borderColor: 'rgba(245,158,11,0.25)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#F59E0B' }}
            />
            <span
              className="font-mono text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#F59E0B' }}
            >
              Las Vegas Global Enterprise Summit · Master Keynote Oration · 3:52
            </span>
          </div>

          <h2
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.0] mb-6"
            style={{ color: '#F8FAFC' }}
          >
            The Space Between
          </h2>
          <p className="text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(248,250,252,0.55)' }}>
            A 5-Act keynote on why enterprise AI initiatives stall—and the operating model
            discipline that makes the difference. Delivered by Sean Rusinko,
            Founder & Principal Advisor.
          </p>
        </div>

        {/* ── Main Layout: Player + Acts ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: Cinematic Visual + Controls (3 cols) ────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-0 rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>

            {/* Visual frame */}
            <div className="relative aspect-video bg-black overflow-hidden">
              {/* Background image — transitions with act */}
              <div
                key={activeActId}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${activeAct.visualSrc})`,
                  filter: 'brightness(0.38) saturate(0.7)',
                  transition: 'background-image 0.6s ease',
                }}
              />

              {/* Cinematic letterbox bars */}
              <div
                className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
                style={{ background: '#000' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                style={{ background: '#000' }}
              />

              {/* Top overlay: Act badge + series label */}
              <div className="absolute top-10 left-0 right-0 px-6 pt-4 flex items-start justify-between z-20">
                <div>
                  <div
                    className="inline-block px-2.5 py-1 rounded font-mono text-xs font-bold tracking-widest uppercase mb-2"
                    style={{
                      background: activeAct.accentBg,
                      color: activeAct.accentColor,
                      border: `1px solid ${activeAct.accentColor}30`,
                    }}
                  >
                    {activeAct.number}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl text-white leading-tight max-w-sm">
                    {activeAct.title}
                  </div>
                </div>
                <div
                  className="font-mono text-xs text-right hidden sm:block"
                  style={{ color: 'rgba(248,250,252,0.4)' }}
                >
                  <div>{activeAct.timecode}</div>
                  <div className="mt-0.5" style={{ color: 'rgba(248,250,252,0.3)' }}>{activeAct.sonicCue}</div>
                </div>
              </div>

              {/* Centre: Big play/pause button */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center group z-10"
                aria-label={isPlaying ? 'Pause keynote' : 'Play keynote'}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: isPlaying
                      ? 'rgba(0,0,0,0.5)'
                      : 'rgba(37,99,235,0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    boxShadow: isPlaying
                      ? 'none'
                      : '0 0 60px rgba(37,99,235,0.5), 0 0 120px rgba(37,99,235,0.2)',
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </div>
              </button>

              {/* Bottom: Quote overlay */}
              <div
                className="absolute bottom-10 left-0 right-0 px-6 pb-4 z-20"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                }}
              >
                <p
                  className="font-serif text-lg italic leading-snug"
                  style={{ color: activeAct.accentColor }}
                >
                  "{activeAct.quote}"
                </p>
              </div>

              {/* Not-started overlay prompt */}
              {!hasInteracted && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-20 z-5 pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.0)' }}
                >
                  <div
                    className="font-mono text-xs uppercase tracking-widest animate-pulse"
                    style={{ color: 'rgba(248,250,252,0.4)' }}
                  >
                    Click to begin
                  </div>
                </div>
              )}
            </div>

            {/* ── Control bar ─────────────────────────────────────────────── */}
            <div
              className="px-5 py-4 flex flex-col gap-3"
              style={{ background: '#0D0F14', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Progress scrubber */}
              <div
                ref={progressRef}
                onClick={handleScrubClick}
                className="relative w-full h-1.5 rounded-full cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {/* Act segment markers */}
                {ACTS.slice(1).map((a) => (
                  <div
                    key={a.id}
                    className="absolute top-0 bottom-0 w-px"
                    style={{
                      left: `${(a.startSec / duration) * 100}%`,
                      background: 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
                {/* Fill */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPct}%`,
                    background: `linear-gradient(90deg, #2563EB, ${activeAct.accentColor})`,
                  }}
                />
                {/* Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `calc(${progressPct}% - 6px)`,
                    background: activeAct.accentColor,
                  }}
                />
              </div>

              {/* Playback controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
                    style={{ color: isPlaying ? '#2563EB' : 'rgba(248,250,252,0.7)' }}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        setCurrentSec(0);
                        setActiveActId(ACTS[0].id);
                      }
                    }}
                    className="transition-colors"
                    style={{ color: 'rgba(248,250,252,0.4)' }}
                    aria-label="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsMuted((m) => !m)}
                    className="transition-colors"
                    style={{ color: isMuted ? '#EF4444' : 'rgba(248,250,252,0.5)' }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: 'rgba(248,250,252,0.4)' }}
                  >
                    {formatTime(currentSec)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Active act label */}
                <div
                  className="hidden sm:flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: activeAct.accentColor }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: activeAct.accentColor }}
                  />
                  {activeAct.number}: {activeAct.title}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: 5-Act Chapter Panel (2 cols) ──────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <div
              className="font-mono text-xs font-semibold uppercase tracking-widest mb-3 px-1"
              style={{ color: 'rgba(248,250,252,0.35)' }}
            >
              5 Acts · {formatTime(duration)} Total Runtime
            </div>

            {ACTS.map((act) => {
              const isActive = act.id === activeActId;
              return (
                <button
                  key={act.id}
                  onClick={() => seekToAct(act)}
                  className="w-full text-left rounded-xl p-4 transition-all duration-300 cursor-pointer group"
                  style={{
                    background: isActive ? act.accentBg : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive ? act.accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
                    transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {/* Playing indicator dot */}
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 ${isActive && isPlaying ? 'animate-pulse' : ''}`}
                        style={{
                          background: isActive ? act.accentColor : 'rgba(255,255,255,0.2)',
                        }}
                      />
                      <span
                        className="font-mono text-xs font-bold tracking-widest uppercase"
                        style={{ color: isActive ? act.accentColor : 'rgba(248,250,252,0.3)' }}
                      >
                        {act.number}
                      </span>
                    </div>
                    <span
                      className="font-mono text-xs flex-shrink-0"
                      style={{ color: 'rgba(248,250,252,0.3)' }}
                    >
                      {act.timecode}
                    </span>
                  </div>

                  <div
                    className="font-serif text-base leading-snug mb-1"
                    style={{ color: isActive ? '#F8FAFC' : 'rgba(248,250,252,0.65)' }}
                  >
                    {act.title}
                  </div>

                  {isActive && (
                    <p
                      className="text-xs leading-relaxed mt-2 line-clamp-3"
                      style={{ color: 'rgba(248,250,252,0.5)' }}
                    >
                      {act.bodyText}
                    </p>
                  )}

                  <div
                    className="flex items-center gap-1 mt-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: act.accentColor }}
                  >
                    <Play className="w-3 h-3" />
                    <span>Jump to {act.timecode.split('–')[0].trim()}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bottom: Active Act Full Transcript + CTA ──────────────────────── */}
        <div className="mt-10 grid lg:grid-cols-5 gap-8">
          {/* Transcript / Manifesto text */}
          <div
            className="lg:col-span-3 rounded-2xl p-8 border"
            style={{
              background: activeAct.accentBg,
              borderColor: activeAct.accentColor + '20',
            }}
          >
            <div
              className="font-mono text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: activeAct.accentColor }}
            >
              {activeAct.number} · {activeAct.title} · {activeAct.timecode}
            </div>
            <p
              className="font-serif text-2xl italic mb-5 leading-snug"
              style={{ color: activeAct.accentColor }}
            >
              "{activeAct.quote}"
            </p>
            <p
              className="text-sm leading-[1.85] font-sans"
              style={{ color: 'rgba(248,250,252,0.65)' }}
            >
              {activeAct.bodyText}
            </p>
            <div
              className="mt-4 pt-4 border-t font-mono text-xs"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                color: 'rgba(248,250,252,0.3)',
              }}
            >
              🎵 Sonic cue: {activeAct.sonicCue}
            </div>
          </div>

          {/* CTA Panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Manifesto summary card */}
            <div
              className="rounded-2xl p-6 border flex-grow"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="font-mono text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(248,250,252,0.4)' }}
              >
                The Core Thesis
              </div>
              <div
                className="font-serif text-xl leading-snug mb-4"
                style={{ color: '#F8FAFC' }}
              >
                Software is the commodity.<br />
                Governance is the holy grail.
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(248,250,252,0.5)' }}>
                Continuum DX embeds directly inside your active, funded initiatives—
                no new budget line, no committee deadlock, no 9-month SoW.
                We build the operating model that your software licenses alone can never build.
              </p>
              <div className="space-y-2">
                {[
                  'No new capital line item required',
                  'Embeds inside in-flight initiatives',
                  'Turnkey CoE in a Box delivery',
                  '4-week beachhead to saturation',
                ].map((pt) => (
                  <div key={pt} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#2563EB' }} />
                    <span className="text-xs" style={{ color: 'rgba(248,250,252,0.6)' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTA */}
            {onScheduleBriefing && (
              <button
                onClick={onScheduleBriefing}
                className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 group"
                style={{
                  background: '#2563EB',
                  color: '#fff',
                  boxShadow: '0 0 40px rgba(37,99,235,0.35)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#1D4ED8';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 60px rgba(37,99,235,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#2563EB';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(37,99,235,0.35)';
                }}
              >
                <span>Book Executive AI Diagnostic</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <a
              href="mailto:sean@continuum-dx.com?subject=The%20Space%20Between%20Keynote%20Inquiry"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(248,250,252,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#F8FAFC';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248,250,252,0.6)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              Book Sean for a Keynote Engagement
            </a>
          </div>
        </div>

        {/* ── Bottom credit bar ──────────────────────────────────────────────── */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold"
              style={{ background: 'rgba(37,99,235,0.15)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.3)' }}
            >
              SR
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Sean Rusinko</div>
              <div className="text-xs" style={{ color: 'rgba(248,250,252,0.4)' }}>
                Founder & Principal Advisor, Continuum DX · 6× Sitecore MVP · $80M+ Enterprise Programs
              </div>
            </div>
          </div>
          <div
            className="font-mono text-xs"
            style={{ color: 'rgba(248,250,252,0.3)' }}
          >
            Score: "Awake My Dreams" · Edgar Hopp / Epidemic Sound
          </div>
        </div>
      </div>
    </section>
  );
};
