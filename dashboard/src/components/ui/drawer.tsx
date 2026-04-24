import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
}

export function Drawer({ open, onClose, title, description, children }: DrawerProps) {
  React.useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35 backdrop-blur-sm">
      <button
        className="absolute inset-0 cursor-default"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <aside
        className={cn(
          "relative flex h-full w-full max-w-xl flex-col border-l border-white/60 bg-white/95 shadow-2xl"
        )}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {description ? (
              <p className="text-sm text-slate-500">{description}</p>
            ) : null}
          </div>
          <button
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </aside>
    </div>
  )
}
