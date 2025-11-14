import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './router/userRouter.js';
import doctorRoutes from './router/doctorRouter.js';
import emergencyDoctorRoutes from './router/emergencydoctorRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/emergencydoctors', emergencyDoctorRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import userRouter from './router/userRouter.js';
// import doctorRouter from './router/doctorRouter.js';
// import emergencyDoctorRouter from './router/emergencyDoctorRouter.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // For parsing form data

// // API Routes
// app.use('/api/users', userRouter);
// app.use('/api/doctors', doctorRouter);
// app.use('/api/emergency-doctors', emergencyDoctorRouter);


// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

