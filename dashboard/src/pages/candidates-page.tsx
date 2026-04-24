import { useDeferredValue, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Topbar } from "@/components/layout/topbar"
import { CandidateFilters } from "@/components/candidates/candidate-filters"
import { CandidateStageOverview } from "@/components/candidates/candidate-stage-overview"
import { CandidateTable } from "@/components/candidates/candidate-table"
import { CandidateDetailDrawer } from "@/components/candidates/candidate-detail-drawer"
import { useCandidates } from "@/hooks/use-candidates"
import { useJobOptions } from "@/hooks/use-job-options"
import { CandidateFilters as CandidateFiltersType } from "@/types/candidate"

const initialFilters: CandidateFiltersType = {
  stage: "ALL",
  recommendation: "ALL",
  search: "",
  sort: "overallScore",
  order: "desc",
  jobId: ""
}

export function CandidatesPage() {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<CandidateFiltersType>(initialFilters)
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>()
  const deferredSearch = useDeferredValue(filters.search)

  const candidateFilters = {
    ...filters,
    search: deferredSearch
  }

  const candidatesQuery = useCandidates(candidateFilters)
  const jobOptionsQuery = useJobOptions()

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Topbar
        title="Candidates"
        subtitle="AI-scored applicants, stage transitions, and recruiter review all in one place."
      />

      <div className="space-y-6 px-6 py-6 sm:px-8">
        <CandidateFilters
          filters={filters}
          jobOptions={jobOptionsQuery.data ?? []}
          onChange={setFilters}
          onRefresh={() => queryClient.invalidateQueries({ queryKey: ["candidates"] })}
          isRefreshing={candidatesQuery.isFetching}
        />

        <CandidateStageOverview candidates={candidatesQuery.data ?? []} />

        <CandidateTable
          candidates={candidatesQuery.data ?? []}
          isLoading={candidatesQuery.isLoading}
          isError={candidatesQuery.isError}
          onSelect={setSelectedCandidateId}
        />
      </div>

      <CandidateDetailDrawer
        candidateId={selectedCandidateId}
        open={Boolean(selectedCandidateId)}
        onClose={() => setSelectedCandidateId(undefined)}
      />
    </div>
  )
}
