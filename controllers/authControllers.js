const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  
  try {
    console.log("Register request received for:", email);

    const existingUser = await User.findByEmail( email );
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User( name, email,hashedPassword );
    const savedUser = await newUser.save();

    console.log('User registered successfully, ID:', savedUser._id);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password, apiKey } = req.body;
  // console.log(req.bo);


  if (!apiKey || process.env.API_KEY !== apiKey) {
    console.log("Invalid API key provided.");
    return res.status(403).json({ message: 'Invalid API Key' });
  }

  try {
    console.log("Register request received for admin:", email);

    const existingAdmin = await Admin.findByEmail(email);
  
    if (existingAdmin) {
      console.log('Admin already exists:', email);
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin( name, email,hashedPassword );
    
    const savedAdmin = await newAdmin.save();
    console.log('Admin registered successfully, ID:', savedAdmin._id);
    res.json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Error registering admin:', err.message);
    res.status(500).json({ message: 'Error registering admin' });
  }
};

// Login for existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received for email:', email);

  try {
    const user = await User.findByEmail( email );
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log('Incorrect password:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful, token generated:', token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 3600000
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Login for existing admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Admin login request received for email:', email);

  try {
    const admin = await Admin.findByEmail( email );
    if (!admin) {
      console.log('Admin not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log("ADMIN" ,admin);

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    console.log(password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email:admin.email},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Admin login successful, token generated:', token);

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 3600000
    });

    res.json({ message: 'Admin login successful' });
  } catch (err) {
    console.error('Error during admin login:', err.message);
    res.status(500).json({ message: 'Error logging in' });
  }
};


exports.logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'User Logged out successfully' });
  
}

exports.logoutAdmin = async (req, res) => {
  res.clearCookie('adminToken');
  res.status(200).json({ message: 'Admin Logged out successfully' });
  
}
