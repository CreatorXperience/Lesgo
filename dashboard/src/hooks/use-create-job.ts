import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createJob } from "@/api/jobs"
import { Job } from "@/types/job"

export function useCreateJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createJob,
    onSuccess: (job) => {
      queryClient.setQueryData<Job[]>(["jobs"], (current) =>
        current ? [job, ...current] : [job]
      )
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    }
  })
}
