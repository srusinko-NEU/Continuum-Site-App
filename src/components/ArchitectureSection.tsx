import React, { useState, useEffect } from 'react';
import {
  Database,
  ShieldCheck,
  Cpu,
  Globe,
  CheckCircle2,
  ArrowRight,
  Zap,
  Layers,
  Sparkles,
  Info,
  Activity,
  Play,
  RotateCcw,
  Sliders,
  Check,
  Server,
  Lock,
  ChevronRight
} from 'lucide-react';
import systemNexusImage from '../assets/images/composable_system_nexus_1792644543951.jpg';
import flowPlacemat from '../assets/images/continuum_flow_placemat_1792644490945.jpg';

interface ArchitectureLayer {
  id: string;
  number: string;
  name: string;
  shortName: string;
  subtitle: string;
  icon: typeof Database;
  sla: string;
  latency: string;
  components: Array<{
    name: string;
    description: string;
    ecosystems: string;
  }>;
  governanceRigor: string;
  vendorIndependence: string;
  edgeAdvantage: string;
  simulationSteps: string[];
}

const LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer1',
    number: '01',
    name: 'Composable Data & Content Connectors',
    shortName: 'Data & Content Fabric',
    subtitle: 'Unified API Connectors · Single Source of Truth',
    icon: Database,
    sla: '100% Deterministic Grounding',
    latency: '< 25ms',
    components: [
      {
        name: 'Enterprise DAM Connectors',
        description: 'Bi-directional sync with Bynder, Aprimo, and Adobe Assets for verified brand photography and rich media.',
        ecosystems: 'Bynder · Aprimo · Adobe Assets'
      },
      {
        name: 'Product Information (PIM) Mesh',
        description: 'Single-source-of-truth product specs, attributes, and compliance taxonomy pulled directly into authoring.',
        ecosystems: 'Salsify · Akeneo · inRiver'
      },
      {
        name: 'Enterprise ERP & CRM Hub',
        description: 'Real-time customer account tiers, inventory levels, and commercial pricing contracts.',
        ecosystems: 'Salesforce · SAP · Microsoft Dynamics'
      },
      {
        name: 'Real-Time CDP Signals',
        description: 'Live first-party intent signals and consent boundaries ingested without client-side tracker bloat.',
        ecosystems: 'Segment · Tealium · Simon Data'
      }
    ],
    governanceRigor:
      'Zero ungrounded hallucinations: Every prompt context is anchored in verified single-source-of-truth metadata via strict API contracts.',
    vendorIndependence:
      'Composable connectors decouple frontends from rigid legacy databases, allowing swaps without rebuilding downstream consumer interfaces.',
    edgeAdvantage:
      'Connects disparate content and data silos into a unified semantic graph, eliminating fragile point-to-point synchronization scripts.',
    simulationSteps: [
      'Ingesting verified schema from Salsify PIM & Bynder DAM...',
      'Mapping relational taxonomy into unified semantic graph...',
      'Validating data contract & encryption boundaries (Zero PII leakage)...',
      'Payload normalized in 18ms — Ready for AI Control Plane routing'
    ]
  },
  {
    id: 'layer2',
    number: '02',
    name: 'Continuum AI Control Plane & Orchestration',
    shortName: 'AI Control Plane',
    subtitle: 'Governance, Multi-Model Arbitration & Prompt Firewall',
    icon: ShieldCheck,
    sla: 'Target SLA: Enterprise Zero-Leakage Architecture',
    latency: '< 45ms',
    components: [
      {
        name: 'Semantic Vector Mesh & Embeddings',
        description: 'Enterprise knowledge grounding layer that converts verified brand guidelines and product data into real-time embeddings.',
        ecosystems: 'Pinecone · pgvector · Cloud SQL'
      },
      {
        name: 'Enterprise Prompt Registry',
        description: 'Versioned, role-governed prompt repository preventing unauthorized shadow prompting across distributed teams.',
        ecosystems: 'Continuum Registry · Langfuse'
      },
      {
        name: 'Real-Time PII & Toxicity Firewall',
        description: 'Automated data loss prevention that redacts customer identifiers, patient data, and toxic tokens before model invocation.',
        ecosystems: 'Responsible AI by Design'
      },
      {
        name: 'Multi-Model Dynamic Router',
        description: 'Arbitrates between OpenAI, Anthropic, Gemini, and open models based on cost, latency, and reasoning depth.',
        ecosystems: 'Gemini · OpenAI · Claude · Llama 3'
      }
    ],
    governanceRigor:
      '100% immutable audit logging, automated PII redaction, and deterministic safety fallbacks to canonical assets on uncertainty.',
    vendorIndependence:
      'Dynamically arbitrate between OpenAI, Anthropic, Gemini, or self-hosted open models without altering application business logic.',
    edgeAdvantage:
      'Serverless orchestration layer provides enterprise-grade scalability, rate limiting, and zero-infrastructure server maintenance.',
    simulationSteps: [
      'Evaluating incoming authoring request against Enterprise Prompt Registry v4.2...',
      'Firewall scanning: PII scrubbed (0 leaks detected) · Toxic score: 0.00...',
      'Dynamic routing: Arbitrated to Claude 3.5 Sonnet for high reasoning...',
      'Audit log written to immutable governance ledger in 38ms'
    ]
  },
  {
    id: 'layer3',
    number: '03',
    name: 'Edge Middleware & Agentic Execution',
    shortName: 'Edge Agentic Execution',
    subtitle: 'Sub-Second Edge Functions · Collaborative Preview Pipelines',
    icon: Cpu,
    sla: 'Sub-Second Sign-Off',
    latency: '< 60ms',
    components: [
      {
        name: 'Headless DXP Integrations',
        description: 'Deep authoring extensions for Sitecore XM Cloud, Contentful, Optimizely, Adobe AEM, and Salesforce.',
        ecosystems: 'Sitecore · Contentful · Optimizely · Adobe'
      },
      {
        name: 'Automated Multi-Variant QA Scoring',
        description: 'Runs real-time brand tone adherence, factual consistency, and reading-level scoring on draft variants.',
        ecosystems: 'Automated Compliance Engine'
      },
      {
        name: 'Collaborative Branch Previews',
        description: 'Instant shareable preview URLs allowing legal, medical, compliance, and marketing leads to inspect variants before publish.',
        ecosystems: 'Instant Preview URLs'
      },
      {
        name: 'Human-in-the-Loop Approval Gates',
        description: 'Enforces mandatory human editorial sign-off for tier-1 public and regulated customer-facing communications.',
        ecosystems: 'Enterprise RBAC & Sign-Off'
      }
    ],
    governanceRigor:
      'Enforces mandatory human editorial sign-off for tier-1 public communications and automated brand voice scoring on draft variants.',
    vendorIndependence:
      'Composable microservices architecture prevents lock-in to monolithic legacy suites and proprietary vendor AI clouds.',
    edgeAdvantage:
      'Instant shareable branch preview environments let legal, compliance, and marketing test live AI variants before deploying to production.',
    simulationSteps: [
      'Synthesizing personalized experience variant for Sitecore XM Cloud...',
      'Multi-variant QA check: 98% Brand voice match · 100% factual grounding...',
      'Collaborative branch preview environment generated...',
      'Human-in-the-loop review criteria cleared in 52ms'
    ]
  },
  {
    id: 'layer4',
    number: '04',
    name: 'Global Composable Web Platform & Edge Delivery',
    shortName: 'Global Web & CDN Delivery',
    subtitle: 'Zero DevOps Overhead · Sub-100ms Global CDN Execution',
    icon: Globe,
    sla: '99.99% Edge Availability',
    latency: '< 85ms',
    components: [
      {
        name: 'Global Multi-Brand Web Portals',
        description: 'High-speed, edge-rendered frontends deployed across regional corporate and consumer properties worldwide.',
        ecosystems: 'Next.js · Astro · React Micro-Frontends'
      },
      {
        name: 'B2B Customer & Partner Portals',
        description: 'Secure, authenticated self-service environments with dynamic pricing, order status, and personalized documentation.',
        ecosystems: 'Customer Portals · Extranets'
      },
      {
        name: 'Headless Commerce Frontends',
        description: 'Sub-100ms catalog browsing, contextual search, and localized cart/checkout experiences.',
        ecosystems: 'Shopify Plus · commercetools · BigCommerce'
      },
      {
        name: 'Edge-Cached Micro-Frontends',
        description: 'Global CDN distribution delivering localized variants without origin server latency or cold starts.',
        ecosystems: 'Global Edge CDN · Edge Cache'
      }
    ],
    governanceRigor:
      'Continuous telemetry monitoring user sentiment, content drift, and conversion velocity with real-time kill-switches.',
    vendorIndependence:
      'Edge-cached delivery ensures 99.99% availability even if backend AI inference or origin databases experience intermittent latency.',
    edgeAdvantage:
      'Global edge network renders dynamic personalized experiences in sub-100ms without origin server bottlenecks or cold starts.',
    simulationSteps: [
      'Edge CDN receiving visitor request from Frankfurt, Germany node...',
      'Resolving localized language, currency, and compliance tokens...',
      'Delivering cached personalized micro-frontend variant from edge...',
      'Response served in 14ms (TTFB) · 99.99% Global Uptime verified'
    ]
  }
];

