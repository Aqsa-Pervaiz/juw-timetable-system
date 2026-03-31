const express = require('express');
const router = express.Router();
const {
    createSubject, getAllSubjects, updateSubject, deleteSubject,
    createBatch, getAllBatches, updateBatch, deleteBatch,
    createRoom, getAllRooms, updateRoom, deleteRoom,
    getAllDepartments
} = require('../controllers/resourceController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);

// Subjects
router.post('/subjects', authorize('office_assistant'), createSubject);
router.get('/subjects', getAllSubjects);
router.put('/subjects/:id', authorize('office_assistant'), updateSubject);
router.delete('/subjects/:id', authorize('office_assistant'), deleteSubject);

// Batches
router.post('/batches', authorize('office_assistant'), createBatch);
router.get('/batches', getAllBatches);
router.put('/batches/:id', authorize('office_assistant'), updateBatch);
router.delete('/batches/:id', authorize('office_assistant'), deleteBatch);

// Rooms
router.post('/rooms', authorize('office_assistant'), createRoom);
router.get('/rooms', getAllRooms);
router.put('/rooms/:id', authorize('office_assistant'), updateRoom);
router.delete('/rooms/:id', authorize('office_assistant'), deleteRoom);

// Departments
router.get('/departments', getAllDepartments);

module.exports = router;
