import { DXMMStage, MaturityTransitionStep, AssessmentQuestion, ServiceModule, OverlayInitiative } from '../types';

export const DXMM_STAGES: DXMMStage[] = [
  {
    stage: 1,
    name: 'Fragmented',
    focus: 'Ad-Hoc Prompts & Shadow AI Sprawl',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    execution:
      'Uncoordinated experimentation across disparate public models (ChatGPT, Claude, Midjourney). Zero corporate prompt libraries, style embeddings, or factual data grounding. Teams operate in silos with severe IP and client data exposure.',
    contentVelocity:
      'Manual authoring with disjointed consumer AI experiments; high copy drift.',
    riskProfile:
      'High — Enterprise data leakage into public LLMs; unvetted SaaS license sprawl.',
    governanceMaturity:
      'Unregulated / Shadow AI: No centralized acceptable use policies, prompt audit logging, or enterprise security controls.',
    typicalSymptoms: [
      'Marketing teams pasting confidential customer research and roadmaps into unmonitored consumer AI accounts',
      'The "Pilot Trap": Multiple business units running redundant copy-generation tests with zero shared ROI',
      'Fragmented vendor contracts across disparate divisions without enterprise volume licensing'
    ],
    keyActions: [
      'Conduct rapid shadow AI audit; deploy unified AI gateway',
      'Institute corporate Responsible AI acceptable use and data boundary policies',
      'Audit tool sprawl to deflect redundant point-solution software spend and consolidate licenses'
    ]
  },
  {
    stage: 2,
    name: 'Governed',
    focus: 'Project-Overlay CoE & Beachhead Guardrails',
    badgeColor: 'bg-sky-950 text-sky-400 border-sky-800/50',
    execution:
      'Applying the 70/20/10 transformation principle directly onto a funded anchor initiative (e.g., Sitecore XM Cloud replatforming, Contentful migration, or portal redesign). Enterprise prompt registry piloted with approved brand-voice templates and deterministic human-in-the-loop review gates.',
    contentVelocity:
      '+50% velocity boost on a single anchor initiative; human-in-the-loop review gates.',
    riskProfile:
      'Moderate — Contained within beachhead project; basic token logging and PII redaction.',
    governanceMaturity:
      'Formative Beachhead: Project-embedded CoE establishes foundational standards and taxonomy in-flight during active delivery.',
    typicalSymptoms: [
      'First flagship digital property adopting structured prompt chains for campaign and web content',
      'Central taxonomy draft emerging from active digital asset management (DAM) and PIM integrations',
      'Content authors, brand stewards, and legal leads actively collaborating on prompt review criteria'
    ],
    keyActions: [
      'Formulate enterprise prompt registry; connect DAM/PIM asset metadata',
      'Attach CoE governance directly to an active, budgeted capital project to eliminate standalone budget delays',
      'Establish mandatory human editorial validation gates for all public-facing and regulated digital assets'
    ]
  },
  {
    stage: 3,
    name: 'Composable',
    focus: 'Automated Control Plane & Connected Operations',
    badgeColor: 'bg-indigo-950 text-indigo-400 border-indigo-800/50',
    execution:
      'Unified Composable Web Architecture connects enterprise DAM (Bynder, Aprimo) and PIM (Salsify) into headless DXP authoring (Sitecore, Contentful, Optimizely, Adobe). Automated editorial QA guardrails verify brand voice, legal compliance, and factual grounding in real time before publishing.',
    contentVelocity:
      '+150% throughput; automated brand voice scoring and instant branch preview environments.',
    riskProfile:
      'Low — Policy guardrails enforced programmatically via API middleware.',
    governanceMaturity:
      'Tooling-Enforced: Guardrails integrated directly into CMS publishing workflows and collaborative branch preview environments.',
    typicalSymptoms: [
      'Authors receive instant brand-compliance scoring and factuality verification directly inside the CMS interface',
      'Product content dynamically pulled via composable connectors and localized via structured agentic pipelines',
      'Cross-functional teams use shareable branch preview environments for legal and executive sign-off'
    ],
    keyActions: [
      'Roll out authoring upskilling curricula; establish multi-brand design system connectors',
      'Deploy composable content connectors uniting DAM, PIM, and headless CMS with zero backend lock-in',
      'Implement real-time factual grounding against authoritative enterprise knowledge stores and vector databases'
    ]
  },
  {
    stage: 4,
    name: 'Federated',
    focus: 'Hub-and-Spoke CoE Saturation & Multi-BU Enablement',
    badgeColor: 'bg-purple-950 text-purple-400 border-purple-800/50',
    execution:
      'The CoE operates as an Orchestration Engine: The central team publishes certified "CoE in a Box" blueprints, shared component libraries, and Responsible AI guardrails. Regional business units, international subsidiaries, and product lines execute with agility and autonomy.',
    contentVelocity:
      '+300% throughput across all business units; localized variants generated autonomously.',
    riskProfile:
      'Controlled — Centralized telemetry tracking prompt drift and BU token consumption.',
    governanceMaturity:
      'Federated: Central CoE establishes control planes while embedded stewards execute locally in each business division.',
    typicalSymptoms: [
      'Regional subsidiaries utilize the same AI control plane with localized language adaptations and regulatory checks',
      'Unified enterprise design system components with embedded AI generation triggers deployed via global edge CDN',
      'Enterprise reinvention metrics: Standardized reporting on pipeline ROI, cycle time reduction, and talent adoption'
    ],
    keyActions: [
      'Deploy "CoE in a Box" blueprints; certify regional domain stewards',
      'Publish internal CoE certified blueprints for rapid regional business unit onboarding',
      'Form cross-functional AI steering committee with legal, infosec, product, and marketing executive leads'
    ]
  },
  {
    stage: 5,
    name: 'Autonomous',
    focus: 'Agentic Edge Mesh & 1-to-1 Real-Time Orchestration',
    badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800/50',
    execution:
      'Dynamic, agentic personalization synthesized in real-time at the edge based on live CDP signals and visitor intent (<100ms latency). Multi-model arbitration dynamically routes between OpenAI, Anthropic, Gemini, or open weights for cost/latency optimization with self-healing deterministic safety fallbacks.',
    contentVelocity:
      'Continuous real-time synthesis at the global CDN edge (<100ms latency).',
    riskProfile:
      'Zero-latency deterministic fallbacks; continuous automated audit logging.',
    governanceMaturity:
      'Autonomous Control Plane: Real-time telemetry, model arbitration, and dynamic cost optimization.',
    typicalSymptoms: [
      'Real-time hyper-personalization running at the edge without origin latency penalty across global portals',
      'Self-optimizing conversion experiments running continuously across multiple global digital properties',
      'Adaptive change management: Closed-loop telemetry automatically updating prompt registries and employee playbooks'
    ],
    keyActions: [
      'Multi-model arbitration (OpenAI, Anthropic, Gemini); adaptive telemetry',
      'Deploy autonomous agentic orchestrators with deterministic safety fallbacks at the edge layer',
      'Maintain continuous automated audit trails for executive board compliance and regulatory reporting'
    ]
  }
];

