import { Users, BriefcaseBusiness } from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

const navigation = [
  { to: "/candidates", label: "Candidates", icon: Users },
  { to: "/jobs", label: "Jobs", icon: BriefcaseBusiness }
]

export function Sidebar() {
  return (
    <aside className="panel-surface flex w-full flex-col gap-6 p-5 lg:min-h-[calc(100vh-2rem)] lg:w-64">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-600">
          RecruitIQ
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
          Hiring command center
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Review AI-ranked talent, move candidates forward, and keep the pipeline sharp.
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            reloadDocument
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
                isActive
                  ? "bg-ink text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl bg-slate-900 px-4 py-5 text-white shadow-soft">
        <p className="text-sm font-semibold">AI scoring online</p>
        <p className="mt-2 text-sm text-slate-300">
          Candidate ranking, fit scoring, and stage updates stay synced with the API.
        </p>
      </div>
    </aside>
  )
}
