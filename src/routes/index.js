const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const contentController = require("../controllers/contentController");
const approvalController = require("../controllers/approvalController");

const { verifyToken, checkRole } = require("../middlewares/auth");

const multer = require("multer");

// File upload config
const upload = multer({
  dest: "src/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ================= AUTH =================
router.post("/register", authController.register);
router.post("/login", authController.login);

// ================= TEACHER =================
router.post(
  "/upload",
  verifyToken,
  checkRole("teacher"),
  upload.single("file"),
  contentController.uploadContent
);

// ================= PRINCIPAL =================
router.post(
  "/approve/:id",
  verifyToken,
  checkRole("principal"),
  approvalController.approveContent
);

router.post(
  "/reject/:id",
  verifyToken,
  checkRole("principal"),
  approvalController.rejectContent
);

// ================= PUBLIC =================
router.get("/live/:teacherId", contentController.getLiveContent);

module.exports = router;