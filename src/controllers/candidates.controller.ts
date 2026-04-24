
import { candidateService } from "../services/candidate.service.js"
import { bulkCreateCandidatesSchema } from "../validators/bulk.schema.js"
import { candidateStageSchema } from "../validators/stage.schema.js"

export const candidateController = {
    bulkCreate: async (c: any) => {
        const body = await c.req.json()

        const parsed =
            bulkCreateCandidatesSchema.parse(body)

        const result =
            await candidateService.bulkCreate(parsed)

        return c.json(result)
    },
    updateStage: async (c: any) => {
        const body = await c.req.json()
        const id = c.req.param("id") || body?.id

        const { stage } =
            candidateStageSchema.parse(body)

        if (!id) {
            return c.json({ error: "Candidate id is required" }, 400)
        }

        const candidate =
            await candidateService.updateStage(id, stage)

        return c.json(candidate)
    },

    getCandidates: async (c: any) => {
        const query = c.req.query()

        const candidates =
            await candidateService.getCandidates(query)

        return c.json(candidates)
    },

    getByJob: async (c: any) => {
        const jobId = c.req.param("jobId")

        const candidates =
            await candidateService.getByJob(jobId)

        return c.json(candidates)
    },



    getOne: async (c: any) => {
        const id = c.req.param("id")

        const candidate =
            await candidateService.getOne(id)

        return c.json(candidate)
    }
}