export const MATURITY_TRANSITIONS: MaturityTransitionStep[] = [
  {
    id: 'fragmented_to_governed',
    fromStage: 1,
    toStage: 2,
    fromName: 'Fragmented',
    toName: 'Governed',
    title: 'Beachhead Overlay & Shadow AI Deflection',
    duration: 'Weeks 1–6 (Phase 1)',
    coreObjective:
      'Eliminate shadow AI liability and bypass standalone budget gridlock by embedding governance directly into an active, funded digital initiative.',
    prerequisites: [
      'Active funded anchor project (e.g. Sitecore XM Cloud / Contentful / Adobe AEM replatforming or web redesign)',
      'Executive sponsorship from CMO, CDO, or VP of Digital',
      'Rapid audit of unmonitored consumer tool accounts and duplicate SaaS subscriptions'
    ],
    operationalMilestones: [
      'Enact corporate Responsible AI Acceptable Use Policy and IP boundary rules',
      'Embed cross-functional overlay CoE resources (senior strategist, prompt architect, compliance steward) into delivery sprints',
      'Codify the initial enterprise Prompt Registry for campaign, web, and product copy authoring',
      'Institute mandatory human-in-the-loop review criteria and approval gates prior to production deployment'
    ],
    technicalArchitectureGates: [
      'Deploy Enterprise AI Gateway with automated Data Loss Prevention (PII redaction) and centralized token audit logging',
      'Map draft enterprise taxonomy linking DAM (Bynder, Aprimo) and PIM (Salsify) metadata to authoring fields'
    ],
    businessValueUnlocked:
      'Deflects $200k–$500k in duplicate SaaS spend; erects immediate corporate IP protections; accelerates initial beachhead authoring velocity by +50%.',
    whitePaperChapterId: 'five_stages'
  },
  {
    id: 'governed_to_composable',
    fromStage: 2,
    toStage: 3,
    fromName: 'Governed',
    toName: 'Composable',
    title: 'Automated Control Plane & Connected Operations',
    duration: 'Months 2–4 (Phase 2)',
    coreObjective:
      'Graduate from manual review bottlenecks on a single pilot to automated, tooling-enforced guardrails across a decoupled Composable Web Platform.',
    prerequisites: [
      'Verified productivity and quality gains from the beachhead initiative',
      'Architectural commitment to API-first headless CMS/DXP (Sitecore, Contentful, Optimizely, Adobe AEM)',
      'Centralized asset repositories in modern DAM and PIM'
    ],
    operationalMilestones: [
      'Implement real-time brand voice adherence, toxicity scoring, and factuality grounding directly inside CMS authoring workflows',
      'Establish collaborative branch preview environments for instantaneous legal, brand, and executive sign-off',
      'Roll out role redesign workshops and structured prompt engineering curricula for regional digital authors'
    ],
    technicalArchitectureGates: [
      'Deploy composable API connectors linking headless CMS with DAM/PIM and CRM/CDP data stores',
      'Stand up Semantic Vector Layer & Knowledge Grounding Mesh for deterministic factual retrieval',
      'Configure edge middleware functions for dynamic content localization and routing'
    ],
    businessValueUnlocked:
      '+150% authoring throughput; cuts compliance sign-off from weeks to hours; eliminates ungrounded hallucinations at the data ingestion layer.',
    whitePaperChapterId: 'architecture_blueprint'
  },
  {
    id: 'composable_to_federated',
    fromStage: 3,
    toStage: 4,
    fromName: 'Composable',
    toName: 'Federated',
    title: 'Hub-and-Spoke CoE Saturation & Multi-BU Enablement',
    duration: 'Months 4–8 (Phase 3)',
    coreObjective:
      'Shift the CoE from a centralized operational bottleneck into an Orchestration Engine that empowers autonomous, agile execution across all business units.',
    prerequisites: [
      'Proven stability of the composable control plane and API connectors',
      'Multi-brand design system with embedded AI component triggers',
      'Cross-functional AI Steering Committee charter with infosec, legal, and BU heads'
    ],
    operationalMilestones: [
      'Package turnkey "CoE in a Box" blueprints containing certified prompt templates, governance runbooks, and SLA benchmarks for rapid BU onboarding',
      'Train and certify embedded domain stewards in each regional marketing, product line, and global subsidiary',
      'Establish centralized observability telemetry tracking pipeline ROI, prompt drift, token efficiency, and BU adoption velocity'
    ],
    technicalArchitectureGates: [
      'Expand edge middleware to automate multi-region localization, international compliance (GDPR, EU AI Act), and currency/tax adaptors',
      'Unify enterprise multi-brand design system components with embedded AI generation triggers deployed via global edge CDN'
    ],
    businessValueUnlocked:
      '+300% content throughput across global units; enables rapid multi-region campaign agility with zero headcount linear scaling.',
    whitePaperChapterId: 'execution_roadmap'
  },
  {
    id: 'federated_to_autonomous',
    fromStage: 4,
    toStage: 5,
    fromName: 'Federated',
    toName: 'Autonomous',
    title: 'Agentic Edge Mesh & 1-to-1 Real-Time Orchestration',
    duration: 'Months 8–12+ (Phase 4)',
    coreObjective:
      'Evolve from scheduled, human-initiated batch campaigns to real-time, agentic digital experience synthesis orchestrated at the global CDN edge.',
    prerequisites: [
      'Real-time Customer Data Platform (CDP) capturing live visitor behavioral telemetry',
      'Multi-model arbitration layer with established cost and latency SLAs',
      'Automated closed-loop observability with zero-latency safety fallback triggers'
    ],
    operationalMilestones: [
      'Deploy autonomous agentic orchestrators capable of dynamic experience synthesis based on real-time visitor intent in sub-100ms',
      'Continuous automated drift detection and self-healing safety fallbacks (instant failover to canonical verified assets on risk signals)',
      'Adaptive change management: closed-loop telemetry automatically optimizes prompt registries and role workflows'
    ],
    technicalArchitectureGates: [
      'Multi-Model Router dynamically arbitrating between OpenAI, Anthropic, Gemini, and open weights for sub-100ms latency and cost optimization',
      'Edge cache mesh delivering personalized variants at sub-second speeds with 99.99% availability regardless of backend origin load'
    ],
    businessValueUnlocked:
      'Continuous 1-to-1 personalization at scale; cuts martech infrastructure maintenance costs by 50%; achieves 420%+ modeled 3-year transformation ROI.',
    whitePaperChapterId: 'five_stages'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'operating_model',
    category: 'CoE Operating Model & Change Enablement',
    title: 'How is digital transformation and AI capability enablement structured across your organization?',
    description:
      'Evaluates organizational alignment: whether AI is trapped in an isolated ivory tower, running wild in unvetted silos, or organized as an agile hub-and-spoke federated CoE.',
    options: [
      {
        stage: 1,
        score: 20,
        label: 'Stage 1: Fragmented Silos / Shadow AI',
        subtext: 'Multiple business units operate independently; isolated tools without cross-functional standards or sharing.'
      },
      {
        stage: 2,
        score: 40,
        label: 'Stage 2: Governed Beachhead Overlay',
        subtext: 'Advisors embedded directly into an active, funded initiative to establish governance and change in-flight.'
      },
      {
        stage: 3,
        score: 60,
        label: 'Stage 3: Composable Operations',
        subtext: 'Dedicated cross-functional CoE operating tooling-enforced guardrails and automated CMS content pipelines.'
      },
      {
        stage: 4,
        score: 80,
        label: 'Stage 4: Federated Hub-and-Spoke',
        subtext: 'Central CoE sets guardrails and blueprints; trained BU stewards execute locally with high agility.'
      },
      {
        stage: 5,
        score: 100,
        label: 'Stage 5: Autonomous Adaptive Mesh',
        subtext: 'Continuous talent upskilling, automated agentic workflows, and closed-loop telemetry feedback across all platforms.'
      }
    ]
  },
  {
    id: 'content_generation',
    category: 'Content Operations & Workflow Rewiring',
    title: 'How does your organization currently utilize AI for content creation and digital assets?',
    description: 'Assesses the transition from manual, isolated drafting to governed agentic generation pipelines.',
    options: [
      {
        stage: 1,
        score: 20,
        label: 'Stage 1: Ad-Hoc Copy/Paste Prompts',
        subtext: 'Authors use personal ChatGPT/Claude accounts to draft text or images without coordination.'
      },
      {
        stage: 2,
        score: 40,
        label: 'Stage 2: Governed Beachhead Workflows',
        subtext: 'A designated digital team is testing AI on a high-profile web or campaign initiative with structured prompts.'
      },
      {
        stage: 3,
        score: 60,
        label: 'Stage 3: Composable DXP Pipelines',
        subtext: 'AI generation is hooked directly into CMS/DAM with automated editorial verification and brand scoring.'
      },
      {
        stage: 4,
        score: 80,
        label: 'Stage 4: Federated Cross-BU Scaling',
        subtext: 'Multiple divisions share certified prompt templates and automated multi-channel variants.'
      },
      {
        stage: 5,
        score: 100,
        label: 'Stage 5: Autonomous 1-to-1 Orchestration',
        subtext: 'Content dynamically generates and personalizes in real-time based on live user intent signals at the edge.'
      }
    ]
  },
  {
    id: 'governance_risk',
    category: 'Governance & Responsible AI by Design',
    title: 'What guardrails, privacy controls, and prompt policies are enforced across teams?',
    description: 'Evaluates enterprise risk mitigation, IP protection, data privacy safeguards, and compliance observability.',
    options: [
      {
        stage: 1,
        score: 20,
        label: 'Stage 1: Unregulated / Shadow AI',
        subtext: 'Zero formal policies; teams might unknowingly expose proprietary IP, customer PII, or trade secrets.'
      },
      {
        stage: 2,
        score: 40,
        label: 'Stage 2: Governed Project Sandboxes',
        subtext: 'Draft guidelines exist for the beachhead initiative, but compliance is checked manually.'
      },
      {
        stage: 3,
        score: 60,
        label: 'Stage 3: Composable Real-Time Guardrails',
        subtext: 'Automated checks for brand voice, hallucinations, PII leakage, and factual accuracy directly in the workflow.'
      },
      {
        stage: 4,
        score: 80,
        label: 'Stage 4: Federated Compliance Audits',
        subtext: 'Central CoE monitors enterprise-wide prompt logs, model access, and compliance dashboards across all BUs.'
      },
      {
        stage: 5,
        score: 100,
        label: 'Stage 5: Autonomous Self-Healing Fallbacks',
        subtext: 'Automated model arbitration instantly fails over to canonical safe assets on risk signals.'
      }
    ]
  },
  {
    id: 'data_taxonomy',
    category: 'Data & Taxonomy Integration',
    title: 'How integrated are your enterprise knowledge stores (DAM, PIM, CRM, CDP) with AI tools?',
    description: 'Measures data hygiene, structured metadata, and factual grounding capability.',
    options: [
      {
        stage: 1,
        score: 20,
        label: 'Stage 1: Disconnected Silos & Drift',
        subtext: 'Product and asset data reside in disconnected repositories with zero AI grounding.'
      },
      {
        stage: 2,
        score: 40,
        label: 'Stage 2: Governed Beachhead Taxonomy',
        subtext: 'Anchor initiative is categorizing key digital assets to feed standardized prompt contexts.'
      },
      {
        stage: 3,
        score: 60,
        label: 'Stage 3: Composable API Connectors',
        subtext: 'DAM/PIM systems automatically enrich prompt contexts with verified product specs via APIs.'
      },
      {
        stage: 4,
        score: 80,
        label: 'Stage 4: Federated Semantic Layer',
        subtext: 'Vector embeddings and graph taxonomies provide consistent grounding across all BUs.'
      },
      {
        stage: 5,
        score: 100,
        label: 'Stage 5: Autonomous Bidirectional Sync',
        subtext: 'AI workflows update product metadata and behavioral intelligence continuously at runtime.'
      }
    ]
  },
  {
    id: 'architecture_stack',
    category: 'Composable Web Platform & Edge Architecture',
    title: 'What architectural model underpins your digital experience platform (DXP) and AI layer?',
    description:
      'Analyzes adoption of modern Composable Web Architecture: decoupling frontends from backend monoliths (Sitecore, Adobe, Optimizely, Contentful), edge execution, and unified connectors.',
    options: [
      {
        stage: 1,
        score: 20,
        label: 'Stage 1: Monolithic Suite Bottlenecks',
        subtext: 'Legacy all-in-one suite with massive infrastructure overhead, slow builds, and severe upgrade bottlenecks.'
      },
      {
        stage: 2,
        score: 40,
        label: 'Stage 2: Governed Headless Pilot',
        subtext: 'Headless pilot running on an active initiative while legacy cores remain untouched.'
      },
      {
        stage: 3,
        score: 60,
        label: 'Stage 3: Composable Web Platform',
        subtext: 'Modern API-first DXP, headless CMS, and dedicated AI gateway routing model requests.'
      },
      {
        stage: 4,
        score: 80,
        label: 'Stage 4: Federated Multi-Brand Infrastructure',
        subtext: 'Unified orchestration layer with composable connectors, edge functions, and zero DevOps maintenance drag.'
      },
      {
        stage: 5,
        score: 100,
        label: 'Stage 5: Autonomous Agentic Edge Mesh',
        subtext: 'Sub-second edge personalization with multi-model routing, global CDN caching, and 99.99% reliability.'
      }
    ]
  }
];

