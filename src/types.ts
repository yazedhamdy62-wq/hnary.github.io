export type ViewMode = 'customer' | 'admin';

export type CustomerTab = 
  | 'home'
  | 'calculator'
  | 'ai-analyzer'
  | 'compare'
  | 'booking'
  | 'knowledge';

export type AdminTab =
  | 'dashboard'
  | 'crm'
  | 'consultations'
  | 'analytics';

export interface CalculatorInputs {
  age: number;
  gender: 'male' | 'female';
  isSmoker: boolean;
  healthCondition: 'excellent' | 'good' | 'average' | 'chronic';
  monthlyIncome: number;
  coverageAmount: number;
  termYears: number;
  includeCriticalIllness: boolean;
  includeDisability: boolean;
  includeAccidentalDeath: boolean;
}

export interface CalculatorOutputs {
  basicMonthlyPremium: number;
  standardMonthlyPremium: number;
  premiumPlusMonthlyPremium: number;
  yearlySavings: number;
  recommendedPackage: 'basic' | 'standard' | 'premiumPlus';
  breakdown: {
    baseRate: number;
    ageMultiplier: number;
    smokerMultiplier: number;
    healthMultiplier: number;
    ridersCost: number;
  };
}

export interface Policy {
  id: string;
  companyName: string;
  companyLogo: string; // Icon identifier or accent color
  policyName: string;
  type: 'term' | 'whole' | 'investment';
  typeNameAr: string;
  monthlyPremium: number;
  coverageAmount: number;
  minimumAge: number;
  maximumAge: number;
  keyBenefits: string[];
  medicalExamRequired: boolean;
  rating: number; // 1-5
  cashValueGrowth: boolean;
  flexiblePayments: boolean;
  popularBadge?: string;
  riderAddons: string[];
}

export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatarUrl: string;
  hourlyRate: number; // 0 if free consultation
  isFreeInitial: boolean;
  availableDays: string[];
  languages: string[];
  bio: string;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  consultantId: string;
  consultantName: string;
  date: string;
  timeSlot: string;
  callType: 'video' | 'audio' | 'in-person';
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  createdAt: string;
}

export interface CRMClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  status: 'جديد' | 'تم التحديث' | 'تم الجلسة' | 'تم إصدار البوليصة' | 'متابعة';
  assignedConsultant: string;
  requestedCoverage: number;
  preferredPolicyType: string;
  lastContactDate: string;
  notes: string;
  potentialRevenue: number;
}

export interface AIAnalysisRequest {
  age: number;
  maritalStatus: string;
  dependentsCount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebts: number;
  financialGoals: string;
  healthStatus: string;
  occupationRisk: string;
}

export interface AIAnalysisResponse {
  recommendedCoverage: number;
  recommendedMonthlyPremium: number;
  recommendedPlanType: string;
  recommendedDurationYears: number;
  summaryText: string;
  keyReasons: string[];
  suggestedRiders: string[];
  financialTip: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  icon: string;
  publishedDate: string;
  featured?: boolean;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  conversionRate: number;
  totalConsultationsBooked: number;
  totalPoliciesIssued: number;
  totalCommissionEarned: number;
  mostRequestedPackage: string;
}
