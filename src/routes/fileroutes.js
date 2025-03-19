import express from "express";
import upload from "../middleware/multer.js"; // Import multer middleware
import { uploadFile, getFile } from "../controllers/fileupload.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile); // Ensure the field name is "file"
router.get("/:filename", getFile);

export default router;
