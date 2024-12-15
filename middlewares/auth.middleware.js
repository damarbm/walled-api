const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401).json({ error: "Unauthenticated" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ error: "Unauthorized" });

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
