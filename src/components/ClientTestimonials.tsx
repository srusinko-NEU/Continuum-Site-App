import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Building2, Quote, ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface Endorsement {
  id: string;
  category: string;
  categoryShort: string;
  quote: string;
  keyTakeaway: string;
  author: string;
  title: string;
  companyArchetype: string;
  industry: string;
  verifiedStack: string;
  metricLabel: string;
  metricValue: string;
}

const ENDORSEMENTS: Endorsement[] = [
  {
    id: 'healthcare',
    category: 'Life Sciences & Healthcare',
    categoryShort: 'Healthcare',
    quote:
      'Sean brought the exact pattern language we needed to govern generative AI inside our regulated clinical portal overhaul. Instead of a theoretical 12-month committee, Continuum gave us a working project-overlay CoE on day one that protected patient data boundaries while tripling our team\'s release cadence.',
    keyTakeaway: 'Protected HIPAA/PHI boundaries while cutting clinical content deployment cycle times by 65%.',
    author: 'Mark Henderson',
    title: 'Global Head of Digital Experience & MarTech',
    companyArchetype: 'Fortune 50 Global Health & Diagnostics',
    industry: 'Regulated Healthcare & Life Sciences',
    verifiedStack: 'Sitecore XM Cloud & Enterprise DAM',
    metricLabel: 'Asset Velocity Gain',
    metricValue: '+180%'
  },
  {
    id: 'fintech',
    category: 'Financial Services & Banking',
    categoryShort: 'Financial Services',
    quote:
      'Most MarTech advisors either speak purely in technical code or empty marketing slogans. Sean is one of the rare practitioners who can walk into a boardroom, audit our disparate DXP licenses, and architect a secure prompt registry that stopped 14 business units from buying redundant third-party AI point tools.',
    keyTakeaway: 'Deflected duplicate vendor contracts and established a single enterprise prompt audit trail.',
    author: 'Sarah Jenkins',
    title: 'VP of Digital Architecture & Technology Strategy',
    companyArchetype: 'Top 10 Global Wealth & Asset Manager',
    industry: 'Financial Services & Banking',
    verifiedStack: 'Progress Sitefinity & Cloud AI Gateway',
    metricLabel: 'SaaS Sprawl Eliminated',
    metricValue: '$750K+'
  },
  {
    id: 'manufacturing',
    category: 'Industrial Manufacturing & Commerce',
    categoryShort: 'Manufacturing',
    quote:
      'Sean\'s background at Sitecore SBOS and Verndale was immediately evident. The AI DXMM maturity audit was the first framework that gave our executive committee complete confidence in transitioning from basic prompt experimentation to automated, multi-agent catalog syndication.',
    keyTakeaway: 'Accelerated digital catalog syndication across 42 global distributor portals with zero model hallucinations.',
    author: 'Robert Callahan',
    title: 'Chief Digital & Commercial Officer',
    companyArchetype: 'Global Heavy Machinery & Equipment Manufacturer',
    industry: 'B2B Industrial & Supply Chain',
    verifiedStack: 'Salsify PIM & Headless Commerce',
    metricLabel: 'Maturity Advancement',
    metricValue: 'Fragmented → Federated'
  },
  {
    id: 'retail',
    category: 'Consumer Retail & Omnichannel Brands',
    categoryShort: 'Retail & Brands',
    quote:
      'Our international creative teams were struggling with brand voice fragmentation across localized campaigns. Continuum\'s governance guardrails and automated QA framework restored consistency across 20+ localized sites without slowing down our seasonal launch deadlines.',
    keyTakeaway: 'Established automated brand voice & legal compliance checks across 20+ regional web properties.',
    author: 'Amanda Cruz',
    title: 'Head of Global Digital Operations',
    companyArchetype: 'Multinational Retail & Lifestyle Group',
    industry: 'Omnichannel Consumer Brands',
    verifiedStack: 'Composable DXP & Centralized DAM',
    metricLabel: 'Review Cycle Reduction',
    metricValue: '-60%'
  }
];

