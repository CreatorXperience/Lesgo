import { apiClient } from "@/api/client"
import { CreateJobInput, Job } from "@/types/job"

export async function fetchJobs() {
  const response = await apiClient.get<Job[]>("/ui/jobs")
  return response.data
}

export async function fetchJob(jobId: string) {
  const response = await apiClient.get<Job>(`/ui/jobs/job/${jobId}`)
  return response.data
}

export async function createJob(data: CreateJobInput) {
  const response = await apiClient.post<Job>("/ui/jobs", data)
  return response.data
}
