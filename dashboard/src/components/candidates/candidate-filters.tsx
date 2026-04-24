import { Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  CandidateFilters as CandidateFiltersType,
  candidateStages,
  recommendationOptions
} from "@/types/candidate"

interface CandidateFiltersProps {
  filters: CandidateFiltersType
  jobOptions: string[]
  onChange: (next: CandidateFiltersType) => void
  onRefresh: () => void
  isRefreshing: boolean
}

export function CandidateFilters({
  filters,
  jobOptions,
  onChange,
  onRefresh,
  isRefreshing
}: CandidateFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.2fr)_repeat(5,minmax(0,1fr))]">
      <div className="relative md:col-span-2 xl:col-span-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          className="pl-9"
          placeholder="Search by name, email, or location"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </div>

      <Select
        value={filters.stage}
        onChange={(event) =>
          onChange({
            ...filters,
            stage: event.target.value as CandidateFiltersType["stage"]
          })
        }
      >
        <option value="ALL">All stages</option>
        {candidateStages.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </Select>

      <Select
        value={filters.recommendation}
        onChange={(event) =>
          onChange({
            ...filters,
            recommendation: event.target.value as CandidateFiltersType["recommendation"]
          })
        }
      >
        <option value="ALL">All recommendations</option>
        {recommendationOptions.map((recommendation) => (
          <option key={recommendation} value={recommendation}>
            {recommendation}
          </option>
        ))}
      </Select>

      <Select
        value={filters.jobId}
        onChange={(event) => onChange({ ...filters, jobId: event.target.value })}
      >
        <option value="">All jobs</option>
        {jobOptions.map((jobId) => (
          <option key={jobId} value={jobId}>
            {jobId}
          </option>
        ))}
      </Select>

      <Select
        value={`${filters.sort}:${filters.order}`}
        onChange={(event) => {
          const [sort, order] = event.target.value.split(":") as [
            CandidateFiltersType["sort"],
            CandidateFiltersType["order"]
          ]
          onChange({ ...filters, sort, order })
        }}
      >
        <option value="overallScore:desc">Highest score</option>
        <option value="overallScore:asc">Lowest score</option>
        <option value="createdAt:desc">Newest first</option>
        <option value="createdAt:asc">Oldest first</option>
      </Select>

      <Button
        className="w-full"
        variant="secondary"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={isRefreshing ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
        Refresh
      </Button>
    </div>
  )
}
