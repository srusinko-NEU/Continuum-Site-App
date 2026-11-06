import React, { useState, useEffect, useCallback } from 'react';
import {
  WORK_IN_ACTION_ITEMS,
  WORK_IN_ACTION_CATEGORIES,
  WorkInActionItem
} from '../data/workInActionData';
import flowPlacemat from '../assets/images/continuum_flow_placemat_1792644490945.jpg';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Presentation,
  Compass
} from 'lucide-react';

interface WorkInActionGalleryProps {
  onScheduleBriefing?: () => void;
}

export const WorkInActionGallery: React.FC<WorkInActionGalleryProps> = ({
  onScheduleBriefing
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Engagements');
  const [activeItem, setActiveItem] = useState<WorkInActionItem | null>(null);

  const filteredItems = WORK_IN_ACTION_ITEMS.filter((item) => {
    if (activeCategory === 'All Engagements') return true;
    return item.category === activeCategory;
  });

  // Handle keyboard navigation when modal is open
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeItem) return;

      if (e.key === 'Escape') {
        setActiveItem(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setActiveItem(filteredItems[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveItem(filteredItems[prevIndex]);
      }
    },
    [activeItem, filteredItems]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeItem]);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  return (
    <section id="work-in-action" className="scroll-mt-28 py-20 bg-[#FAFAF9] text-slate-800 border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-3 flex items-center gap-1.5 font-mono">
              <Presentation className="w-4 h-4 text-blue-600" />
              <span>Field Practice &amp; Leadership in Action</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#090A0F] tracking-tight mb-4 [text-wrap:balance]">
              Advisory in Action: From Keynote Stages to Transformation War Rooms
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Authentic on-site leadership across 17+ years in enterprise digital experience—spanning Microsoft executive briefings, Dubai tourism command centers, Benfica stadium war rooms in Lisbon, and C-suite alignment sprints.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onScheduleBriefing && (
              <button
                type="button"
                onClick={onScheduleBriefing}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                <span>Request Advisory Diagnostic</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-stone-200">
          {WORK_IN_ACTION_CATEGORIES.map((cat) => {
            const count =
              cat === 'All Engagements'
                ? WORK_IN_ACTION_ITEMS.length
                : WORK_IN_ACTION_ITEMS.filter((i) => i.category === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md font-semibold border border-blue-600'
                    : 'bg-white hover:bg-stone-50 text-slate-700 border border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-blue-800 text-white' : 'bg-stone-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col cursor-pointer bg-white border border-stone-200/90 hover:border-blue-500 hover:shadow-md hover:-translate-y-1"
            >
              {/* Image Container (Clean & Unobstructed) */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Text Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-blue-700 mb-2">
                    <span className="uppercase tracking-wider">{item.category}</span>
                    <span className="text-slate-400 truncate max-w-[140px]">{item.venue}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#090A0F] group-hover:text-blue-700 transition-colors line-clamp-1 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 overflow-hidden">
                    {item.tags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-slate-700 font-medium border border-stone-200"
                      >
                        {t}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-blue-700 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Proof Strip */}
        <div className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm bg-white border border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#090A0F]">
                Battle-Tested Delivery Across Tier-1 Environments
              </div>
              <div className="text-xs text-slate-600">
                All engagements showcase direct advisory, architecture, and facilitation by Sean Rusinko.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onScheduleBriefing && (
              <button
                type="button"
                onClick={onScheduleBriefing}
                className="btn-cobalt-primary px-4 py-2.5 text-xs font-semibold rounded-xl shadow-sm whitespace-nowrap cursor-pointer"
              >
                Book Strategic Alignment Session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0D111C] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#090A0F]">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-blue-950/80 border border-blue-500/40 text-cyan-300 font-semibold">
                  {activeItem.category}
                </span>
                <span className="text-xs text-slate-300 hidden sm:inline flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeItem.venue} ({activeItem.location})</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 mr-2">
                  {filteredItems.findIndex((i) => i.id === activeItem.id) + 1} / {filteredItems.length}
                </span>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors ml-2 cursor-pointer"
                  title="Close (Escape)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two Column Layout */}
            <div className="overflow-y-auto grid md:grid-cols-12 flex-grow">
              {/* Photo Pane (7 cols) */}
              <div className="md:col-span-7 bg-black/90 flex items-center justify-center p-2 sm:p-4 min-h-[320px] md:min-h-[480px] relative">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Narrative & Credentials Pane (5 cols) */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#0D111C] space-y-6 text-slate-100">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug mb-1">
                      {activeItem.title}
                    </h3>
                    <div className="text-xs font-medium text-cyan-400">
                      {activeItem.subtitle}
                    </div>
                  </div>

                  {/* Core Principle Badge */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Operational Principle</span>
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {activeItem.corePrinciple}
                    </div>
                  </div>

                  {/* Highlight Metric / Result */}
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Advisory Impact Marker</span>
                    </div>
                    <div className="text-xs text-slate-200 font-medium leading-relaxed">
                      {activeItem.highlightMetric}
                    </div>
                  </div>

                  {/* Detailed Executive Narrative */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                      Engagement Context &amp; Execution
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {activeItem.detailedContext}
                    </p>
                  </div>

                  {/* Ecosystem Tags */}
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                      Ecosystem Architecture
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-300 font-medium border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Led &amp; facilitated by Sean Rusinko</span>
                  </div>

                  {onScheduleBriefing && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveItem(null);
                        onScheduleBriefing();
                      }}
                      className="btn-cobalt-primary w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-lg shadow-md cursor-pointer"
                    >
                      <span>Request Advisory Diagnostic</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
