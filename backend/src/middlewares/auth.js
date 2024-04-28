const jwt = require("jsonwebtoken");
const User = require("../db/User");

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const email = req.body.email;
  try {
    if (!token) {
      res.status(401).json({ message: "token missign" });
      return;
    }

    const dbPassword = await User.findOne({ email: email }).select("password");
    let decoded = await jwt.verify(token, process.env.jwtSecretekey);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}
module.exports = authMiddleware;
