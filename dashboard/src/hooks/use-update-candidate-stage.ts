import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCandidateStage } from "@/api/candidates"
import { Candidate, CandidateStage } from "@/types/candidate"

export function useUpdateCandidateStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: CandidateStage }) =>
      updateCandidateStage(id, stage),
    onMutate: async ({ id, stage }) => {
      await queryClient.cancelQueries({ queryKey: ["candidates"] })

      const candidateSnapshots = queryClient.getQueriesData<Candidate[]>({
        queryKey: ["candidates"]
      })
      const detailSnapshot = queryClient.getQueryData<Candidate>(["candidate", id])

      candidateSnapshots.forEach(([queryKey, candidates]) => {
        if (!candidates) {
          return
        }

        queryClient.setQueryData<Candidate[]>(
          queryKey,
          candidates.map((candidate) =>
            candidate.id === id ? { ...candidate, stage } : candidate
          )
        )
      })

      if (detailSnapshot) {
        queryClient.setQueryData<Candidate>(["candidate", id], {
          ...detailSnapshot,
          stage
        })
      }

      return { candidateSnapshots, detailSnapshot, id }
    },
    onError: (_error, _variables, context) => {
      context?.candidateSnapshots.forEach(([queryKey, candidates]) => {
        queryClient.setQueryData(queryKey, candidates)
      })

      if (context?.detailSnapshot) {
        queryClient.setQueryData(["candidate", context.id], context.detailSnapshot)
      }
    },
    onSuccess: (candidate) => {
      queryClient.setQueryData(["candidate", candidate.id], candidate)
      queryClient.setQueriesData<Candidate[]>(
        { queryKey: ["candidates"] },
        (current) =>
          current?.map((item) => (item.id === candidate.id ? candidate : item)) ?? current
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] })
      queryClient.invalidateQueries({ queryKey: ["candidate", variables.id] })
    }
  })
}
