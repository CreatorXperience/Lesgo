import { FormEvent, useEffect, useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { useCreateJob } from "@/hooks/use-create-job";
import { Job } from "@/types/job";

interface JobCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreated: (job: Job) => void;
}

export function JobCreateDrawer({
  open,
  onClose,
  onCreated,
}: JobCreateDrawerProps) {
  const createJobMutation = useCreateJob();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      createJobMutation.reset();
    }
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const job = await createJobMutation.mutateAsync({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    onCreated(job);
    onClose();
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Create job"
      description="Add a role so recruiters can start reviewing candidates against it."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="job-title"
          >
            Job title
          </label>
          <Input
            id="job-title"
            placeholder="Senior Product Designer"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="job-description"
          >
            Description
          </label>
          <MarkdownEditor
            id="job-description"
            placeholder={
              "# About the role\n\n## Responsibilities\n- Lead...\n- Collaborate...\n\n## Requirements\n- 5+ years...\n- Strong communication...\n\n## Nice to have\n- Domain experience..."
            }
            value={description}
            onChange={setDescription}
          />
          <p className="text-xs text-slate-400">
            Supports Markdown formatting with live preview for headings, lists,
            links, and emphasis.
          </p>
        </div>

        {createJobMutation.isError ? (
          <Card className="border border-coral-100 bg-coral-50/80 p-4 text-sm text-coral-500">
            {(createJobMutation.error as Error)?.message ||
              "The job could not be created right now."}
          </Card>
        ) : null}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createJobMutation.isPending || !title.trim()}
          >
            {createJobMutation.isPending ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Create job
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
