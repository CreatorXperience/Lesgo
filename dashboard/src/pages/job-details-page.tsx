import { ArrowLeft, BriefcaseBusiness, Calendar, Sparkles } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MarkdownPreview } from "@/components/ui/markdown-preview"
import { useJob } from "@/hooks/use-job"
import { formatDate } from "@/lib/utils"

export function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const jobQuery = useJob(jobId || "")
  const job = jobQuery.data

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="border-b border-white/70 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Button
              variant="ghost"
              className="mb-3 -ml-2 h-8 gap-1.5 px-2"
              onClick={() => navigate("/jobs")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to jobs
            </Button>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-brand-50 p-2.5 text-brand-600">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              {jobQuery.isLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {job?.title ?? "Job Details"}
                </h2>
              )}
            </div>
            {job && (
              <p className="mt-2 text-sm text-slate-500">
                Job ID: {job.id}
              </p>
            )}
          </div>
          {job && (
            <Badge
              variant={job.automationStatus ? "green" : "neutral"}
              className="self-start lg:self-auto"
            >
              <Sparkles className="h-3 w-3" />
              {job.automationStatus ? "Automation on" : "Automation off"}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 sm:px-8">
        <Card className="p-8">
          {jobQuery.isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="mt-6 h-32 w-full" />
            </div>
          ) : jobQuery.isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-coral-500">
                Failed to load job details. The job may not exist.
              </p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => navigate("/jobs")}
              >
                Return to jobs
              </Button>
            </div>
          ) : job ? (
            <div className="space-y-6">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  Created on {formatDate(job.createdAt)}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Description
                </p>
                <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                  <MarkdownPreview
                    content={job.description || ""}
                    emptyMessage="No description provided for this job."
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-slate-500">
                No job found with this ID.
              </p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => navigate("/jobs")}
              >
                Return to jobs
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}