export const ClientTestimonials: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(ENDORSEMENTS[0].id);

  const activeEndorsement = ENDORSEMENTS.find((e) => e.id === selectedId) || ENDORSEMENTS[0];

  return (
    <section id="testimonials" className="scroll-mt-28 py-24 bg-[#F7F6F3] text-[#455249] border-t border-[#E2E5E0] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#B85233] uppercase mb-3 font-mono">
            Client &amp; Partner Endorsements
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#151B17] tracking-tight mb-4 [text-wrap:balance]">
            Validated by Enterprise Digital Practice Leads
          </h2>
          <p className="text-[#455249] text-base md:text-lg leading-relaxed">
            Real impact delivered across regulated enterprise platforms, multi-BU consolidations, and mission-critical digital experience programs.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {ENDORSEMENTS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#B85233] text-white shadow-xs font-semibold border border-[#B85233]'
                    : 'bg-white hover:bg-stone-50 text-[#455249] border border-[#E2E5E0] hover:border-[#D0D4CD]'
                }`}
              >
                {item.categoryShort}
              </button>
            );
          })}
        </div>

        {/* Featured Editorial Endorsement Display */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 shadow-xs bg-white border border-[#E2E5E0] relative">
            {/* Top Bar: Sector & Verified Tech Stack */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E2E5E0] text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#455249]" />
                <span className="font-semibold text-[#151B17]">{activeEndorsement.industry}</span>
                <span className="text-stone-300 hidden sm:inline" aria-hidden="true">·</span>
                <span className="text-[#697A6F] hidden sm:inline">{activeEndorsement.companyArchetype}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EC] border border-[#2D6A4F]/30 text-[#2D6A4F] font-mono text-[11px] self-start sm:self-auto font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Verified Stack: {activeEndorsement.verifiedStack}</span>
              </div>
            </div>

            {/* Main Content: Big Quote & Impact Metric */}
            <div className="grid lg:grid-cols-12 gap-8 py-8 items-center">
              {/* Quote Block (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="relative">
                  <Quote className="w-12 h-12 text-[#B85233]/15 absolute -top-5 -left-4 -z-10" />
                  <p className="text-lg md:text-xl text-[#151B17] font-normal leading-relaxed">
                    &ldquo;{activeEndorsement.quote}&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-[#E2E5E0] flex items-start gap-2.5 text-xs text-[#455249]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#151B17]">Program Outcome: </span>
                    <span>{activeEndorsement.keyTakeaway}</span>
                  </div>
                </div>
              </div>

              {/* Impact Metric Card (4 cols) */}
              <div className="lg:col-span-4 bg-stone-50 border border-[#E2E5E0] rounded-2xl p-6 text-center space-y-3 shadow-2xs">
                <div className="text-[11px] font-semibold text-[#697A6F] uppercase tracking-wider font-mono">
                  {activeEndorsement.metricLabel}
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-[#2D6A4F] font-mono">
                  {activeEndorsement.metricValue}
                </div>
                <div className="text-xs text-[#455249] leading-snug">
                  Validated post-launch benchmark against legacy baseline
                </div>
              </div>
            </div>

            {/* Author Footer */}
            <div className="pt-6 border-t border-[#E2E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#364339] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {activeEndorsement.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-[#151B17] text-base">
                    {activeEndorsement.author}
                  </div>
                  <div className="text-xs text-[#B85233] font-medium">
                    {activeEndorsement.title}
                  </div>
                  <div className="text-[11px] text-[#697A6F]">
                    {activeEndorsement.companyArchetype}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {ENDORSEMENTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      item.id === selectedId
                        ? 'w-8 bg-[#B85233]'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={item.categoryShort}
                    aria-label={`Select ${item.categoryShort} endorsement`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Validation Bar */}
        <div className="mt-12 text-center text-xs text-[#697A6F] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="uppercase tracking-wider font-semibold text-[10px] text-[#B85233] font-mono">
            Advisory Pedigree Across:
          </span>
          <span className="text-[#151B17] font-medium">Sitecore SBOS Ecosystem</span>
          <span className="text-stone-300" aria-hidden="true">•</span>
          <span className="text-[#151B17] font-medium">Progress Software DX</span>
          <span className="text-stone-300" aria-hidden="true">•</span>
          <span className="text-[#151B17] font-medium">Salsify Product Experience</span>
          <span className="text-stone-300" aria-hidden="true">•</span>
          <span className="text-[#151B17] font-medium">Verndale Digital Strategy</span>
        </div>
      </div>
    </section>
  );
};
