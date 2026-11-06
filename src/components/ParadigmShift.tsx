import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  X, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Sliders 
} from 'lucide-react';
import flowPlacemat from '../assets/images/continuum_flow_placemat_1792644490945.jpg';

interface ComparisonDimension {
  id: string;
  name: string;
  traditional: string;
  modern: string;
  metric: string;
  sourceContext: string;
}

const DIMENSIONS: ComparisonDimension[] = [
  {
    id: 'operating_model',
    name: 'CoE Operating Model & Orchestration',
    traditional:
      'The "Ivory Tower CoE" — Isolated central innovation lab that acts as an approval bottleneck, detached from P&L business unit timelines and funding.',
    modern:
      'Federated CoE as an Orchestration Engine — Central team codifies blueprints and Responsible AI guardrails, empowering embedded business unit squads to execute with autonomy.',
    metric: '4-Week BU Scaling vs 9-Month Lag',
    sourceContext: 'Federated Operating Model Standard'
  },
  {
    id: 'change_mgmt',
    name: 'Change Enablement & Human-Centered AI (The 70% Factor)',
    traditional:
      'Pure IT tool-drop — Software licenses handed out with zero role redesign, leading to middle-management resistance and shadow AI usage.',
    modern:
      'The 70/20/10 Rule — 70% of enterprise effort focused on people, workflow rewiring, and cultural upskilling; 20% on composable architecture; 10% on AI models.',
    metric: '90%+ Active Employee Adoption',
    sourceContext: 'Human-Centered Capability Building'
  },
  {
    id: 'content',
    name: 'Content Operations & Campaign Velocity',
    traditional:
      'The Pilot Trap — Disjointed teams copy-pasting ad-hoc prompts into consumer accounts, waiting 3–4 weeks for compliance and brand reviews.',
    modern:
      'Governed agentic pipelines running inside authoring workflows (Sitecore, Contentful, Optimizely, Adobe); automated brand voice scoring and factuality verification execute in minutes.',
    metric: '65% Faster Time-to-Market',
    sourceContext: 'Empirical Global 2000 Transformation Benchmark'
  },
  {
    id: 'taxonomy',
    name: 'Data Grounding & Asset Integration',
    traditional:
      'Siloed asset repositories with zero real-time DAM/PIM connection, forcing AI models to hallucinate specs and brand standards.',
    modern:
      'Semantic vector layer grounding LLMs directly to verified Bynder, Aprimo, and Salsify repositories with automated PII redaction.',
    metric: '100% Deterministic Factuality',
    sourceContext: 'Single-Source-of-Truth Enterprise Architecture'
  },
  {
    id: 'architecture',
    name: 'Composable Web Platform & Edge Architecture',
    traditional:
      'Monolithic DXPs with tight backend coupling, high infrastructure licensing overhead, and slow release cycles.',
    modern:
      'Decoupled composable architecture with sub-100ms edge middleware, localized personalization, and branch previews for instant legal/brand approval.',
    metric: '50% Reduction in Infrastructure Overhead',
    sourceContext: 'MACH Alliance & Composable Web Standard'
  }
];

