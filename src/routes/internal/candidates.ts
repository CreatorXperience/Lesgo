import { Hono } from "hono"
import { candidateController } from "../../controllers/candidates.controller.js"


const router = new Hono()


router.post("/bulk", candidateController.bulkCreate)
router.patch("/:id/stage", candidateController.updateStage)
router.patch("/stage", candidateController.updateStage)
router.get("/:id", candidateController.getOne)

export default router
