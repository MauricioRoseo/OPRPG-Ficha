import express from "express";
import ItemController from "../controllers/item/ItemController.js";

const router = express.Router();

router.get("/list", ItemController.getAll);
router.get("/:id", ItemController.getById);
router.post("/create", ItemController.create);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.delete);
router.get("/owner/:ownerId", ItemController.getByOwner);

export default router;
