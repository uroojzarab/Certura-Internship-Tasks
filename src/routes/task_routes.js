import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task_controller.js";

const router = express.Router();
router.post("/", createTask);
router.get("/", getTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
