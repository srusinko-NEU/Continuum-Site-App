import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS, DXMM_STAGES } from '../data/content';
import { DXMMStageNumber } from '../types';
import {
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Copy,
  Check,
  Mail,
  BarChart3,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Printer,
  Building2,
  User,
  Layers,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import flowPlacemat from '../assets/images/continuum_flow_placemat_1792644490945.jpg';

interface DiagnosticToolProps {
  isOpen?: boolean;
  onClose?: () => void;
  onScheduleWithResult?: (resultSummary: string) => void;
  onOpenWhitePaper?: () => void;
}

const DXP_OPTIONS = [
  'Sitecore (XM Cloud / XP)',
  'Contentful Composable',
  'Optimizely One',
  'Adobe Experience Manager (AEM)',
  'Salesforce Experience Cloud',
  'Other / In-House Hybrid'
];

const TEAM_SIZE_OPTIONS = [
  '1–10 Authors / Engineers',
  '11–50 Cross-Functional Team',
  '50–200 Enterprise MarTech Group',
  '200+ Global Distributed Organization'
];

export const DiagnosticTool: React.FC<DiagnosticToolProps> = ({
  onScheduleWithResult,
  onOpenWhitePaper
}) => {
  // Pre-seed with representative enterprise state (mix of stage 1 and stage 2)
  const [answers, setAnswers] = useState<Record<string, number>>({
    content_generation: 1,
    governance_risk: 1,
    data_taxonomy: 2,
    architecture_stack: 2,
    operating_model: 1
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'architecture' | 'actions'>(
    'overview'
  );

  // Lead Generation Capture State
  const [leadFormSubmitted, setLeadFormSubmitted] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('continuum_lead_email'));
  });
  const [leadName, setLeadName] = useState(() => localStorage.getItem('continuum_lead_name') || '');
  const [leadEmail, setLeadEmail] = useState(
    () => localStorage.getItem('continuum_lead_email') || ''
  );
  const [leadOrg, setLeadOrg] = useState(() => localStorage.getItem('continuum_lead_org') || '');
  const [leadTitle, setLeadTitle] = useState(
    () => localStorage.getItem('continuum_lead_title') || ''
  );
  const [leadStack, setLeadStack] = useState(
    () => localStorage.getItem('continuum_lead_stack') || 'Sitecore (XM Cloud / XP)'
  );
  const [leadTeamSize, setLeadTeamSize] = useState(
    () => localStorage.getItem('continuum_lead_teamsize') || '11–50 Cross-Functional Team'
  );

  const handleSelectOption = (questionId: string, stage: DXMMStageNumber) => {
    setAnswers((prev) => ({ ...prev, [questionId]: stage }));
  };

  // Compute results
  const currentQ = ASSESSMENT_QUESTIONS[activeQuestionIndex];
  const questionCount = ASSESSMENT_QUESTIONS.length;

  const totalStageScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  const avgStage = Math.round(totalStageScore / questionCount) as DXMMStageNumber;
  const clampedStage = Math.min(Math.max(avgStage, 1), 5) as DXMMStageNumber;
  const scorePercentage = Math.round((totalStageScore / (questionCount * 5)) * 100);

  const matchedStage = DXMM_STAGES.find((s) => s.stage === clampedStage) || DXMM_STAGES[0];

  const getEcosystemRecommendation = (stack: string) => {
    if (stack.includes('Sitecore')) {
      return 'For Sitecore XM Cloud / XP: Overlay composable edge connectors to decouple frontend rendering from the Sitecore authoring instance. Connect Bynder/Aprimo DAM and Salsify PIM into XM Cloud components via GraphQL, and deploy an automated prompt registry to accelerate page composition while safeguarding brand voice.';
    }
    if (stack.includes('Contentful')) {
      return 'For Contentful Composable: Integrate the Continuum AI Control Plane directly with Contentful App Framework. Embed real-time toxicity and factual grounding scoring inside the editorial sidebar, enabling marketing teams to generate structured multi-locale variants without copy-paste drift.';
    }
    if (stack.includes('Optimizely')) {
      return 'For Optimizely One: Unify Optimizely CMS with enterprise DAM assets and edge middleware functions. Execute real-time visitor experimentation and personalization at the global edge without origin server latency.';
    }
    if (stack.includes('Adobe')) {
      return 'For Adobe Experience Manager (AEM): Decouple monolithic AEM authoring bottlenecks with composable edge middleware. Link Adobe Experience Platform (AEP) and asset repositories into a versioned prompt registry with automated PII redaction and brand safety gates.';
    }
    if (stack.includes('Salesforce')) {
      return 'For Salesforce Experience Cloud & Data Cloud: Connect Salesforce Data Cloud behavioral signals into the edge AI control plane for sub-100ms personalized portal rendering without heavy server-side Apex API callout bottlenecks.';
    }
    return 'For Enterprise Hybrid DXPs: Deploy an API-first Composable AI Control Plane that unifies disparate CMS repositories, establishes a single-source-of-truth semantic layer, and enforces automated editorial QA before production deployment.';
  };

  const generateReportText = () => {
    return `CONTINUUM DX ADVISORY — AI DXMM MATURITY ASSESSMENT REPORT
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Organization: ${leadOrg || 'Confidential Enterprise Client'}
Executive Contact: ${leadName || 'Executive Lead'} (${leadTitle || 'Leader'})
Primary DXP Stack: ${leadStack}
Team Scale: ${leadTeamSize}

OVERALL BENCHMARK RESULT:
Stage: Stage ${clampedStage} (${matchedStage.name})
Maturity Score: ${scorePercentage}%
Operational Focus: ${matchedStage.focus}

PILLAR BENCHMARK SCORES:
${ASSESSMENT_QUESTIONS.map((q) => `- ${q.category}: Stage ${answers[q.id]} / 5`).join('\n')}

OPERATIONAL SUMMARY:
${matchedStage.execution}

CURRENT ENTERPRISE RISK PROFILE:
${matchedStage.riskProfile}

TARGET ARCHITECTURE RECOMMENDATION (${leadStack}):
${getEcosystemRecommendation(leadStack)}

RECOMMENDED 90-DAY ACTIONS:
${matchedStage.keyActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

ADVISORY PRACTICE:
Continuum DX Advisory (SMR Holdings LLC)
Sean Rusinko, Founder & Managing Director
Email: srusinko@gmail.com`;
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handlePrintScorecard = () => {
    window.print();
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail.trim()) {
      setLeadFormSubmitted(true);
      localStorage.setItem('continuum_lead_email', leadEmail);
      if (leadName) localStorage.setItem('continuum_lead_name', leadName);
      if (leadOrg) localStorage.setItem('continuum_lead_org', leadOrg);
      if (leadTitle) localStorage.setItem('continuum_lead_title', leadTitle);
      if (leadStack) localStorage.setItem('continuum_lead_stack', leadStack);
      if (leadTeamSize) localStorage.setItem('continuum_lead_teamsize', leadTeamSize);

      // Silently forward assessment lead data to advisory inbox
      fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName || 'Executive Lead',
          email: leadEmail.trim(),
          company: leadOrg || 'Confidential Enterprise',
          platform: leadStack || 'AI DXMM Architecture',
          selectedOffering: `AI DXMM Stage ${clampedStage} Benchmark (${matchedStage.name})`,
          primaryBottleneck: matchedStage.focus,
          notes: `Self-Benchmark Score: ${scorePercentage}% (${totalStageScore}/${questionCount * 5}). Role/Title: ${leadTitle || 'Not specified'}. Team Size: ${leadTeamSize || 'Not specified'}. Organization: ${leadOrg || 'Not specified'}.`,
          source: 'AI DXMM Interactive Self-Benchmark Assessment'
        })
      }).catch(() => {
        // Silent catch: form state remains seamless for user
      });
    }
  };

  const handleRequestDiagnostic = () => {
    const summary = `AI DXMM Benchmark: Stage ${clampedStage} (${matchedStage.name}) with ${scorePercentage}% maturity on ${leadStack}. Lead: ${leadName || 'Executive'} (${leadOrg || 'Enterprise'}, ${leadEmail || 'Email pending'}). Focus: ${matchedStage.focus}.`;
    if (onScheduleWithResult) {
      onScheduleWithResult(summary);
    }
  };

  return (
    <section id="diagnostic-tool" className="py-24 bg-[#F7F6F3] text-[#455249] border-b border-[#E2E5E0] relative overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#B85233] uppercase mb-3 flex items-center justify-center gap-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#B85233]" />
            <span>Interactive Self-Benchmark Assessment</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-serif font-bold text-[#151B17] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Benchmark Your Enterprise AI DXMM Maturity
          </h2>
          <p className="text-[#455249] text-base md:text-lg leading-relaxed">
            Answer 5 high-impact questions to evaluate your organization&apos;s current operational state
            across the 5 modern stages—from <strong className="text-rose-700">Fragmented</strong> to{' '}
            <strong className="text-[#B85233]">Autonomous</strong>. Receive an immediate customized executive
            gap analysis, architectural recommendation for your DXP stack, and unlock the complete transformation white paper.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Assessment Questions (7 cols) */}
          <div className="bg-white border border-[#E2E5E0] lg:col-span-7 p-6 md:p-8 rounded-3xl shadow-xs space-y-6">
            {/* Step navigation / Category bar */}
            <div className="flex items-center justify-between gap-2 pb-6 border-b border-[#E2E5E0]">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {ASSESSMENT_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeQuestionIndex === idx
                        ? 'bg-[#B85233] text-white shadow-xs font-semibold'
                        : answers[q.id]
                        ? 'bg-[#F8ECE8] border border-[#B85233]/30 text-[#B85233] hover:bg-[#F2DDD7]'
                        : 'text-[#697A6F] hover:text-[#151B17]'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden sm:inline">. {q.category.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#697A6F] font-mono shrink-0 tabular-nums">
                {activeQuestionIndex + 1} of {questionCount}
              </div>
            </div>

            {/* Current Question */}
            <div>
              <div className="text-xs font-mono font-semibold text-[#B85233] uppercase tracking-wider mb-1">
                Dimension 0{activeQuestionIndex + 1}: {currentQ.category}
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#151B17] mb-2 leading-snug">
                {currentQ.title}
              </h3>
              <p className="text-sm text-[#455249] leading-relaxed">{currentQ.description}</p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.stage;
                return (
                  <button
                    key={opt.stage}
                    onClick={() => handleSelectOption(currentQ.id, opt.stage)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F8ECE8] border-2 border-[#B85233] shadow-xs text-[#151B17]'
                        : 'bg-stone-50/70 border-[#E2E5E0] hover:border-[#D0D4CD] hover:bg-stone-100/70 text-[#455249]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#B85233] bg-[#B85233]' : 'border-stone-400 bg-white'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-bold block ${
                            isSelected ? 'text-[#151B17]' : 'text-[#151B17]'
                          }`}
                        >
                          Stage {opt.stage}: {opt.label}
                        </span>
                        <span className="text-xs font-mono text-[#B85233] font-semibold tabular-nums">
                          Level {opt.stage}
                        </span>
                      </div>
                      <p className="text-xs text-[#455249] leading-relaxed">{opt.subtext}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2E5E0]">
              <button
                type="button"
                onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeQuestionIndex === 0}
                className="px-4 py-2 text-xs font-semibold text-[#697A6F] hover:text-[#151B17] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                ← Previous Dimension
              </button>

              {activeQuestionIndex < questionCount - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex((prev) => Math.min(questionCount - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#B85233] hover:bg-[#9E4429] text-white transition-colors cursor-pointer"
                >
                  <span>Next Dimension</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs text-[#2D6A4F] font-semibold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                  <span>All Dimensions Evaluated</span>
                </span>
              )}
            </div>
          </div>

          {/* Right: Real-Time Benchmark Results & Lead Gen Engine (5 cols) */}
          <div className="bg-white border border-[#E2E5E0] lg:col-span-5 p-6 md:p-8 rounded-3xl shadow-xs relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E5E0]">
              <div>
                <div className="text-xs font-mono font-semibold text-[#B85233] uppercase tracking-wider mb-1">
                  Your Maturity Benchmark
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#151B17] flex items-center gap-2">
                  <span>
                    Stage {clampedStage}: {matchedStage.name}
                  </span>
                </h3>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black text-[#B85233] font-mono tabular-nums">
                  {scorePercentage}%
                </div>
                <div className="text-[10px] text-[#697A6F] uppercase tracking-wider font-mono">
                  Maturity Score
                </div>
              </div>
            </div>

            {/* Stage Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#455249] font-mono">
                <span>Progress to Autonomous (Stage 5)</span>
                <span className="tabular-nums font-semibold text-[#B85233]">{scorePercentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden p-0.5 border border-[#E2E5E0]">
                <div
                  className="h-full bg-gradient-to-r from-[#B85233] to-[#D96B43] transition-all duration-500 rounded-full"
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>

            {/* Dimension Breakdown Bar List */}
            <div className="space-y-2.5 p-4 rounded-xl bg-stone-50 border border-[#E2E5E0]">
              <div className="text-xs font-mono font-semibold text-[#151B17] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#B85233]" />
                <span>Pillar Scorecard</span>
              </div>
              {ASSESSMENT_QUESTIONS.map((q) => {
                const qStage = answers[q.id] || 1;
                const pct = (qStage / 5) * 100;
                return (
                  <div key={q.id} className="text-xs space-y-1">
                    <div className="flex justify-between text-[#455249]">
                      <span className="truncate pr-2">{q.category}</span>
                      <span className="font-mono text-[#B85233] font-semibold shrink-0 tabular-nums">
                        Stage {qStage} / 5
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-200">
                      <div
                        className="h-full bg-[#B85233] rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lead Gen Capture Form OR Unlocked Actions */}
            {!leadFormSubmitted ? (
              <div className="p-5 rounded-2xl bg-stone-50 border border-[#B85233]/25 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#151B17] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#B85233]" />
                    <span>Unlock Full Scorecard &amp; Executive White Paper</span>
                  </div>
                  <p className="text-xs text-[#455249] leading-relaxed">
                    Enter your organization details to generate your tailored gap analysis memo,
                    unlock stack-specific guidance for your DXP, and read the 2026 Executive White Paper:
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E2E5E0] rounded-lg text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233]"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={leadTitle}
                      onChange={(e) => setLeadTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E2E5E0] rounded-lg text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E2E5E0] rounded-lg text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Organization / Company *"
                      value={leadOrg}
                      onChange={(e) => setLeadOrg(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E2E5E0] rounded-lg text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#455249] font-medium font-mono">Primary DXP:</label>
                      <select
                        value={leadStack}
                        onChange={(e) => setLeadStack(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-[#E2E5E0] rounded-lg text-[#151B17] focus:outline-none focus:border-[#B85233]"
                      >
                        {DXP_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-[#151B17]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#455249] font-medium font-mono">Team Scale:</label>
                      <select
                        value={leadTeamSize}
                        onChange={(e) => setLeadTeamSize(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-[#E2E5E0] rounded-lg text-[#151B17] focus:outline-none focus:border-[#B85233]"
                      >
                        {TEAM_SIZE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-[#151B17]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#B85233] hover:bg-[#9E4429] text-white shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Generate My Custom Scorecard &amp; White Paper Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Unlocked Guidance Navigation Tabs */}
                <div className="flex border-b border-[#E2E5E0] text-xs">
                  <button
                    onClick={() => setActiveResultTab('overview')}
                    className={`pb-2 px-3 font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeResultTab === 'overview'
                        ? 'border-[#B85233] text-[#B85233]'
                        : 'border-transparent text-[#697A6F] hover:text-[#151B17]'
                    }`}
                  >
                    Risk &amp; Gap Analysis
                  </button>
                  <button
                    onClick={() => setActiveResultTab('architecture')}
                    className={`pb-2 px-3 font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeResultTab === 'architecture'
                        ? 'border-[#B85233] text-[#B85233]'
                        : 'border-transparent text-[#697A6F] hover:text-[#151B17]'
                    }`}
                  >
                    DXP Architecture ({leadStack.split(' ')[0]})
                  </button>
                  <button
                    onClick={() => setActiveResultTab('actions')}
                    className={`pb-2 px-3 font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeResultTab === 'actions'
                        ? 'border-[#B85233] text-[#B85233]'
                        : 'border-transparent text-[#697A6F] hover:text-[#151B17]'
                    }`}
                  >
                    90-Day Roadmap
                  </button>
                </div>

                {/* TAB CONTENT: Overview */}
                {activeResultTab === 'overview' && (
                  <div className="p-4 rounded-xl bg-[#151B17] border border-[#364339]/40 space-y-3 text-xs leading-relaxed animate-in fade-in duration-150">
                    <div className="flex items-start gap-2 text-white font-medium">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-white">
                          Identified Vulnerabilities:
                        </span>
                        <span className="text-stone-300">{matchedStage.riskProfile}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-stone-200 space-y-1">
                      <span className="font-semibold text-[#E28D75] block font-mono">
                        Recommended Engagement:
                      </span>
                      <span>
                        {clampedStage <= 2
                          ? 'AI CoE Project Diagnostic: 2–3 week intensive audit overlaid on your active beachhead initiative.'
                          : clampedStage === 3
                          ? 'AI Operations & Prompt Governance control plane expansion.'
                          : 'Federated Scaling & Autonomous Composable Edge Enablement.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Architecture */}
                {activeResultTab === 'architecture' && (
                  <div className="p-4 rounded-xl bg-[#151B17] border border-[#364339]/40 space-y-2 text-xs leading-relaxed animate-in fade-in duration-150">
                    <div className="font-semibold text-[#E28D75] flex items-center gap-1.5 font-mono">
                      <Cpu className="w-3.5 h-3.5 text-[#E28D75]" />
                      <span>Architecture Guidance for {leadStack}:</span>
                    </div>
                    <p className="text-stone-200">{getEcosystemRecommendation(leadStack)}</p>
                  </div>
                )}

                {/* TAB CONTENT: 90-Day Actions */}
                {activeResultTab === 'actions' && (
                  <div className="p-4 rounded-xl bg-[#151B17] border border-[#364339]/40 space-y-2 text-xs leading-relaxed animate-in fade-in duration-150">
                    <div className="font-semibold text-[#E28D75] flex items-center gap-1.5 mb-1 font-mono">
                      <TrendingUp className="w-3.5 h-3.5 text-[#E28D75]" />
                      <span>Priority 90-Day Milestones:</span>
                    </div>
                    <ul className="space-y-1.5">
                      {matchedStage.keyActions.map((act, idx) => (
                        <li key={idx} className="text-stone-200 flex items-start gap-1.5">
                          <span className="text-[#E28D75] font-bold font-mono">{idx + 1}.</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  {/* Unlocked White Paper Button */}
                  {onOpenWhitePaper && (
                    <button
                      type="button"
                      onClick={onOpenWhitePaper}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs md:text-sm font-semibold text-[#B85233] bg-[#F8ECE8] hover:bg-[#F2DDD7] border border-[#B85233]/30 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#B85233]" />
                      <span>Read Full White Paper &amp; Blueprint Guide</span>
                    </button>
                  )}

                  {/* Primary CTA: Request Briefing */}
                  <button
                    type="button"
                    onClick={handleRequestDiagnostic}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs md:text-sm font-semibold rounded-xl bg-[#B85233] hover:bg-[#9E4429] text-white shadow-sm transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Schedule Executive Briefing with Sean Rusinko</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handlePrintScorecard}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E2E5E0] bg-white text-[#151B17] hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#455249]" />
                      <span>Print / PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyReport}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E2E5E0] bg-white text-[#151B17] hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#455249]" />
                      )}
                      <span>{copied ? 'Copied' : 'Copy Memo'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({
                          content_generation: 1,
                          governance_risk: 1,
                          data_taxonomy: 1,
                          architecture_stack: 1,
                          operating_model: 1
                        });
                        setActiveQuestionIndex(0);
                      }}
                      title="Reset Assessment"
                      className="px-3 py-2 text-xs text-[#697A6F] hover:text-[#151B17] border border-[#E2E5E0] bg-white rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                      aria-label="Reset assessment"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
