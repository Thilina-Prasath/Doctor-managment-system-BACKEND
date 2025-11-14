import express from 'express';
import { createEmergencyDoctor, getEmergencyDoctors, updateEmergencyDoctor, deleteEmergencyDoctor } from '../controller/emergencyDoctorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createEmergencyDoctor).get(protect, getEmergencyDoctors);
router.route('/:id').put(protect, updateEmergencyDoctor).delete(protect, deleteEmergencyDoctor);

export default router;

// import express from 'express';
// import {
//   createEmergencyDoctor,
//   getAllEmergencyDoctors,
//   getEmergencyDoctorById,
//   updateEmergencyDoctor,
//   deleteEmergencyDoctor
// } from '../controller/emergencyDoctorController.js';

// const router = express.Router();

// router.post('/', createEmergencyDoctor);
// router.get('/', getAllEmergencyDoctors);
// router.get('/:id', getEmergencyDoctorById);
// router.put('/:id', updateEmergencyDoctor);
// router.delete('/:id', deleteEmergencyDoctor);

// export default router;
