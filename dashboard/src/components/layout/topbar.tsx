import { ReactNode } from "react"

export function Topbar({
  title,
  subtitle,
  actions
}: {
  title: string
  subtitle: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/70 px-6 py-5 sm:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Recruiter workspace
          </p>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  )
}
