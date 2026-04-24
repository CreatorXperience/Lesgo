import { LoaderCircle } from "lucide-react"
import { Select } from "@/components/ui/select"
import { candidateStages, Candidate, CandidateStage } from "@/types/candidate"
import { useUpdateCandidateStage } from "@/hooks/use-update-candidate-stage"

interface CandidateStageSelectorProps {
  candidate: Candidate
}

export function CandidateStageSelector({
  candidate
}: CandidateStageSelectorProps) {
  const stageMutation = useUpdateCandidateStage()

  return (
    <div
      className="flex items-center gap-2"
      onClick={(event) => event.stopPropagation()}
    >
      <Select
        aria-label={`Update stage for ${candidate.name ?? candidate.id}`}
        className="h-9 min-w-36 bg-white"
        value={candidate.stage}
        disabled={stageMutation.isPending}
        onChange={(event) =>
          stageMutation.mutate({
            id: candidate.id,
            stage: event.target.value as CandidateStage
          })
        }
      >
        {candidateStages.map((stage) => (
          <option key={stage} value={stage}>
            {stage.replaceAll("_", " ")}
          </option>
        ))}
      </Select>
      {stageMutation.isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin text-brand-600" />
      ) : null}
    </div>
  )
}
