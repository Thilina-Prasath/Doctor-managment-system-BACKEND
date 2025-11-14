import express from 'express';
import { createDoctor,getDoctors,updateDoctor,deleteDoctor} from '../controller/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createDoctor)
    .get(protect, getDoctors);


router.route('/:id')
    .put(protect, updateDoctor)
    .delete(protect, deleteDoctor);

export default router;



// import express from 'express';
// import { addDoctor, getDoctors } from '../controller/doctorController.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Apply auth middleware to protect routes
// router.use(authMiddleware);

// // Use upload.single('image') for handling the file upload
// router.post('/add', addDoctor);
// router.get('/', getDoctors);

// export default router;
