import React, { useState, useId } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';
import strategyBriefingImage from '../assets/images/executive_strategy_briefing_1792644531985.jpg';

interface RoiEstimatorProps {
  onScheduleWithEstimate?: (estimateSummary: string) => void;
}

const SUPPORTED_ECOSYSTEMS = [
  'Sitecore (XM Cloud / XP)',
  'Contentful Composable',
  'Optimizely One',
  'Adobe Experience Manager (AEM)',
  'Salesforce Experience Cloud'
];

export const RoiEstimator: React.FC<RoiEstimatorProps> = ({ onScheduleWithEstimate }) => {
  // Input states with enterprise default benchmarks
  const [propertyCount, setPropertyCount] = useState<number>(8);
  const [teamSize, setTeamSize] = useState<number>(25);
  const [martechSpend, setMartechSpend] = useState<number>(1200000);
  const [reviewCycleWeeks, setReviewCycleWeeks] = useState<number>(4);
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>('Sitecore (XM Cloud / XP)');

  const propertySliderId = useId();
  const teamSliderId = useId();
  const martechSliderId = useId();
  const reviewSliderId = useId();

  // Financial Modeling Formulas
  const saasSavingsAnnual = Math.round(martechSpend * 0.16 + teamSize * 1800);
  const laborCapacityAnnual = Math.round(teamSize * 115000 * 0.35);
  const totalAnnualValue = saasSavingsAnnual + laborCapacityAnnual;
  const compressedReviewDays = Math.max(1, Math.round(reviewCycleWeeks * 7 * 0.35 * 10) / 10);
  const benchmarkAdvisoryInvestment = 180000;
  const threeYearValue = totalAnnualValue * 3;
  const netThreeYearRoiPct = Math.round(((threeYearValue - benchmarkAdvisoryInvestment) / benchmarkAdvisoryInvestment) * 100);
  const paybackPeriodMonths = Math.max(1.5, Math.round((benchmarkAdvisoryInvestment / totalAnnualValue) * 12 * 10) / 10);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBookWithModel = () => {
    const summary = `ROI Estimate: ${formatCurrency(totalAnnualValue)}/yr total value (${formatCurrency(saasSavingsAnnual)} SaaS deflection + ${formatCurrency(laborCapacityAnnual)} labor capacity) across ${propertyCount} properties & ${teamSize} FTEs on ${selectedEcosystem}. Review cycle compressed from ${reviewCycleWeeks} wks to ${compressedReviewDays} days. 3-Yr ROI: ${netThreeYearRoiPct}%.`;
    if (onScheduleWithEstimate) {
      onScheduleWithEstimate(summary);
    }
  };

  return (
    <section id="roi-estimator" className="py-28 bg-[#FAFAF9] text-slate-800 border-t border-stone-200 relative overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-50 border border-blue-200 mb-3 font-mono shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Executive Business Case</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#090A0F] tracking-tight mb-4 [text-wrap:balance]">
            Enterprise ROI &amp; Cost-Savings Calculator
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed [text-wrap:balance]">
            Quantify the business value of transitioning from monolithic DXP overhead and fragmented shadow AI to a governed Agentic AI CoE overlay model.
          </p>
        </div>

        {/* Main Grid: Inputs (Left 5 cols) & Real-Time Projections (Right 7 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Parametric Controls */}
          <div className="p-6 md:p-8 rounded-3xl space-y-6 shadow-xs bg-white border border-stone-200 lg:col-span-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-[#090A0F] uppercase tracking-wider">
                  Operational Baseline
                </h3>
              </div>
              <span className="text-[11px] text-blue-700 font-mono font-semibold">Live Simulation</span>
            </div>

            {/* DXP Ecosystem Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Core Digital Experience Platform (DXP)</span>
                <span className="text-[11px] text-blue-600 font-medium">Primary Stack</span>
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {SUPPORTED_ECOSYSTEMS.map((eco) => (
                  <button
                    key={eco}
                    type="button"
                    onClick={() => setSelectedEcosystem(eco)}
                    className={`px-3 py-2 rounded-lg text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      selectedEcosystem === eco
                        ? 'bg-blue-50 text-blue-800 border border-blue-300 shadow-2xs font-semibold'
                        : 'bg-stone-50 text-slate-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    <span>{eco}</span>
                    {selectedEcosystem === eco && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Digital Properties & Brand Portals */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor={propertySliderId} className="font-semibold text-slate-700">Active Digital Properties &amp; Portals</label>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {propertyCount} {propertyCount === 1 ? 'Property' : 'Properties'}
                </span>
              </div>
              <input
                id={propertySliderId}
                type="range"
                min="1"
                max="40"
                step="1"
                value={propertyCount}
                onChange={(e) => setPropertyCount(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 flagship site</span>
                <span>20 regional BUs</span>
                <span>40+ global hubs</span>
              </div>
            </div>

            {/* Slider 2: Content, Marketing & Agency FTEs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor={teamSliderId} className="font-semibold text-slate-700">Content, Marketing &amp; Agency FTEs</label>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {teamSize} Authors
                </span>
              </div>
              <input
                id={teamSliderId}
                type="range"
                min="5"
                max="100"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 focused creators</span>
                <span>50 distributed FTEs</span>
                <span>100+ enterprise scale</span>
              </div>
            </div>

            {/* Slider 3: Annual DXP / MarTech Stack Licensing */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor={martechSliderId} className="font-semibold text-slate-700">Annual DXP &amp; MarTech Stack Spend</label>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {formatCurrency(martechSpend)}
                </span>
              </div>
              <input
                id={martechSliderId}
                type="range"
                min="250000"
                max="4000000"
                step="50000"
                value={martechSpend}
                onChange={(e) => setMartechSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$250k</span>
                <span>$2.0M</span>
                <span>$4.0M+</span>
              </div>
            </div>

            {/* Slider 4: Current Review & Compliance Cycle */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor={reviewSliderId} className="font-semibold text-slate-700">Avg Campaign &amp; Content Approval Cycle</label>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {reviewCycleWeeks} {reviewCycleWeeks === 1 ? 'Week' : 'Weeks'}
                </span>
              </div>
              <input
                id={reviewSliderId}
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={reviewCycleWeeks}
                onChange={(e) => setReviewCycleWeeks(parseFloat(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 week rapid</span>
                <span>4 weeks standard</span>
                <span>8 weeks regulated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Value Realization Model */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Hero Highlight Card */}
            <div className="p-8 rounded-3xl border-2 border-blue-600 shadow-md relative overflow-hidden bg-white">
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-blue-700 tracking-wider uppercase font-semibold">
                      Modeled Annual Economic Benefit
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#090A0F] font-mono tracking-tight mt-1">
                      {formatCurrency(totalAnnualValue)}
                      <span className="text-sm sm:text-base font-normal text-slate-500"> / year</span>
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono self-start sm:self-auto font-bold">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{netThreeYearRoiPct}% 3-Year ROI</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Projected enterprise value across <strong className="text-[#090A0F] font-semibold">{propertyCount} properties</strong> and <strong className="text-[#090A0F] font-semibold">{teamSize} digital authors</strong> on {selectedEcosystem}, modeled against empirical Global 2000 transformation benchmarks.
                </p>

                {/* 3 Metric Value Pillars */}
                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                      <span>SaaS Sprawl Deflected</span>
                    </div>
                    <div className="text-xl font-bold text-[#090A0F] font-mono">
                      {formatCurrency(saasSavingsAnnual)}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Retires duplicate consumer AI licenses &amp; point tools
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      <span>Labor Velocity Unlocked</span>
                    </div>
                    <div className="text-xl font-bold text-[#090A0F] font-mono">
                      {formatCurrency(laborCapacityAnnual)}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Reclaims ~35% of manual authoring &amp; reformatting hours
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Review Cycle Time</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-700 font-mono">
                      {compressedReviewDays} Days
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Compressed from {reviewCycleWeeks} weeks via real-time QA
                    </p>
                  </div>
                </div>

                {/* Value Composition Visual Breakdown */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-slate-600 font-mono">
                    <span>Value Realization Composition</span>
                    <span className="text-emerald-700 font-semibold">Estimated Payback: ~{paybackPeriodMonths} Months</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-stone-100 flex overflow-hidden border border-stone-200">
                    <div
                      style={{ width: `${(saasSavingsAnnual / totalAnnualValue) * 100}%` }}
                      className="bg-blue-600 h-full"
                      title="SaaS & Tool Deflection"
                    />
                    <div
                      style={{ width: `${(laborCapacityAnnual / totalAnnualValue) * 100}%` }}
                      className="bg-emerald-600 h-full"
                      title="Operational Labor Velocity"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <span>Hard SaaS Savings ({Math.round((saasSavingsAnnual / totalAnnualValue) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <span>Productivity &amp; Velocity ({Math.round((laborCapacityAnnual / totalAnnualValue) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Explicit Methodology Notice */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-slate-500 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Methodology Notice:</strong> Illustrative modeled estimate. Results depend on team size, vendor contracts, and operational scope. Not a financial guarantee.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Executive Assurance & Direct Action Card */}
            <div className="p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs bg-white border border-stone-200">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#090A0F] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>The Project-Overlay Advantage</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                  Delivered in-flight without standalone CoE budget friction. Investment is embedded directly into active anchor projects.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBookWithModel}
                className="btn-cobalt-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs md:text-sm font-semibold rounded-xl whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>Request Advisory Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
