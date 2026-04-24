export interface Job {
  id: string
  title: string
  description?: string | null
  createdAt: string
  automationStatus: boolean
}

export interface CreateJobInput {
  title: string
  description?: string
}