export const ArchitectureSection: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer2');
  const [activeComponentIndex, setActiveComponentIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const selectedLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[1];
  const activeComponent = selectedLayer.components[activeComponentIndex] || selectedLayer.components[0];

  // Reset active component index when layer changes
  const handleSelectLayer = (id: string) => {
    setActiveLayerId(id);
    setActiveComponentIndex(0);
    setIsSimulating(false);
    setSimStep(0);
  };

  // Run interactive simulation trace
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (simStep < selectedLayer.simulationSteps.length - 1) {
      const timer = setTimeout(() => {
        setSimStep((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => {
        setIsSimulating(false);
      }, 2500);
      return () => clearTimeout(doneTimer);
    }
  }, [isSimulating, simStep, selectedLayer.simulationSteps.length]);

  return (
    <section id="architecture" className="scroll-mt-28 py-24 bg-[#F7F6F3] border-b border-[#E2E5E0] relative overflow-hidden">
      {/* Background Architectural Visual Placemat */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <img
          src={flowPlacemat}
          alt="Architectural ribbons background placemat"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3] via-transparent to-[#F7F6F3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#B85233] uppercase mb-3 font-mono">
            Target-State Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#151B17] tracking-tight mb-4 [text-wrap:balance]">
            The Composable Web Platform &amp; AI Control Plane
          </h2>
          <p className="text-[#455249] text-base md:text-lg leading-relaxed">
            Eliminate monolithic DXP latency and fragile point solutions. Hover or click each control plane area to inspect how unified API connectors, Responsible AI guardrails, and sub-second edge distribution assemble into an immutable enterprise control plane.
          </p>
        </div>

        {/* Master Interactive Control Plane Studio */}
        <div className="rounded-3xl overflow-hidden bg-white shadow-xl border border-[#E2E5E0] mb-10">
          {/* Top Bar: Live Status & Layer Selector Tabs */}
          <div className="p-4 md:p-6 bg-[#F7F6F3] border-b border-[#E2E5E0] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B85233] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                DX
              </div>
              <div>
                <div className="font-bold text-sm text-[#151B17]">
                  Continuum Interactive Control Plane Console
                </div>
                <div className="text-[11px] text-[#697A6F] font-mono">
                  Select or hover any layer in the topology diagram or buttons below
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#2D6A4F] font-semibold flex items-center gap-1.5 bg-[#E8F1EC] px-2.5 py-1 rounded-md border border-[#B8D8C7]">
                <span className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                <span>Control Plane Active</span>
              </span>
              <span className="text-[11px] font-mono text-[#364339] font-semibold bg-[#EAECE9] px-2.5 py-1 rounded-md border border-[#D0D4CD]">
                MACH Alliance Standard
              </span>
            </div>
          </div>

          {/* Interactive Topology Diagram & Clickable Hotspots */}
          <div className="relative bg-[#090A0F] overflow-hidden">
            {/* Visual Architecture Topology Image */}
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full">
              <img
                src={systemNexusImage}
                alt="Composable digital enterprise architecture topology showing platform layer, integration layer, and service layer with glowing aubergine signal pathways"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-black/40 to-black/20" />
            </div>

            {/* Clickable & Hoverable 4-Zone Control Hotspot Grid */}
            <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 p-3 md:p-6 gap-2 md:gap-4 z-10">
              {LAYERS.map((layer) => {
                const isSelected = activeLayerId === layer.id;
                const Icon = layer.icon;

                return (
                  <button
                    key={layer.id}
                    onClick={() => handleSelectLayer(layer.id)}
                    onMouseEnter={() => handleSelectLayer(layer.id)}
                    className={`text-left p-3 md:p-4 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden backdrop-blur-md ${
                      isSelected
                        ? 'bg-[#B85233]/90 border-2 border-white/70 shadow-xl shadow-[#B85233]/40 scale-[1.02]'
                        : 'bg-[#0D111C]/85 border border-white/15 hover:bg-[#0D111C] hover:border-white/40'
                    }`}
                  >
                    {/* Top zone indicator */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-white text-[#B85233]' : 'bg-white/10 text-white/80'
                      }`}>
                        Layer {layer.number}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                    </div>

                    {/* Middle: Name */}
                    <div className="my-1">
                      <div className="text-xs md:text-sm font-bold text-white line-clamp-1">
                        {layer.shortName}
                      </div>
                      <div className="text-[10px] md:text-[11px] text-white/70 line-clamp-1 font-mono">
                        {layer.sla}
                      </div>
                    </div>

                    {/* Bottom: Action state */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/80">
                      <span className="font-mono">{layer.latency}</span>
                      <span className={`font-semibold ${isSelected ? 'text-white underline' : 'text-white/60 group-hover:text-white'}`}>
                        {isSelected ? 'Active Focus' : 'Inspect'}
                      </span>
                    </div>

                    {/* Accent indicator for active zone */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-bl-lg" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Synchronized Layer Selector Tabs (Mobile & Touch Accessible) */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-stone-200 bg-stone-50">
            {LAYERS.map((layer) => {
              const isSelected = activeLayerId === layer.id;
              const Icon = layer.icon;

              return (
                <button
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer.id)}
                  className={`p-3.5 md:p-4 text-left transition-all cursor-pointer border-r last:border-r-0 border-stone-200 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white text-blue-700 border-b-2 border-b-blue-600 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:bg-white/80 hover:text-[#090A0F]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-stone-200/60 text-slate-600'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono font-semibold uppercase text-blue-700">
                      Layer {layer.number}
                    </div>
                    <div className="text-xs font-bold truncate text-[#090A0F]">
                      {layer.shortName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Inspector Console for Active Layer */}
          <div className="p-6 md:p-8 grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Layer Overview & Component Deep-Dive (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Active Layer Header */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Layer {selectedLayer.number} Specification
                  </span>
                  <span className="text-xs text-slate-400 font-mono">·</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">
                    Target SLA: {selectedLayer.sla}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#090A0F] tracking-tight">
                  {selectedLayer.name}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1 font-mono">
                  {selectedLayer.subtitle}
                </p>
              </div>

              {/* Core Components Interactive Grid */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 font-mono flex items-center justify-between">
                  <span>Core System Components (Click to Inspect)</span>
                  <span className="text-[11px] text-slate-400">
                    {activeComponentIndex + 1} of {selectedLayer.components.length} Selected
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedLayer.components.map((comp, idx) => {
                    const isCompActive = activeComponentIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveComponentIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isCompActive
                            ? 'bg-blue-50/70 border-blue-600 ring-1 ring-blue-600/30'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#090A0F]">
                            {comp.name}
                          </span>
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isCompActive ? 'text-blue-600' : 'text-slate-300'}`} />
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono line-clamp-1">
                          {comp.ecosystems}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Component Detail Callout */}
                <div className="mt-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div className="font-semibold text-[#090A0F] mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>{activeComponent.name} Implementation Spec:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {activeComponent.description}
                  </p>
                </div>
              </div>

              {/* Governance & Vendor Agility Matrix */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-stone-200">
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Governance Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedLayer.governanceRigor}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200">
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-mono">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Vendor Independence</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedLayer.vendorIndependence}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Layer Simulation & Edge SLA Console (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="font-mono text-xs font-bold text-white">
                      Live Layer Pipeline Simulation
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Sub-100ms Target
                  </span>
                </div>

                {/* Simulation Output Window */}
                <div className="bg-black/50 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2 min-h-[170px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[11px] text-white/50 border-b border-white/10 pb-1">
                      $ continuum-ctl inspect --layer={selectedLayer.id}
                    </div>

                    {isSimulating ? (
                      <div className="space-y-1.5 text-[11px]">
                        {selectedLayer.simulationSteps.slice(0, simStep + 1).map((step, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 animate-in fade-in duration-150">
                            <span className="text-blue-400">›</span>
                            <span className={idx === simStep ? 'text-emerald-400 font-semibold' : 'text-slate-200'}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] text-white/70 py-4 text-center space-y-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white/80">
                          <Play className="w-4 h-4 ml-0.5" />
                        </div>
                        <p>Click below to test payload processing through {selectedLayer.shortName}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                    <span>Latency: {selectedLayer.latency}</span>
                    <span>Status: {isSimulating ? 'Verifying...' : 'Ready'}</span>
                  </div>
                </div>

                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="btn-cobalt-primary w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Simulating Layer Inspection...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Test Live Payload Through Layer {selectedLayer.number}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Edge Advantage Highlight Card */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs space-y-1.5">
                <div className="font-semibold text-blue-800 flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Composable Edge Architectural Advantage</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedLayer.edgeAdvantage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote callout with MACH & Composable Architecture alignment */}
        <div className="max-w-5xl mx-auto p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs bg-white border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#090A0F]">
                MACH &amp; Composable Web Platform Standard
              </div>
              <div className="text-slate-600 text-[11px]">
                Microservices, API-first, Cloud-native, and Headless across Sitecore, Contentful, Optimizely, Adobe &amp; Salesforce.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-600 shrink-0 font-mono">
            <span className="text-emerald-700 font-semibold">99.99% Edge SLA</span>
            <span className="text-slate-300">|</span>
            <span>Zero Infrastructure Drag</span>
          </div>
        </div>
      </div>
    </section>
  );
};

