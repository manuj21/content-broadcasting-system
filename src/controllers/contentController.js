const { Content, Schedule } = require("../models");
const { getActiveContent } = require("../services/scheduler");

/**
 * 📤 Upload Content (Teacher)
 */
exports.uploadContent = async (req, res) => {
  try {
    // ✅ Debug logs (INSIDE function)
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, subject, description, start_time, end_time, duration } =
      req.body;

    // Validation
    if (!title || !subject) {
      return res.status(400).json({ message: "Title and Subject are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Create content
    const content = await Content.create({
      title,
      subject,
      description,
      file_path: req.file.path,
      uploaded_by: req.user.id,
      start_time: start_time || null,
      end_time: end_time || null,
      status: "pending",
    });

    // Create schedule
    await Schedule.create({
      content_id: content.id,
      rotation_order: 1,
      duration: duration || 5,
    });

    res.json({
      message: "Content uploaded successfully",
      content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 🌍 Public API - Get Live Content
 */
exports.getLiveContent = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const contents = await Content.findAll({
      where: {
        uploaded_by: teacherId,
        status: "approved",
      },
      include: Schedule,
    });

    const now = new Date();

    const filtered = contents.filter((c) => {
      if (!c.start_time || !c.end_time) return false;

      return new Date(c.start_time) <= now && new Date(c.end_time) >= now;
    });

    if (!filtered.length) {
      return res.json({ message: "No content available" });
    }

    const active = getActiveContent(filtered);

    if (!active) {
      return res.json({ message: "No content available" });
    }

    res.json({
      id: active.id,
      title: active.title,
      subject: active.subject,
      file_path: active.file_path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};