export const ParadigmShift: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<string>('operating_model');

  const selectedDim = DIMENSIONS.find((d) => d.id === activeDimension) || DIMENSIONS[0];

  return (
    <section id="paradigm" className="py-24 bg-[#F7F6F3] text-[#455249] border-b border-[#E2E5E0] relative overflow-hidden scroll-mt-28">
      <span id="bento" className="absolute -top-28 pointer-events-none" />
      <span id="market-shift" className="absolute -top-28 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAECE9] border border-[#D0D4CD] text-xs font-mono text-[#364339] font-semibold mb-4 shadow-2xs">
            <span>THE OPERATIONAL BOTTLENECK</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#151B17] tracking-tight mb-4" style={{ textWrap: 'balance' }}>
            Why Generative AI Stalls in Enterprise Portfolios
          </h2>
          <p className="text-[#455249] text-base md:text-lg leading-relaxed">
            Enterprise transformation benchmarks confirm: AI initiatives do not fail on algorithm capability—they stall on fragmented operating models, lack of project-level funding, and monolithic architectural drag.
          </p>
        </div>

        {/* Master Comparison Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Failure State Bento Card */}
          <div className="p-7 md:p-9 rounded-2xl bg-white border border-rose-200/90 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-600 font-bold block">
                  The Conventional Failure Pattern
                </span>
                <h3 className="text-xl font-bold text-[#151B17] tracking-tight">The Ad-Hoc Pilot Trap</h3>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-[#455249]">
              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs mt-0.5">
                  ✕
                </span>
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Unvetted Tool Sprawl:</strong> Business units purchase isolated AI SaaS point solutions, creating disconnected data silos and enterprise IP exposure risk.
                </span>
              </li>

              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs mt-0.5">
                  ✕
                </span>
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Ivory Tower Committees:</strong> Standalone Center of Excellence (CoE) funding petitions stall in procurement and steer-co reviews for 9–12 months.
                </span>
              </li>

              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs mt-0.5">
                  ✕
                </span>
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Brand Drift &amp; Hallucinations:</strong> Unregulated prompts generate inconsistent tone, inaccurate product specs, and costly compliance audit flags.
                </span>
              </li>

              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs mt-0.5">
                  ✕
                </span>
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Monolithic Replatform Drag:</strong> Legacy CMS backends force multi-week release cycles, locking teams out of real-time edge personalization.
                </span>
              </li>
            </ul>
          </div>

          {/* Continuum Fix Bento Card */}
          <div className="p-7 md:p-9 rounded-2xl bg-white border-2 border-[#B85233] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#B85233] text-white text-[10px] font-mono font-bold uppercase tracking-wider py-1 px-3.5 rounded-bl-xl shadow-xs">
              Operating Standard
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#F8ECE8] text-[#B85233] border border-[#EACCC2]">
                <Zap className="w-5 h-5 text-[#B85233]" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B85233] font-bold block">
                  The Continuum Remedy
                </span>
                <h3 className="text-xl font-bold text-[#151B17] tracking-tight">The Continuum CoE Overlay</h3>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-[#455249]">
              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8ECE8]/40 border border-[#EACCC2]/50">
                <CheckCircle2 className="w-5 h-5 text-[#B85233] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Eliminate Committee Latency:</strong> Embedded directly into active, funded capital programs (replatforming, customer portals, or DAM migrations)—no new CoE line-item required.
                </span>
              </li>

              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8ECE8]/40 border border-[#EACCC2]/50">
                <CheckCircle2 className="w-5 h-5 text-[#B85233] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Deterministic In-Flight Guardrails:</strong> Central prompt registry and brand safety firewalls wired directly into CMS/DXP authoring pipelines (Sitecore, Contentful, Optimizely).
                </span>
              </li>

              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8ECE8]/40 border border-[#EACCC2]/50">
                <CheckCircle2 className="w-5 h-5 text-[#B85233] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Execution in Sprints:</strong> Realized value measured in 2-week agile delivery sprints, not theoretical 18-month advisory decks.
                </span>
              </li>

              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8ECE8]/40 border border-[#EACCC2]/50">
                <CheckCircle2 className="w-5 h-5 text-[#B85233] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-[#151B17] font-semibold">Federated BU Scaling:</strong> Beachhead assets packaged into turnkey &quot;CoE in a Box&quot; kits to onboard adjacent divisions in 4 weeks with zero added overhead.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Deep-Dive Interactive Inspection Across 5 Operating Dimensions */}
        <div className="p-6 md:p-8 bg-white border border-[#E2E5E0] rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2E5E0]">
            <div>
              <span className="text-xs font-mono font-semibold text-[#B85233] uppercase tracking-wider block">
                Detailed Dimension Analysis
              </span>
              <h4 className="text-lg font-bold text-[#151B17] tracking-tight">Inspect Operational Differences by Function</h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#697A6F]">
              <Sliders className="w-3.5 h-3.5 text-[#B85233]" />
              <span>Select Dimension:</span>
            </div>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
            {DIMENSIONS.map((dim) => {
              const isSelected = activeDimension === dim.id;
              return (
                <button
                  key={dim.id}
                  type="button"
                  onClick={() => setActiveDimension(dim.id)}
                  className={`p-3 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#B85233] bg-[#F8ECE8] font-semibold text-[#B85233] shadow-2xs'
                      : 'border-[#E2E5E0] bg-[#F7F6F3] hover:bg-stone-100 hover:border-stone-300 text-[#455249]'
                  }`}
                >
                  <div className="truncate font-medium">{dim.name.split('(')[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Dimension Detail Grid */}
          <div className="grid md:grid-cols-12 gap-6 p-6 rounded-2xl bg-[#F7F6F3] border border-[#E2E5E0] items-center">
            <div className="md:col-span-5 space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-rose-600 font-bold flex items-center gap-1.5">
                <span>The Conventional Trap</span>
              </div>
              <p className="text-xs md:text-sm text-[#455249] leading-relaxed">
                {selectedDim.traditional}
              </p>
            </div>

            <div className="md:col-span-2 flex items-center justify-center">
              <div className="px-3 py-1 rounded-full bg-white border border-[#E2E5E0] shadow-2xs text-[#455249] font-mono text-xs font-bold">
                VS
              </div>
            </div>

            <div className="md:col-span-5 space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-[#B85233] font-bold flex items-center justify-between">
                <span>The Continuum Approach</span>
                <span className="badge-verified-emerald">
                  {selectedDim.metric}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#151B17] font-medium leading-relaxed">
                {selectedDim.modern}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
