import React, { useState } from 'react';
import { OVERLAY_INITIATIVES } from '../data/content';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  Zap, 
  Layers, 
  RefreshCw, 
  Users, 
  Compass, 
  Sparkles,
  ArrowDown,
  Clock,
  TrendingUp,
  AlertTriangle,
  FileCode,
  Sliders,
  DollarSign,
  Cpu
} from 'lucide-react';
import strategyBriefingImage from '../assets/images/executive_strategy_briefing_1792644531985.jpg';

interface DeliveryModelProps {
  onScheduleDiagnostic: () => void;
}

// 70/20/10 detailed data for interactive inspection
const BENCHMARK_DATA = {
  people: {
    key: 'people',
    percentage: '70%',
    title: 'People & Operating Model',
    shortDesc: 'Change enablement, role redesign & BU culture',
    tag: 'Core Value Realization Engine',
    details: 'AI transformations do not fail because of model intelligence; they fail because existing team workflows, middle-management incentives, and approval rituals resist change. Continuum designs and operationalizes human-in-the-loop workflows, prompt engineering curricula, and role redesign playbooks right alongside the delivery team.',
    failureTrap: 'Typical Enterprise Mistake: Allocating 80% of budget to model licenses or data science vendor squads without changing content authoring roles—leading to 85%+ AI pilot abandonment.',
    continuumRemedy: 'Continuum Solution: Embed change enablement champions directly inside active project scrums. Upskill content authors and technical marketers on certified, brand-safe agentic pipelines in-flight.',
    kpis: ['65% reduction in content review latency', '100% adherence to corporate brand voice', 'Zero friction adoption from day one']
  },
  architecture: {
    key: 'architecture',
    percentage: '20%',
    title: 'Composable Architecture & Edge Fabric',
    shortDesc: 'Headless DXP, DAM/PIM mesh & edge orchestration',
    tag: 'Sustainable Technical Grounding',
    details: 'Generative AI without structured, canonical enterprise data generates expensive hallucinations. Composable architecture decouples content authoring from delivery, binds legacy DAM and PIM stores via semantic vector layers, and executes model arbitration at the global edge.',
    failureTrap: 'Typical Enterprise Mistake: Point-to-point hardcoded API integrations between SaaS monoliths and LLM providers that break when APIs change or vendor lock-in tightens.',
    continuumRemedy: 'Continuum Solution: Deploy an abstracted Composable Control Plane. Model-agnostic gateways ensure seamless switching between OpenAI, Anthropic, Gemini, and open-source models with zero code rewrites.',
    kpis: ['Sub-100ms edge payload arbitration', 'Unified semantic search across DAM & PIM', '50% reduction in long-term martech maintenance']
  },
  algorithms: {
    key: 'algorithms',
    percentage: '10%',
    title: 'AI Foundation Models & Gateway',
    shortDesc: 'Multi-model arbitration & task routing',
    tag: 'Commoditized Commodity Intelligence',
    details: 'Foundation models are rapidly commoditizing with monthly leaps in price-performance and context windows. The competitive advantage is never the raw foundation model—it is your private enterprise taxonomy, prompt governance, and the speed at which your delivery team harnesses model upgrades.',
    failureTrap: 'Typical Enterprise Mistake: Betting multi-million dollar capital budgets on custom model fine-tuning before solidifying core taxonomy and data governance.',
    continuumRemedy: 'Continuum Solution: Multi-model arbitration dynamically routes queries to the optimal engine based on latency, cost, and task complexity, guaranteeing maximum ROI.',
    kpis: ['40–70% token cost optimization', 'Automatic fallback upon upstream model degradation', 'Zero vendor lock-in to single model suppliers']
  }
};

