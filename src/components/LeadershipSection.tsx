import React, { useState, useEffect } from 'react';
import { FOUNDER_BIO } from '../data/content';
import {
  Mail,
  ArrowUpRight,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  ArrowDown,
  Sparkles,
  Presentation
} from 'lucide-react';
import {
  persistHeadshotPermanently,
  fetchRemoteHeadshot
} from '../services/founderProfileService';
import flowPlacemat from '../assets/images/continuum_flow_placemat_1792644490945.jpg';

interface LeadershipSectionProps {
  onScheduleBriefing?: () => void;
  customBioText?: string;
  onResetBio?: () => void;
}

const DEFAULT_HEADSHOT = '/assets/aistudio/headshot_Generated_Image_October_26__2026_-_10_04AM_8cb9d674.jpg';

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  onScheduleBriefing,
  customBioText,
  onResetBio
}) => {
  const [headshotUrl, setHeadshotUrl] = useState<string>(() => {
    return localStorage.getItem('continuum_founder_headshot') || DEFAULT_HEADSHOT;
  });
  const [isPersisted, setIsPersisted] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function syncHeadshot() {
      const localData = localStorage.getItem('continuum_founder_headshot');
      if (localData && localData.length > 5) {
        setHeadshotUrl(localData);
        return;
      }

      // Check remote profile
      try {
        const remoteUrl = await fetchRemoteHeadshot();
        if (remoteUrl && isMounted) {
          setHeadshotUrl(remoteUrl);
          localStorage.setItem('continuum_founder_headshot', remoteUrl);
          setIsPersisted(true);
        }
      } catch (err) {
        console.warn('Remote headshot sync check:', err);
      }
    }

    syncHeadshot();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="leadership" className="scroll-mt-28 py-28 bg-[#FAFAF9] border-t border-stone-200 relative text-stone-900">
      <span id="proof" className="scroll-mt-28 block pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-3 flex items-center justify-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Founder &amp; Principal Advisory</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-950 tracking-tight mb-4 [text-wrap:balance]">
            Backed by 17+ Years of Enterprise DX Leadership
          </h2>
          <p className="text-stone-600 text-base md:text-lg leading-relaxed">
            Continuum is led by enterprise strategists with nearly two decades at the intersection of Digital Experience Platforms (DXP), MarTech orchestration, and Go-To-Market execution.
          </p>
        </div>

        {/* Quantified Credentials Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border border-stone-200 mb-16 bg-white rounded-2xl px-6 shadow-sm">
          {FOUNDER_BIO.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-stone-900 font-mono tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-stone-500 leading-snug font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Bio & Portrait Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden bg-white border border-stone-200">
          {/* Subtle Background Visual Placemat */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
            <img
              src={flowPlacemat}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
          </div>

          {/* Left Column: Portrait & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-square max-w-md mx-auto shadow-lg group">
              <img
                src={headshotUrl}
                alt={`${FOUNDER_BIO.name} - ${FOUNDER_BIO.title}`}
                onError={() => {
                  setHeadshotUrl(DEFAULT_HEADSHOT);
                }}
                className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Profile Identifiers & Direct Affordances */}
            <div className="space-y-4 pt-1 max-w-md mx-auto">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-950 tracking-tight">
                  {FOUNDER_BIO.name}
                </h3>
                <div className="text-sm font-semibold text-blue-700 mt-0.5">
                  {FOUNDER_BIO.title}
                </div>
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                  <span>{FOUNDER_BIO.firm}</span>
                  <span className="text-stone-300" aria-hidden="true">·</span>
                  <span>{FOUNDER_BIO.parentEntity}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                <a
                  href={`mailto:${FOUNDER_BIO.email}?subject=Continuum%20DX%20Advisory%20Executive%20Briefing`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg text-white bg-[#2563EB] hover:bg-[#1E40AF] shadow-md shadow-blue-900/20 whitespace-nowrap cursor-pointer transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct: {FOUNDER_BIO.email}</span>
                </a>

                {onScheduleBriefing && (
                  <button
                    type="button"
                    onClick={onScheduleBriefing}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 border border-stone-300 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Request Advisory Diagnostic</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                )}

                <a
                  href="#work-in-action"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>View Work in Action Gallery (12 Photos)</span>
                  <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Narrative & Leadership Milestones (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider">
                  Executive Profile &amp; Pedigree
                </div>
                {customBioText && onResetBio && (
                  <button
                    type="button"
                    onClick={onResetBio}
                    className="text-[11px] text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Bio to Default</span>
                  </button>
                )}
              </div>

              {customBioText ? (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-800 whitespace-pre-line leading-relaxed">
                  {customBioText}
                </div>
              ) : (
                <>
                  <p className="text-base text-stone-900 leading-relaxed mb-4 font-normal">
                    {FOUNDER_BIO.summary}
                  </p>
                  <div className="space-y-3 text-sm text-stone-700 leading-relaxed font-normal">
                    {FOUNDER_BIO.narrativeParagraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Executive Strategic Mandate & Advisory Gravity */}
            <div className="space-y-4 pt-6 border-t border-stone-200">
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>The Continuum DX Advisory Mandate</span>
                </div>
                <p className="text-sm text-stone-800 leading-relaxed font-normal mb-3">
                  Operating at the highest level of enterprise digital leadership, Sean Rusinko synthesizes executive boardroom strategy with deep architectural rigor across modern DXP, Composable Web, and AI Control Plane ecosystems. Rather than delivering detached slide decks or inflating engineering hours, Continuum DX embeds directly into active, funded capital programs to establish permanent Center of Excellence governance.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-200/80 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 block">Advisory Focus</span>
                    <span className="font-semibold text-stone-900">AI DXMM &amp; CoE Overlay</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 block">Recognition</span>
                    <span className="font-semibold text-stone-900">6x Global Ecosystem MVP</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 block">Capital Programs</span>
                    <span className="font-semibold text-emerald-700">$100M+ Guided</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pedigree Marker Links & Gallery Link */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-y-3 text-xs text-stone-600 font-medium">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-stone-400 uppercase tracking-wider text-[10px] font-mono">Platform Depth:</span>
                <span className="text-stone-900 font-semibold">Sitecore</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Optimizely</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Salesforce</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Adobe</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Netlify</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Contentful</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Microsoft</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-900 font-semibold">Google</span>
              </div>
              <a
                href="#work-in-action"
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1 transition-colors group self-start sm:self-auto shrink-0"
              >
                <span>Live Engagements &amp; War Rooms</span>
                <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
