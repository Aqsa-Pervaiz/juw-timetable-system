const express = require('express');
const router = express.Router();
const {
    createTeacher,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);

router.post('/', authorize('office_assistant'), createTeacher);
router.get('/', getAllTeachers);
router.get('/:id', getTeacher);
router.put('/:id', authorize('office_assistant'), updateTeacher);
router.delete('/:id', authorize('office_assistant'), deleteTeacher);

module.exports = router;
