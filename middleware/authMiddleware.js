
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



const authMiddleware = (req, res, next) => {
  const {token} = req.cookies;
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  // console.log(" TOKEN ",token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
