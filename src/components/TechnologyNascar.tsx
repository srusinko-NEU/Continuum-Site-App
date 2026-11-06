import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Database, ExternalLink } from 'lucide-react';

export interface NascarPartner {
  id: string;
  name: string;
  category: string;
  focusTag: string;
  proofBadge: string;
  brandColor: string;
  hoverBorder: string;
  iconBg: string;
  svgIcon: React.ReactNode;
  auditScope: string;
  brief: string;
}

export const NASCAR_PARTNERS: NascarPartner[] = [
  {
    id: 'sitecore',
    name: 'Sitecore',
    category: 'Composable DXP & Headless CMS',
    focusTag: 'XM Cloud · CDP · Personalize',
    proofBadge: '6x Global MVP Pedigree',
    brandColor: '#EB1C24',
    hoverBorder: 'hover:border-[#EB1C24]/50',
    iconBg: 'bg-[#EB1C24]/10 text-[#EB1C24]',
    auditScope: 'Sitecore XM Cloud Modernization & Prompt Governance Audit',
    brief: 'Legacy XP to composable XM Cloud migration, real-time CDP signal unification, and behavioral experimentation.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    )
  },
  {
    id: 'optimizely',
    name: 'Optimizely',
    category: 'Digital Experience & Experimentation',
    focusTag: 'CMP · Experimentation · Graph',
    proofBadge: 'Continuous Algorithmic Optimization',
    brandColor: '#0037FF',
    hoverBorder: 'hover:border-[#0037FF]/50',
    iconBg: 'bg-[#0037FF]/10 text-[#0037FF]',
    auditScope: 'Optimizely CMP & Algorithmic Experimentation Audit',
    brief: 'Automated multi-variant QA testing, multi-armed bandit personalization, and real-time Graph edge querying.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Enterprise Data Cloud & Autonomous AI',
    focusTag: 'Data Cloud · Agentforce · SFMC',
    proofBadge: 'Customer 360 Agentic Guardrails',
    brandColor: '#00A1E0',
    hoverBorder: 'hover:border-[#00A1E0]/50',
    iconBg: 'bg-[#00A1E0]/10 text-[#00A1E0]',
    auditScope: 'Salesforce Data Cloud & Agentforce Guardrails Audit',
    brief: 'Enterprise customer 360 unified profile resolution, Marketing Cloud automation, and Agentforce prompt boundary governance.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    )
  },
  {
    id: 'adobe',
    name: 'Adobe',
    category: 'Experience Cloud & Creative Operations',
    focusTag: 'AEM · Workfront · Firefly',
    proofBadge: 'Commercial Brand Safety Verified',
    brandColor: '#FA0F00',
    hoverBorder: 'hover:border-[#FA0F00]/50',
    iconBg: 'bg-[#FA0F00]/10 text-[#FA0F00]',
    auditScope: 'Adobe AEM Edge Delivery & Firefly Compliance Audit',
    brief: 'AEM Edge Delivery Services orchestration, Workfront human-in-the-loop review gates, and Firefly IP safety compliance.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.96 3h9.04v18h-4.76l-4.28-11.24L13.96 3zM9.04 3H0v18h4.76l4.28-11.24L9.04 3zm2.96 8.36L15.36 21H8.64l3.36-9.64z"/>
      </svg>
    )
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'Composable Web Platform & Edge Mesh',
    focusTag: 'Edge Functions · Connect · High-Performance Edge',
    proofBadge: 'Sub-Second Global Edge Delivery',
    brandColor: '#00C7B7',
    hoverBorder: 'hover:border-[#00C7B7]/50',
    iconBg: 'bg-[#00C7B7]/10 text-[#00C7B7]',
    auditScope: 'Netlify Composable Edge Architecture & Jamstack Audit',
    brief: 'Sub-second edge routing, Git-centric continuous deployment, serverless microservices orchestration, and zero origin latency drag.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.06 13.11l-4.17-4.17 1.41-1.41 5.58 5.58-5.58 5.59-1.41-1.42 4.17-4.17zM6.94 10.89l4.17 4.17-1.41 1.41-5.58-5.58 5.58-5.59 1.41 1.42-4.17 4.17z"/>
      </svg>
    )
  },
  {
    id: 'contentful',
    name: 'Contentful',
    category: 'API-First Composable Content Platform',
    focusTag: 'API-First · Content Graph · Headless',
    proofBadge: 'Unified Semantic Vector Graph',
    brandColor: '#2478CC',
    hoverBorder: 'hover:border-[#2478CC]/50',
    iconBg: 'bg-[#2478CC]/10 text-[#2478CC]',
    auditScope: 'Contentful Semantic Graph & Vector Taxonomy Audit',
    brief: 'Composable content taxonomies, decoupled omnichannel presentation layers, and structured knowledge assets for reliable AI ingestion.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    )
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Enterprise Cloud AI & Knowledge Systems',
    focusTag: 'Azure OpenAI · Semantic Kernel · M365',
    proofBadge: 'Tenant-Level Data Isolation',
    brandColor: '#008AD7',
    hoverBorder: 'hover:border-[#008AD7]/50',
    iconBg: 'bg-[#008AD7]/10 text-[#008AD7]',
    auditScope: 'Microsoft Azure OpenAI & Semantic Kernel RAG Audit',
    brief: 'Enterprise RAG vector memory architecture, Semantic Kernel deterministic agent routing, and tenant-isolated Azure endpoints.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 1h10v10H1V1zm12 0h10v10H13V1zM1 13h10v10H1V13zm12 0h10v10H13V13z"/>
      </svg>
    )
  },
  {
    id: 'google',
    name: 'Google',
    category: 'Cloud AI & Multimodal Reasoning Ecosystem',
    focusTag: 'Gemini 2.5 / Flash · Vertex AI · GCP',
    proofBadge: 'Enterprise Grounded Reasoning',
    brandColor: '#4285F4',
    hoverBorder: 'hover:border-[#4285F4]/50',
    iconBg: 'bg-[#4285F4]/10 text-[#4285F4]',
    auditScope: 'Google Cloud Vertex AI & Gemini Enterprise Audit',
    brief: 'Multimodal foundation models (Gemini 2.5/Flash), Vertex AI agentic pipelines, BigQuery customer telemetry, and Google Workspace governance.',
    svgIcon: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
      </svg>
    )
  }
];

