import express, { Router } from "express";
import {
  login,
  signup,
  auth,
  getuser,
  updatebyid,
  deletebyid,
  getbyid,
} from "../controllers/user_controoler.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/get", auth, getuser);

router.get("/get/:id", auth, getbyid);

router.put("/update/:id", auth, updatebyid);

router.delete("/delete/:id", auth, deletebyid);
export default router;
