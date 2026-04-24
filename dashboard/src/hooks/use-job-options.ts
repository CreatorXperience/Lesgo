import { useQuery } from "@tanstack/react-query"
import { fetchCandidates } from "@/api/candidates"
import { CandidateFilters } from "@/types/candidate"

const jobOptionFilters: CandidateFilters = {
  stage: "ALL",
  recommendation: "ALL",
  search: "",
  sort: "createdAt",
  order: "desc",
  jobId: ""
}

export function useJobOptions() {
  return useQuery({
    queryKey: ["candidates", "job-options"],
    queryFn: async () => {
      const candidates = await fetchCandidates(jobOptionFilters)
      return Array.from(new Set(candidates.map((candidate) => candidate.jobId))).sort()
    }
  })
}
