import EmergencyDoctor from '../model/emergencydoctor.js';

// @desc    Create a new emergency doctor
// @route   POST /api/emergencydoctors
export const createEmergencyDoctor = async (req, res) => {
    const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;
    
    if (!doctor_name || !doctor_mobile_number) {
        return res.status(400).json({ message: 'Name and Mobile Number are required' });
    }
    
    try {
        const emergencyDoctor = new EmergencyDoctor({
            user: req.user._id,
            doctor_name,
            doctor_mobile_number,
            workplace,
            consultant
        });
        const createdEmergencyDoctor = await emergencyDoctor.save();
        res.status(201).json(createdEmergencyDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all emergency doctors (SHARED - all users see all emergency doctors)
// @route   GET /api/emergencydoctors
export const getEmergencyDoctors = async (req, res) => {
    try {
        // ✅ Fetch ALL emergency doctors from database (no user filter)
        const emergencyDoctors = await EmergencyDoctor.find({}).populate('user', 'username email');
        res.json(emergencyDoctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an emergency doctor
// @route   PUT /api/emergencydoctors/:id
export const updateEmergencyDoctor = async (req, res) => {
    const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;
    
    try {
        const emergencyDoctor = await EmergencyDoctor.findById(req.params.id);
        
        if (emergencyDoctor) {
            // ✅ NO AUTHORIZATION CHECK - Anyone can edit any emergency doctor
            emergencyDoctor.doctor_name = doctor_name || emergencyDoctor.doctor_name;
            emergencyDoctor.doctor_mobile_number = doctor_mobile_number || emergencyDoctor.doctor_mobile_number;
            emergencyDoctor.workplace = workplace;
            emergencyDoctor.consultant = consultant;
            
            const updatedEmergencyDoctor = await emergencyDoctor.save();
            res.json(updatedEmergencyDoctor);
        } else {
            res.status(404).json({ message: 'Emergency Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an emergency doctor
// @route   DELETE /api/emergencydoctors/:id
export const deleteEmergencyDoctor = async (req, res) => {
    try {
        const emergencyDoctor = await EmergencyDoctor.findById(req.params.id);
        
        if (emergencyDoctor) {
            // ✅ NO AUTHORIZATION CHECK - Anyone can delete any emergency doctor
            await emergencyDoctor.deleteOne();
            res.json({ message: 'Emergency Doctor removed' });
        } else {
            res.status(404).json({ message: 'Emergency Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// import EmergencyDoctor from '../model/emergencydoctor.js';

// export const createEmergencyDoctor = async (req, res) => {
//     const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;
    
//     if (!doctor_name || !doctor_mobile_number) {
//         return res.status(400).json({ message: 'Name and Mobile Number are required' });
//     }
    
//     try {
//         const emergencyDoctor = new EmergencyDoctor({
//             user: req.user._id,
//             doctor_name,
//             doctor_mobile_number,
//             workplace,
//             consultant
//         });
//         const createdEmergencyDoctor = await emergencyDoctor.save();
//         res.status(201).json(createdEmergencyDoctor);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const getEmergencyDoctors = async (req, res) => {
//     try {
        
//         const emergencyDoctors = await EmergencyDoctor.find({}).populate('user', 'username email');
//         res.json(emergencyDoctors);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const updateEmergencyDoctor = async (req, res) => {
//     const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;
    
//     try {
//         const emergencyDoctor = await EmergencyDoctor.findById(req.params.id);
        
//         if (emergencyDoctor) {
            
//             if (emergencyDoctor.user.toString() !== req.user._id.toString()) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             }

//             emergencyDoctor.doctor_name = doctor_name || emergencyDoctor.doctor_name;
//             emergencyDoctor.doctor_mobile_number = doctor_mobile_number || emergencyDoctor.doctor_mobile_number;
//             emergencyDoctor.workplace = workplace;
//             emergencyDoctor.consultant = consultant;
            
//             const updatedEmergencyDoctor = await emergencyDoctor.save();
//             res.json(updatedEmergencyDoctor);
//         } else {
//             res.status(404).json({ message: 'Emergency Doctor not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const deleteEmergencyDoctor = async (req, res) => {
//     try {
//         const emergencyDoctor = await EmergencyDoctor.findById(req.params.id);
        
//         if (emergencyDoctor) {
            
//             if (emergencyDoctor.user.toString() !== req.user._id.toString()) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             }
            
//             await emergencyDoctor.deleteOne();
//             res.json({ message: 'Emergency Doctor removed' });
//         } else {
//             res.status(404).json({ message: 'Emergency Doctor not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// import { supabase } from "../config/supabaseClient.js";

// // Create Emergency Doctor
// export const createEmergencyDoctor = async (req, res) => {
//   const { doctorName, doctorNumber, consultant } = req.body;

//   if (!doctorName || !doctorNumber || !consultant) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('emergency_doctors')
//       .insert([{ doctor_name: doctorName, doctor_number: doctorNumber, consultant }])
//       .select();

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(201).json({ message: 'Emergency doctor added successfully!', doctor: data[0] });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// // Get All Emergency Doctors
// export const getAllEmergencyDoctors = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('emergency_doctors')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(200).json({ doctors: data });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// // Get Single Emergency Doctor
// export const getEmergencyDoctorById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const { data, error } = await supabase
//       .from('emergency_doctors')
//       .select('*')
//       .eq('id', id)
//       .single();

//     if (error) {
//       return res.status(404).json({ error: 'Doctor not found.' });
//     }

//     res.status(200).json({ doctor: data });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// // Update Emergency Doctor
// export const updateEmergencyDoctor = async (req, res) => {
//   const { id } = req.params;
//   const { doctorName, doctorNumber, consultant } = req.body;

//   if (!doctorName || !doctorNumber || !consultant) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('emergency_doctors')
//       .update({ doctor_name: doctorName, doctor_number: doctorNumber, consultant })
//       .eq('id', id)
//       .select();

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     if (data.length === 0) {
//       return res.status(404).json({ error: 'Doctor not found.' });
//     }

//     res.status(200).json({ message: 'Emergency doctor updated successfully!', doctor: data[0] });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// // Delete Emergency Doctor
// export const deleteEmergencyDoctor = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const { error } = await supabase
//       .from('emergency_doctors')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(200).json({ message: 'Emergency doctor deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };
