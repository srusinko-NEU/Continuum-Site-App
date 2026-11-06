import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, Sparkles, Building2, Zap, Clock } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOffering?: string;
  preselectedService?: { title: string } | null;
  initialNotes?: string;
  partnerContext?: string;
}

const normalizeOffering = (input?: string): string => {
  if (!input) return 'AI CoE Project Diagnostic (2–3 Weeks Intensive)';
  const lower = input.toLowerCase();
  if (lower.includes('audit') || lower.includes('diagnostic')) {
    return 'AI CoE Project Diagnostic (2–3 Weeks Intensive)';
  }
  if (lower.includes('operations') || lower.includes('prompt') || lower.includes('governance')) {
    return 'AI Operations & Prompt Governance (6–8 Weeks Engagement)';
  }
  if (lower.includes('composable') || lower.includes('edge') || lower.includes('architecture') || lower.includes('gateway')) {
    return 'Composable Web & Edge Architecture (8–12 Weeks Engagement)';
  }
  if (lower.includes('coe') || lower.includes('enablement') || lower.includes('scaling') || lower.includes('retainer')) {
    return 'Federated CoE Scaling & BU Enablement (Continuous / Quarterly Retainer)';
  }
  return input;
};

const PLATFORMS = [
  'Sitecore (XM Cloud / XP)',
  'Optimizely (DXP / CMP / Graph)',
  'Salesforce (Data Cloud / Agentforce)',
  'Adobe (AEM / Workfront / Firefly)',
  'Netlify (Composable Edge / Functions)',
  'Contentful (Content Graph / Headless)',
  'Microsoft (Azure OpenAI / Semantic Kernel)',
  'Google (Vertex AI / Gemini Enterprise)',
  'Multi-Stack / Composable Hybrid'
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  preselectedOffering,
  preselectedService,
  initialNotes,
  partnerContext
}) => {
  const targetOffering = normalizeOffering(preselectedOffering || preselectedService?.title);

  const initialPlatform = (() => {
    if (partnerContext) {
      const match = PLATFORMS.find((p) => p.toLowerCase().includes(partnerContext.toLowerCase()));
      if (match) return match;
    }
    if (preselectedOffering) {
      const match = PLATFORMS.find((p) => preselectedOffering.toLowerCase().includes(p.split(' ')[0].toLowerCase()));
      if (match) return match;
    }
    return 'Sitecore (XM Cloud / XP)';
  })();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    activeDxStack: initialPlatform,
    annualSpend: '$100k - $500k',
    primaryBottleneck: 'Governance & Composable Integration',
    selectedOffering: targetOffering,
    timeline: 'Immediate (Next 30–60 Days)',
    notes: initialNotes || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    confirmationId: string;
    directMailtoUri: string;
    platform: string;
  } | null>(null);

  // Synchronize internal state whenever modal opens or preselected params change
  useEffect(() => {
    if (isOpen) {
      const activeOffering = normalizeOffering(preselectedOffering || preselectedService?.title);
      let activePlatform = 'Sitecore (XM Cloud / XP)';
      if (partnerContext) {
        const found = PLATFORMS.find((p) => p.toLowerCase().includes(partnerContext.toLowerCase()));
        if (found) activePlatform = found;
      } else if (preselectedOffering) {
        const found = PLATFORMS.find((p) => preselectedOffering.toLowerCase().includes(p.split(' ')[0].toLowerCase()));
        if (found) activePlatform = found;
      }

      setFormState((prev) => ({
        ...prev,
        selectedOffering: activeOffering,
        activeDxStack: activePlatform,
        notes: initialNotes || prev.notes || ''
      }));
      setSubmittedData(null);
    }
  }, [isOpen, preselectedOffering, preselectedService, partnerContext, initialNotes]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          platform: formState.activeDxStack,
          selectedOffering: formState.selectedOffering,
          annualSpend: formState.annualSpend,
          primaryBottleneck: formState.primaryBottleneck,
          timeline: formState.timeline,
          notes: formState.notes,
          source: partnerContext ? `NASCAR Partner Hook: ${partnerContext}` : 'Diagnostic Modal'
        })
      });

      const data = await response.json();
      
      // Save locally
      localStorage.setItem('continuum_lead_email', formState.email);
      localStorage.setItem('continuum_lead_org', formState.company);
      localStorage.setItem('continuum_lead_platform', formState.activeDxStack);

      setSubmittedData({
        confirmationId: data.confirmationId || `CDX-${Date.now().toString(36).toUpperCase()}`,
        directMailtoUri: data.directMailtoUri || `mailto:sean@continuum-dx.com?cc=srusinko@gmail.com&subject=Architecture Diagnostic: ${encodeURIComponent(formState.activeDxStack)}&body=Name: ${encodeURIComponent(formState.name)}%0AEmail: ${encodeURIComponent(formState.email)}%0ACompany: ${encodeURIComponent(formState.company)}`,
        platform: formState.activeDxStack
      });
    } catch (err) {
      console.warn('[Continuum DX] API dispatch warning, generating direct client mailto link:', err);
      // Fallback direct mailto construction
      const fallbackSubject = encodeURIComponent(`[Continuum DX Audit Hook] ${formState.activeDxStack} - ${formState.company || formState.email}`);
      const fallbackBody = encodeURIComponent(
        `Executive Architecture Diagnostic Request\n\nName: ${formState.name}\nEmail: ${formState.email}\nOrganization: ${formState.company}\nPlatform: ${formState.activeDxStack}\nScope: ${formState.selectedOffering}\nBottleneck: ${formState.primaryBottleneck}\nSpend: ${formState.annualSpend}\nTimeline: ${formState.timeline}\nNotes: ${formState.notes}\n\nForwarded to: sean@continuum-dx.com | cc: srusinko@gmail.com`
      );
      setSubmittedData({
        confirmationId: `CDX-${Date.now().toString(36).toUpperCase()}`,
        directMailtoUri: `mailto:sean@continuum-dx.com?cc=srusinko@gmail.com&subject=${fallbackSubject}&body=${fallbackBody}`,
        platform: formState.activeDxStack
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStandardOption = [
    'AI CoE Project Diagnostic (2–3 Weeks Intensive)',
    'AI Operations & Prompt Governance (6–8 Weeks Engagement)',
    'Composable Web & Edge Architecture (8–12 Weeks Engagement)',
    'Federated CoE Scaling & BU Enablement (Continuous / Quarterly Retainer)'
  ].includes(formState.selectedOffering);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-xl p-6 sm:p-8 bg-[#F7F6F3] rounded-3xl border border-[#E2E5E0] shadow-2xl my-8 text-[#151B17]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-xs font-mono font-semibold text-[#697A6F] hover:text-[#151B17] px-2.5 py-1 rounded-lg bg-[#EAECE9] hover:bg-[#D0D4CD] transition-colors cursor-pointer"
        >
          ✕ CLOSE
        </button>

        {submittedData ? (
          <div className="py-8 text-center space-y-5 animate-in fade-in duration-200">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8F1EC] text-[#2D6A4F] border border-[#2D6A4F]/30 shadow-2xs mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#E8F1EC] text-[#2D6A4F] border border-[#2D6A4F]/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Executive Diagnostic Received</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#151B17]">
                Architecture Diagnostic Request Submitted
              </h3>
              <p className="text-xs text-[#697A6F] font-mono mt-1">
                Reference ID: <span className="font-semibold text-[#B85233]">{submittedData.confirmationId}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2E5E0] text-left text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-[#E2E5E0]/60 pb-2">
                <span className="text-[#697A6F]">Target Ecosystem:</span>
                <span className="font-semibold text-[#151B17]">{submittedData.platform}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E2E5E0]/60 pb-2">
                <span className="text-[#697A6F]">Executive Advisor:</span>
                <span className="font-semibold text-[#B85233]">Sean Rusinko (Founder &amp; Managing Director)</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E2E5E0]/60 pb-2">
                <span className="text-[#697A6F]">Inbound Engagement:</span>
                <span className="font-semibold text-[#455249]">Confidential Executive Review</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#697A6F]">Typical Executive SLA:</span>
                <span className="font-semibold text-[#2D6A4F]">&lt; 4 Hours Response</span>
              </div>
            </div>

            {/* Direct Confirmation / Mail Client Launcher */}
            <div className="space-y-2 pt-2">
              <a
                href={submittedData.directMailtoUri}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#B85233] hover:bg-[#9E4429] shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Open Diagnostic Briefing in Mail Client</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#455249] hover:text-[#151B17] bg-[#EAECE9] hover:bg-[#D0D4CD] transition-colors cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#EAECE9] text-[#364339] border border-[#D0D4CD] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#364339]" />
                <span>Enterprise Architecture Diagnostic · Executive Intake</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#151B17]">
                Request an Architecture Diagnostic
              </h3>
              <p className="text-xs text-[#455249] mt-1">
                Direct advisory intake with Sean Rusinko, 6x MVP. Scoped for enterprise CDOs, CIOs, CTOs, and platform practice leads.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                    Corporate Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs"
                    placeholder="jdoe@enterprise.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                    Organization / Domain
                  </label>
                  <input
                    required
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs"
                    placeholder="Global Health / Industrial Corp"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                    Target Ecosystem Platform
                  </label>
                  <select
                    value={formState.activeDxStack}
                    onChange={(e) => setFormState({ ...formState, activeDxStack: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs font-medium"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                  Target Advisory Scope
                </label>
                <select
                  value={formState.selectedOffering}
                  onChange={(e) => setFormState({ ...formState, selectedOffering: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs font-medium"
                >
                  <option value="AI CoE Project Diagnostic (2–3 Weeks Intensive)">AI CoE Project Diagnostic (2–3 Weeks Intensive)</option>
                  <option value="AI Operations & Prompt Governance (6–8 Weeks Engagement)">AI Operations & Prompt Governance (6–8 Weeks Engagement)</option>
                  <option value="Composable Web & Edge Architecture (8–12 Weeks Engagement)">Composable Web & Edge Architecture (8–12 Weeks Engagement)</option>
                  <option value="Federated CoE Scaling & BU Enablement (Continuous / Quarterly Retainer)">Federated CoE Scaling & BU Enablement (Continuous / Quarterly Retainer)</option>
                  {!isStandardOption && (
                    <option value={formState.selectedOffering}>{formState.selectedOffering}</option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                    Est. Annual AI / Cloud Spend
                  </label>
                  <select
                    value={formState.annualSpend}
                    onChange={(e) => setFormState({ ...formState, annualSpend: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs"
                  >
                    <option>&lt; $100k</option>
                    <option>$100k - $500k</option>
                    <option>$500k - $2M</option>
                    <option>$2M - $5M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                    Primary Operational Bottleneck
                  </label>
                  <select
                    value={formState.primaryBottleneck}
                    onChange={(e) => setFormState({ ...formState, primaryBottleneck: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs"
                  >
                    <option>Governance & Compliance</option>
                    <option>Legacy Monolith Drag / Replatforming</option>
                    <option>Shadow AI & Wrapper Proliferation</option>
                    <option>Unpredictable Token/Inference Cost</option>
                    <option>Lack of Production P&L ROI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#455249] mb-1 font-medium">
                  Architecture Notes &amp; Current Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E2E5E0] text-[#151B17] placeholder-[#697A6F] focus:outline-none focus:border-[#B85233] focus:ring-1 focus:ring-[#B85233] shadow-2xs"
                  placeholder="e.g. Planning XM Cloud migration or agentic customer self-service workflows in Q3..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#B85233] hover:bg-[#9E4429] shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? (
                    <span>Submitting Diagnostic Request...</span>
                  ) : (
                    <>
                      <span>Schedule Architecture Diagnostic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-center text-[#697A6F] font-mono">
                Enterprise-grade NDA &amp; confidentiality guaranteed · Response within 4 hours
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
