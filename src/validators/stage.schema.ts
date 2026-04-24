import { z } from "zod"
export const candidateStageSchema = z.object({
    stage: z.enum([
        "APPLIED",
        "SHORTLISTED",
        "INTERVIEW",
        "OFFER",
        "HIRED",
        "REJECTED"
    ])
})