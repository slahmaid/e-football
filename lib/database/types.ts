export type SourceLink = {
  label: string;
  url: string;
};

export type DatabaseBase = {
  slug: string;
  name: string;
  summary: string;
  updated: string;
  tags: string[];
  sources: SourceLink[];
  relatedArticleSlugs: string[];
};

export type PlayerPosition =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "DMF"
  | "CMF"
  | "AMF"
  | "LMF"
  | "RMF"
  | "LWF"
  | "RWF"
  | "SS"
  | "CF";

export type PlayerTier = "S" | "A" | "B" | "C";

export type Player = DatabaseBase & {
  position: PlayerPosition;
  role: string;
  tier: PlayerTier;
  ratings: {
    attacking: number;
    defending: number;
    physical: number;
    technical: number;
  };
  playstyles: string[];
  bestFormations: string[];
  budgetGp: "free" | "low" | "mid" | "high";
  pros: string[];
  cons: string[];
  verdict: string;
};

export type Formation = DatabaseBase & {
  shape: string;
  buildUp: string;
  defense: string;
  strengths: string[];
  weaknesses: string[];
  counters: string[];
  suggestedPlaystyles: string[];
};

export type Playstyle = DatabaseBase & {
  managerHint: string;
  inPossession: string;
  outOfPossession: string;
  idealFormations: string[];
  tips: string[];
};

export type EventPriority = "must-do" | "situational" | "skip";

export type GameEvent = DatabaseBase & {
  start?: string;
  end?: string;
  type: "campaign" | "pack" | "mode" | "matchpass";
  priority: EventPriority;
  rewardsSummary: string;
};

export type UpdateEntry = DatabaseBase & {
  version?: string;
  type: "version" | "mode" | "balance" | "feature";
  highlights: string[];
};
