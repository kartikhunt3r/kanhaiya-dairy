import { Router } from "express";
import customerRoutes from "./CustomerRouter.js";

const router = Router();

router.use("/api/customer", customerRoutes);
export default router;
