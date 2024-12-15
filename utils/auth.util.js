const jwt = require("jsonwebtoken");

const generateAccessToken = (email) => {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

module.exports = { generateAccessToken };
