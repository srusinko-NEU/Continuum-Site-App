import React, { useState } from 'react';
import { DXMM_STAGES, MATURITY_TRANSITIONS } from '../data/content';
import { DXMMStageNumber } from '../types';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  CheckSquare,
  Layers,
  Cpu,
  Compass,
  GitCommit,
  CheckCircle2,
  Calendar,
  TrendingUp,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import flowPlacemat from '../assets/images/continuum_flow_placemat_1792644490945.jpg';

interface MethodologyTableProps {
  onStartDiagnostic: () => void;
  onOpenWhitePaper?: (chapterId?: string) => void;
}

export const MethodologyTable: React.FC<MethodologyTableProps> = ({
  onStartDiagnostic,
  onOpenWhitePaper
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'path'>('matrix');
  const [selectedStage, setSelectedStage] = useState<DXMMStageNumber>(2);
  const [selectedTransitionId, setSelectedTransitionId] = useState<string>(
    MATURITY_TRANSITIONS[0].id
  );

  const activeStageData = DXMM_STAGES.find((s) => s.stage === selectedStage) || DXMM_STAGES[1];
  const activeTransition =
    MATURITY_TRANSITIONS.find((t) => t.id === selectedTransitionId) || MATURITY_TRANSITIONS[0];

  return (
    <section id="methodology" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-28 text-slate-800 relative">
      <span id="framework" className="absolute -top-28 pointer-events-none" />
      {/* Header & Kicker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold font-mono tracking-wider text-blue-700 uppercase mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Modern Operational Framework (2026+ Standard)</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-serif font-bold text-[#090A0F] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            The AI DXMM Maturity Model &amp; Transition Path
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Originally pioneered during the early DXP era for static audience segmentation,
            the <strong className="text-[#090A0F] font-semibold">AI DXMM (Digital Experience Maturity Model)</strong>{' '}
            has been completely re-architected for modern generative AI and composable web ecosystems.
            Explore the 5 operational evolutionary stages—from{' '}
            <strong className="text-rose-600">Fragmented</strong> shadow AI to a fully{' '}
            <strong className="text-blue-700">Autonomous</strong> agentic edge control plane.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={onStartDiagnostic}
            className="btn-cobalt-primary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl shadow-sm cursor-pointer transition"
          >
            <span>Benchmark AI Maturity</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenWhitePaper && (
            <button
              onClick={() => onOpenWhitePaper('five_stages')}
              className="btn-ghost-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Read White Paper</span>
            </button>
          )}
        </div>
      </div>

      {/* View Switcher: Operational Matrix vs The 4-Step Transition Path */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-4 mb-8">
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>5-Stage Operational Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('path')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'path'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>The 4-Step Path: Fragmented to Autonomous</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span>Target Architecture: Composable Web &amp; Agentic Edge</span>
        </div>
      </div>

      {/* TAB 1: 5-Stage Operational Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Mobile Stacked Cards (< 768px): Eliminates horizontal scrollbar drift */}
          <div className="md:hidden space-y-3">
            {DXMM_STAGES.map((s) => {
              const isSelected = selectedStage === s.stage;
              return (
                <div
                  key={s.stage}
                  onClick={() => setSelectedStage(s.stage)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-2 border-blue-600 shadow-sm'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                        }`}
                      />
                      <span className="font-bold text-[#090A0F] text-sm">
                        Stage {s.stage}: {s.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Level {s.stage}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-medium text-blue-700 mb-1">
                    {s.focus}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.execution}
                  </p>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-blue-600 font-semibold">
                    <span>{isSelected ? 'Active Stage' : 'Tap to Inspect'}</span>
                    {isSelected ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Framework Table (>= 768px) */}
          <div className="hidden md:block bg-white border border-stone-200 overflow-x-auto rounded-2xl shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                  <th className="p-4 md:p-6">Maturity Stage</th>
                  <th className="p-4 md:p-6">Operational Focus</th>
                  <th className="p-4 md:p-6">AI DXMM Execution</th>
                  <th className="p-4 md:p-6 text-right">Deep Dive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm text-slate-700">
                {DXMM_STAGES.map((s) => {
                  const isSelected = selectedStage === s.stage;
                  return (
                    <tr
                      key={s.stage}
                      onClick={() => setSelectedStage(s.stage)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="p-4 md:p-6">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              isSelected ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                            }`}
                          />
                          <div>
                            <span className="font-bold text-[#090A0F] whitespace-nowrap block text-sm">
                              Stage {s.stage}: {s.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:p-6">
                        <span className="text-xs font-mono font-medium text-blue-700 block">
                          {s.focus}
                        </span>
                      </td>
                      <td className="p-4 md:p-6 text-slate-600 text-sm leading-relaxed max-w-xl">
                        {s.execution}
                      </td>
                      <td className="p-4 md:p-6 text-right">
                        <button
                          type="button"
                          className="text-xs font-mono font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                          aria-label={`View stage ${s.stage} details`}
                        >
                          <span>{isSelected ? 'Selected' : 'Inspect'}</span>
                          {isSelected ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Interactive Expanded Stage Detail View */}
          <div className="p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden bg-white border border-stone-200">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-6">
                <div>
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1 font-mono">
                    Stage Deep Dive Inspection
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#090A0F] flex items-center gap-3">
                    <span>
                      Stage {activeStageData.stage}: {activeStageData.name}
                    </span>
                    <span className="text-sm font-sans font-normal text-slate-500">
                      ({activeStageData.focus})
                    </span>
                  </h3>
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center gap-3">
                  <span>Select any row in the table above to explore stage characteristics</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Column 1: Operational Metrics & Risk Profile */}
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Content Velocity &amp; Output
                    </div>
                    <p className="text-xs font-mono text-emerald-800 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 leading-relaxed font-semibold">
                      {activeStageData.contentVelocity}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>Enterprise Risk Exposure</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {activeStageData.riskProfile}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Governance Rigor
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {activeStageData.governanceMaturity}
                    </p>
                  </div>
                </div>

                {/* Column 2: Typical Symptoms */}
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-3">
                    Common Organizational Symptoms
                  </div>
                  <ul className="space-y-3">
                    {activeStageData.typicalSymptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span className="leading-relaxed">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Priority Actions to Advance */}
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-blue-700">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Recommended Actions to Advance</span>
                  </div>
                  <ul className="space-y-3">
                    {activeStageData.keyActions.map((action, i) => (
                      <li
                        key={i}
                        className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-slate-800 flex items-start gap-2.5 shadow-2xs"
                      >
                        <span className="text-xs font-bold text-blue-700 font-mono mt-0.5">
                          {i + 1}.
                        </span>
                        <span className="leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The 4-Step Transition Path (From Fragmented to Autonomous) */}
      {activeTab === 'path' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Transition Stepper Pipeline Header */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MATURITY_TRANSITIONS.map((step, idx) => {
              const isSelected = selectedTransitionId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedTransitionId(step.id)}
                  className={`p-5 rounded-2xl text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-blue-600 bg-blue-50/70 shadow-sm'
                      : 'bg-white border border-stone-200 hover:border-blue-300 hover:bg-stone-50/80 shadow-2xs'
                  }`}
                >
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-700 font-bold">Step 0{idx + 1}</span>
                      <span className="text-slate-500">{step.duration.split(' ')[0]}</span>
                    </div>
                    <div className="text-sm font-bold text-[#090A0F] leading-snug">
                      Stage {step.fromStage} → Stage {step.toStage}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {step.title}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">
                      {step.fromName} → {step.toName}
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isSelected ? 'text-blue-700' : 'text-slate-500'
                      }`}
                    >
                      {isSelected ? 'Active Step' : 'View Path'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Transition Path Detail Card */}
          <div className="p-6 md:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm relative space-y-8">
            {/* Step Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-semibold uppercase">
                  <span>Transition Gateway: Stage {activeTransition.fromStage} ({activeTransition.fromName})</span>
                  <span>→</span>
                  <span>Stage {activeTransition.toStage} ({activeTransition.toName})</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#090A0F] tracking-tight">
                  {activeTransition.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
                  {activeTransition.coreObjective}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <div className="px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-slate-700">
                  <span className="text-slate-500">Estimated Horizon:</span>{' '}
                  <strong className="text-[#090A0F]">{activeTransition.duration}</strong>
                </div>

                {onOpenWhitePaper && activeTransition.whitePaperChapterId && (
                  <button
                    onClick={() => onOpenWhitePaper(activeTransition.whitePaperChapterId)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Read White Paper Chapter</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3-Column Roadmap: Prerequisites -> Milestones -> Technical Gates */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Box 1: Governance & Operational Prerequisites */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="text-xs font-mono font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Entry Prerequisites &amp; Criteria</span>
                </div>
                <ul className="space-y-3">
                  {activeTransition.prerequisites.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Operating Model & Delivery Milestones (70% Factor) */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Operating Model Milestones (70% Effort)</span>
                </div>
                <ul className="space-y-3">
                  {activeTransition.operationalMilestones.map((milestone, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 3: Technical Architecture & Edge Gates (20% Factor) */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="text-xs font-mono font-semibold text-indigo-700 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Architecture &amp; Edge Gates (20% Effort)</span>
                </div>
                <ul className="space-y-3">
                  {activeTransition.technicalArchitectureGates.map((gate, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                      <span>{gate}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Business Value Realization Banner */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <TrendingUp className="w-4 h-4 text-blue-700" />
                  <span>Business Value &amp; ROI Unlocked Upon Completion</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {activeTransition.businessValueUnlocked}
                </p>
              </div>

              <button
                onClick={onStartDiagnostic}
                className="btn-cobalt-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl shadow-xs shrink-0 cursor-pointer"
              >
                <span>Assess Your Current Gate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
