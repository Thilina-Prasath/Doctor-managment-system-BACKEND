import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};



// import { supabase } from "../config/supabaseClient.js";

// export const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer TOKEN"

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided, authorization denied.' });
//   }

//   const { data: { user }, error } = await supabase.auth.getUser(token);

//   if (error || !user) {
//     return res.status(401).json({ error: 'Token is not valid.' });
//   }

//   req.user = user; // Attach user to the request object
//   next();
// };
