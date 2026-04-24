import { Hono } from "hono"
import { jobController } from "../../controllers/job.controller.js"


const router = new Hono()
router.get("/", jobController.getJobs)
router.get("/job/:jobId", jobController.getJob)
router.post("/", jobController.createJob)

export default router
