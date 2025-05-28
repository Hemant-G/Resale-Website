import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in .env file");
  process.exit(1);
}
const JWT_LIFETIME = '1h';

// User registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to register user' });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Define the token expiration time
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Replace JWT_LIFETIME with a string like '1h' directly
    );

    // Set the cookie with the JWT token
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true, // Consider enabling this when moving to production (process.env.NODE_ENV === 'production')
      sameSite: 'strict', // Or 'lax'
      maxAge: 60 * 60 * 1000, // Set the same lifetime as the JWT expiration (1 hour)
      domain: 'localhost',  // This should match the domain of your front-end (localhost for development)
      path: '/', // Adjust path if necessary
    });

    res.status(200).json({ message: 'Login successful', role: user.role }); // Don't send the token in the body
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
};


//User Logout
export const logoutUser = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true, // Set to true in production (use HTTPS)
    sameSite: 'strict',
    domain: 'localhost', // Match the domain used in login
    path: '/',           // Match the cookie path
  });

  res.status(200).json({ message: 'Logout successful' });
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user._id).select('-password'); // Exclude password
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
      const userId = req.user._id;
      const updates = req.body;

      // Prevent updating sensitive fields like username, email, role directly through this endpoint
      delete updates.username;
      delete updates.email;
      delete updates.role;
      delete updates.password; // Should have a separate endpoint for password updates

      const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true }).select('-password');

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user profile:', error);
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Failed to update user profile' });
  }
};