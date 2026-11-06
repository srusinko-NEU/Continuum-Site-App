export interface WorkInActionItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Keynotes & Speaking' | 'War Rooms & Sprints' | 'Digital Operations & Summits';
  image: string;
  venue: string;
  location: string;
  tags: string[];
  caption: string;
  detailedContext: string;
  corePrinciple: string;
  highlightMetric: string;
  featured?: boolean;
}

export const WORK_IN_ACTION_ITEMS: WorkInActionItem[] = [
  {
    id: 'continuum-ai-governance-keynote',
    title: 'AI Governance & DX CoE Transformation',
    subtitle: 'Enterprise Operating Model, Agentic Automation & Value Realization',
    category: 'Keynotes & Speaking',
    image: '/assets/aistudio/Generated_Image_October_26__2026_-_10_16AM_9edf250c.jpg',
    venue: 'Enterprise Keynote Stage',
    location: 'Executive Summit',
    tags: ['Continuum DX', 'AI Governance', 'DX CoE', 'Autonomous Workflows'],
    caption: 'Sean presenting the Continuum-DX Advisory framework: AI Governance & Risk, DX Center of Excellence, Autonomous Workflows, and Value Realization.',
    detailedContext: 'Keynote delivery breaking down the operational framework for transitioning from speculative AI pilots to governed balance-sheet assets. Sean demonstrates how the federated CoE overlay model embeds guardrails and telemetry directly into active digital experience platforms.',
    corePrinciple: 'Federated CoE Overlay & Scalable AI Control Plane',
    highlightMetric: 'Zero committee delays with institutionalized CoE governance',
    featured: true
  },
  {
    id: 'sitecore-cortex-microsoft',
    title: 'Sitecore Cortex: Machine Learning for Marketers',
    subtitle: 'Algorithmic Personalization & Predictive Content Scoring',
    category: 'Keynotes & Speaking',
    image: '/assets/aistudio/Screenshot_2026-10-21_183318_466cc4c9.png',
    venue: 'Microsoft Executive Briefing Center',
    location: 'Chicago, IL',
    tags: ['Sitecore Cortex', 'Microsoft', 'Machine Learning', 'Content Intelligence'],
    caption: 'Sean presenting the Sitecore Cortex ML architecture, demonstrating how automated segment discovery and algorithmic scoring replace manual guesswork.',
    detailedContext: 'Keynote session exploring the convergence of machine learning and enterprise content operations. Sean dissected how predictive customer intelligence and automated behavioral clustering empower marketing teams to deliver contextual experiences at scale while maintaining strict governance guardrails.',
    corePrinciple: 'Algorithmic Personalization & Predictive Intent',
    highlightMetric: 'Pioneered early enterprise ML architectures across Fortune 500 DXP programs',
    featured: true
  },
  {
    id: 'atlantis-the-palm-keynote',
    title: 'Context Marketing at World Scale: Atlantis The Palm Keynote',
    subtitle: 'Customer Journey Orchestration for Flagship Luxury Hospitality',
    category: 'Keynotes & Speaking',
    image: '/assets/aistudio/IMG_3144_934d3f5e.JPG',
    venue: 'Atlantis The Palm Executive Auditorium',
    location: 'Dubai, UAE',
    tags: ['Atlantis The Palm', 'Context Marketing', 'Luxury Hospitality', 'Keynote'],
    caption: 'Sean on stage presenting "Context Marketing: Customer Cases", analyzing digital transformation across world-scale hospitality (1,539 rooms, 65k marine animals).',
    detailedContext: 'Keynote delivery analyzing the multi-touchpoint customer journey across one of the world’s most renowned destination resorts. Sean detailed how behavioral triggers, dynamic packaging, and unified DXP profiles drove high-margin direct booking conversion.',
    corePrinciple: 'Context Marketing & Dynamic Personalization',
    highlightMetric: '1,539 luxury suites & 65,000 marine attractions unified into one DXP experience',
    featured: true
  },
  {
    id: 'visit-dubai-command-center',
    title: 'Visit Dubai: Global Real-Time Operations Command Center',
    subtitle: 'Global Real-Time Digital Operations & Multi-Market Telemetry',
    category: 'Digital Operations & Summits',
    image: '/assets/aistudio/IMG_1461_050d34f4.JPG',
    venue: 'Department of Economy and Tourism (Visit Dubai)',
    location: 'Dubai, UAE',
    tags: ['Visit Dubai', 'Command Center', 'Global Campaigns', 'Real-Time Telemetry'],
    caption: 'Inside the live digital operations and social command center monitoring international tourism engagement, dynamic multilingual assets, and audience sentiment.',
    detailedContext: 'Strategic review of live operations command center powering Visit Dubai across dozens of international feeder markets. Demonstrating how centralized telemetry and brand governance can coexist with rapid, decentralized content syndication.',
    corePrinciple: 'Centralized Control Plane with Federated Velocity',
    highlightMetric: 'Real-time campaign telemetry across 30+ international feeder markets',
    featured: true
  },
  {
    id: 'stadium-journey-war-room',
    title: 'Benfica Stadium Customer Journey War Room',
    subtitle: 'Full-Scale Experience Mapping & Omnichannel Touchpoint Blueprint',
    category: 'War Rooms & Sprints',
    image: '/assets/aistudio/IMG_3145_02e9353b.JPG',
    venue: 'VIP Executive Suite (Sport Lisboa e Benfica)',
    location: 'Estádio da Luz, Lisbon, Portugal',
    tags: ['SL Benfica', 'Estádio da Luz', 'Journey Mapping', 'War Room', 'Experience Architecture'],
    caption: 'Glass-wall customer journey mapping and contextual marketing architecture inside the VIP suite overlooking the pitch at Estádio da Luz (Benfica Football Club, Lisbon).',
    detailedContext: 'Immersive executive war room session overlooking the pitch at Estádio da Luz, home of Sport Lisboa e Benfica in Lisbon, Portugal. Multi-disciplinary teams mapped each step of the customer acquisition and retention lifecycle onto glass walls, aligning DXP workflows, CRM handoffs, and commerce triggers to eliminate conversion friction.',
    corePrinciple: 'Human-Centered Journey Architecture',
    highlightMetric: 'Unified 14 disparate touchpoints into a single governed customer lifecycle',
    featured: true
  },
  {
    id: 'nrf-nxt-summit',
    title: "NRF NXT: Retail's Digital Deep Dive",
    subtitle: 'Executive Leadership & Headless Commerce Strategy',
    category: 'Digital Operations & Summits',
    image: '/assets/aistudio/IMG_2432_6d4e58b0.jpg',
    venue: 'NRF NXT Executive Summit (Sitecore Leadership)',
    location: 'Austin, TX',
    tags: ['NRF NXT', 'Sitecore', 'Omnichannel Retail', 'Executive Advisory'],
    caption: 'Sean Rusinko on-site at the National Retail Federation (NRF NXT) executive forum, co-sponsoring strategy sessions with Sitecore leadership.',
    detailedContext: 'Engaging C-suite and VP retail leaders on navigating headless commerce migrations, unifying customer lifetime value models, and dismantling disconnected legacy e-commerce stacks.',
    corePrinciple: 'Omnichannel Commerce & Unified Architecture',
    highlightMetric: 'Advising retail executive sponsors on digital platform modernization'
  },
  {
    id: 'segmentation-masterclass-stage',
    title: 'Audience Prioritization & Behavioral Segmentation Masterclass',
    subtitle: 'Operationalizing "Planning - Step 2: Prioritizing High-Value Segments"',
    category: 'Keynotes & Speaking',
    image: '/assets/aistudio/Screenshot_2026-10-21_182611_b1ebeaeb.png',
    venue: 'International DX Summit Stage',
    location: 'Executive Stage',
    tags: ['Audience Segmentation', 'Behavioral Modeling', 'Masterclass', 'DXP Strategy'],
    caption: 'Masterclass stage session instructing enterprise architects and digital leaders on structured audience prioritization matrices.',
    detailedContext: 'Practical breakdown of the SBOS (Sitecore Business Optimization Strategies) methodology. Sean showed leaders how to transition from generic demographic personas to real-time behavioral intent rules that trigger personalized high-converting content paths.',
    corePrinciple: 'Behavioral Intent over Static Personas',
    highlightMetric: 'Trained hundreds of enterprise practitioners on dynamic segmentation models'
  },
  {
    id: 'coe-alignment-stadium-sprint',
    title: 'Benfica Stadium Executive Alignment Sprint',
    subtitle: 'Operationalizing the 70/20/10 Principle & Eliminating Silos',
    category: 'War Rooms & Sprints',
    image: '/assets/aistudio/IMG_1109_bf12ff61.jpg',
    venue: 'Executive Strategy Suite (Sport Lisboa e Benfica)',
    location: 'Estádio da Luz, Lisbon, Portugal',
    tags: ['SL Benfica', 'Estádio da Luz', 'Operating Model', '70/20/10 Rule', 'Federated CoE'],
    caption: 'Cross-functional enterprise leaders collaborating inside the Benfica Football Club executive stadium suite overlooking the pitch in Lisbon to establish federated CoE governance.',
    detailedContext: 'Demonstrating the 70% People and Operating Model factor in action at Estádio da Luz (home of SL Benfica in Lisbon, Portugal). Sean facilitated an intensive alignment sprint with business unit leads, digital marketing, and enterprise IT to retire slow ivory-tower approval committees in favor of autonomous squad execution.',
    corePrinciple: '70% People & Operating Model Enablement',
    highlightMetric: 'Replaced 9-month committee backlogs with 4-week autonomous sprint cycles'
  },
  {
    id: 'enterprise-ideation-wall',
    title: 'Enterprise Roadmap & Agile Ideation Sprint',
    subtitle: 'High-Density Capability Backlog & 30-60-90 Day Execution Horizons',
    category: 'War Rooms & Sprints',
    image: '/assets/aistudio/IMG_3586_2f9a13f4.jpg',
    venue: 'Strategic Innovation Hub',
    location: 'Transformation War Room',
    tags: ['Agile Roadmap', 'Capability Mapping', 'DXP Backlog', 'Sprint Governance'],
    caption: 'High-density agile ideation wall prioritizing digital capability backlogs, MarTech connectors, and beachhead rollout milestones.',
    detailedContext: 'Collaborative agile roadmap session. Hundreds of client business requirements, legacy system constraints, and modernization opportunities synthesized into clear 30-60-90 day milestone horizons with measurable business unit ROI.',
    corePrinciple: 'Agile Capability Backlog over Rigid Multi-Year Plans',
    highlightMetric: 'Deconstructed complex multi-year replatforming into high-velocity release milestones'
  },
  {
    id: 'technexus-chicago-sitecore',
    title: 'Sitecore Chicago User Group at TechNexus',
    subtitle: 'Technical Community Leadership & Architecture Deep-Dive',
    category: 'Keynotes & Speaking',
    image: '/assets/aistudio/IMG_6836_eab8735d.JPG',
    venue: 'TechNexus Venture Collaborative',
    location: 'Chicago, IL',
    tags: ['TechNexus', 'Sitecore Community', 'Technical Architecture'],
    caption: 'Leading community engineering and solution architecture sessions at TechNexus, bridging enterprise DXP capabilities with agency practitioners.',
    detailedContext: 'Addressing enterprise developers, solution architects, and digital leaders at TechNexus Chicago on behalf of the Sitecore community. Sharing architectural best practices on multi-site scalability, composable integrations, and enterprise release governance.',
    corePrinciple: 'Practitioner Mentorship & Ecosystem Community',
    highlightMetric: 'Over 15 years cultivating enterprise developer and practitioner communities'
  },
  {
    id: 'conversion-funnel-villa-filter',
    title: 'High-Yield Conversion & Experimentation Architecture',
    subtitle: 'Mobile Enquiry, Villa Filtration & Luxury Booking Optimization',
    category: 'Digital Operations & Summits',
    image: '/assets/aistudio/IMG_2884_22e2694c.jpg',
    venue: 'Digital Commerce Strategy Suite',
    location: 'Optimization Lab',
    tags: ['Conversion Rate Optimization', 'A/B Testing', 'Funnel Engineering', 'Mobile UX'],
    caption: 'Architecting rapid experimentation funnels, mobile enquiry paths, and luxury villa filtration logic for high-ticket direct booking.',
    detailedContext: 'Tactical conversion rate optimization and A/B testing sprint. Sean and the optimization team mapped mobile booking friction points, inquiry forms, and luxury villa filters directly to CMS variants and CRM pipelines, substantially boosting direct booking conversion.',
    corePrinciple: 'Hypothesis-Driven Experimentation & CRO',
    highlightMetric: 'Direct double-digit conversion lift on high-ticket luxury booking journeys'
  },
  {
    id: 'executive-boardroom-governance',
    title: 'Executive Boardroom Strategy & Governance Steering',
    subtitle: 'C-Suite Alignment, Investment Gating & Program OKRs',
    category: 'Digital Operations & Summits',
    image: '/assets/aistudio/3c957194-ecd1-4d26-863d-2c3237c9ee0c_6d741ec6.jpg',
    venue: 'Corporate Executive Boardroom',
    location: 'Executive Briefing Suite',
    tags: ['Boardroom Governance', 'C-Suite Advisory', 'Investment Gating', 'Program OKRs'],
    caption: 'Facilitating C-suite alignment, investment gates, and program OKRs for digital experience replatforming.',
    detailedContext: 'Direct executive advisory steering session with senior sponsors. Establishing clear governance guardrails, budget allocation milestones, and risk-mitigation metrics for multi-million dollar digital transformations.',
    corePrinciple: 'Executive Gating & Value Realization',
    highlightMetric: 'Secured executive alignment and funding approval for complex DXP overhauls'
  },
  {
    id: 'stadium-enablement-workshop',
    title: 'Benfica Stadium Cross-Functional Digital Enablement Workshop',
    subtitle: 'Hands-On Capability Building & Cultural Adoption',
    category: 'War Rooms & Sprints',
    image: '/assets/aistudio/IMG_1103_245c3470.jpg',
    venue: 'Executive Conference Suite (Sport Lisboa e Benfica)',
    location: 'Estádio da Luz, Lisbon, Portugal',
    tags: ['SL Benfica', 'Estádio da Luz', 'Capability Building', 'Team Enablement', 'Culture Change'],
    caption: 'Working shoulder-to-shoulder with digital product owners, content authors, and IT leaders inside the executive suite overlooking Estádio da Luz (Benfica Football Club, Lisbon).',
    detailedContext: 'Field-level enablement session focused on sustainable adoption inside the executive suite at Estádio da Luz, home of Sport Lisboa e Benfica in Lisbon, Portugal. Sean guiding cross-functional teams through real-world governance scenarios, codifying repeatable content workflows, and building internal confidence to sustain operating velocity.',
    corePrinciple: 'Sustainable Internal Capability Transfer',
    highlightMetric: '90%+ long-term workflow adoption post-advisory engagement'
  }
];

export const WORK_IN_ACTION_CATEGORIES = [
  'All Engagements',
  'Keynotes & Speaking',
  'War Rooms & Sprints',
  'Digital Operations & Summits'
] as const;
