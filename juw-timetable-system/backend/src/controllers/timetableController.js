/**
 * Timetable Controller (FIXED FOR POSTGRESQL)
 * Handles timetable CRUD operations and conflict detection
 */

const { executeQuery } = require('../config/database');
const { detectConflicts } = require('../utils/conflictDetection');
const logger = require('../config/logger');

/**
 * Create new timetable entry
 * POST /api/timetable
 */
const createEntry = async (req, res, next) => {
    try {
        const {
            teacher_id,
            subject_id,
            batch_id,
            room_id,
            day_of_week,
            start_time,
            end_time,
            semester,
            academic_year,
            notes
        } = req.body;

        // Validate required fields
        if (!teacher_id || !subject_id || !batch_id || !room_id || !day_of_week || !start_time || !end_time) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate time range
        if (start_time >= end_time) {
            return res.status(400).json({
                success: false,
                message: 'End time must be after start time'
            });
        }

        // Check for conflicts
        const conflicts = await detectConflicts({
            teacher_id,
            room_id,
            batch_id,
            day_of_week,
            start_time,
            end_time
        });

        // Insert entry
        const query = `
            INSERT INTO timetable_entries 
            (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, 
             semester, academic_year, notes, created_by, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending')
            RETURNING id
        `;

        const result = await executeQuery(query, [
            teacher_id,
            subject_id,
            batch_id,
            room_id,
            day_of_week,
            start_time,
            end_time,
            semester,
            academic_year,
            notes,
            req.user.id
        ]);

        logger.info(`Timetable entry created: ID ${result[0].id} by user ${req.user.user_id}`);

        res.status(201).json({
            success: true,
            message: 'Timetable entry created successfully',
            data: {
                id: result[0].id,
                conflicts: conflicts.hasConflict ? conflicts : null
            }
        });
    } catch (error) {
        logger.error('Create timetable entry error:', error.message);
        next(error);
    }
};

/**
 * Get all timetable entries (with filters)
 * GET /api/timetable
 */
const getAllEntries = async (req, res, next) => {
    try {
        const { 
            department_id, 
            teacher_id, 
            batch_id, 
            room_id, 
            day_of_week, 
            status,
            semester,
            academic_year 
        } = req.query;

        let query = `
            SELECT 
                te.*,
                t.teacher_code, t.full_name as teacher_name,
                s.subject_code, s.subject_name,
                b.batch_code, b.batch_name, b.section,
                r.room_number, r.room_name, r.building,
                d.code as department_code, d.name as department_name,
                creator.full_name as created_by_name,
                approver.full_name as approved_by_name
            FROM timetable_entries te
            JOIN teachers t ON te.teacher_id = t.id
            JOIN subjects s ON te.subject_id = s.id
            JOIN batches b ON te.batch_id = b.id
            JOIN rooms r ON te.room_id = r.id
            JOIN departments d ON t.department_id = d.id
            LEFT JOIN users creator ON te.created_by = creator.id
            LEFT JOIN users approver ON te.approved_by = approver.id
            WHERE 1=1
        `;

        const params = [];
        let paramCount = 0;

        // Apply filters
        if (department_id) {
            paramCount++;
            query += ` AND d.id = $${paramCount}`;
            params.push(department_id);
        }

        if (teacher_id) {
            paramCount++;
            query += ` AND te.teacher_id = $${paramCount}`;
            params.push(teacher_id);
        }

        if (batch_id) {
            paramCount++;
            query += ` AND te.batch_id = $${paramCount}`;
            params.push(batch_id);
        }

        if (room_id) {
            paramCount++;
            query += ` AND te.room_id = $${paramCount}`;
            params.push(room_id);
        }

        if (day_of_week) {
            paramCount++;
            query += ` AND te.day_of_week = $${paramCount}`;
            params.push(day_of_week);
        }

        if (status) {
            paramCount++;
            query += ` AND te.status = $${paramCount}`;
            params.push(status);
        }

        if (semester) {
            paramCount++;
            query += ` AND te.semester = $${paramCount}`;
            params.push(semester);
        }

        if (academic_year) {
            paramCount++;
            query += ` AND te.academic_year = $${paramCount}`;
            params.push(academic_year);
        }

        query += ' ORDER BY te.day_of_week, te.start_time';

        const entries = await executeQuery(query, params);

        res.json({
            success: true,
            count: entries.length,
            data: { entries }
        });
    } catch (error) {
        logger.error('Get timetable entries error:', error.message);
        next(error);
    }
};

