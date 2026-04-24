import { Eye } from "lucide-react"
import { Candidate } from "@/types/candidate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { formatDate, formatScore } from "@/lib/utils"
import { CandidateStageSelector } from "@/components/candidates/candidate-stage-selector"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

function recommendationVariant(recommendation?: Candidate["recommendation"]) {
  switch (recommendation) {
    case "STRONG_SHORTLIST":
      return "green"
    case "SHORTLIST":
      return "blue"
    case "CONSIDER":
      return "yellow"
    case "REJECT":
      return "red"
    default:
      return "neutral"
  }
}

function scoreColor(score?: number) {
  if (score === undefined || score === null) {
    return "text-slate-400"
  }

  if ((score ?? 0) >= 80) {
    return "text-brand-600"
  }

  if ((score ?? 0) >= 60) {
    return "text-sand-500"
  }

  return "text-coral-500"
}

interface CandidateTableProps {
  candidates: Candidate[]
  isLoading: boolean
  isError: boolean
  onSelect: (candidateId: string) => void
}

export function CandidateTable({
  candidates,
  isLoading,
  isError,
  onSelect
}: CandidateTableProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="space-y-3 p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="border border-coral-100 bg-coral-50/80 p-5 text-sm text-coral-500">
        Candidate data could not be loaded. Check the API and refresh the page.
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="max-h-[calc(100vh-22rem)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.length ? (
              candidates.map((candidate, index) => (
                <TableRow
                  key={candidate.id}
                  className="cursor-pointer"
                  onClick={() => onSelect(candidate.id)}
                >
                  <TableCell className="font-semibold text-slate-400">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {candidate.name ?? "Unnamed candidate"}
                      </p>
                      <p className="text-xs text-slate-400">{candidate.email ?? candidate.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${scoreColor(candidate.overallScore)}`}>
                      {formatScore(candidate.overallScore)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={recommendationVariant(candidate.recommendation)}>
                      {candidate.recommendation ?? "UNSCORED"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CandidateStageSelector candidate={candidate} />
                  </TableCell>
                  <TableCell>{candidate.location ?? "N/A"}</TableCell>
                  <TableCell>{formatDate(candidate.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation()
                        onSelect(candidate.id)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center">
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-900">No candidates found</p>
                    <p className="text-sm text-slate-500">
                      Try widening the filters or refresh the data source.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
