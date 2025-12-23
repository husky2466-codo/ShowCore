// Market Analytics Types

// Skill types in the AV industry
export type Skill =
  | "Audio/Sound"
  | "Lighting"
  | "Video"
  | "LED Wall"
  | "Rigging";

// Technician tier levels
export type Tier =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Pro"
  | "Master";

// Geographic regions/markets
export type Region =
  | "Los Angeles"
  | "New York"
  | "Nashville"
  | "Austin"
  | "Miami";

// Event type categories
export type EventType =
  | "Concert/Festival"
  | "Corporate"
  | "Theatre"
  | "Broadcast"
  | "Wedding";

// AI insight types
export type InsightType =
  | "prediction"
  | "recommendation"
  | "demand-forecast";

// AI insight categories
export type InsightCategory =
  | "rate-forecast"
  | "skill-certification"
  | "skill-demand"
  | "regional-opportunity"
  | "seasonal-trend"
  | "personal-positioning";

// Alert severity levels
export type AlertSeverity =
  | "info"
  | "success"
  | "warning"
  | "error";

// Alert types
export type AlertType =
  | "rate-increase"
  | "skill-demand"
  | "personal-benchmark"
  | "achievement";

// Trend direction
export type TrendDirection =
  | "up"
  | "down"
  | "stable";

// Demand levels
export type DemandLevel =
  | "Low"
  | "Medium"
  | "High";

// Chart types available in dashboard
export type ChartType =
  | "line-trend"
  | "bar-comparison"
  | "distribution";

// Subscription tiers
export type SubscriptionTier =
  | "Free"
  | "Basic"
  | "Pro"
  | "Enterprise";

// Market Overview Interfaces
export interface AverageMarketRate {
  overall: number;
  bySkill: Record<Skill, number>;
  byTier: Record<Tier, number>;
}

export interface TrendingSkill {
  skill: Skill;
  currentAvgRate: number;
  percentageChange: number;
  period: string;
  trend: TrendDirection;
}

export interface RegionalInsight {
  region: Region;
  averageRate: number;
  topSkill: Skill;
  demandLevel: DemandLevel;
  percentageChange: number;
}

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
}

export interface MarketOverview {
  averageMarketRate: AverageMarketRate;
  trendingSkills: TrendingSkill[];
  regionalInsights: RegionalInsight[];
  alerts: Alert[];
}

// Rate Data Interfaces
export interface RateDataPoint {
  id: string;
  skill: Skill;
  tier: Tier;
  region: Region;
  eventType: EventType;
  period: string; // YYYY-MM format
  averageRate: number;
  minRate: number;
  maxRate: number;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  sampleSize: number;
}

// Named Event Interfaces
export interface EventRateData {
  averageRate: number;
  minRate: number;
  maxRate: number;
  topSkills: Skill[];
  technicianCount: number;
}

export interface NamedEvent {
  id: string;
  name: string;
  year: number;
  location: string;
  eventType: EventType;
  dates: string;
  rateData: EventRateData;
}

// Personal Benchmark Interfaces
export interface HistoricalRate {
  period: string; // YYYY-MM format
  averageRate: number;
  bookingCount: number;
  marketAverage: number;
}

export interface PerformanceMetrics {
  averageVsMarket: number; // percentage difference
  trend: TrendDirection;
  totalBookingsLast12Months: number;
  averageRating: number;
}

export interface PersonalAlert {
  id: string;
  message: string;
  type: "benchmark" | "achievement" | "recommendation";
  timestamp: string;
}

export interface PersonalBenchmark {
  userId: string;
  userName: string;
  primarySkill: Skill;
  tier: Tier;
  region: Region;
  historicalRates: HistoricalRate[];
  performanceMetrics: PerformanceMetrics;
  personalAlerts: PersonalAlert[];
}

