import { Hono } from "hono"
import { jobController } from "../../controllers/job.controller.js"


const router = new Hono()
router.patch("/job/:jobId/automation", jobController.updateJobAutomationStatus)
router.get("/job/:jobId", jobController.getJob)

export default router
