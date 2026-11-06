import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Clock, Users, ArrowUpRight } from 'lucide-react';
import boardroomBg from '../assets/images/architecture_control_room_1790943666093.jpg';

interface OfferingPackage {
  phase: string;
  title: string;
  timeframe: string;
  targetAudience: string;
  summary: string;
  deliverables: string[];
  ctaLabel: string;
  isPrimary?: boolean;
}

const offerings: OfferingPackage[] = [
  {
    phase: "01 / Discovery & Risk",
    title: "AI CoE Project Diagnostic",
    timeframe: "Weeks 1–3",
    targetAudience: "CIOs, CISOs & Audit Committees",
    summary: "Identify unbudgeted token consumption, shadow AI wrappers, prompt drift, and regulatory exposure across business units.",
    deliverables: [
      "Inventory of shadow AI models, third-party API leaks, and data ingress points",
      "Enterprise compliance gap analysis (NIST AI RMF, ISO 42001, EU AI Act readiness)",
      "Comprehensive compute/token TCO audit and spend consolidation model",
      "Risk-weighted architectural roadmap with defensible P&L milestones"
    ],
    ctaLabel: "Request Advisory Diagnostic",
    isPrimary: true
  },
  {
    phase: "02 / Operational Control",
    title: "AI Operations & Prompt Governance",
    timeframe: "Weeks 4–8",
    targetAudience: "Heads of Product, Legal & Content Directors",
    summary: "Infuse deterministic guardrails, verified prompt registries, and automated QA workflows into live delivery pipelines.",
    deliverables: [
      "Certified enterprise prompt engineering & version-controlled registries",
      "Automated real-time PII scrubbing and immutable compliance audit logs",
      "Human-in-the-loop review gates with brand voice validation scoring",
      "Model deprecation lifecycles and role-based access token governance"
    ],
    ctaLabel: "Deploy Governance Engine"
  },
  {
    phase: "03 / Platform Engineering",
    title: "Composable Web & Edge Architecture",
    timeframe: "Weeks 6–12",
    targetAudience: "Enterprise Architects, CTOs & Engineering Leads",
    summary: "Establish an operational edge control plane that centralizes model routing, headless CMS connectors, and latency balancing.",
    deliverables: [
      "Unified multi-model gateway with automated fallback and arbitration",
      "Decoupled headless CMS connectors (Sitecore, Contentful, Adobe AEM)",
      "Real-time semantic context layer with streaming CDP profiles",
      "Sub-100ms edge personalization with zero infrastructure drag"
    ],
    ctaLabel: "Architect Edge Platform"
  },
  {
    phase: "04 / Institutional Saturation",
    title: "Federated CoE Scaling & Enablement",
    timeframe: "Quarterly Retainer",
    targetAudience: "Executive Committees & Line-of-Business GMs",
    summary: "Deliver turnkey 'CoE in a Box' playbooks and cross-functional operating cadences to scale across adjacent business units.",
    deliverables: [
      "Cross-functional operating cadence aligning Legal, Security, and Product teams",
      "Internal AI developer acceleration playbooks and proprietary tooling standards",
      "Executive balance sheet attribution: tracking time-to-market and margin expansion",
      "Quarterly frontier model benchmarking and enterprise stack future-proofing"
    ],
    ctaLabel: "Institutionalize CoE"
  }
];

interface OfferingsProps {
  onSelectOffering?: (offeringTitle: string) => void;
}

export const Offerings: React.FC<OfferingsProps> = ({ onSelectOffering }) => {
  return (
    <section id="offerings" className="py-28 px-6 md:px-12 relative scroll-mt-28 bg-[#F7F6F3] text-[#455249] border-t border-[#E2E5E0] overflow-hidden">
      <span id="services" className="absolute -top-28 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#EAECE9] border border-[#D0D4CD] text-[#364339] mb-4 font-mono shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B85233]" />
            <span>Structured Engagements · 4 Core Advisory Modules</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#151B17] font-bold tracking-tight leading-tight [text-wrap:balance]">
            From speculative pilots to balance-sheet assets.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#455249] font-sans leading-relaxed">
            Over 50% of enterprise AI pilots stall post-proof-of-concept due to unmanaged costs, security exposure, and lack of systemic ROI. We provide scoped, production-grade engagements designed for enterprise governance.
          </p>
        </div>

        {/* 4 Core Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col justify-between p-7 rounded-2xl transition-all duration-200 relative group ${
                pkg.isPrimary
                  ? 'bg-white border-2 border-[#B85233] shadow-md ring-4 ring-[#F8ECE8]'
                  : 'bg-white border border-[#E2E5E0] hover:border-[#B85233]/40 hover:shadow-md shadow-xs'
              }`}
            >
              {pkg.isPrimary && (
                <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-[#B85233] text-white text-[10px] font-mono uppercase tracking-wider font-semibold shadow-xs">
                  Recommended Entry
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#697A6F] pb-3 border-b border-[#E2E5E0]/60 mb-5">
                  <span className="font-semibold text-[#151B17]">{pkg.phase}</span>
                  <span className="font-bold text-[#B85233] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B85233]" />
                    {pkg.timeframe}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#151B17] mb-2 leading-snug group-hover:text-[#B85233] transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-[11px] font-sans text-[#364339] uppercase tracking-wider mb-3 flex items-center gap-1.5 font-medium">
                  <Users className="w-3 h-3 text-[#364339]" />
                  <span>{pkg.targetAudience}</span>
                </p>
                <p className="text-xs text-[#455249] mb-6 leading-relaxed">
                  {pkg.summary}
                </p>

                <div className="space-y-2.5 mb-6">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#697A6F] font-semibold">Key Deliverables:</p>
                  {pkg.deliverables.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs text-[#455249] leading-relaxed">
                      <span className="text-[#B85233] font-bold mt-0.5">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectOffering && onSelectOffering(pkg.title)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                  pkg.isPrimary
                    ? 'text-white bg-[#B85233] hover:bg-[#9E4429] shadow-sm'
                    : 'text-[#151B17] hover:text-[#B85233] bg-[#F7F6F3] hover:bg-[#F8ECE8] border border-[#E2E5E0] hover:border-[#B85233]'
                }`}
              >
                <span>{pkg.ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
