import { jobService } from "../services/job.service.js"
import { createJobSchema } from "../validators/job.schema.js"


export const jobController = {
    getJobs: async (c: any) => {
        const jobs = await jobService.getJobs()

        return c.json(jobs)
    },

    getJob: async (c: any) => {
        const jobId = c.req.param("jobId")
        const job = await jobService.getJob(jobId)

        return c.json(job)
    },

    updateJobAutomationStatus: async (c: any) => {
        const jobId = c.req.param("jobId")
        const body = await c.req.json()

        const { automationStatus } = body

        const job =
            await jobService.updateJobAutomationStatus(jobId, automationStatus)

        return c.json(job)
    },
    createJob: async (c: any) => {
        const body = await c.req.json()

        const parsed = createJobSchema.parse(body)

        const job = await jobService.createJob(parsed)

        return c.json(job, 201)
    }

}
