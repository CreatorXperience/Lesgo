import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

export function MarkdownPreview({
  content,
  className,
  emptyMessage = "Nothing to preview yet."
}: {
  content?: string
  className?: string
  emptyMessage?: string
}) {
  if (!content?.trim()) {
    return (
      <div
        className={cn(
          "rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-400",
          className
        )}
      >
        {emptyMessage}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "markdown-body rounded-xl border border-slate-100 bg-white px-4 py-4 text-sm leading-7 text-slate-700",
        "[&_a]:text-sky-500 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-500 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_h1]:mt-1 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-bold [&_hr]:my-5 [&_hr]:border-slate-200 [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-slate-100 [&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-slate-200 [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-5",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