// 3 delivery methodology phases with deep-dive metadata
const DELIVERY_PHASES = [
  {
    id: 'stage_01',
    number: '01',
    title: 'Beachhead Anchor',
    subtitle: 'The Domain Beachhead Integration',
    delayComparison: 'Eliminate Committee Latency (vs 9–12 mo standard CoE committee wait)',
    badge: 'Capital Program Integration',
    summary: 'Bypass corporate CoE funding stalemates by anchoring directly onto an active, funded digital transformation program (e.g., DXP migration, customer portal redesign, or DAM consolidation).',
    mechanics: 'Rather than petitioning for a standalone Center of Excellence budget, Continuum embeds directly into an active capital project with existing budget, executive sponsorship, and concrete delivery deadlines.',
    inFlightActions: [
      'Inventory existing CapEx/OpEx workstreams and select high-impact anchor beachhead',
      'Establish immediate executive sponsorship with Business Unit General Managers',
      'Audit existing tech stack contracts and identify immediate redundant software overlap',
      'Deploy initial prompt guardrails and taxonomies in the beachhead team sandbox'
    ],
    timeToValue: 'Immediate Day-1 execution within current fiscal quarter',
    artifactsCreated: ['Anchor Project Charter', 'Shadow AI Vulnerability Audit', 'Initial Beachhead Taxonomy Schema']
  },
  {
    id: 'stage_02',
    number: '02',
    title: 'Governance & Change In-Flight',
    subtitle: 'Parallel CoE Codification During Delivery',
    delayComparison: 'Hit project launch milestones with built-in governance',
    badge: 'Dual-Track Execution Engine',
    summary: 'Hit primary project deadlines on schedule while concurrently building enterprise prompt registries, automated QA firewalls, and role-redesign playbooks in-flight.',
    mechanics: 'The delivery team ships features while Continuum codifies the underlying AI standards, brand safety guardrails, and automated verification loops without slowing delivery velocity.',
    inFlightActions: [
      'Codify central Prompt Registry with versioning, brand guidelines, and tone rules',
      'Implement real-time editorial QA guardrails (hallucination, PII, toxicity, compliance)',
      'Run role-redesign workshops to transition junior copywriters into agent orchestrators',
      'Connect DAM/PIM repositories directly into the AI control plane via semantic vector mesh'
    ],
    timeToValue: 'Working governance control plane active within 6–8 weeks',
    artifactsCreated: ['Enterprise Prompt Registry v1', 'Human-in-the-Loop QA Gateway', 'Agentic Authoring Playbooks']
  },
  {
    id: 'stage_03',
    number: '03',
    title: 'Federated Saturation',
    subtitle: 'Hub-and-Spoke Enterprise Multi-BU Scaling',
    delayComparison: '4 weeks per adjacent BU (vs 6–9 months traditional)',
    badge: 'Enterprise CoE in a Box',
    summary: 'Package the proven beachhead workflows, taxonomies, and edge control planes into reusable "CoE in a Box" blueprints to rapidly replicate across adjacent business units without linear headcount growth.',
    mechanics: 'The anchor initiative proves the business case and funds the foundation. We then federate the control plane across regional divisions, supplier portals, and subsidiary brands with zero marginal licensing cost.',
    inFlightActions: [
      'Publish turnkey "CoE in a Box" onboarding modules and self-service blueprints',
      'Establish lightweight federated governance committee with cross-BU leadership',
      'Deploy global executive observability telemetry dashboard for enterprise model usage and ROI',
      'Onboard adjacent BUs with rapid 4-week acceleration sprints'
    ],
    timeToValue: 'Full enterprise saturation in 2–3 quarters with proven ROI',
    artifactsCreated: ['Turnkey BU Onboarding Kits', 'Federated Governance Matrix', 'Executive Value Realization Dashboard']
  }
];

