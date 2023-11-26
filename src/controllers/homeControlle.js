exports.index = (req, res) => {
  console.log(req.userId);
  res.json({ ok: true });
};
