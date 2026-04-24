import * as prism from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import { BulkCreateCandidatesInput } from "../types/schema.types.js";
const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });


const prisma = new prism.PrismaClient({ adapter });

export const candidateService = {
    getCandidates: async (query: any) => {
        const {
            stage,
            recommendation,
            jobId,
            search,
            limit = "50",
            sort = "overallScore",
            order = "desc"
        } = query

        const allowedSortFields = new Set([
            "overallScore",
            "createdAt",
            "skillsScore",
            "experienceScore",
            "jobFitScore"
        ])

        const sortField = allowedSortFields.has(sort) ? sort : "overallScore"
        const sortOrder = order === "asc" ? "asc" : "desc"

        return prisma.candidate.findMany({
            where: {
                ...(stage && { stage }),
                ...(recommendation && { recommendation }),
                ...(jobId && { jobId }),
                ...(search && {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                        {
                            email: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                        {
                            location: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    ]
                })
            },
            orderBy: {
                [sortField]: sortOrder
            },
            take: Number(limit)
        })
    },

    getByJob: async (jobId: string) => {
        return prisma.candidate.findMany({
            where: {
                jobId
            },
            orderBy: {
                overallScore: "desc"
            }
        })
    },



    getOne: async (id: string) => {
        return prisma.candidate.findUnique({
            where: {
                id
            }
        })
    },

    updateStage: (id: string, stage: "APPLIED" | "SHORTLISTED" | "INTERVIEW" | "OFFER" | "HIRED" | "REJECTED") =>
        prisma.candidate.update({
            where: { id },
            data: { stage }
        }),

    bulkCreate: async (data: BulkCreateCandidatesInput) => {
        const { jobId, candidates } = data

        await prisma.candidate.createMany({
            data: candidates.map((c) => ({
                ...c,
                jobId
            }))
        })

        return { success: true }
    },

    createJob: async (data: any) => {
        return prisma.job.create({
            data
        })
    }

}
