import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenDiagnostic?: () => void;
  onOpenScheduler?: () => void;
  onOpenContact?: () => void;
  onOpenKeynote?: () => void;
  onOpenWhitePaper?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDiagnostic,
  onOpenScheduler,
  onOpenContact,
  onOpenKeynote,
  onOpenWhitePaper,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Paradigm', href: '#paradigm' },
    { label: 'Offerings', href: '#offerings' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Leadership', href: '#leadership' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(10, 15, 29, 0.96)' : 'rgba(10, 15, 29, 0.98)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '12px 0',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div 
              style={{ 
                height: '34px', 
                width: '34px', 
                borderRadius: '8px', 
                backgroundColor: '#0D9488', 
                border: '1px solid #14B8A6',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'monospace', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                CONTINUUM <span style={{ color: '#2DD4BF' }}>DX</span>
              </span>
              <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8' }}>
                Enterprise AI Advisory
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ 
                  fontSize: '13px', 
                  fontWeight: 500, 
                  color: '#CBD5E1', 
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => {
                if (onOpenWhitePaper) onOpenWhitePaper();
                else {
                  const el = document.getElementById('methodology');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                fontFamily: 'monospace',
                color: '#CBD5E1',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '0 12px',
                height: '34px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              2026 White Paper
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenScheduler) onOpenScheduler();
                else if (onOpenDiagnostic) onOpenDiagnostic();
                else if (onOpenContact) onOpenContact();
                else {
                  const el = document.getElementById('diagnostic') || document.getElementById('diagnostic-tool');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#FFFFFF',
                backgroundColor: '#0D9488',
                border: '1px solid #14B8A6',
                padding: '0 14px',
                height: '34px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Advisory Diagnostic &rarr;
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;