import React from 'react';
import { ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenScheduler: () => void;
  onOpenDiagnostic: () => void;
  onOpenWhitePaper?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScheduler, onOpenDiagnostic, onOpenWhitePaper }) => {
  return (
    <footer id="contact" className="scroll-mt-28 bg-[#07090E] text-[#F8FAFC] border-t border-white/10">
      {/* High-Impact Decision CTA Block */}
      <div className="py-24 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-semibold font-mono tracking-wider text-cyan-400 uppercase mb-3">
            Engage Continuum
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6" style={{ textWrap: 'balance' }}>
            Ready to Align Your AI Initiatives Around Enterprise-Grade Governance?
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Schedule an introductory briefing to review how the AI DXMM Framework and Project-Overlay model can be overlaid directly onto your upcoming digital initiatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onOpenScheduler}
              className="btn-cobalt-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer"
            >
              <span>Request Advisory Diagnostic</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDiagnostic}
              className="btn-ghost-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl whitespace-nowrap cursor-pointer"
            >
              <span>Benchmark AI Maturity</span>
            </button>

            <a
              href="mailto:sean@continuum-dx.com?cc=srusinko@gmail.com&subject=Continuum%20DX%20Advisory%20Inquiry"
              className="btn-ghost-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Direct Email</span>
            </a>
          </div>
        </div>

        {/* Quiet Footer Links & Legal Identity */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-white">CONTINUUM</span>
            <span className="text-cyan-400 font-semibold font-mono">DX ADVISORY</span>
            <span className="text-white/20" aria-hidden="true">|</span>
            <span className="text-slate-300">Enterprise AI Governance &amp; Digital CoE Overlay</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium">
            <a href="#ecosystem" className="hover:text-cyan-300 transition-colors">
              Technology NASCAR
            </a>
            <a href="#framework" className="hover:text-cyan-300 transition-colors">
              AI DXMM Framework
            </a>
            <a href="#roi-estimator" className="hover:text-cyan-300 transition-colors">
              ROI Calculator
            </a>
            <a href="#delivery-model" className="hover:text-cyan-300 transition-colors">
              Delivery Model
            </a>
            <a href="#offerings" className="hover:text-cyan-300 transition-colors">
              Advisory Services
            </a>
            <a href="#leadership" className="hover:text-cyan-300 transition-colors">
              Leadership &amp; Bio
            </a>
            <a href="#testimonials" className="hover:text-cyan-300 transition-colors">
              Validation
            </a>
            <button onClick={onOpenDiagnostic} className="hover:text-cyan-300 transition-colors cursor-pointer">
              Diagnostic Benchmark
            </button>
            {onOpenWhitePaper && (
              <button onClick={onOpenWhitePaper} className="hover:text-cyan-200 text-cyan-400 transition-colors cursor-pointer font-semibold">
                2026 Executive White Paper
              </button>
            )}
          </div>

          <div className="text-slate-500">
            © 2026 SMR Holdings LLC d/b/a Continuum DX Advisory · Sean Rusinko, Founder &amp; Managing Director. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
