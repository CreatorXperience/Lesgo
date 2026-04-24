import { useQuery } from "@tanstack/react-query"
import { fetchJobs } from "@/api/jobs"

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs
  })
}
