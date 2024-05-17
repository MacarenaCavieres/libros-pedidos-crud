import { bookMethod } from "../controllers/libro.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", bookMethod.getAllBooks);
router.post("/", bookMethod.postOneBook);
router.get("/:id", bookMethod.getOneBook);
router.delete("/:id", bookMethod.deleteOneBook);
router.put("/:id", bookMethod.updateOneBook);

export default router;
