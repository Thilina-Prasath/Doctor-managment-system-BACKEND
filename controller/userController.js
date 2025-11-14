import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Log incoming request for debugging
        console.log('Registration attempt:', { username, email, passwordLength: password?.length });

        if (!username || !email || !password) {
            console.log('Missing fields:', { username: !!username, email: !!email, password: !!password });
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        console.log('Creating new user...');
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user object
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        console.log('Saving user to database...');
        await user.save();
        console.log('User saved successfully with ID:', user._id);

        // ✅ REMOVED: No longer creating default doctors
        // Users start with an empty doctor list

        // Return success response
        console.log('Registration successful for:', email);
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('❌ Register error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Send specific error message
        res.status(500).json({ 
            message: 'Server error during registration',
            error: error.message 
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Forgot password (simple demo version)
// @route POST /api/users/forgot-password
// @access Public
export const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




// import { supabase } from "../config/supabaseClient.js";

// // User Registration
// export const registerUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required.' });
//   }

//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(201).json({ message: 'User registered successfully!', user: data.user });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// // User Login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required.' });
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(401).json({ error: 'Invalid login credentials.' });
//     }

//     res.status(200).json({ message: 'Login successful!', session: data.session, user: data.user });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };
