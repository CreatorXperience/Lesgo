import { useRef, useState } from "react"
import { Bold, Heading1, Italic, Link2, List, Eye, PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MarkdownPreview } from "@/components/ui/markdown-preview"
import { cn } from "@/lib/utils"

type EditorAction = {
  label: string
  icon: typeof Bold
  apply: (selected: string) => { text: string; cursorOffset?: number }
}

const actions: EditorAction[] = [
  {
    label: "Heading",
    icon: Heading1,
    apply: (selected) => ({ text: `# ${selected || "Role overview"}` })
  },
  {
    label: "Bold",
    icon: Bold,
    apply: (selected) => ({ text: `**${selected || "important"}**`, cursorOffset: 2 })
  },
  {
    label: "Italic",
    icon: Italic,
    apply: (selected) => ({ text: `*${selected || "detail"}*`, cursorOffset: 1 })
  },
  {
    label: "List",
    icon: List,
    apply: (selected) => ({
      text: selected
        ? selected
            .split("\n")
            .map((line) => `- ${line}`)
            .join("\n")
        : "- Responsibilities\n- Requirements\n- Nice to have"
    })
  },
  {
    label: "Link",
    icon: Link2,
    apply: (selected) => ({
      text: `[${selected || "Link text"}](https://example.com)`
    })
  }
]

export function MarkdownEditor({
  id,
  value,
  onChange,
  placeholder
}: {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [mode, setMode] = useState<"write" | "preview">("write")

  function applyAction(action: EditorAction) {
    const textarea = textareaRef.current

    if (!textarea) {
      onChange(value)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = value.slice(start, end)
    const before = value.slice(0, start)
    const after = value.slice(end)
    const result = action.apply(selected)
    const nextValue = `${before}${result.text}${after}`

    onChange(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const cursorPosition = start + result.text.length - (result.cursorOffset ?? 0)
      textarea.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-3 py-3">
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg"
                onClick={() => applyAction(action)}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            )
          })}
        </div>
        <div className="flex rounded-xl bg-white p-1 shadow-sm">
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
              mode === "write" ? "bg-ink text-white" : "text-slate-500 hover:text-slate-900"
            )}
            onClick={() => setMode("write")}
          >
            <PencilLine className="h-3.5 w-3.5" />
            Write
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
              mode === "preview" ? "bg-ink text-white" : "text-slate-500 hover:text-slate-900"
            )}
            onClick={() => setMode("preview")}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
        </div>
      </div>

      <div className="p-3">
        {mode === "write" ? (
          <Textarea
            id={id}
            ref={textareaRef}
            className="min-h-56 resize-y border-0 bg-transparent px-1 py-1 shadow-none focus:ring-0"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <MarkdownPreview
            content={value}
            emptyMessage="Start writing in Markdown to preview the job description."
          />
        )}
      </div>
    </div>
  )
}
