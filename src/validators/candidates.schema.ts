import { z } from "zod"

export const candidateInputSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),

    resumeUrl: z.string().url().optional(),
    resumeText: z.string().optional(),

    overallScore: z.number().min(0).max(100).optional(),
    skillsScore: z.number().min(0).max(100).optional(),
    experienceScore: z.number().min(0).max(100).optional(),
    jobFitScore: z.number().min(0).max(100).optional(),

    recommendation: z.enum([
        "REJECT",
        "CONSIDER",
        "SHORTLIST",
        "STRONG_SHORTLIST"
    ]).optional(),

    strengths: z.array(z.string()).optional(),
    weaknesses: z.array(z.string()).optional(),
    summary: z.string().optional(),

    coreSkills: z.any().optional(),
    experienceSummary: z.any().optional(),
    externalLinkAnalysis: z.any().optional(),
    overallAssessment: z.any().optional()
})