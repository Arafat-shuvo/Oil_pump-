export const uploadDone = (req, res) => {
  const files = (req.files || []).map(f => `/uploads/${f.filename}`);
  res.status(201).json({ files });
};
