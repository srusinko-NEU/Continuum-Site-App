import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ArrowRight,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Layers,
  ChevronRight,
  FileText,
  Share2,
  Clock,
  User,
  Building2,
  Mail,
  Check
} from 'lucide-react';
import { WHITE_PAPER_METADATA, WHITE_PAPER_CHAPTERS } from '../data/whitePaperContent';

interface WhitePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScheduler?: () => void;
  defaultChapterId?: string;
  prefilledEmail?: string;
  prefilledOrg?: string;
}

export const WhitePaperModal: React.FC<WhitePaperModalProps> = ({
  isOpen,
  onClose,
  onOpenScheduler,
  defaultChapterId,
  prefilledEmail,
  prefilledOrg
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(
    defaultChapterId || WHITE_PAPER_CHAPTERS[0].id
  );
  const [downloadLeadEmail, setDownloadLeadEmail] = useState<string>(prefilledEmail || '');
  const [downloadLeadOrg, setDownloadLeadOrg] = useState<string>(prefilledOrg || '');
  const [downloadUnlocked, setDownloadUnlocked] = useState<boolean>(Boolean(prefilledEmail));
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeChapter =
    WHITE_PAPER_CHAPTERS.find((c) => c.id === activeChapterId) || WHITE_PAPER_CHAPTERS[0];

  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  const handleUnlockWhitePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadLeadEmail.trim()) {
      setDownloadUnlocked(true);
      localStorage.setItem('continuum_lead_email', downloadLeadEmail);
      if (downloadLeadOrg) {
        localStorage.setItem('continuum_lead_org', downloadLeadOrg);
      }

      // Silently forward white paper download lead to advisory inbox
      fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Executive White Paper Reader',
          email: downloadLeadEmail.trim(),
          company: downloadLeadOrg || 'Confidential Enterprise',
          platform: 'Enterprise AI DXMM Architecture',
          selectedOffering: 'Executive White Paper & Transformation Guide Unlock',
          primaryBottleneck: 'Governance & Composable Modernization',
          notes: `White Paper Download unlocked: ${WHITE_PAPER_METADATA.title}: ${WHITE_PAPER_METADATA.subtitle}`,
          source: 'Executive White Paper Modal'
        })
      }).catch(() => {
        // Silent catch: download flow remains uninterrupted
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#F7F6F3] border border-[#E2E5E0] rounded-3xl max-w-5xl w-full my-auto shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#E2E5E0] bg-white/80 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8ECE8] border border-[#B85233]/30 flex items-center justify-center text-[#B85233]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#B85233] uppercase tracking-wider font-semibold">
                Executive White Paper &amp; Transformation Guide
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#151B17] tracking-tight">
                {WHITE_PAPER_METADATA.title}: {WHITE_PAPER_METADATA.subtitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintOrDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#455249] bg-white hover:bg-stone-50 border border-[#E2E5E0] rounded-lg transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#455249] bg-white hover:bg-stone-50 border border-[#E2E5E0] rounded-lg transition-colors cursor-pointer"
              title="Copy share link"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isCopied ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#697A6F] hover:text-[#151B17] rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close White Paper modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 bg-white/50 border-b border-[#E2E5E0] text-xs shrink-0">
          {WHITE_PAPER_METADATA.stats.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="text-xl font-mono font-extrabold text-[#B85233]">{s.value}</div>
              <div className="text-[11px] text-[#455249] leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Content Body Layout: Sidebar Navigator (Left 4 cols) & Chapter Text (Right 8 cols) */}
        <div className="flex-1 overflow-y-auto grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E5E0]">
          {/* Left Column: Chapters Navigation */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-white/30 space-y-4">
            <div className="text-xs font-semibold text-[#697A6F] uppercase tracking-wider mb-2 font-mono">
              Table of Contents
            </div>
            <div className="space-y-2">
              {WHITE_PAPER_CHAPTERS.map((chap) => {
                const isActive = chap.id === activeChapterId;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => setActiveChapterId(chap.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#B85233] text-[#151B17] shadow-sm ring-1 ring-[#B85233]/30'
                        : 'bg-white/80 border-[#E2E5E0] text-[#455249] hover:bg-white hover:text-[#151B17]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B85233] mb-1 font-semibold">
                      <span>Chapter {chap.number}</span>
                      <span className="text-[#697A6F] flex items-center gap-1 font-normal font-sans">
                        <Clock className="w-3 h-3" />
                        {chap.readingTime}
                      </span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-[#151B17] mb-0.5">
                      {chap.title}
                    </div>
                    <div className="text-[11px] text-[#697A6F] line-clamp-1">{chap.subtitle}</div>
                  </button>
                );
              })}
            </div>

            {/* Author Credit Box */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E5E0] mt-6 space-y-2 text-xs">
              <div className="font-semibold text-[#151B17]">Author &amp; Practice Leadership</div>
              <div className="text-[#B85233] font-medium">{WHITE_PAPER_METADATA.author}</div>
              <p className="text-[11px] text-[#455249] leading-relaxed">
                17+ years in enterprise DXP and digital transformation leadership across Sitecore SBOS, Verndale, Progress Software, and Salsify.
              </p>
            </div>
          </div>

          {/* Right Column: Active Chapter Content */}
          <div className="lg:col-span-8 p-6 sm:p-10 space-y-8 bg-transparent">
            {/* Chapter Header */}
            <div className="border-b border-[#E2E5E0] pb-6 space-y-2">
              <div className="text-xs font-mono text-[#B85233] font-semibold uppercase">
                Chapter {activeChapter.number} // {activeChapter.readingTime}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151B17] tracking-tight">
                {activeChapter.title}
              </h1>
              <p className="text-sm font-medium text-[#455249] leading-relaxed">
                {activeChapter.subtitle}
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#E2E5E0] text-xs text-[#455249] italic leading-relaxed">
                {activeChapter.summary}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8 text-sm text-[#455249] leading-relaxed">
              {activeChapter.sections.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-lg font-bold text-[#151B17] tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B85233]" />
                    <span>{sec.heading}</span>
                  </h3>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.callout && (
                    <div
                      className={`p-4 rounded-xl border text-xs leading-relaxed ${
                        sec.callout.type === 'warning'
                          ? 'bg-[#F8ECE8] border-[#B85233]/30 text-[#151B17]'
                          : sec.callout.type === 'insight'
                          ? 'bg-[#E8F1EC] border-[#2D6A4F]/30 text-[#151B17]'
                          : 'bg-white border-[#E2E5E0] text-[#151B17]'
                      }`}
                    >
                      <div className="font-semibold text-[#151B17] mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#B85233]" />
                        <span>{sec.callout.title}</span>
                      </div>
                      <p>{sec.callout.text}</p>
                    </div>
                  )}

                  {sec.takeaways && (
                    <div className="p-4 rounded-xl bg-white border border-[#E2E5E0] space-y-2">
                      <div className="text-[11px] font-semibold text-[#2D6A4F] uppercase tracking-wider font-mono">
                        Key Executive Takeaways
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#455249]">
                        {sec.takeaways.map((t, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Actions Banner */}
            <div className="pt-8 border-t border-[#E2E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#151B17]">
                  Ready to Benchmark Your Current Operational State?
                </div>
                <div className="text-[11px] text-[#455249]">
                  Request an executive diagnostic or discuss overlaying governance onto your anchor programs.
                </div>
              </div>

              {onOpenScheduler && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenScheduler();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#B85233] hover:bg-[#9E4429] text-white shadow-sm transition-colors cursor-pointer shrink-0"
                >
                  <span>Request Executive Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
