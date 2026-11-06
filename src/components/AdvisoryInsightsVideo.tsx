import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Sparkles,
  Presentation,
  Compass
} from 'lucide-react';

export interface VideoClip {
  id: string;
  title: string;
  series: string;
  speaker: string;
  speakerTitle: string;
  durationSeconds: number;
  durationLabel: string;
  poster: string;
  venue: string;
  summary: string;
  keyTakeaway: string;
  transcript: Array<{
    second: number;
    text: string;
    speakerTag: string;
  }>;
  bulletPoints: string[];
}

const CLIPS: VideoClip[] = [
  {
    id: 'clip_01',
    title: "The Space Between: Why Enterprise Operating Models Beat AI Point Tools",
    series: "Executive Keynote Series",
    speaker: "Sean Rusinko",
    speakerTitle: "Founder & Principal Advisor, Continuum DX",
    durationSeconds: 258,
    durationLabel: "4:18",
    poster: "/assets/aistudio/Generated_Image_October_26__2026_-_10_16AM_9edf250c.jpg",
    venue: "Enterprise AI & DX Governance Keynote",
    summary: "Why enterprise digital experience leaders are suffering from AI pilot fatigue—and how establishing a disciplined project-overlay CoE bridges the gap between executive strategy and production delivery.",
    keyTakeaway: "Software licenses don't transform enterprises. Aligning people, prompt registries, and cross-BU incentives creates sustainable enterprise value.",
    transcript: [
      { second: 0, speakerTag: "Sean Rusinko", text: "Every board room today is asking the same question: 'Where is our return on AI?'" },
      { second: 18, speakerTag: "Sean Rusinko", text: "Yet across the Global 2000, over 80% of generative AI proofs-of-concept stall out before reaching production." },
      { second: 45, speakerTag: "Sean Rusinko", text: "The reason isn't model intelligence. The models are extraordinary. The failure occurs in the space between—the operating model." },
      { second: 82, speakerTag: "Sean Rusinko", text: "When you embed governance and prompt registries directly into active, funded projects, you bypass the 9-month committee deadlock." },
      { second: 135, speakerTag: "Sean Rusinko", text: "That is the Continuum DX method: proven on enterprise stages, executed inside your live sprint cycles." }
    ],
    bulletPoints: [
      "Overcoming the 80% generative AI pilot abandonment rate",
      "Why traditional central innovation labs create delivery friction",
      "Embedding governance directly into active, funded digital projects"
    ]
  },
  {
    id: 'clip_02',
    title: "Architecting the Composable AI Control Plane",
    series: "Technical Architecture Briefing",
    speaker: "Sean Rusinko",
    speakerTitle: "Former Sitecore SBOS & Verndale Practice Lead",
    durationSeconds: 225,
    durationLabel: "3:45",
    poster: "/assets/aistudio/headshot_Generated_Image_October_26__2026_-_10_04AM_8cb9d674.jpg",
    venue: "Global DXP & Composable Web Summit",
    summary: "A deep dive into decoupled headless CMS integration, semantic vector grounding, and edge-level prompt arbitration across enterprise ecosystems.",
    keyTakeaway: "Decoupling content delivery from model routing guarantees sub-100ms response times while preventing vendor lock-in.",
    transcript: [
      { second: 0, speakerTag: "Sean Rusinko", text: "Monolithic DXP suites promised a unified digital platform, but created severe architectural drag." },
      { second: 22, speakerTag: "Sean Rusinko", text: "In a composable AI control plane, we decouple content authoring from delivery, grounding models in verified DAM and PIM assets." },
      { second: 60, speakerTag: "Sean Rusinko", text: "With edge routing, arbitration occurs globally in under 80 milliseconds with deterministic compliance checks." }
    ],
    bulletPoints: [
      "Decoupling headless CMS (Sitecore, Contentful) from proprietary LLM silos",
      "Enterprise prompt registries with automated PII and brand safety firewalls",
      "Edge-rendered personalization delivering sub-100ms global latency"
    ]
  },
  {
    id: 'clip_03',
    title: "From Monolithic DXP to Federated Enterprise Saturation",
    series: "Operating Model Masterclass",
    speaker: "Sean Rusinko",
    speakerTitle: "Founder & Principal Advisor, Continuum DX",
    durationSeconds: 235,
    durationLabel: "3:55",
    poster: "/assets/aistudio/IMG_3145_02e9353b.JPG",
    venue: "Chicago Sitecore User Group & Enterprise Forum",
    summary: "How to take a successful beachhead project and package the operating model into a turnkey 'CoE in a Box' for rapid cross-business unit enablement.",
    keyTakeaway: "Federated CoE scaling reduces adjacent BU onboarding from 9 months down to 4 weeks.",
    transcript: [
      { second: 0, speakerTag: "Sean Rusinko", text: "Once you prove governance on your anchor initiative, adjacent business units take notice." },
      { second: 30, speakerTag: "Sean Rusinko", text: "Rather than building separate innovation silos, we package the prompt templates, QA gates, and role playbooks." },
      { second: 75, speakerTag: "Sean Rusinko", text: "Adjacent divisions can now spin up governed AI workflows in weeks rather than quarters." }
    ],
    bulletPoints: [
      "The 70/20/10 transformation rule: People, Architecture, Algorithms",
      "Packaging turnkey 'CoE in a Box' onboarding blueprints",
      "Executive balance sheet attribution: tracking time-to-market and margin expansion"
    ]
  },
  {
    id: 'clip_04',
    title: "War Room Alignment: Cross-Functional Governance in Practice",
    series: "Field Case Studies",
    speaker: "Sean Rusinko",
    speakerTitle: "Founder & Principal Advisor, Continuum DX",
    durationSeconds: 270,
    durationLabel: "4:30",
    poster: "/assets/aistudio/IMG_2884_22e2694c.jpg",
    venue: "Strategic Enterprise War Room Workshop",
    summary: "Live field observations aligning Legal, Brand Security, Technical Architecture, and Product leads around unified prompt standards and role redesign.",
    keyTakeaway: "When legal and security sign off on prompt guardrails upfront, marketing velocity triples.",
    transcript: [
      { second: 0, speakerTag: "Sean Rusinko", text: "Here in the war room with the executive team, we mapped out every single content handoff." },
      { second: 25, speakerTag: "Sean Rusinko", text: "The moment legal sees automated compliance gates, skepticism turns into rapid co-ownership." },
      { second: 80, speakerTag: "Sean Rusinko", text: "Content creators don't get replaced; they become high-leverage orchestrators of verified agentic pipelines." }
    ],
    bulletPoints: [
      "Aligning General Counsel, CISO, and CMO around shared guardrails",
      "Automated multi-variant QA testing before production publish",
      "Transitioning traditional copywriters into certified AI orchestrators"
    ]
  }
];

