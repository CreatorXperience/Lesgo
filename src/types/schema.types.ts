import { z } from "zod"
import { candidateInputSchema } from "../validators/candidates.schema.js"
import { bulkCreateCandidatesSchema } from "../validators/bulk.schema.js"
import { candidateStageSchema } from "../validators/stage.schema.js"
export type CandidateInput =

    z.infer<typeof candidateInputSchema>

export type BulkCreateCandidatesInput =
    z.infer<typeof bulkCreateCandidatesSchema>

export type CandidateStageInput =
    z.infer<typeof candidateStageSchema>