export const SERVICE_MODULES: ServiceModule[] = [
  {
    id: 'diagnostic',
    number: '01',
    category: 'Diagnostic & Benchmark',
    title: 'AI CoE Project Diagnostic',
    duration: '2–3 Weeks Intensive',
    description:
      'An intensive executive audit overlaid directly onto an active, budgeted initiative. We benchmark the 70/20/10 operational split across your team, assess your organization against the 5-stage AI DXMM (from Fragmented to Autonomous), expose shadow AI risk, eliminate duplicate SaaS spend, and chart an actionable 90-day beachhead roadmap.',
    targetAudience: 'Chief Digital Officers, VPs of Marketing Tech, Enterprise Architects',
    keyDeliverables: [
      'Comprehensive AI DXMM Maturity Scorecard & Gap Analysis',
      'Active Project Risk & Hallucination Exposure Audit',
      '90-Day Tactical Beachhead Roadmap & Quick-Win Plan',
      'Executive Board Presentation & Resource Allocation Matrix'
    ],
    businessImpact:
      'Prevents costly tech stack overlaps and identifies $200k–$800k in duplicate vendor licenses while securing corporate IP and establishing immediate governance.'
  },
  {
    id: 'governance',
    number: '02',
    category: 'Governance & Operating Model',
    title: 'AI Operations & Responsible CoE Governance',
    duration: '6–8 Weeks Engagement',
    description:
      'Design and deploy a centralized control plane for enterprise AI asset creation, taxonomy alignment, policy enforcement, and brand-safe agentic content workflows across Sitecore, Contentful, Optimizely, Adobe, and Salesforce ecosystems.',
    targetAudience: 'Content Operations Directors, Brand Directors, Infosec & Legal Stewards',
    keyDeliverables: [
      'Enterprise Prompt Registry & Brand Voice Embedding Standards',
      'Automated Editorial QA Guardrail Rules (Toxicity, Hallucination, PII)',
      'Human-in-the-Loop Approval Workflows for CMS/DXP Systems',
      'Legal & Compliance Audit Trails and Observability Dashboards'
    ],
    businessImpact:
      'Reduces content review cycles by 65% while guaranteeing 100% brand guideline adherence across distributed global teams.'
  },
  {
    id: 'architecture',
    number: '03',
    category: 'Architecture & Edge Orchestration',
    title: 'Composable Web Platform & Edge Architecture',
    duration: '8–12 Weeks Engagement',
    description:
      'Modernize enterprise web delivery into a high-performance Composable Web Architecture: decouple frontends from heavy legacy backends, deploy unified content connectors across DAM/PIM/CMS, and execute AI personalization at the edge with sub-second performance and zero DevOps overhead.',
    targetAudience: 'Enterprise Architects, Chief Technology Officers, Digital Engineering VPs',
    keyDeliverables: [
      'Target-State Composable AI Control Plane Architecture Blueprint',
      'DAM & PIM Semantic Taxonomy & Vector Ingestion Pipelines',
      'Multi-Model Gateway Routing Matrix (Latency, Quality, Cost)',
      'Headless CMS & Edge Delivery Integration Schemas'
    ],
    businessImpact:
      'Eliminates monolithic vendor lock-in, cuts infrastructure maintenance overhead by 50%, and increases digital asset reuse across enterprise business units by up to 340%.'
  },
  {
    id: 'enablement',
    number: '04',
    category: 'Change Management & Scaling',
    title: 'Federated CoE Scaling & Change Enablement',
    duration: 'Continuous / Quarterly Sprints',
    description:
      'Package proven beachhead workflows into reusable "CoE in a Box" blueprints, training modules, and shared component libraries. Follows an Orchestration Engine pattern to upskill middle management and expand digital maturity across business units without linear headcount growth.',
    targetAudience: 'Business Unit General Managers, Regional Digital Leads, CoE Directors',
    keyDeliverables: [
      'Turnkey "CoE in a Box" Playbooks for New BU Onboarding',
      'Certified Prompt Engineering & Agentic Workflow Curricula',
      'Shared UI Component Library with Embedded AI Triggers',
      'Executive Value Realization & ROI Reporting Scorecards'
    ],
    businessImpact:
      'Accelerates subsequent business unit onboarding from 9 months down to 4 weeks with zero incremental CoE overhead.'
  }
];

