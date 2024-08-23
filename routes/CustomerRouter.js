import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomer,
  fetchCustomers,
  updateCustomer,
} from "../controllers/CustomerController.js";

const router = Router();

router.get("/list", fetchCustomers);
router.get("/profile/:id", fetchCustomer);
router.post("/register", createCustomer);
router.post("/login", createCustomer);
router.post("/update", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

export default router;
