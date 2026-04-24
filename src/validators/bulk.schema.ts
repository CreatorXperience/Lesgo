import { z } from "zod"
import { candidateInputSchema } from "./candidates.schema.js"
export const bulkCreateCandidatesSchema = z.object({
    jobId: z.string(),

    candidates: z.array(candidateInputSchema)
        .min(1)
        .max(100)
})