/**
 * Get single timetable entry
 * GET /api/timetable/:id
 */
const getEntry = async (req, res, next) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                te.*,
                t.teacher_code, t.full_name as teacher_name,
                s.subject_code, s.subject_name,
                b.batch_code, b.batch_name, b.section,
                r.room_number, r.room_name, r.building,
                d.code as department_code, d.name as department_name
            FROM timetable_entries te
            JOIN teachers t ON te.teacher_id = t.id
            JOIN subjects s ON te.subject_id = s.id
            JOIN batches b ON te.batch_id = b.id
            JOIN rooms r ON te.room_id = r.id
            JOIN departments d ON t.department_id = d.id
            WHERE te.id = $1
        `;

        const entries = await executeQuery(query, [id]);

        if (entries.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found'
            });
        }

        res.json({
            success: true,
            data: { entry: entries[0] }
        });
    } catch (error) {
        logger.error('Get timetable entry error:', error.message);
        next(error);
    }
};

/**
 * Update timetable entry
 * PUT /api/timetable/:id
 */
const updateEntry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            teacher_id,
            subject_id,
            batch_id,
            room_id,
            day_of_week,
            start_time,
            end_time,
            semester,
            academic_year,
            notes
        } = req.body;

        // Check if entry exists
        const checkQuery = 'SELECT * FROM timetable_entries WHERE id = $1';
        const existing = await executeQuery(checkQuery, [id]);

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found'
            });
        }

        // Validate time range
        if (start_time && end_time && start_time >= end_time) {
            return res.status(400).json({
                success: false,
                message: 'End time must be after start time'
            });
        }

        // Check for conflicts if time/day/resources changed
        let conflicts = null;
        if (teacher_id || room_id || batch_id || day_of_week || start_time || end_time) {
            const entryToCheck = {
                teacher_id: teacher_id || existing[0].teacher_id,
                room_id: room_id || existing[0].room_id,
                batch_id: batch_id || existing[0].batch_id,
                day_of_week: day_of_week || existing[0].day_of_week,
                start_time: start_time || existing[0].start_time,
                end_time: end_time || existing[0].end_time
            };
            conflicts = await detectConflicts(entryToCheck, id);
        }

        // Build update query dynamically
        const updates = [];
        const params = [];
        let paramCount = 0;

        if (teacher_id) {
            paramCount++;
            updates.push(`teacher_id = $${paramCount}`);
            params.push(teacher_id);
        }
        if (subject_id) {
            paramCount++;
            updates.push(`subject_id = $${paramCount}`);
            params.push(subject_id);
        }
        if (batch_id) {
            paramCount++;
            updates.push(`batch_id = $${paramCount}`);
            params.push(batch_id);
        }
        if (room_id) {
            paramCount++;
            updates.push(`room_id = $${paramCount}`);
            params.push(room_id);
        }
        if (day_of_week) {
            paramCount++;
            updates.push(`day_of_week = $${paramCount}`);
            params.push(day_of_week);
        }
        if (start_time) {
            paramCount++;
            updates.push(`start_time = $${paramCount}`);
            params.push(start_time);
        }
        if (end_time) {
            paramCount++;
            updates.push(`end_time = $${paramCount}`);
            params.push(end_time);
        }
        if (semester) {
            paramCount++;
            updates.push(`semester = $${paramCount}`);
            params.push(semester);
        }
        if (academic_year) {
            paramCount++;
            updates.push(`academic_year = $${paramCount}`);
            params.push(academic_year);
        }
        if (notes !== undefined) {
            paramCount++;
            updates.push(`notes = $${paramCount}`);
            params.push(notes);
        }

        // Reset status to pending if changes made
        paramCount++;
        updates.push(`status = $${paramCount}`);
        params.push('pending');

        paramCount++;
        params.push(id);

        const updateQuery = `UPDATE timetable_entries SET ${updates.join(', ')} WHERE id = $${paramCount}`;
        await executeQuery(updateQuery, params);

        logger.info(`Timetable entry updated: ID ${id} by user ${req.user.user_id}`);

        res.json({
            success: true,
            message: 'Timetable entry updated successfully',
            data: {
                conflicts: conflicts && conflicts.hasConflict ? conflicts : null
            }
        });
    } catch (error) {
        logger.error('Update timetable entry error:', error.message);
        next(error);
    }
};

/**
 * Delete timetable entry
 * DELETE /api/timetable/:id
 */
const deleteEntry = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if entry exists
        const checkQuery = 'SELECT * FROM timetable_entries WHERE id = $1';
        const existing = await executeQuery(checkQuery, [id]);

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found'
            });
        }

        // Delete entry
        const deleteQuery = 'DELETE FROM timetable_entries WHERE id = $1';
        await executeQuery(deleteQuery, [id]);

        logger.info(`Timetable entry deleted: ID ${id} by user ${req.user.user_id}`);

        res.json({
            success: true,
            message: 'Timetable entry deleted successfully'
        });
    } catch (error) {
        logger.error('Delete timetable entry error:', error.message);
        next(error);
    }
};

/**
 * Approve timetable entry
 * PUT /api/timetable/:id/approve
 */
const approveEntry = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if entry exists
        const checkQuery = 'SELECT * FROM timetable_entries WHERE id = $1';
        const existing = await executeQuery(checkQuery, [id]);

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found'
            });
        }

        // Check for conflicts before approving
        const entry = existing[0];
        const conflicts = await detectConflicts({
            teacher_id: entry.teacher_id,
            room_id: entry.room_id,
            batch_id: entry.batch_id,
            day_of_week: entry.day_of_week,
            start_time: entry.start_time,
            end_time: entry.end_time
        }, id);

        if (conflicts.hasConflict) {
            return res.status(400).json({
                success: false,
                message: 'Cannot approve entry with conflicts',
                data: { conflicts }
            });
        }

        // Approve entry
        const updateQuery = `
            UPDATE timetable_entries 
            SET status = 'approved', approved_by = $1, approved_at = NOW() 
            WHERE id = $2
        `;
        await executeQuery(updateQuery, [req.user.id, id]);

        logger.info(`Timetable entry approved: ID ${id} by user ${req.user.user_id}`);

        res.json({
            success: true,
            message: 'Timetable entry approved successfully'
        });
    } catch (error) {
        logger.error('Approve timetable entry error:', error.message);
        next(error);
    }
};

/**
 * Reject timetable entry
 * PUT /api/timetable/:id/reject
 */
const rejectEntry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rejection_reason } = req.body;

        // Check if entry exists
        const checkQuery = 'SELECT * FROM timetable_entries WHERE id = $1';
        const existing = await executeQuery(checkQuery, [id]);

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found'
            });
        }

        // Reject entry
        const updateQuery = `
            UPDATE timetable_entries 
            SET status = 'rejected', rejection_reason = $1, approved_by = $2, approved_at = NOW() 
            WHERE id = $3
        `;
        await executeQuery(updateQuery, [rejection_reason, req.user.id, id]);

        logger.info(`Timetable entry rejected: ID ${id} by user ${req.user.user_id}`);

        res.json({
            success: true,
            message: 'Timetable entry rejected successfully'
        });
    } catch (error) {
        logger.error('Reject timetable entry error:', error.message);
        next(error);
    }
};

/**
 * Check conflicts for a potential entry
 * POST /api/timetable/check-conflicts
 */
const checkConflicts = async (req, res, next) => {
    try {
        const { teacher_id, room_id, batch_id, day_of_week, start_time, end_time } = req.body;

        if (!teacher_id || !room_id || !batch_id || !day_of_week || !start_time || !end_time) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const conflicts = await detectConflicts({
            teacher_id,
            room_id,
            batch_id,
            day_of_week,
            start_time,
            end_time
        });

        res.json({
            success: true,
            data: { conflicts }
        });
    } catch (error) {
        logger.error('Check conflicts error:', error.message);
        next(error);
    }
};

module.exports = {
    createEntry,
    getAllEntries,
    getEntry,
    updateEntry,
    deleteEntry,
    approveEntry,
    rejectEntry,
    checkConflicts
};
