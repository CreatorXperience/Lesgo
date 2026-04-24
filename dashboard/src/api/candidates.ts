import { apiClient } from "@/api/client"
import { Candidate, CandidateFilters, CandidateStage } from "@/types/candidate"

export async function fetchCandidates(filters: CandidateFilters) {
  if (filters.jobId) {
    const response = await apiClient.get<Candidate[]>(
      `/ui/candidates/job/${filters.jobId}`
    )

    let candidates = response.data

    if (filters.stage !== "ALL") {
      candidates = candidates.filter((candidate) => candidate.stage === filters.stage)
    }

    if (filters.recommendation !== "ALL") {
      candidates = candidates.filter(
        (candidate) => candidate.recommendation === filters.recommendation
      )
    }

    if (filters.search.trim()) {
      const search = filters.search.trim().toLowerCase()
      candidates = candidates.filter((candidate) =>
        [candidate.name, candidate.email, candidate.location]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search))
      )
    }

    candidates = [...candidates].sort((left, right) => {
      const leftValue =
        filters.sort === "createdAt"
          ? Date.parse(left.createdAt)
          : (left[filters.sort] ?? 0)
      const rightValue =
        filters.sort === "createdAt"
          ? Date.parse(right.createdAt)
          : (right[filters.sort] ?? 0)

      if (leftValue < rightValue) {
        return filters.order === "asc" ? -1 : 1
      }

      if (leftValue > rightValue) {
        return filters.order === "asc" ? 1 : -1
      }

      return 0
    })

    return candidates
  }

  const params = new URLSearchParams()
  params.set("limit", "200")

  if (filters.stage !== "ALL") {
    params.set("stage", filters.stage)
  }

  if (filters.recommendation !== "ALL") {
    params.set("recommendation", filters.recommendation)
  }

  if (filters.search.trim()) {
    params.set("search", filters.search.trim())
  }

  if (filters.sort) {
    params.set("sort", filters.sort)
    params.set("order", filters.order)
  }

  const response = await apiClient.get<Candidate[]>("/ui/candidates", {
    params
  })
  return response.data
}

export async function fetchCandidate(id: string) {
  const response = await apiClient.get<Candidate>(`/ui/candidates/${id}`)
  return response.data
}

export async function updateCandidateStage(id: string, stage: CandidateStage) {
  const response = await apiClient.patch<Candidate>(`/ui/candidates/${id}/stage`, {
    stage
  })
  return response.data
}
