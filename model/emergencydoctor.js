// model/emergencydoctor.js
import mongoose from 'mongoose';

const emergencyDoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // STANDARDIZED FIELDS to match frontend
    doctor_name: {
        type: String,
        required: [true, 'Please add the emergency contact name'],
    },
    doctor_mobile_number: {
        type: String,
        required: [true, 'Please add the emergency contact mobile number'],
    },
    workplace: {
        type: String,
        required: false,
    },
    consultant: { // Represents the department or specialty
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const EmergencyDoctor = mongoose.model('EmergencyDoctor', emergencyDoctorSchema);
export default EmergencyDoctor;
