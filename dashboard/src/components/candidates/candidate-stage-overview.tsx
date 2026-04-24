import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Candidate, candidateStages } from "@/types/candidate"

export function CandidateStageOverview({
  candidates
}: {
  candidates: Candidate[]
}) {
  const counts = candidateStages.reduce<Record<string, number>>((accumulator, stage) => {
    accumulator[stage] = candidates.filter((candidate) => candidate.stage === stage).length
    return accumulator
  }, {})

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Pipeline snapshot
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {candidates.length} candidates in view
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {candidateStages.map((stage) => (
          <Badge key={stage} variant="neutral" className="px-3 py-1.5">
            {stage}: {counts[stage]}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
