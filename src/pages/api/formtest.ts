export default function handler(req, res) {
  const { body } = req
  res.status(200).json({ success: body })
}
