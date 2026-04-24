import { useMemo, useState } from "react";
import { BriefcaseBusiness, Plus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobCreateDrawer } from "@/components/jobs/job-create-drawer";
import { Job } from "@/types/job";
import { formatDate } from "@/lib/utils";
import { MarkdownPreview } from "@/components/ui/markdown-preview";
import { useJobs } from "@/hooks/use-jobs";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

export function JobsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const jobsQuery = useJobs();
  const latestJob = useMemo(
    () => jobsQuery.data?.[0] ?? null,
    [jobsQuery.data],
  );
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const navigate = useNavigate();

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    // setOpen(true)
    navigate({ pathname: `/jobs/${job.id}` });
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="border-b border-white/70 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Recruiter workspace
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Jobs
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create roles for your pipeline and keep hiring intake moving.
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Create job
          </Button>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 sm:px-8 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Create a new hiring brief
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                Use the action button to add a new job to the platform. Once
                created, candidates can be attached to the role and reviewed in
                the Candidates workspace.
              </p>
            </div>
          </div>
          <Button
            className="mt-6"
            variant="secondary"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Open create job form
          </Button>
        </Card>

        {/* <Card className="p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Latest created job
            </h3>
            <Badge variant={latestJob ? "green" : "neutral"}>
              {latestJob ? "Ready" : "Waiting"}
            </Badge>
          </div>
          {jobsQuery.isLoading ? (
            <div className="mt-5 space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : jobsQuery.isError ? (
            <p className="mt-5 text-sm leading-7 text-coral-500">
              Jobs could not be loaded right now.
            </p>
          ) : latestJob ? (
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Title
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {latestJob.title}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Description
                </p>
                <MarkdownPreview
                  className="mt-2"
                  content={latestJob.description || ""}
                  emptyMessage="No description provided."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Created
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {formatDate(latestJob.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Automation
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {latestJob.automationStatus ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-slate-500">
              No jobs found yet. Create one to start your hiring pipeline.
            </p>
          )}
        </Card> */}

        {jobsQuery.isLoading ? (
          <div className="mt-5 space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : jobsQuery.isError ? (
          <p className="mt-5 text-sm leading-7 text-coral-500">
            Jobs could not be loaded right now.
          </p>
        ) : latestJob ? (
          <div
            key={latestJob.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-brand-600" />
                  <h4 className="truncate text-base font-semibold text-slate-900">
                    {latestJob.title}
                  </h4>
                </div>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {formatDate(latestJob.createdAt)}
                </p>
              </div>

              <Badge variant={latestJob.automationStatus ? "green" : "neutral"}>
                {latestJob.automationStatus
                  ? "Automation on"
                  : "Automation off"}
              </Badge>
            </div>

            {/* Description (truncated) */}
            <div className="mt-4 line-clamp-6 text-sm text-slate-600">
              <MarkdownPreview
                content={latestJob.description || ""}
                emptyMessage="No description provided."
              />
            </div>

            {/* Bottom actions */}
            <div className="mt-auto pt-4 flex justify-end">
              <button
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                onClick={() => handleViewJob(latestJob)}
              >
                View details →
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-5 text-sm leading-7 text-slate-500">
            No jobs found yet. Create one to start your hiring pipeline.
          </p>
        )}

        <Card className="p-8 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Saved jobs</h3>
              <p className="mt-1 text-sm text-slate-500">
                Jobs created in the backend stay here after refresh.
              </p>
            </div>
            <Badge variant="neutral">{jobsQuery.data?.length ?? 0} total</Badge>
          </div>

          {jobsQuery.isLoading ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full" />
              ))}
            </div>
          ) : jobsQuery.isError ? (
            <p className="mt-5 text-sm leading-7 text-coral-500">
              Saved jobs could not be loaded.
            </p>
          ) : jobsQuery.data?.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {jobsQuery.data.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-brand-600" />
                        <h4 className="truncate text-base font-semibold text-slate-900">
                          {job.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {formatDate(job.createdAt)}
                      </p>
                    </div>
                    <Badge variant={job.automationStatus ? "green" : "neutral"}>
                      {job.automationStatus
                        ? "Automation on"
                        : "Automation off"}
                    </Badge>
                  </div>
                  <div className="line-clamp-5">
                    <MarkdownPreview
                      className="mt-4"
                      content={job.description || ""}
                      emptyMessage="No description provided."
                    />
                  </div>
                  <div className="mt-auto pt-4 flex justify-end">
                    <button
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                      onClick={() => handleViewJob(job)}
                    >
                      View details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-7 text-slate-500">
              There are no persisted jobs yet.
            </p>
          )}
        </Card>
      </div>

      <JobCreateDrawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(_job: Job) => {}}
      />
    </div>
  );
}
