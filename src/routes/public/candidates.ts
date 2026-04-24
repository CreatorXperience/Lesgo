import { Hono } from "hono"
import { candidateController } from "../../controllers/candidates.controller.js"


const router = new Hono()

router.patch("/:id/stage", candidateController.updateStage)
router.patch("/stage", candidateController.updateStage)
router.get("/", candidateController.getCandidates)
router.get("/job/:jobId", candidateController.getByJob)
router.get("/:id", candidateController.getOne)

export default router
