export const candidateStages = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "OFFER",
  "HIRED",
  "REJECTED"
] as const

export const recommendationOptions = [
  "REJECT",
  "CONSIDER",
  "SHORTLIST",
  "STRONG_SHORTLIST"
] as const

export type CandidateStage = (typeof candidateStages)[number]
export type CandidateRecommendation = (typeof recommendationOptions)[number]

export interface Candidate {
  id: string
  name?: string
  email?: string
  phone?: string
  location?: string
  resumeUrl?: string
  overallScore?: number
  skillsScore?: number
  experienceScore?: number
  jobFitScore?: number
  recommendation?: CandidateRecommendation
  stage: CandidateStage
  strengths?: string[]
  weaknesses?: string[]
  summary?: string
  jobId: string
  createdAt: string
}

export interface CandidateFilters {
  stage: CandidateStage | "ALL"
  recommendation: CandidateRecommendation | "ALL"
  search: string
  sort: "overallScore" | "createdAt"
  order: "desc" | "asc"
  jobId: string
}
