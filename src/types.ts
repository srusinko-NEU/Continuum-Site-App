export type DXMMStageNumber = 1 | 2 | 3 | 4 | 5;

export interface DXMMStage {
  stage: DXMMStageNumber;
  name: string;
  focus: string;
  badgeColor: string;
  execution: string;
  contentVelocity: string;
  riskProfile: string;
  governanceMaturity: string;
  typicalSymptoms: string[];
  keyActions: string[];
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  title: string;
  description: string;
  options: {
    stage: DXMMStageNumber;
    score: number;
    label: string;
    subtext: string;
  }[];
}

export interface AssessmentResult {
  overallStage: DXMMStageNumber;
  scorePercentage: number;
  stageName: string;
  categoryScores: Record<string, number>;
  executiveSummary: string;
  topPriorities: string[];
  recommendedEngagement: string;
}

export interface ServiceModule {
  id: string;
  number: string;
  category: string;
  title: string;
  duration: string;
  description: string;
  targetAudience: string;
  keyDeliverables: string[];
  businessImpact: string;
}

export interface MaturityTransitionStep {
  id: string;
  fromStage: DXMMStageNumber;
  toStage: DXMMStageNumber;
  fromName: string;
  toName: string;
  title: string;
  duration: string;
  coreObjective: string;
  prerequisites: string[];
  operationalMilestones: string[];
  technicalArchitectureGates: string[];
  businessValueUnlocked: string;
  whitePaperChapterId?: string;
}

export interface OverlayInitiative {
  id: string;
  title: string;
  fundedSponsor: string;
  typicalBudget: string;
  beachheadGoal: string;
  embeddedCoEGovernance: string[];
  crossBUSaturationOutcome: string;
  deflectedRisk: string;
}
