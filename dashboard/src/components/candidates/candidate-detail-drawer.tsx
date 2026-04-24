import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { useCandidateDetail } from "@/hooks/use-candidate-detail"
import { Drawer } from "@/components/ui/drawer"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatScore } from "@/lib/utils"

interface CandidateDetailDrawerProps {
  candidateId?: string
  open: boolean
  onClose: () => void
}

function ScoreCard({
  label,
  value
}: {
  label: string
  value?: number
}) {
  return (
    <Card className="rounded-xl border border-slate-100 p-4 shadow-none">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{formatScore(value)}</p>
    </Card>
  )
}

export function CandidateDetailDrawer({
  candidateId,
  open,
  onClose
}: CandidateDetailDrawerProps) {
  const { data: candidate, isLoading, isError } = useCandidateDetail(candidateId)

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={candidate?.name ?? "Candidate details"}
      description={candidate ? `Job ${candidate.jobId}` : "Review candidate profile"}
    >
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      ) : null}

      {isError ? (
        <Card className="border border-coral-100 bg-coral-50/80 p-4 text-sm text-coral-500">
          Candidate details could not be loaded right now.
        </Card>
      ) : null}

      {candidate ? (
        <div className="space-y-6">
          <section className="grid gap-3 sm:grid-cols-2">
            <Card className="rounded-xl border border-slate-100 p-4 shadow-none">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Contact
              </p>
              <div className="mt-3 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{candidate.email ?? "No email provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{candidate.phone ?? "No phone provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{candidate.location ?? "Unknown location"}</span>
                </div>
              </div>
            </Card>
            <Card className="rounded-xl border border-slate-100 p-4 shadow-none">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Recommendation
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Badge variant="neutral">{candidate.stage}</Badge>
                {candidate.recommendation ? (
                  <Badge
                    variant={
                      candidate.recommendation === "STRONG_SHORTLIST"
                        ? "green"
                        : candidate.recommendation === "SHORTLIST"
                          ? "blue"
                          : candidate.recommendation === "CONSIDER"
                            ? "yellow"
                            : "red"
                    }
                  >
                    {candidate.recommendation}
                  </Badge>
                ) : (
                  <Badge variant="neutral">Unscored</Badge>
                )}
              </div>
              {candidate.resumeUrl ? (
                <Button
                  className="mt-4 w-full"
                  variant="secondary"
                  onClick={() => window.open(candidate.resumeUrl, "_blank", "noopener,noreferrer")}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open resume
                </Button>
              ) : null}
            </Card>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <ScoreCard label="Overall score" value={candidate.overallScore} />
            <ScoreCard label="Skills score" value={candidate.skillsScore} />
            <ScoreCard label="Experience score" value={candidate.experienceScore} />
            <ScoreCard label="Job fit score" value={candidate.jobFitScore} />
          </section>

          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                AI summary
              </h3>
              <Card className="mt-3 rounded-xl border border-slate-100 p-4 shadow-none">
                <p className="text-sm leading-7 text-slate-600">
                  {candidate.summary ?? "No AI summary has been added yet."}
                </p>
              </Card>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <Card className="rounded-xl border border-slate-100 p-4 shadow-none">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Strengths
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {(candidate.strengths?.length ? candidate.strengths : ["No strengths captured yet."]).map(
                  (strength) => (
                    <li key={strength} className="rounded-xl bg-brand-50 px-3 py-2 text-brand-600">
                      {strength}
                    </li>
                  )
                )}
              </ul>
            </Card>

            <Card className="rounded-xl border border-slate-100 p-4 shadow-none">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Weaknesses
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {(candidate.weaknesses?.length
                  ? candidate.weaknesses
                  : ["No risks or weaknesses captured yet."]).map((weakness) => (
                  <li key={weakness} className="rounded-xl bg-coral-50 px-3 py-2 text-coral-500">
                    {weakness}
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>
      ) : null}
    </Drawer>
  )
}
