import { ReactNode } from "react"
import { Sidebar } from "@/components/layout/sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-4 p-4 lg:flex-row">
      <Sidebar />
      <main className="panel-surface min-w-0 flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
