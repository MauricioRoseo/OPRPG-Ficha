import express from "express"
import CharacterController from "../controllers/character/CharacterController.js"

const router = express.Router()

router.get("/list", (req, res) => CharacterController.getAll(req, res))
router.get("/:id", (req, res, next) => CharacterController.getById(req, res, next))
router.post("/create", (req, res, next) => CharacterController.create(req, res, next))
router.put("/:id", (req, res, next) => CharacterController.update(req, res, next))
router.delete("/:id", (req, res, next) => CharacterController.delete(req, res, next))
router.get("/export/csv", (req, res, next) => CharacterController.exportCSV(req, res, next))
router.get("/export/xlsx", (req, res, next) => CharacterController.exportXLSX(req, res, next))

export default router
