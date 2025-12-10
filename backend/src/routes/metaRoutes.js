import express from "express";
import { getAvailability, pricePreview } from "../controllers/metaController.js";

const router = express.Router();

router.get("/availability", getAvailability);
router.post("/price-preview", pricePreview);

export default router;
