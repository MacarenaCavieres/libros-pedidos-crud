import { Router } from "express";
import { orderMethod } from "../controllers/pedido.controller.js";

const router = Router();

router.post("/", orderMethod.postOneOrder);

export default router;
