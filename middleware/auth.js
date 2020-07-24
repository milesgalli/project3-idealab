const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // GET TOKEN FROM HEADER

  const token = req.header("x-auth-token");

  // check if no token

  if (!token) {
    console.log(token)
    return res.status(401).json({ msg: "No token, access denied" });
  }

  // verify token
  // decode token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    
    console.log(res)
  
    res.status(401).json({ msg: "Token is not valid" });
  }
};