// AI Insight Interfaces
export interface ProjectedDataPoint {
  period: string; // YYYY-MM format
  projectedRate: number;
  confidenceLow: number;
  confidenceHigh: number;
}

export interface PotentialIncrease {
  percentage: number;
  estimatedRateIncrease?: number;
  currentAverage?: number;
  projectedAverage?: number;
  region?: Region;
  eventType?: EventType;
  skill?: Skill;
}

export interface AIInsight {
  id: string;
  type: InsightType;
  category: InsightCategory;
  title: string;
  message: string;
  confidence: number; // 0-100
  timeframe?: string;
  projectedData?: ProjectedDataPoint[];
  potentialIncrease?: PotentialIncrease;
  affectedSkills?: Skill[];
  affectedRegions?: Region[];
  demandIncrease?: number;
  historicalBasis?: string;
  actionable?: boolean;
  personalizedFor?: string;
  suggestedAction?: string;
  timestamp: string;
}

// Saved Layout Interfaces
export interface DateRange {
  start: string; // YYYY-MM-DD format
  end: string; // YYYY-MM-DD format
}

export interface LayoutFilters {
  skills: Skill[];
  tiers: Tier[];
  regions: Region[];
  eventTypes: EventType[];
  dateRange: DateRange;
}

export interface ChartConfiguration {
  visibleCharts: ChartType[];
  primaryChart: ChartType;
  showPersonalBenchmark: boolean;
  showPredictions: boolean;
}

export interface SavedLayout {
  id: string;
  name: string;
  userId: string;
  filters: LayoutFilters;
  chartConfiguration: ChartConfiguration;
  createdAt: string;
  lastModified: string;
  isDefault: boolean;
}

// Archive Access Interface
export interface ArchiveAccess {
  isEnabled: boolean;
  requiredTier: SubscriptionTier;
  currentUserTier: SubscriptionTier;
  availableRange: {
    start: string; // YYYY-MM-DD format
    end: string; // YYYY-MM-DD format
  };
  upgradePrompt: string;
}

// Meta Information Interface
export interface MetaInfo {
  description: string;
  entities: Record<string, string>;
  relationships: Record<string, string>;
  generatedAt: string;
  dataVersion: string;
}

// Main Data Interface
export interface MarketAnalyticsData {
  _meta: MetaInfo;
  marketOverview: MarketOverview;
  rateDataPoints: RateDataPoint[];
  namedEvents: NamedEvent[];
  personalBenchmark: PersonalBenchmark;
  aiInsights: AIInsight[];
  savedLayouts: SavedLayout[];
  archiveAccess: ArchiveAccess;
}

// Props Interface for Market Analytics Component
export interface MarketAnalyticsProps {
  data: MarketAnalyticsData;

  // Filter callbacks
  onFilterChange?: (filters: LayoutFilters) => void;
  onDateRangeChange?: (dateRange: DateRange) => void;

  // Layout callbacks
  onSaveLayout?: (layout: Omit<SavedLayout, "id" | "createdAt" | "lastModified">) => void;
  onLoadLayout?: (layoutId: string) => void;
  onDeleteLayout?: (layoutId: string) => void;
  onSetDefaultLayout?: (layoutId: string) => void;

  // Chart callbacks
  onChartTypeChange?: (chartType: ChartType) => void;
  onTogglePersonalBenchmark?: (show: boolean) => void;
  onTogglePredictions?: (show: boolean) => void;

  // Event comparison callbacks
  onCompareEvents?: (eventIds: string[]) => void;
  onSelectNamedEvent?: (eventId: string) => void;

  // Archive access callback
  onRequestArchiveAccess?: () => void;

  // Alert callbacks
  onDismissAlert?: (alertId: string) => void;

  // Insight callbacks
  onViewInsightDetails?: (insightId: string) => void;
  onDismissInsight?: (insightId: string) => void;

  // Export callbacks (future)
  onExportData?: (format: "csv" | "pdf") => void;
}
