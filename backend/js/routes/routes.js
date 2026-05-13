import express from "express";
import { creaPagamento } from "../controllers/pagamenti.controller.js";

const router = express.Router();

router.post("/crea", creaPagamento);

export default router;
