exports.approveContent = async (req, res) => {
  const content = await Content.findByPk(req.params.id);

  content.status = "approved";
  content.approved_by = req.user.id;

  await content.save();

  res.json(content);
};

exports.rejectContent = async (req, res) => {
  const { reason } = req.body;

  const content = await Content.findByPk(req.params.id);

  content.status = "rejected";
  content.rejection_reason = reason;

  await content.save();

  res.json(content);
};