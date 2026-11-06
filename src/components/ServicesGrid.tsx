import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { ServiceModule } from '../types';

interface ServicesGridProps {
  onSelectService?: (service?: ServiceModule) => void;
  onOpenScheduler?: (tier?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService, onOpenScheduler }) => {
  const handleAction = (tierTitle: string) => {
    if (onSelectService) {
      onSelectService({
        id: tierTitle.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        number: '01',
        category: 'Advisory Engagement',
        title: tierTitle,
        duration: 'Agile Container',
        description: `Executive engagement container: ${tierTitle}`,
        targetAudience: 'Chief Digital Officers & Enterprise Tech Leaders',
        keyDeliverables: [],
        businessImpact: 'Accelerated enterprise transformation'
      });
    } else if (onOpenScheduler) {
      onOpenScheduler(tierTitle);
    }
  };

  return (
    <section id="services" className="bg-[#090A0F] text-slate-100 py-24 px-6 sm:px-8 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 block mb-2 font-mono">
            Commercial Packaging &amp; Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white leading-tight">
            How Enterprise Clients Engage Continuum
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg">
            No 12-month theoretical discovery retainers. We package our advisory into clear operational containers with defined deliverables, speed-to-value, and zero headcount overhead.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Card 1: Sprint 0 */}
          <div className="bg-[#0D111C] border border-white/10 rounded-xl p-7 flex flex-col justify-between shadow-sm hover:border-white/20 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-blue-950/60 border border-blue-500/30 px-2.5 py-1 rounded">
                  Sprint 0 · 2–3 Weeks
                </span>
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-2">
                AI DXMM™ Rapid Diagnostic
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Rapid inventory of rogue generative AI usage, stack sprawl, and governance drift across your digital, marketing, and engineering divisions.
              </p>
              
              <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Key Deliverables</div>
                <div className="flex items-start text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Shadow AI &amp; vendor stack sprawl matrix</span>
                </div>
                <div className="flex items-start text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>IP leakage and prompt hallucination audit</span>
                </div>
                <div className="flex items-start text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Executive board-ready remediation roadmap</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAction('AI DXMM™ Rapid Diagnostic')}
              className="w-full text-center py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white transition cursor-pointer"
            >
              Initiate Diagnostic
            </button>
          </div>

          {/* Card 2: Primary Flagship Model */}
          <div className="bg-blue-950/20 text-slate-100 border-2 border-blue-500/50 rounded-xl p-7 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono uppercase tracking-wider font-bold shadow-md">
              Primary Engagement
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-blue-900/40 border border-blue-500/30 px-2.5 py-1 rounded">
                  Project-Embedded · 3–6 Months
                </span>
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-2">
                AI Control Plane &amp; CoE Project Overlay
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-6">
                We embed directly into an active, funded enterprise initiative (AEM, Sitecore, Contentful, or composable data migration) to establish operating governance in live production.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Operational Impact</div>
                <div className="flex items-start text-xs text-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Deploy enterprise prompt firewall &amp; control plane directly in CMS/DXP workflows</span>
                </div>
                <div className="flex items-start text-xs text-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>External agency, integrator, &amp; vendor accountability</span>
                </div>
                <div className="flex items-start text-xs text-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Extraction of reusable enterprise operating playbook</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAction('AI Control Plane & CoE Project Overlay')}
              className="btn-cobalt-primary w-full text-center py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              Overlay Active Initiative &amp; Control Plane
            </button>
          </div>

          {/* Card 3: Fractional Retainer */}
          <div className="bg-[#0D111C] border border-white/10 rounded-xl p-7 flex flex-col justify-between shadow-sm hover:border-white/20 transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-blue-950/60 border border-blue-500/30 px-2.5 py-1 rounded">
                  Annual Advisory · Monthly Cadence
                </span>
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-2">
                Fractional Head of CoE
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                C-suite advisory partnership driving ongoing digital experience maturity, architectural rationalization, and SteerCo leadership across business units.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Executive Scope</div>
                <div className="flex items-start text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quarterly executive SteerCo facilitation</span>
                </div>
                <div className="flex items-start text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Enterprise tool rationalization &amp; procurement review</span>
                </div>
                <div className="flex items-start text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>C-suite and board-level maturity reporting</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAction('Fractional Head of CoE')}
              className="w-full text-center py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white transition cursor-pointer"
            >
              Request Advisory Retainer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
