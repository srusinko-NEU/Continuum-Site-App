/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSpot25s } from './components/HeroSpot25s';
import { ParadigmShift } from './components/ParadigmShift';
import { Offerings } from './components/Offerings';
import { MethodologyTable } from './components/MethodologyTable';
import { DiagnosticTool } from './components/DiagnosticTool';
import { RoiEstimator } from './components/RoiEstimator';
import { DeliveryModel } from './components/DeliveryModel';
import { TechnologyBedrock } from './components/TechnologyBedrock';
import { ArchitectureSection } from './components/ArchitectureSection';
import { LeadershipSection } from './components/LeadershipSection';
import { CinematicKeynoteSection } from './components/CinematicKeynoteSection';
import { TechnologyNascar } from './components/TechnologyNascar';
import { WorkInActionGallery } from './components/WorkInActionGallery';
import { ClientTestimonials } from './components/ClientTestimonials';
import { Footer } from './components/Footer';
import { DiagnosticModal } from './components/DiagnosticModal';
import { WhitePaperModal } from './components/WhitePaperModal';
import { LasVegasKeynoteModal } from './components/LasVegasKeynoteModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<string>('90-Day AI Architecture & Governance Audit');
  const [selectedPartnerContext, setSelectedPartnerContext] = useState<string | undefined>(undefined);
  const [whitePaperOpen, setWhitePaperOpen] = useState(false);
  const [whitePaperChapterId, setWhitePaperChapterId] = useState<string | undefined>(undefined);
  const [keynoteModalOpen, setKeynoteModalOpen] = useState(false);

  const [customBioText, setCustomBioText] = useState<string | undefined>(() => {
    return localStorage.getItem('continuum_founder_bio') || undefined;
  });

  const handleScrollToDiagnostic = () => {
    const el = document.getElementById('diagnostic-tool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToModel = () => {
    const el = document.getElementById('delivery-model');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDiagnosticModal = (offeringTitle?: string) => {
    if (offeringTitle) {
      setSelectedOffering(offeringTitle);
    }
    setSelectedPartnerContext(undefined);
    setIsModalOpen(true);
  };

  const handleOpenPartnerAudit = (partnerName?: string, auditScope?: string) => {
    if (partnerName) {
      setSelectedPartnerContext(partnerName);
      setSelectedOffering(auditScope || `${partnerName} Architecture Diagnostic & CoE Audit`);
    }
    setIsModalOpen(true);
  };

  const handleOpenWhitePaper = (chapterId?: string) => {
    if (chapterId) {
      setWhitePaperChapterId(chapterId);
    }
    setWhitePaperOpen(true);
  };

  const handleResetBio = () => {
    setCustomBioText(undefined);
    localStorage.removeItem('continuum_founder_bio');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#455249] flex flex-col font-sans selection:bg-[#B85233] selection:text-white">
      {/* 1-Row, 3-Zone Navigation */}
      <Navbar
        onOpenDiagnostic={handleScrollToDiagnostic}
        onOpenScheduler={() => handleOpenDiagnosticModal()}
        onOpenWhitePaper={() => handleOpenWhitePaper()}
        onOpenKeynote={() => setKeynoteModalOpen(true)}
      />

      <main className="flex-grow">
        {/* 25-Second Web Hero Video Spotlight ("HeroSpot25s") */}
        <HeroSpot25s
          onStartDiagnostic={() => handleOpenDiagnosticModal('90-Day AI Architecture & Governance Audit')}
          onExploreOfferings={() => {
            const el = document.getElementById('offerings');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreModel={handleScrollToModel}
          onOpenWhitePaper={() => handleOpenWhitePaper()}
          onOpenKeynote={() => setKeynoteModalOpen(true)}
        />

        {/* Technology NASCAR Logo Strip: 8 Ecosystem Alliances & Direct Email Hooks */}
        <TechnologyNascar
          onSelectPartner={handleOpenPartnerAudit}
        />

        {/* The Strategic Imperative: Traditional DXP vs Modern Composable CoE (Bento Grid) */}
        <ParadigmShift />

        {/* Structured Advisory Engagements (90-Day Audit, Control Plane Deployment, CoE Retainer) */}
        <Offerings
          onSelectOffering={(offeringTitle) => handleOpenDiagnosticModal(offeringTitle)}
        />

        {/* Proprietary Framework: The AI DXMM 5-Stage Maturity Model & 4-Step Transition Path */}
        <MethodologyTable
          onStartDiagnostic={handleScrollToDiagnostic}
          onOpenWhitePaper={handleOpenWhitePaper}
        />

        {/* Interactive Self-Benchmark Diagnostic Tool & Lead Gen Engine */}
        <DiagnosticTool
          onScheduleWithResult={(summary) => handleOpenDiagnosticModal(`AI DXMM Diagnostic: ${summary}`)}
          onOpenWhitePaper={() => handleOpenWhitePaper()}
        />

        {/* Interactive Enterprise ROI & Cost-Savings Calculator */}
        <RoiEstimator
          onScheduleWithEstimate={(summary) => handleOpenDiagnosticModal(`ROI Estimate: ${summary}`)}
        />

        {/* The Delivery Model: Project-Overlay & Cross-BU Saturation */}
        <DeliveryModel
          onScheduleDiagnostic={() => handleOpenDiagnosticModal('AI Control Plane Project-Overlay')}
        />

        {/* Ecosystem Authority: 8 Core Technology Alliances */}
        <TechnologyBedrock
          onScheduleDiagnostic={(partner) => {
            const clean = partner?.replace('Technology Bedrock: ', '');
            handleOpenPartnerAudit(clean);
          }}
        />

        {/* Target-State Composable AI Control Plane Architecture */}
        <ArchitectureSection />

        {/* Executive Keynote Video Series & Architectural Insights */}
        <CinematicKeynoteSection onScheduleBriefing={() => handleOpenDiagnosticModal('Advisory Briefing with Sean Rusinko')} />

        {/* Backed by 17+ Years of Enterprise DX Leadership */}
        <LeadershipSection
          onScheduleBriefing={() => handleOpenDiagnosticModal('Executive Briefing with Sean Rusinko')}
          customBioText={customBioText}
          onResetBio={handleResetBio}
        />

        {/* Advisory in Action: From Keynote Stages to Transformation War Rooms */}
        <WorkInActionGallery
          onScheduleBriefing={() => handleOpenDiagnosticModal('Keynote or Advisory Engagement Inquiry')}
        />

        {/* Enterprise Partner Testimonials & Executive Validation */}
        <ClientTestimonials />
      </main>

      {/* Decision CTA and Authoritative Legal Footer */}
      <Footer
        onOpenScheduler={() => handleOpenDiagnosticModal()}
        onOpenDiagnostic={handleScrollToDiagnostic}
        onOpenWhitePaper={() => handleOpenWhitePaper()}
      />

      {/* Executive Diagnostic Qualification Modal */}
      <DiagnosticModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPartnerContext(undefined);
        }}
        preselectedOffering={selectedOffering}
        partnerContext={selectedPartnerContext}
      />

      {/* Executive White Paper Modal ("From Fragmented to Autonomous") */}
      <WhitePaperModal
        isOpen={whitePaperOpen}
        onClose={() => setWhitePaperOpen(false)}
        onOpenScheduler={() => handleOpenDiagnosticModal('2026 Executive White Paper Briefing')}
        defaultChapterId={whitePaperChapterId}
        prefilledEmail={localStorage.getItem('continuum_lead_email') || undefined}
        prefilledOrg={localStorage.getItem('continuum_lead_org') || undefined}
      />

      {/* Executive Keynote Briefing Modal */}
      <LasVegasKeynoteModal
        isOpen={keynoteModalOpen}
        onClose={() => setKeynoteModalOpen(false)}
        onStartDiagnostic={() => {
          setKeynoteModalOpen(false);
          handleOpenDiagnosticModal('Executive Keynote Follow-Up: AI Control Plane');
        }}
      />
    </div>
  );
}