export const DeliveryModel: React.FC<DeliveryModelProps> = ({ onScheduleDiagnostic }) => {
  // State for active 70/20/10 pillar
  const [activeBenchmark, setActiveBenchmark] = useState<'people' | 'architecture' | 'algorithms'>('people');
  
  // State for active delivery phase (01, 02, 03)
  const [activePhaseId, setActivePhaseId] = useState<string>('stage_01');
  
  // State for selected beachhead initiative scenario
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>(OVERLAY_INITIATIVES[0].id);

  // Active phase object
  const activePhase = DELIVERY_PHASES.find(p => p.id === activePhaseId) || DELIVERY_PHASES[0];

  // Active initiative object
  const activeInitiative = OVERLAY_INITIATIVES.find((i) => i.id === selectedInitiativeId) || OVERLAY_INITIATIVES[0];

  const currentBenchmark = BENCHMARK_DATA[activeBenchmark];

  return (
    <section id="delivery-model" className="scroll-mt-28 py-24 max-w-7xl mx-auto px-6 text-slate-800">
      
      {/* SECTION HEADER */}
      <div className="mb-14 max-w-3xl">
        <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase flex items-center gap-2 font-mono mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Capital-Efficient Advisory Model</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#090A0F] tracking-tight leading-tight mb-4" style={{ textWrap: 'balance' }}>
          Project-Overlay &amp; Federated CoE Saturation
        </h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed font-normal">
          Standalone petitions for enterprise Center of Excellence budgets regularly stall in committee reviews for 9–12 months. Continuum bypasses corporate friction by anchoring directly onto active, funded capital programs as an embedded overlay.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: THE INTERACTIVE 70/20/10 TRANSFORMATION FORMULA                */}
      {/* ========================================================================= */}
      <div className="mb-16 rounded-3xl shadow-sm relative overflow-hidden bg-white border border-stone-200">
        <div className="relative z-10 p-6 md:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-200 pb-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-semibold text-blue-700 tracking-wider uppercase">
                Empirical Research &amp; Operating Split
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#090A0F] tracking-tight mt-1">
                The 70 / 20 / 10 Enterprise AI Transformation Rule
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
                Click or hover each benchmark component below to inspect why conventional AI transformation programs fail and how Continuum restores capital balance.
              </p>
            </div>

            {/* Interactive Benchmark Tabs / Selector */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveBenchmark('people')}
                onMouseEnter={() => setActiveBenchmark('people')}
                className={`p-3 md:p-4 rounded-2xl text-center transition-all cursor-pointer border ${
                  activeBenchmark === 'people'
                    ? 'bg-blue-600 text-white shadow-sm border-blue-600 scale-[1.02]'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-200'
                }`}
              >
                <div className={`text-2xl md:text-3xl font-extrabold font-mono ${activeBenchmark === 'people' ? 'text-white' : 'text-[#090A0F]'}`}>
                  70%
                </div>
                <div className={`text-xs font-bold mt-1 ${activeBenchmark === 'people' ? 'text-white' : 'text-slate-800'}`}>People &amp; Org</div>
                <div className={`text-[10px] mt-0.5 leading-tight ${activeBenchmark === 'people' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Change Enablement
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveBenchmark('architecture')}
                onMouseEnter={() => setActiveBenchmark('architecture')}
                className={`p-3 md:p-4 rounded-2xl text-center transition-all cursor-pointer border ${
                  activeBenchmark === 'architecture'
                    ? 'bg-blue-600 text-white shadow-sm border-blue-600 scale-[1.02]'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-200'
                }`}
              >
                <div className={`text-2xl md:text-3xl font-extrabold font-mono ${activeBenchmark === 'architecture' ? 'text-white' : 'text-[#090A0F]'}`}>
                  20%
                </div>
                <div className={`text-xs font-bold mt-1 ${activeBenchmark === 'architecture' ? 'text-white' : 'text-slate-800'}`}>Architecture</div>
                <div className={`text-[10px] mt-0.5 leading-tight ${activeBenchmark === 'architecture' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Composable Mesh
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveBenchmark('algorithms')}
                onMouseEnter={() => setActiveBenchmark('algorithms')}
                className={`p-3 md:p-4 rounded-2xl text-center transition-all cursor-pointer border ${
                  activeBenchmark === 'algorithms'
                    ? 'bg-emerald-600 text-white shadow-sm border-emerald-600 scale-[1.02]'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-200'
                }`}
              >
                <div className={`text-2xl md:text-3xl font-extrabold font-mono ${activeBenchmark === 'algorithms' ? 'text-white' : 'text-[#090A0F]'}`}>
                  10%
                </div>
                <div className={`text-xs font-bold mt-1 ${activeBenchmark === 'algorithms' ? 'text-white' : 'text-slate-800'}`}>AI Algorithms</div>
                <div className={`text-[10px] mt-0.5 leading-tight ${activeBenchmark === 'algorithms' ? 'text-emerald-100' : 'text-slate-500'}`}>
                  Model Arbitration
                </div>
              </button>
            </div>
          </div>

          {/* Deep-Dive Interactive Inspection Drawer */}
          <div className="grid md:grid-cols-12 gap-6 items-start bg-stone-50 p-5 md:p-7 rounded-2xl border border-stone-200">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  {currentBenchmark.percentage} Allocation
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500 font-mono">
                  {currentBenchmark.tag}
                </span>
              </div>
              <h4 className="text-xl font-bold text-[#090A0F]">
                {currentBenchmark.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {currentBenchmark.details}
              </p>

              <div className="grid sm:grid-cols-3 gap-2.5 pt-2">
                {currentBenchmark.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-slate-700 font-medium flex items-start gap-2 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{kpi}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                <div className="font-bold text-rose-700 flex items-center gap-1.5 mb-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>The Pitfall of Neglect</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {currentBenchmark.failureTrap}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                <div className="font-bold text-blue-800 flex items-center gap-1.5 mb-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>The Continuum Operating Model</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {currentBenchmark.continuumRemedy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 2: INTERACTIVE 3-STEP DELIVERY PIPELINE & OVERLAY STUDIO          */}
      {/* ========================================================================= */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider mb-1">
              Interactive Execution Pipeline
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#090A0F] tracking-tight">
              From Funded Beachhead to Enterprise-Wide Saturation
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Click or hover any of the 3 execution stages to inspect the underlying mechanics, deliverables, and project-overlay model designed to eliminate committee latency.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 shrink-0">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Phase Sync</span>
          </div>
        </div>

        {/* 3 Interactive Stage Control Cards (Topology Bar) */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {DELIVERY_PHASES.map((phase) => {
            const isSelected = activePhaseId === phase.id;
            return (
              <div
                key={phase.id}
                role="button"
                tabIndex={0}
                onClick={() => setActivePhaseId(phase.id)}
                onMouseEnter={() => setActivePhaseId(phase.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActivePhaseId(phase.id); }}
                className={`p-5 rounded-2xl transition-all duration-200 text-left border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-50/70 border-2 border-blue-600 shadow-md ring-2 ring-blue-600/10 -translate-y-0.5'
                    : 'bg-white border-stone-200/90 hover:border-blue-400/60 hover:bg-slate-50/50 shadow-xs'
                }`}
              >
                {/* Active Indicator Top Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                    isSelected ? 'bg-blue-600' : 'bg-transparent'
                  }`}
                />

                <div className="flex items-center justify-between mb-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono font-bold text-xs transition-colors ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-stone-100 text-slate-700'
                  }`}>
                    {phase.number}
                  </span>

                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {phase.badge}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#090A0F] mb-1">
                  {phase.title}
                </h4>
                <div className="text-xs text-blue-600 font-semibold mb-2">
                  {phase.subtitle}
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {phase.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500 font-medium">Speed Advantage:</span>
                  <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                    {phase.id === 'stage_01' ? 'Zero Wait' : phase.id === 'stage_02' ? 'In-Flight' : '4-Wk BU Saturation'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Detail Inspector for the Selected Phase */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold mb-1">
                <span>Active Stage Inspector: Stage {activePhase.number}</span>
              </div>
              <h4 className="text-2xl font-serif font-bold text-[#090A0F]">
                {activePhase.title}: {activePhase.subtitle}
              </h4>
            </div>

            <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-xl border border-stone-200 text-xs font-mono">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-500">Speed Factor:</span>
              <span className="text-blue-700 font-bold">{activePhase.delayComparison}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Mechanics & In-Flight Actions */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Phase Operating Mechanics</span>
                </div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                  {activePhase.mechanics}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>What We Execute In-Flight (Inside Active Sprints)</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activePhase.inFlightActions.map((action, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-800 flex items-start gap-2.5 shadow-2xs"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Time-to-Value & Concrete Artifacts */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Production Artifacts Codified</span>
                </div>
                <div className="space-y-2">
                  {activePhase.artifactsCreated.map((art, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-stone-200 text-xs text-slate-800 font-medium shadow-2xs">
                      <FileCode className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{art}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Expected Velocity:</span>
                  <span className="font-semibold text-emerald-700">{activePhase.timeToValue}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-stone-200">
                  <span className="text-slate-500">Baseline Approvals Needed:</span>
                  <span className="font-semibold text-blue-700">0 Days (Existing Project Budget)</span>
                </div>
                <button
                  type="button"
                  onClick={onScheduleDiagnostic}
                  className="w-full mt-3 btn-cobalt-primary text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Evaluate Stage {activePhase.number} Readiness</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 3: INTERACTIVE INITIATIVE SIMULATOR (BEACHHEAD ARCHETYPES)        */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-10 rounded-3xl shadow-lg bg-white border border-stone-200/90 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 font-mono">
              Live Beachhead Simulation Matrix
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#090A0F] tracking-tight">
              Select Your Active Digital Program
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Select your organization&apos;s current funded priority to inspect embedded workstreams and risk deflection metrics:
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>4 Enterprise Archetypes</span>
          </div>
        </div>

        {/* Archetype Tab Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {OVERLAY_INITIATIVES.map((init) => {
            const isCurrent = selectedInitiativeId === init.id;
            return (
              <button
                key={init.id}
                type="button"
                onClick={() => setSelectedInitiativeId(init.id)}
                className={`p-4 rounded-2xl text-left border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-2 border-blue-600 bg-blue-50/70 text-slate-900 font-semibold shadow-md ring-2 ring-blue-600/10'
                    : 'bg-stone-50/70 border-stone-200/90 text-slate-700 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-blue-700 font-semibold">
                      {init.id.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-[#090A0F] mb-1.5 leading-snug">
                    {init.title}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200 text-[11px] text-slate-500 font-mono truncate">
                  {init.fundedSponsor}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Initiative Deep-Dive Display */}
        <div className="grid md:grid-cols-12 gap-8 items-start bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200">
          {/* Left Column: Scope & Embedded Parallel Workstreams */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Primary Beachhead Mandate</span>
              </div>
              <p className="text-base text-[#090A0F] font-medium leading-relaxed bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                {activeInitiative.beachheadGoal}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Embedded CoE Workstreams (Delivered in Parallel to Eliminate Committee Latency)</span>
              </div>
              <div className="space-y-2">
                {activeInitiative.embeddedCoEGovernance.map((gov, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200 text-xs text-slate-800 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-normal">{gov}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Outcomes, Risk Deflection & Action Card */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-2xs">
              <div>
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cross-BU Saturation Multiplier</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeInitiative.crossBUSaturationOutcome}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Deflected Enterprise Risk</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeInitiative.deflectedRisk}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-blue-600" />
                  <span>Typical CapEx Envelope:</span>
                </span>
                <span className="text-[#090A0F] font-bold">{activeInitiative.typicalBudget}</span>
              </div>
            </div>

            {/* Direct Diagnostic Trigger */}
            <div className="p-5 rounded-2xl bg-blue-600 text-white space-y-3 shadow-md">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Ready to Overlay on This Beachhead?</span>
              </div>
              <p className="text-xs text-blue-50 leading-relaxed">
                Schedule a confidential 45-minute architectural review with Sean Rusinko to map your active {activeInitiative.title.toLowerCase()} program into an enterprise CoE vehicle.
              </p>
              <button
                type="button"
                onClick={onScheduleDiagnostic}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-blue-900 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Request Advisory Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-900" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
