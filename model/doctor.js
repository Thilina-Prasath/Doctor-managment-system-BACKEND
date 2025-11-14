// model/doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    doctor_name: {
        type: String,
        required: [true, 'Please add a doctor name'],
    },
    doctor_mobile_number: {
        type: String,
        required: [true, 'Please add a mobile number'],
    },
    workplace: {
        type: String,
        required: [true, 'Please add a workplace'],
    },
    consultant: {
        type: String,
        required: [true, 'Please add a consultant/specialty'],
    },
}, {
    timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;




// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A doctor must have a name']
//   },
//   specialization: {
//     type: String,
//     required: [true, 'Specialization is required']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true
//   },
//   // Changed from 'phone' to 'number' to match controller
//   number: { 
//     type: String  // Changed from Number to String to handle phone formats
//   },
//   address: {
//     type: String
//   },
//   image: {
//     type: String
//   }
// }, {
//   timestamps: true  // Added timestamps for better tracking
// });

// const Doctor = mongoose.model('Doctor', doctorSchema);
// export default Doctor;