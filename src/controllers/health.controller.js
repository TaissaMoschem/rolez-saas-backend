function health(req, res) {
  return res.json({ status: "API OK" });
}

module.exports = { health };
