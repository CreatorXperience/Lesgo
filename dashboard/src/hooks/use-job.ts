import { useQuery } from "@tanstack/react-query"
import { fetchJob } from "@/api/jobs"

export function useJob(jobId: string) {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId)
  })
}