const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.authenticateAdmin = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.adminToken) {
      return res.status(401).json({ message: 'Unauthorized: Admin not logged in' });
    }

    const token = req.cookies.adminToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token,decoded);
    

    // Ensure admin exists
    const existingAdmin = await Admin.findByEmail(decoded.email);
    if (!existingAdmin) {
      return res.status(401).json({ message: 'Unauthorized: Admin not found' });
    }

    req.admin = existingAdmin; 
    next(); 

  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