export const OVERLAY_INITIATIVES: OverlayInitiative[] = [
  {
    id: 'dxp_modernization',
    title: 'Enterprise DXP Modernization or Migration',
    fundedSponsor: 'VP of Digital Marketing / Customer Experience',
    typicalBudget: '$750k – $2.5M (Funded Capital Program)',
    beachheadGoal:
      'Replatform core corporate site from legacy monolith to a Composable Web Platform (Sitecore XM Cloud, Contentful, Optimizely, Adobe AEM, or headless edge orchestration).',
    embeddedCoEGovernance: [
      'Embed AI prompt governance into the new authoring workflow',
      'Standardize digital asset taxonomy across DAM and CMS during content migration',
      'Establish human-in-the-loop review criteria before launch'
    ],
    crossBUSaturationOutcome:
      'The newly created taxonomy and prompt repository become the permanent standard for all regional divisions.',
    deflectedRisk:
      'Prevents 12+ months of content freeze and avoids carrying unstructured legacy content debt into modern architecture.'
  },
  {
    id: 'portal_redesign',
    title: 'Global Customer or Partner Portal Redesign',
    fundedSponsor: 'Chief Commercial Officer / VP Operations',
    typicalBudget: '$500k – $1.8M (Active Commercial Priority)',
    beachheadGoal:
      'Consolidate 3 fragmented customer portals into a unified self-service digital experience on a composable frontend stack (Salesforce Experience Cloud, Contentful, Sitecore).',
    embeddedCoEGovernance: [
      'Integrate PIM/CRM data pipelines for dynamic product specification lookups',
      'Deploy agentic assistance guardrails for account self-service content',
      'Audit customer data access boundaries to safeguard private account telemetry'
    ],
    crossBUSaturationOutcome:
      'Self-service governance blueprints are reused across employee intranet and supplier portals.',
    deflectedRisk:
      'Eliminates customer frustration from outdated PDF documentation and stops unauthorized automated answers.'
  },
  {
    id: 'martech_consolidation',
    title: 'Global MarTech & DAM/PIM Stack Consolidation',
    fundedSponsor: 'Chief Information Officer / Head of Enterprise Tech',
    typicalBudget: '$1.0M – $3.5M (Efficiency Mandate)',
    beachheadGoal:
      'Retire 7 redundant regional asset repositories into a single enterprise DAM (Bynder/Aprimo) and central product information store (Salsify) with composable connectors.',
    embeddedCoEGovernance: [
      'Define enterprise-wide semantic vector schema for all rich media and marketing copy',
      'Build automated multi-language translation and localization agentic pipeline',
      'Institute automated metadata quality scoring at ingestion'
    ],
    crossBUSaturationOutcome:
      'Adjacent product marketing teams gain instant, search-grounded access to verified assets in 24 languages.',
    deflectedRisk:
      'Saves $450k+ in redundant annual vendor SaaS licenses and halts unauthorized brand asset modifications.'
  },
  {
    id: 'commerce_launch',
    title: 'Omnichannel B2B/B2C Commerce Transformation',
    fundedSponsor: 'EVP E-Commerce / Chief Digital Revenue Officer',
    typicalBudget: '$1.2M – $4.0M (Revenue Growth Vehicle)',
    beachheadGoal:
      'Launch headless commerce engine to support direct-to-enterprise ordering with dynamic pricing, custom catalog views, and edge personalization.',
    embeddedCoEGovernance: [
      'Automate dynamic product description generation grounded strictly in ERP/PIM specs',
      'Deploy real-time contextual search ranking with hallucination firewalls',
      'Standardize compliance checking for regulated product claims'
    ],
    crossBUSaturationOutcome:
      'Commerce generation workflows serve as template for rapid international storefront expansions.',
    deflectedRisk:
      'Prevents costly regulatory fines from hallucinated technical specifications in legally regulated markets.'
  }
];

