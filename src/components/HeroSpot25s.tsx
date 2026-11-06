import React from 'react';

export interface HeroSpot25sProps {
  onOpenDiagnostic?: () => void;
  onStartDiagnostic?: () => void;
  onExploreOfferings?: () => void;
  onExploreModel?: () => void;
  onOpenWhitePaper?: () => void;
  onOpenContact?: () => void;
  onOpenKeynote?: () => void;
}

export type HeroSpotProps = HeroSpot25sProps;

export const HeroSpot25s: React.FC<HeroSpot25sProps> = ({
  onOpenDiagnostic,
  onStartDiagnostic,
  onExploreOfferings,
  onExploreModel,
  onOpenWhitePaper,
  onOpenContact,
  onOpenKeynote,
}) => {
  const handleDiagnosticClick = () => {
    if (onStartDiagnostic) onStartDiagnostic();
    else if (onOpenDiagnostic) onOpenDiagnostic();
    else {
      const el = document.getElementById('diagnostic') || document.getElementById('diagnostic-tool') || document.getElementById('roi');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    if (onOpenContact) onOpenContact();
    else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeynoteClick = () => {
    if (onOpenKeynote) onOpenKeynote();
    else {
      const el = document.getElementById('keynote') || document.getElementById('leadership');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{ 
        backgroundColor: '#0A0F1D', 
        color: '#FFFFFF',
        paddingTop: '108px', 
        paddingBottom: '76px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Precision Grid Matrix */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Positioning & The Space Between Narrative */}
          <div className="lg:col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* CoE Operating Standard Badge */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(20, 184, 166, 0.35)',
                  color: '#2DD4BF',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2DD4BF' }} />
                AI DXMM™ MATURITY FRAMEWORK · PROJECT-OVERLAY COE MODEL
              </div>
            </div>

            {/* Core Thesis Headline: The Space Between */}
            <h1 
              style={{ 
                color: '#F8FAFC', 
                fontSize: 'clamp(2.1rem, 3.4vw, 3.25rem)', 
                fontWeight: 800, 
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-0.025em'
              }}
            >
              The Space Between:{' '}
              <span style={{ color: '#2DD4BF', fontWeight: 800 }}>
                Why Enterprise Operating Models
              </span>{' '}
              Beat AI Point Tools.
            </h1>

            {/* Positioning Description */}
            <p 
              style={{ 
                color: '#94A3B8', 
                fontSize: '1.05rem', 
                lineHeight: 1.6, 
                maxWidth: '620px', 
                margin: 0 
              }}
            >
              Enterprise AI initiatives don’t fail on algorithm capability—they stall in the operational gap between board-level vision and production DXP delivery. Continuum DX embeds directly into active capital programs to operationalize governance, prompt registries, and composable architectures in-flight.
            </p>

            {/* Primary Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', paddingTop: '6px' }}>
              <button
                type="button"
                onClick={handleDiagnosticClick}
                style={{
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  padding: '0 20px',
                  height: '42px',
                  borderRadius: '8px',
                  border: '1px solid #14B8A6',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(13, 148, 136, 0.25)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0F766E')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D9488')}
              >
                <span>Request Advisory Diagnostic</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleKeynoteClick}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  color: '#E2E8F0',
                  padding: '0 18px',
                  height: '42px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)')}
              >
                <span>Watch Keynote Briefing</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            </div>

            {/* Proven Enterprise Track Record Metrics */}
            <div 
              style={{ 
                borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
                paddingTop: '18px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
                gap: '16px' 
              }}
            >
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#FFFFFF', letterSpacing: '-0.02em' }}>17+ Years</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Enterprise DXP &amp; MarTech</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#2DD4BF', letterSpacing: '-0.02em' }}>70 / 20 / 10</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Transformation Rule</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#FFFFFF', letterSpacing: '-0.02em' }}>$100M+</div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Digital Programs Guided</div>
              </div>
            </div>

          </div>

          {/* RIGHT: The 70/20/10 Enterprise Transformation Console */}
          <div className="lg:col-span-5">
            <div 
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {/* Header */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingBottom: '12px', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#E2E8F0' }}>
                    Continuum CoE Overlay Model
                  </span>
                </div>
                <span style={{ fontSize: '10px', fontFamily: 'ui-monospace, monospace', color: '#64748B', backgroundColor: 'rgba(2, 6, 23, 0.6)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  In-Flight Delivery
                </span>
              </div>

              {/* 70/20/10 Transformation Distribution */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '14px 0' }}>
                
                <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#F1F5F9' }}>70% People &amp; Operating Model</div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Human-in-the-Loop, Prompts &amp; Review Gates</div>
                  </div>
                  <span style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#34D399' }}>Core Value</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#F1F5F9' }}>20% Composable Architecture</div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Edge Gateway, Sitecore / AEM / Contentful</div>
                  </div>
                  <span style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#2DD4BF' }}>Unified</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#F1F5F9' }}>10% AI Models &amp; Algorithms</div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Multi-Model Dynamic Arbitration</div>
                  </div>
                  <span style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#94A3B8' }}>Arbitrated</span>
                </div>

              </div>

              {/* Operating Advantage Footer */}
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#64748B' }}>
                <span>Bypasses 9–12 Mo Committee Delays</span>
                <span style={{ color: '#2DD4BF', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>Zero-Wait Beachhead</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSpot25s;