const express = require('express');
const router = express.Router();
const {
    createEntry,
    getAllEntries,
    getEntry,
    updateEntry,
    deleteEntry,
    approveEntry,
    rejectEntry,
    checkConflicts
} = require('../controllers/timetableController');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Check conflicts
router.post('/check-conflicts', checkConflicts);

// CRUD operations
router.post('/', authorize('office_assistant'), createEntry);
router.get('/', getAllEntries);
router.get('/:id', getEntry);
router.put('/:id', authorize('office_assistant', 'department_admin'), updateEntry);
router.delete('/:id', authorize('office_assistant', 'department_admin'), deleteEntry);

// Approval operations
router.put('/:id/approve', authorize('department_admin'), approveEntry);
router.put('/:id/reject', authorize('department_admin'), rejectEntry);

module.exports = router;
