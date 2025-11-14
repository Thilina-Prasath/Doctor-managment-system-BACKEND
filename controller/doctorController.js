import Doctor from '../model/doctor.js';


const createDoctor = async (req, res) => {
    const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;

    if (!doctor_name || !doctor_mobile_number || !workplace || !consultant) {
        return res.status(400).json({ message: 'Please provide all required fields: name, mobile number, workplace, and consultant.' });
    }

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Not authorized. User information is missing.' });
        }

        const doctor = new Doctor({
            user: req.user._id,
            doctor_name,
            doctor_mobile_number,
            workplace,
            consultant,
        });

        const createdDoctor = await doctor.save();
        res.status(201).json(createdDoctor);
    } catch (error) {
        console.error('Error in createDoctor:', error);
        res.status(500).json({ message: 'Server error while creating doctor.' });
    }
};


const getDoctors = async (req, res) => {
    try {
        // ✅ Fetch ALL doctors from database (no user filter)
        const doctors = await Doctor.find({}).populate('user', 'username email');
        res.json(doctors);
    } catch (error) {
        console.error('Error in getDoctors:', error);
        res.status(500).json({ message: 'Server error while fetching doctors.' });
    }
};


const updateDoctor = async (req, res) => {
    const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (doctor) {
            // ✅ NO AUTHORIZATION CHECK - Anyone can edit any doctor
            doctor.doctor_name = doctor_name || doctor.doctor_name;
            doctor.doctor_mobile_number = doctor_mobile_number || doctor.doctor_mobile_number;
            doctor.workplace = workplace || doctor.workplace;
            doctor.consultant = consultant || doctor.consultant;

            const updatedDoctor = await doctor.save();
            res.json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Error in updateDoctor:', error);
        res.status(500).json({ message: 'Server error while updating doctor.' });
    }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (doctor) {
            // ✅ NO AUTHORIZATION CHECK - Anyone can delete any doctor
            await doctor.deleteOne();
            res.json({ message: 'Doctor removed' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Error in deleteDoctor:', error);
        res.status(500).json({ message: 'Server error while deleting doctor.' });
    }
};

export { createDoctor, getDoctors, updateDoctor, deleteDoctor };


// import Doctor from '../model/doctor.js';

// // @desc    Create a new doctor
// // @route   POST /api/doctors
// // @access  Private
// const createDoctor = async (req, res) => {
//     const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;

//     if (!doctor_name || !doctor_mobile_number || !workplace || !consultant) {
//         return res.status(400).json({ message: 'Please provide all required fields: name, mobile number, workplace, and consultant.' });
//     }

//     try {
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ message: 'Not authorized. User information is missing.' });
//         }

//         const doctor = new Doctor({
//             user: req.user._id,
//             doctor_name,
//             doctor_mobile_number,
//             workplace,
//             consultant,
//         });

//         const createdDoctor = await doctor.save();
//         res.status(201).json(createdDoctor);
//     } catch (error) {
//         console.error('Error in createDoctor:', error);
//         res.status(500).json({ message: 'Server error while creating doctor.' });
//     }
// };

// // @desc    Get all doctors (SHARED - all users see all doctors)
// // @route   GET /api/doctors
// // @access  Private
// const getDoctors = async (req, res) => {
//     try {
//         // ✅ FIX: Remove the filter - fetch ALL doctors from database
//         // Old code: const doctors = await Doctor.find({ user: req.user._id });
//         const doctors = await Doctor.find({}).populate('user', 'username email');
//         res.json(doctors);
//     } catch (error) {
//         console.error('Error in getDoctors:', error);
//         res.status(500).json({ message: 'Server error while fetching doctors.' });
//     }
// };

// // @desc    Update a doctor
// // @route   PUT /api/doctors/:id
// // @access  Private
// const updateDoctor = async (req, res) => {
//     const { doctor_name, doctor_mobile_number, workplace, consultant } = req.body;
//     try {
//         const doctor = await Doctor.findById(req.params.id);

//         if (doctor) {
//             // ✅ OPTIONAL: Allow any user to update any doctor
//             // Remove authorization check if you want shared editing
//             // Comment out these lines if everyone can edit:
//             if (doctor.user.toString() !== req.user._id.toString()) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             }

//             doctor.doctor_name = doctor_name || doctor.doctor_name;
//             doctor.doctor_mobile_number = doctor_mobile_number || doctor.doctor_mobile_number;
//             doctor.workplace = workplace || doctor.workplace;
//             doctor.consultant = consultant || doctor.consultant;

//             const updatedDoctor = await doctor.save();
//             res.json(updatedDoctor);
//         } else {
//             res.status(404).json({ message: 'Doctor not found' });
//         }
//     } catch (error) {
//         console.error('Error in updateDoctor:', error);
//         res.status(500).json({ message: 'Server error while updating doctor.' });
//     }
// };

// // @desc    Delete a doctor
// // @route   DELETE /api/doctors/:id
// // @access  Private
// const deleteDoctor = async (req, res) => {
//     try {
//         const doctor = await Doctor.findById(req.params.id);

//         if (doctor) {
//             // ✅ OPTIONAL: Allow any user to delete any doctor
//             // Remove authorization check if you want shared deletion
//             // Comment out these lines if everyone can delete:
//             if (doctor.user.toString() !== req.user._id.toString()) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             }
            
//             await doctor.deleteOne();
//             res.json({ message: 'Doctor removed' });
//         } else {
//             res.status(404).json({ message: 'Doctor not found' });
//         }
//     } catch (error) {
//         console.error('Error in deleteDoctor:', error);
//         res.status(500).json({ message: 'Server error while deleting doctor.' });
//     }
// };

// export { createDoctor, getDoctors, updateDoctor, deleteDoctor };





// import { supabase } from '../config/supabaseClient.js';

// // Controller to add a new doctor
// export const addDoctor = async (req, res) => {
//   try {
//     // Defensive check: Ensure body exists
//     if (!req.body) {
//       console.error('Request body is missing.');
//       return res.status(400).json({ message: 'Missing form data.' });
//     }

//     const { id: user_id } = req.user;

//     // Safely access properties from req.body
//     const doctor_name = req.body.doctor_name;
//     const doctor_mobile_number = req.body.doctor_mobile_number;
//     const workplace = req.body.workplace;
//     const consultant = req.body.consultant;

//     // Validate required fields
//     if (!doctor_name) {
//       return res.status(400).json({ message: 'Doctor name is required.' });
//     }

//     // Prepare doctor details to be saved in the database
//     const doctorDetails = {
//       user_id,
//       doctor_name,
//       doctor_mobile_number,
//       workplace,
//       consultant,
//     };

//     // Insert the new doctor record into the Supabase 'doctors' table
//     const { data: doctorData, error: dbError } = await supabase
//       .from('doctors')
//       .insert(doctorDetails)
//       .select()
//       .single();

//     if (dbError) {
//       console.error('Supabase DB insert error:', dbError);
//       throw new Error('Failed to save doctor details.');
//     }

//     res.status(201).json(doctorData);
//   } catch (error) {
//     console.error('Error in addDoctor:', error);
//     res.status(500).json({ message: error.message || 'Server error while adding doctor.' });
//   }
// };

// // Controller to get all doctors for the logged-in user
// export const getDoctors = async (req, res) => {
//   try {
//     const { id: user_id } = req.user;

//     const { data, error } = await supabase
//       .from('doctors')
//       .select('*')
//       .eq('user_id', user_id);

//     if (error) {
//       throw error;
//     }

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch doctors.' });
//   }
// };