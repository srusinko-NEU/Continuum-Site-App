import React, { useState } from 'react';
import { Layers, ShieldCheck, Database, Cpu, ExternalLink, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface TechPartner {
  name: string;
  category: string;
  badge: string;
  accentColor: string;
  architecturalRole: string;
  governanceFunction: string;
  capabilities: string[];
  proofMetric: string;
}

const TECH_PARTNERS: TechPartner[] = [
  {
    name: 'Sitecore',
    category: 'Headless DXP & Composable CMS',
    badge: 'XM Cloud · CDP · Personalize',
    accentColor: '#EB1C24',
    architecturalRole: 'Composable headless CMS (XM Cloud), unified customer data (Sitecore CDP), and behavioral experimentation (Sitecore Personalize).',
    governanceFunction: 'Establishes semantic content tagging, unifies real-time behavioral signals, and modernizes legacy on-premise XP instances into composable edge architectures.',
    capabilities: [
      'XM Cloud component-level edge hydration',
      'Sitecore CDP streaming event ingestion',
      'Legacy XP to Composable migration playbooks'
    ],
    proofMetric: 'Foundational DXMM lineage & 6x MVP leadership'
  },
  {
    name: 'Optimizely',
    category: 'Digital Experience & Experimentation',
    badge: 'CMP · Experimentation · Graph',
    accentColor: '#0037FF',
    architecturalRole: 'Digital Experience Platform, Content Marketing Platform (CMP), and continuous experimentation / feature flagging engines.',
    governanceFunction: 'Establishes automated experimentation pipelines, multi-armed bandit personalization algorithms, and statistical validation of AI-generated content variants.',
    capabilities: [
      'Multi-armed bandit algorithmic optimization',
      'CMP upstream planning & editorial workflows',
      'Optimizely Graph real-time edge querying'
    ],
    proofMetric: 'Statistically rigorous AI variance validation'
  },
  {
    name: 'Salesforce',
    category: 'Unified Data & Agentic Workflows',
    badge: 'Data Cloud · Agentforce · SFMC',
    accentColor: '#00A1E0',
    architecturalRole: 'Enterprise customer relationship management, Marketing Cloud engagement, Data Cloud customer 360, and Agentforce autonomous workflows.',
    governanceFunction: 'Connects transactional enterprise data to real-time marketing touchpoints, establishing prompt grounding and brand safety guardrails for autonomous agents.',
    capabilities: [
      'Data Cloud unified profile resolution',
      'Agentforce prompt boundary guardrails',
      'SFMC personalized journey orchestration'
    ],
    proofMetric: 'Cross-cloud enterprise customer 360 governance'
  },
  {
    name: 'Adobe',
    category: 'Experience Cloud & Creative Ops',
    badge: 'AEM · Workfront · Firefly',
    accentColor: '#FA0F00',
    architecturalRole: 'Experience Cloud, Adobe Experience Manager (AEM), Workfront operational backbones, and Firefly generative content workflows.',
    governanceFunction: 'Integrates creative operations with automated brand compliance checks, optimizing global asset pipelines while mitigating copyright and brand risk.',
    capabilities: [
      'AEM Edge Delivery Services orchestration',
      'Workfront human-in-the-loop review gates',
      'Firefly commercial copyright compliance guardrails'
    ],
    proofMetric: 'Enterprise creative workflow acceleration'
  },
  {
    name: 'Netlify',
    category: 'Composable Web Platform & Edge Mesh',
    badge: 'Edge Functions · Connect · High-Performance Edge',
    accentColor: '#00C7B7',
    architecturalRole: 'Global high-performance edge network, Git-centric continuous deployment pipelines, serverless microservices orchestration, and Composable Web Platform mesh.',
    governanceFunction: 'Optimizes global edge hydration, decouples frontend presentation from monolithic origin dependencies, and enforces sub-100ms SLAs.',
    capabilities: [
      'Sub-second Edge Functions routing',
      'Composable Web Platform connect mesh',
      'Instant preview branch workflows'
    ],
    proofMetric: 'Sub-second global edge delivery & instant deployment'
  },
  {
    name: 'Contentful',
    category: 'Composable Content Platform',
    badge: 'API-First · Content Graph',
    accentColor: '#2478CC',
    architecturalRole: 'Composable, API-first headless content platform, structured content graphs, and modular multichannel orchestration.',
    governanceFunction: 'Blueprints modular content taxonomies, decouples presentation layers from backend services, and structures knowledge assets for reliable AI ingestion.',
    capabilities: [
      'Content graph semantic modeling',
      'Decoupled multi-channel delivery',
      'Structured vector embeddings preparation'
    ],
    proofMetric: 'Sub-second omnichannel content distribution'
  },
  {
    name: 'Microsoft',
    category: 'Cloud AI & Enterprise Infrastructure',
    badge: 'Azure OpenAI · Semantic Kernel',
    accentColor: '#008AD7',
    architecturalRole: 'Azure OpenAI service, Semantic Kernel orchestration, Microsoft 365 enterprise data ecosystems, and cloud infrastructure.',
    governanceFunction: 'Designs enterprise knowledge retrieval-augmented generation (RAG) architectures with tenant-level data isolation, role-based access, and enterprise compliance.',
    capabilities: [
      'Azure OpenAI tenant-isolated endpoints',
      'Semantic Kernel deterministic agent routing',
      'Enterprise RAG vector memory architecture'
    ],
    proofMetric: 'Microsoft Executive Briefing Center pedigree'
  },
  {
    name: 'Google',
    category: 'Cloud AI & Multimodal Reasoning Ecosystem',
    badge: 'Gemini 2.5 / Flash · Vertex AI · GCP',
    accentColor: '#4285F4',
    architecturalRole: 'Enterprise multimodal reasoning models (Gemini 2.5/Flash), Vertex AI agentic pipelines, BigQuery customer telemetry, and unified Workspace data governance.',
    governanceFunction: 'Architects enterprise grounded agentic pipelines, real-time multimodal search grounding, and responsible AI guardrails.',
    capabilities: [
      'Gemini Flash sub-50ms token generation',
      'Vertex AI enterprise agent orchestration',
      'BigQuery customer telemetry vectorization'
    ],
    proofMetric: 'Multimodal AI & Google Cloud enterprise authority'
  }
];

interface TechnologyBedrockProps {
  onScheduleDiagnostic?: (partnerContext?: string) => void;
}

export const TechnologyBedrock: React.FC<TechnologyBedrockProps> = ({ onScheduleDiagnostic }) => {
  const [selectedPartner, setSelectedPartner] = useState<TechPartner>(TECH_PARTNERS[0]);

  return (
    <section id="technology" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-28 border-t border-[#E2E5E0]">
      {/* Section Header */}
      <div className="mb-14 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#EAECE9] text-[#364339] mb-4 font-mono border border-[#D0D4CD]">
          <Database className="w-3.5 h-3.5 text-[#B85233]" />
          <span>Technology Bedrock · Ecosystem Authority</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-[#151B17] tracking-tight leading-tight">
          Anchored in platform reality, not theoretical isolation.
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#455249] font-sans leading-relaxed">
          Continuum DX bridges the gap between high-level management consulting and technical execution. Our CoE models operate directly inside the commercial software engines that power modern enterprise digital experiences.
        </p>
      </div>

      {/* 8-Partner Interactive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
        {TECH_PARTNERS.map((partner) => {
          const isSelected = selectedPartner.name === partner.name;
          return (
            <button
              key={partner.name}
              onClick={() => setSelectedPartner(partner)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-[#F8ECE8] border-2 border-[#B85233] shadow-md ring-2 ring-[#B85233]/10'
                  : 'bg-white hover:bg-[#F7F6F3] border-[#E2E5E0] hover:border-stone-300 shadow-2xs'
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-wider text-[#697A6F] mb-1">Ecosystem</div>
              <div className="text-base font-bold text-[#151B17] font-serif">{partner.name}</div>
              <div className="text-[11px] text-[#B85233] font-medium mt-1 truncate">{partner.badge}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Partner Architecture Panel */}
      <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#E2E5E0] shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E2E5E0]">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#151B17]">
                {selectedPartner.name}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#EAECE9] text-[#364339] border border-[#D0D4CD]">
                {selectedPartner.category}
              </span>
            </div>
            <p className="text-xs font-mono text-[#2D6A4F] mt-1.5 font-medium">
              Verified Practice Track Record: {selectedPartner.proofMetric}
            </p>
          </div>

          <button
            onClick={() => onScheduleDiagnostic && onScheduleDiagnostic(`Technology Bedrock: ${selectedPartner.name}`)}
            className="self-start lg:self-auto btn-cobalt-primary px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>Audit Your {selectedPartner.name} Stack</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* Architectural Role */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#697A6F] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#B85233]" />
              <span>Architectural Role in Modern Enterprise Stack</span>
            </div>
            <p className="text-sm text-[#455249] leading-relaxed font-sans">
              {selectedPartner.architecturalRole}
            </p>

            <div className="pt-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#697A6F] mb-2">
                Core Integration Patterns:
              </div>
              <div className="space-y-2">
                {selectedPartner.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#455249]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategic CoE Governance Function */}
          <div className="space-y-3 md:pl-6 md:border-l border-[#E2E5E0]">
            <div className="text-xs font-mono uppercase tracking-wider text-[#697A6F] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B85233]" />
              <span>Strategic CoE Governance Function (Continuum DX Overlay)</span>
            </div>
            <p className="text-sm text-[#455249] leading-relaxed font-sans">
              {selectedPartner.governanceFunction}
            </p>

            <div className="p-4 rounded-2xl bg-[#F7F6F3] border border-[#E2E5E0] text-xs space-y-1.5 mt-4">
              <div className="font-semibold text-[#151B17] flex items-center gap-1.5 font-mono text-[11px]">
                <Zap className="w-3 h-3 text-[#B85233]" />
                <span>Field Alliance &amp; Co-Selling Strategy</span>
              </div>
              <p className="text-[#455249] leading-relaxed text-[11px]">
                Continuum DX partners with platform sales teams to unblock operational bottlenecks, accelerate license consumption, and establish organizational readiness for long-term ARR retention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