export const FOUNDER_BIO = {
  name: 'Sean Rusinko',
  title: 'Founder & Managing Director',
  firm: 'Continuum DX Advisory',
  parentEntity: 'SMR Holdings LLC',
  email: 'sean@continuum-dx.com',
  altEmail: 'srusinko@gmail.com',
  domain: 'continuum-dx.com',
  summary:
    'Sean Rusinko is a veteran enterprise digital transformation executive with over 17 years at the intersection of Digital Experience Platforms (DXP), Composable Web Architecture, and Go-To-Market strategy. Having led global optimization strategies at Sitecore, executive consulting at Verndale, and enterprise solution leadership across Progress Software and Salsify, Sean has architected digital experience playbooks and multi-million dollar transformation programs for Global 2000 enterprises across Sitecore, Contentful, Optimizely, Adobe, and Salesforce ecosystems.',
  narrativeParagraphs: [
    'Throughout his career, Sean has bridged the gap between executive business strategy and composable technical execution. As Global Director of Sitecore Business Optimization Strategies (SBOS), he pioneered enterprise personalization and digital maturity frameworks adopted by hundreds of Fortune 500 brands worldwide.',
    'As Senior Vice President of Strategy at Verndale, Sean built 0-to-1 digital advisory practices, guiding enterprise clients through complex CMS replatforming, headless architecture transitions, and omnichannel commerce transformations across Sitecore, Optimizely, and modern composable stacks.',
    'Today at Continuum DX Advisory, Sean leads the modern AI DXMM (Digital Experience Maturity Model) and the Project-Overlay CoE model—embedding senior digital strategists directly into active, funded initiatives to establish enterprise AI governance, agentic workflows, and unified control planes without bureaucratic delay.'
  ],
  careerHighlights: [
    {
      role: 'Founder & Managing Director',
      company: 'Continuum DX Advisory (SMR Holdings LLC)',
      period: '2024 – Present',
      description:
        'Pioneering the modern AI DXMM framework and project-overlay delivery model for enterprise AI content operations, change enablement, and composable web architecture.'
    },
    {
      role: 'Global Director, Business Optimization Strategies (SBOS)',
      company: 'Sitecore',
      period: 'Executive Leadership',
      description:
        'Led global digital optimization and maturity frameworks, educating executive leadership teams on driving measurable ROI from dynamic personalization.'
    },
    {
      role: 'Senior Vice President of Strategy',
      company: 'Verndale',
      period: 'Executive Leadership',
      description:
        'Built and scaled enterprise digital strategy, analytics, and marketing technology consulting practices from the ground up.'
    },
    {
      role: 'Enterprise Product & Solutions Leadership',
      company: 'Progress Software & Salsify',
      period: 'Prior Leadership',
      description:
        'Drove Gartner Magic Quadrant validation, analyst relations, and ecosystem go-to-market strategies across enterprise CMS and commerce syndication.'
    }
  ],
  stats: [
    { value: '17+', label: 'Years in Enterprise DXP & MarTech' },
    { value: '0-to-1', label: 'Consulting Practice Building' },
    { value: 'Gartner MQ', label: 'Analyst Relations & Validation' },
    { value: '$100M+', label: 'Digital Initiatives Advised' }
  ],
  firms: [
    { name: 'Sitecore', role: 'Global Director, SBOS' },
    { name: 'Progress Software', role: 'Product & Solutions' },
    { name: 'Salsify', role: 'Commerce Ecosystems' },
    { name: 'Verndale', role: 'SVP of Strategy' }
  ]
};

export const LEADERSHIP_CREDENTIALS = FOUNDER_BIO;
