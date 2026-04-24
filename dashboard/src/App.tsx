import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { CandidatesPage } from "@/pages/candidates-page";
import { JobsPage } from "@/pages/jobs-page";
import { JobDetailsPage } from "@/pages/job-details-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/candidates" replace />} />
      <Route path="/candidates" element={<DashboardShell><CandidatesPage /></DashboardShell>} />
      <Route path="/jobs" element={<DashboardShell><JobsPage /></DashboardShell>} />
      <Route path="/jobs/:jobId" element={<DashboardShell><JobDetailsPage /></DashboardShell>} />
    </Routes>
  );
}