interface TechnologyNascarProps {
  onSelectPartner: (partnerName: string, auditScope?: string) => void;
}

export const TechnologyNascar: React.FC<TechnologyNascarProps> = ({ onSelectPartner }) => {
  return (
    <section id="ecosystem" className="scroll-mt-28 py-16 bg-[#F7F6F3] border-y border-[#E2E5E0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* NASCAR Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#EAECE9] text-[#364339] mb-3 font-mono border border-[#D0D4CD]">
              <Zap className="w-3.5 h-3.5 text-[#B85233]" />
              <span>Enterprise Ecosystem &amp; Composable Alliances</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#151B17] tracking-tight">
              Anchored Directly Inside Your Production Stack
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#455249] max-w-2xl leading-relaxed">
              Continuum DX operates as an executive CoE overlay across the tier-1 commercial architectures powering modern digital enterprise experiences. Select any platform to evaluate stack readiness and schedule an architectural review.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#364339] bg-white px-3.5 py-2 rounded-xl border border-[#E2E5E0] shadow-2xs self-start lg:self-auto shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            <span>8 Enterprise Alliances · Verified Production Stacks</span>
          </div>
        </div>

        {/* 8-Brand NASCAR Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {NASCAR_PARTNERS.map((partner) => {
            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => onSelectPartner(partner.name, partner.auditScope)}
                className={`group p-4 rounded-2xl bg-white border border-[#E2E5E0] hover:shadow-md transition-all duration-200 flex flex-col justify-between text-left cursor-pointer relative overflow-hidden ${partner.hoverBorder} hover:-translate-y-0.5`}
                title={`Inspect ${partner.name} Architecture Specifications`}
              >
                {/* Top: Logo Icon & Name */}
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${partner.iconBg}`}>
                    {partner.svgIcon}
                  </div>
                  <h3 className="font-bold text-sm text-[#151B17] group-hover:text-[#B85233] transition-colors font-serif leading-snug">
                    {partner.name}
                  </h3>
                  <div className="text-[10px] text-[#697A6F] font-mono mt-0.5 truncate">
                    {partner.focusTag}
                  </div>
                </div>

                {/* Bottom: Action Trigger */}
                <div className="mt-4 pt-2.5 border-t border-[#E2E5E0]/60 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#B85233] font-semibold group-hover:underline">
                    Inspect Stack
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#B85233] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Executive Advisory Note */}
        <div className="mt-6 p-4 rounded-2xl bg-white border border-[#E2E5E0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#2D6A4F] shrink-0" />
            <span className="text-[#455249]">
              Direct executive briefings and architectural assessments conducted by Sean Rusinko across all 8 enterprise platforms.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-mono text-[#697A6F]">
              Zero Vendor Lock-In · Turnkey CoE Overlay
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
