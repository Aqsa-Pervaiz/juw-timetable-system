/**
 * Conflict Detection Utility (FIXED FOR POSTGRESQL)
 * Detects scheduling conflicts in timetable entries
 */

const { executeQuery } = require('../config/database');
const logger = require('../config/logger');

/**
 * Check if two time ranges overlap
 * @param {string} start1 - Start time of first range
 * @param {string} end1 - End time of first range
 * @param {string} start2 - Start time of second range
 * @param {string} end2 - End time of second range
 * @returns {boolean} True if times overlap
 */
const timesOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
};

/**
 * Detect all types of conflicts for a timetable entry
 * @param {Object} entry - Timetable entry to check
 * @param {number} excludeId - ID to exclude from check (for updates)
 * @returns {Promise<Object>} Conflict detection results
 */
const detectConflicts = async (entry, excludeId = null) => {
    const { teacher_id, room_id, batch_id, day_of_week, start_time, end_time } = entry;
    
    const conflicts = {
        hasConflict: false,
        teacherConflict: [],
        roomConflict: [],
        batchConflict: []
    };

    try {
        // Build query to find overlapping entries
        let query = `
            SELECT 
                te.*,
                t.full_name as teacher_name,
                s.subject_name,
                b.batch_name,
                r.room_number
            FROM timetable_entries te
            JOIN teachers t ON te.teacher_id = t.id
            JOIN subjects s ON te.subject_id = s.id
            JOIN batches b ON te.batch_id = b.id
            JOIN rooms r ON te.room_id = r.id
            WHERE te.day_of_week = $1
            AND te.status != 'rejected'
        `;

        const params = [day_of_week];
        let paramCount = 1;

        // Exclude current entry if updating
        if (excludeId) {
            paramCount++;
            query += ` AND te.id != $${paramCount}`;
            params.push(excludeId);
        }

        const existingEntries = await executeQuery(query, params);

        // Check each existing entry for conflicts
        for (const existing of existingEntries) {
            // Check if times overlap
            if (timesOverlap(start_time, end_time, existing.start_time, existing.end_time)) {
                // Teacher conflict
                if (existing.teacher_id === teacher_id) {
                    conflicts.hasConflict = true;
                    conflicts.teacherConflict.push({
                        entry_id: existing.id,
                        teacher: existing.teacher_name,
                        subject: existing.subject_name,
                        batch: existing.batch_name,
                        room: existing.room_number,
                        time: `${existing.start_time} - ${existing.end_time}`,
                        day: existing.day_of_week
                    });
                }

                // Room conflict
                if (existing.room_id === room_id) {
                    conflicts.hasConflict = true;
                    conflicts.roomConflict.push({
                        entry_id: existing.id,
                        room: existing.room_number,
                        teacher: existing.teacher_name,
                        subject: existing.subject_name,
                        batch: existing.batch_name,
                        time: `${existing.start_time} - ${existing.end_time}`,
                        day: existing.day_of_week
                    });
                }

                // Batch conflict
                if (existing.batch_id === batch_id) {
                    conflicts.hasConflict = true;
                    conflicts.batchConflict.push({
                        entry_id: existing.id,
                        batch: existing.batch_name,
                        teacher: existing.teacher_name,
                        subject: existing.subject_name,
                        room: existing.room_number,
                        time: `${existing.start_time} - ${existing.end_time}`,
                        day: existing.day_of_week
                    });
                }
            }
        }

        // Log conflicts if found
        if (conflicts.hasConflict) {
            logger.warn('Conflicts detected:', {
                entry,
                conflicts
            });
        }

        return conflicts;
    } catch (error) {
        logger.error('Error detecting conflicts:', error.message);
        throw error;
    }
};

/**
 * Get all conflicts for a department
 * @param {number} departmentId - Department ID
 * @returns {Promise<Array>} List of all conflicts
 */
const getDepartmentConflicts = async (departmentId) => {
    try {
        const query = `
            SELECT 
                te1.id as entry1_id,
                te2.id as entry2_id,
                te1.day_of_week,
                te1.start_time,
                te1.end_time,
                t1.full_name as teacher1_name,
                t2.full_name as teacher2_name,
                s1.subject_name as subject1_name,
                s2.subject_name as subject2_name,
                b1.batch_name as batch1_name,
                b2.batch_name as batch2_name,
                r1.room_number as room1_number,
                r2.room_number as room2_number,
                CASE
                    WHEN te1.teacher_id = te2.teacher_id THEN 'teacher'
                    WHEN te1.room_id = te2.room_id THEN 'room'
                    WHEN te1.batch_id = te2.batch_id THEN 'batch'
                END as conflict_type
            FROM timetable_entries te1
            JOIN timetable_entries te2 ON 
                te1.id < te2.id
                AND te1.day_of_week = te2.day_of_week
                AND te1.status != 'rejected'
                AND te2.status != 'rejected'
                AND (
                    (te1.start_time < te2.end_time AND te2.start_time < te1.end_time)
                )
                AND (
                    te1.teacher_id = te2.teacher_id
                    OR te1.room_id = te2.room_id
                    OR te1.batch_id = te2.batch_id
                )
            JOIN teachers t1 ON te1.teacher_id = t1.id
            JOIN teachers t2 ON te2.teacher_id = t2.id
            JOIN subjects s1 ON te1.subject_id = s1.id
            JOIN subjects s2 ON te2.subject_id = s2.id
            JOIN batches b1 ON te1.batch_id = b1.id
            JOIN batches b2 ON te2.batch_id = b2.id
            JOIN rooms r1 ON te1.room_id = r1.id
            JOIN rooms r2 ON te2.room_id = r2.id
            WHERE t1.department_id = $1
        `;

        const conflicts = await executeQuery(query, [departmentId]);
        return conflicts;
    } catch (error) {
        logger.error('Error getting department conflicts:', error.message);
        throw error;
    }
};

module.exports = {
    detectConflicts,
    getDepartmentConflicts,
    timesOverlap
};
