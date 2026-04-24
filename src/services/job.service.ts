
import * as prism from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import { BulkCreateCandidatesInput } from "../types/schema.types.js";
import { CreateJobInput } from '../validators/job.schema.js';
const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });


const prisma = new prism.PrismaClient({ adapter });

export const jobService = {
    getJobs: async () => {
        return prisma.job.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    },

    updateJobAutomationStatus: (jobId: string, automationStatus: boolean) =>
        prisma.job.update({
            where: { id: jobId },
            data: { automationStatus }
        }),

    getJob: async (jobId: string) => {
        return prisma.job.findUnique({
            where: {
                id: jobId
            }
        })
    },
    createJob: async (data: CreateJobInput) => {
        return prisma.job.create({
            data
        })
    }
}
