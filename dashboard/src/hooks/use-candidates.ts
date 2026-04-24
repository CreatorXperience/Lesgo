import { useQuery } from "@tanstack/react-query"
import { fetchCandidates } from "@/api/candidates"
import { CandidateFilters } from "@/types/candidate"

export function useCandidates(filters: CandidateFilters) {
  return useQuery({
    queryKey: ["candidates", filters],
    queryFn: () => fetchCandidates(filters)
  })
}