interface AdvisoryInsightsVideoProps {
  onScheduleBriefing?: () => void;
}

export const AdvisoryInsightsVideo: React.FC<AdvisoryInsightsVideoProps> = ({ onScheduleBriefing }) => {
  const [activeClipId, setActiveClipId] = useState<string>(CLIPS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(14);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(true);

  const activeClip = CLIPS.find((c) => c.id === activeClipId) || CLIPS[0];
  const timerRef = useRef<number | null>(null);

  // Playback timer simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= activeClip.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeClip.durationSeconds]);

  const handleSelectClip = (clip: VideoClip) => {
    setActiveClipId(clip.id);
    setIsPlaying(false);
    setCurrentSeconds(10);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentSeconds(val);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Find active transcript cue
  const activeCue = [...activeClip.transcript]
    .reverse()
    .find((cue) => currentSeconds >= cue.second) || activeClip.transcript[0];

  return (
    <section id="advisory-video" className="scroll-mt-28 py-24 bg-[#151B17] text-[#F7F6F3] border-t border-[#364339]/50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B85233]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D6A4F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#E28D75] uppercase flex items-center gap-2 font-mono mb-3">
            <Presentation className="w-4 h-4 text-[#E28D75]" />
            <span>Advisory Insights &amp; Thought Leadership</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            Keynote Briefings &amp; Architectural Insights
          </h2>
          <p className="text-base md:text-lg text-stone-300 font-sans leading-relaxed">
            Watch executive keynote sessions and technical briefings led by Sean Rusinko, breaking down how Global 2000 leaders govern AI, modernize enterprise DXP stacks, and operationalize digital Centers of Excellence.
          </p>
        </div>

        {/* Video Player + Playlist Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Viewport (7 cols) */}
          <div className="lg:col-span-8 bg-[#1C231F] rounded-2xl border border-[#364339]/60 overflow-hidden shadow-2xl flex flex-col">
            {/* Viewport Screen with Continuous Autoplay */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <video
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={activeClip.poster}
                className="w-full h-full object-cover object-center filter contrast-105"
              >
                <source src="/assets/videos/continuum_commercial_loretta.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Live Subtitle / Transcript Banner Overlay */}
              {showTranscript && activeCue && (
                <div className="absolute bottom-16 left-6 right-6 z-20 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 max-w-xl mx-auto text-center shadow-lg animate-in fade-in duration-200">
                    <p className="text-xs text-[#E28D75] font-mono mb-0.5 font-medium">
                      {activeCue.speakerTag}
                    </p>
                    <p className="text-sm text-white font-sans font-medium leading-snug">
                      "{activeCue.text}"
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Custom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2">
                {/* Scrub Bar */}
                <div className="w-full flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={activeClip.durationSeconds}
                    value={currentSeconds}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B85233]"
                    aria-label="Video seek scrubber"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="hover:text-white transition-colors cursor-pointer"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white transition-colors cursor-pointer"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="tabular-nums">
                      {formatTime(currentSeconds)} / {activeClip.durationLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowTranscript(!showTranscript)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                        showTranscript ? 'bg-[#2D6A4F]/30 text-[#2D6A4F] border border-[#2D6A4F]/40' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        CC
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentSeconds(0)}
                      className="hover:text-white transition-colors cursor-pointer"
                      title="Restart clip"
                      aria-label="Restart clip"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Metadata Panel */}
            <div className="p-6 border-t border-white/10 bg-[#151B17]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    {activeClip.title}
                  </h3>
                  <div className="text-xs text-stone-300 font-sans flex items-center gap-2">
                    <span className="font-semibold text-[#E28D75]">{activeClip.speaker}</span>
                    <span className="text-white/30" aria-hidden="true">·</span>
                    <span>{activeClip.speakerTitle}</span>
                  </div>
                </div>

                {onScheduleBriefing && (
                  <button
                    type="button"
                    onClick={onScheduleBriefing}
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B85233] hover:bg-[#9E4429] text-white text-xs font-semibold tracking-wide transition cursor-pointer"
                  >
                    <span>Request Advisory Diagnostic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <p className="text-sm text-stone-300 leading-relaxed mb-4 font-sans">
                {activeClip.summary}
              </p>

              <div className="p-3.5 rounded-xl bg-white/5 border border-[#364339]/50 text-xs">
                <div className="font-semibold text-[#2D6A4F] flex items-center gap-1.5 font-mono text-[11px] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Strategic Executive Takeaway:</span>
                </div>
                <p className="text-stone-200 font-sans leading-normal">
                  {activeClip.keyTakeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Playlist & Executive Clips Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-3 px-1">
              Thought Leadership Clips ({CLIPS.length})
            </div>

            {CLIPS.map((clip) => {
              const isSelected = clip.id === activeClipId;
              return (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => handleSelectClip(clip)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border cursor-pointer flex gap-3 items-start ${
                    isSelected
                      ? 'bg-white/10 border-[#B85233] shadow-lg ring-1 ring-[#B85233]/40'
                      : 'bg-white/5 border-[#364339]/40 hover:bg-white/8 hover:border-[#364339]'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-black/60 border border-white/10">
                    <img
                      src={clip.poster}
                      alt={clip.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-white/90">
                      {clip.durationLabel}
                    </div>
                    {isSelected && (
                      <div className="absolute top-1 left-1 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#B85233] block shadow-xs" />
                      </div>
                    )}
                  </div>

                  {/* Clip Details */}
                  <div className="flex-grow min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#E28D75] mb-0.5">
                      {clip.series}
                    </div>
                    <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2 mb-1">
                      {clip.title}
                    </h4>
                    <div className="text-[11px] text-stone-400 truncate font-sans">
                      {clip.venue}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Quick Briefing Banner */}
            <div className="p-4 rounded-xl bg-white/5 border border-[#364339]/50 text-xs mt-4">
              <div className="flex items-center gap-2 text-white font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-[#B85233]" />
                <span>Executive Presentation Inquiries</span>
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px] mb-3">
                Continuum delivers customized keynote addresses and executive workshops on AI Center of Excellence operating models for Global 2000 leadership summits.
              </p>
              <a
                href="mailto:sean@continuum-dx.com?cc=srusinko@gmail.com&subject=Keynote%20or%20Advisory%20Presentation%20Inquiry"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E28D75] hover:text-white transition-colors"
              >
                <span>Inquire about keynote availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
