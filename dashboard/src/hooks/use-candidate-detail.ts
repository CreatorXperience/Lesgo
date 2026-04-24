import { useQuery } from "@tanstack/react-query"
import { fetchCandidate } from "@/api/candidates"

export function useCandidateDetail(id?: string) {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => fetchCandidate(id!),
    enabled: Boolean(id)
  })
}
