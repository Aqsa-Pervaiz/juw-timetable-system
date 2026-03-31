/**
 * Resource Controller (CORRECTED FOR POSTGRESQL)
 * Handles subjects, batches, rooms, and departments
 */

const { executeQuery } = require('../config/database');
const logger = require('../config/logger');

// ============ SUBJECTS ============

const createSubject = async (req, res, next) => {
    try {
        const { subject_code, subject_name, department_id, credit_hours, semester } = req.body;

        if (!subject_code || !subject_name || !department_id) {
            return res.status(400).json({
                success: false,
                message: 'Subject code, name, and department are required'
            });
        }

        const query = `
            INSERT INTO subjects (subject_code, subject_name, department_id, credit_hours, semester) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const result = await executeQuery(query, [
            subject_code, 
            subject_name, 
            department_id, 
            credit_hours || 3, 
            semester
        ]);

        logger.info(`Subject created: ${subject_code}`);

        res.status(201).json({
            success: true,
            message: 'Subject created successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        logger.error('Create subject error:', error.message);
        next(error);
    }
};

const getAllSubjects = async (req, res, next) => {
    try {
        const { department_id } = req.query;
        let query = `
            SELECT s.*, d.name AS department_name 
            FROM subjects s 
            JOIN departments d ON s.department_id = d.id 
            WHERE 1=1
        `;
        const params = [];
        let paramCount = 0;

        if (department_id) {
            paramCount++;
            query += ` AND s.department_id = $${paramCount}`;
            params.push(department_id);
        }

        query += ' ORDER BY s.subject_name';
        const subjects = await executeQuery(query, params);

        res.json({ success: true, count: subjects.length, data: { subjects } });
    } catch (error) {
        logger.error('Get subjects error:', error.message);
        next(error);
    }
};

const updateSubject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { subject_code, subject_name, department_id, credit_hours, semester, is_active } = req.body;

        const updates = [];
        const params = [];
        let paramCount = 0;

        if (subject_code) { 
            paramCount++;
            updates.push(`subject_code = $${paramCount}`); 
            params.push(subject_code); 
        }
        if (subject_name) { 
            paramCount++;
            updates.push(`subject_name = $${paramCount}`); 
            params.push(subject_name); 
        }
        if (department_id) { 
            paramCount++;
            updates.push(`department_id = $${paramCount}`); 
            params.push(department_id); 
        }
        if (credit_hours) { 
            paramCount++;
            updates.push(`credit_hours = $${paramCount}`); 
            params.push(credit_hours); 
        }
        if (semester) { 
            paramCount++;
            updates.push(`semester = $${paramCount}`); 
            params.push(semester); 
        }
        if (is_active !== undefined) { 
            paramCount++;
            updates.push(`is_active = $${paramCount}`); 
            params.push(is_active); 
        }

        if (updates.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }

        paramCount++;
        params.push(id);
        await executeQuery(`UPDATE subjects SET ${updates.join(', ')} WHERE id = $${paramCount}`, params);

        res.json({ success: true, message: 'Subject updated successfully' });
    } catch (error) {
        logger.error('Update subject error:', error.message);
        next(error);
    }
};

const deleteSubject = async (req, res, next) => {
    try {
        const { id } = req.params;
        await executeQuery('DELETE FROM subjects WHERE id = $1', [id]);
        res.json({ success: true, message: 'Subject deleted successfully' });
    } catch (error) {
        logger.error('Delete subject error:', error.message);
        next(error);
    }
};

// ============ BATCHES ============

const createBatch = async (req, res, next) => {
    try {
        const { batch_code, batch_name, department_id, semester, section, student_count, academic_year } = req.body;

        if (!batch_code || !batch_name || !department_id || !semester) {
            return res.status(400).json({
                success: false,
                message: 'Batch code, name, department, and semester are required'
            });
        }

        const query = `
            INSERT INTO batches (batch_code, batch_name, department_id, semester, section, student_count, academic_year) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;
        const result = await executeQuery(query, [
            batch_code, 
            batch_name, 
            department_id, 
            semester, 
            section, 
            student_count || 0, 
            academic_year
        ]);

        logger.info(`Batch created: ${batch_code}`);

        res.status(201).json({
            success: true,
            message: 'Batch created successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        logger.error('Create batch error:', error.message);
        next(error);
    }
};

const getAllBatches = async (req, res, next) => {
    try {
        const { department_id, semester } = req.query;
        let query = `
            SELECT b.*, d.name AS department_name 
            FROM batches b 
            JOIN departments d ON b.department_id = d.id 
            WHERE 1=1
        `;
        const params = [];
        let paramCount = 0;

        if (department_id) {
            paramCount++;
            query += ` AND b.department_id = $${paramCount}`;
            params.push(department_id);
        }
        if (semester) {
            paramCount++;
            query += ` AND b.semester = $${paramCount}`;
            params.push(semester);
        }

        query += ' ORDER BY b.batch_name';
        const batches = await executeQuery(query, params);

        res.json({ success: true, count: batches.length, data: { batches } });
    } catch (error) {
        logger.error('Get batches error:', error.message);
        next(error);
    }
};

const updateBatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { batch_code, batch_name, department_id, semester, section, student_count, academic_year, is_active } = req.body;

        const updates = [];
        const params = [];
        let paramCount = 0;

        if (batch_code) { 
            paramCount++;
            updates.push(`batch_code = $${paramCount}`); 
            params.push(batch_code); 
        }
        if (batch_name) { 
            paramCount++;
            updates.push(`batch_name = $${paramCount}`); 
            params.push(batch_name); 
        }
        if (department_id) { 
            paramCount++;
            updates.push(`department_id = $${paramCount}`); 
            params.push(department_id); 
        }
        if (semester) { 
            paramCount++;
            updates.push(`semester = $${paramCount}`); 
            params.push(semester); 
        }
        if (section) { 
            paramCount++;
            updates.push(`section = $${paramCount}`); 
            params.push(section); 
        }
        if (student_count) { 
            paramCount++;
            updates.push(`student_count = $${paramCount}`); 
            params.push(student_count); 
        }
        if (academic_year) { 
            paramCount++;
            updates.push(`academic_year = $${paramCount}`); 
            params.push(academic_year); 
        }
        if (is_active !== undefined) { 
            paramCount++;
            updates.push(`is_active = $${paramCount}`); 
            params.push(is_active); 
        }

        if (updates.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }

        paramCount++;
        params.push(id);
        await executeQuery(`UPDATE batches SET ${updates.join(', ')} WHERE id = $${paramCount}`, params);

        res.json({ success: true, message: 'Batch updated successfully' });
    } catch (error) {
        logger.error('Update batch error:', error.message);
        next(error);
    }
};

const deleteBatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        await executeQuery('DELETE FROM batches WHERE id = $1', [id]);
        res.json({ success: true, message: 'Batch deleted successfully' });
    } catch (error) {
        logger.error('Delete batch error:', error.message);
        next(error);
    }
};

// ============ ROOMS ============

const createRoom = async (req, res, next) => {
    try {
        const { room_number, room_name, building, capacity, room_type, facilities } = req.body;

        if (!room_number) {
            return res.status(400).json({
                success: false,
                message: 'Room number is required'
            });
        }

        const query = `
            INSERT INTO rooms (room_number, room_name, building, capacity, room_type, facilities) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;
        const result = await executeQuery(query, [
            room_number, 
            room_name, 
            building, 
            capacity || 0, 
            room_type || 'lecture_hall', 
            facilities
        ]);

        logger.info(`Room created: ${room_number}`);

        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        logger.error('Create room error:', error.message);
        next(error);
    }
};

const getAllRooms = async (req, res, next) => {
    try {
        const { building, room_type } = req.query;
        let query = 'SELECT * FROM rooms WHERE 1=1';
        const params = [];
        let paramCount = 0;

        if (building) {
            paramCount++;
            query += ` AND building = $${paramCount}`;
            params.push(building);
        }
        if (room_type) {
            paramCount++;
            query += ` AND room_type = $${paramCount}`;
            params.push(room_type);
        }

        query += ' ORDER BY room_number';
        const rooms = await executeQuery(query, params);

        res.json({ success: true, count: rooms.length, data: { rooms } });
    } catch (error) {
        logger.error('Get rooms error:', error.message);
        next(error);
    }
};

const updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { room_number, room_name, building, capacity, room_type, facilities, is_active } = req.body;

        const updates = [];
        const params = [];
        let paramCount = 0;

        if (room_number) { 
            paramCount++;
            updates.push(`room_number = $${paramCount}`); 
            params.push(room_number); 
        }
        if (room_name) { 
            paramCount++;
            updates.push(`room_name = $${paramCount}`); 
            params.push(room_name); 
        }
        if (building) { 
            paramCount++;
            updates.push(`building = $${paramCount}`); 
            params.push(building); 
        }
        if (capacity) { 
            paramCount++;
            updates.push(`capacity = $${paramCount}`); 
            params.push(capacity); 
        }
        if (room_type) { 
            paramCount++;
            updates.push(`room_type = $${paramCount}`); 
            params.push(room_type); 
        }
        if (facilities) { 
            paramCount++;
            updates.push(`facilities = $${paramCount}`); 
            params.push(facilities); 
        }
        if (is_active !== undefined) { 
            paramCount++;
            updates.push(`is_active = $${paramCount}`); 
            params.push(is_active); 
        }

        if (updates.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }

        paramCount++;
        params.push(id);
        await executeQuery(`UPDATE rooms SET ${updates.join(', ')} WHERE id = $${paramCount}`, params);

        res.json({ success: true, message: 'Room updated successfully' });
    } catch (error) {
        logger.error('Update room error:', error.message);
        next(error);
    }
};

const deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        await executeQuery('DELETE FROM rooms WHERE id = $1', [id]);
        res.json({ success: true, message: 'Room deleted successfully' });
    } catch (error) {
        logger.error('Delete room error:', error.message);
        next(error);
    }
};

// ============ DEPARTMENTS ============

const getAllDepartments = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM departments ORDER BY name';
        const departments = await executeQuery(query);
        res.json({ success: true, count: departments.length, data: { departments } });
    } catch (error) {
        logger.error('Get departments error:', error.message);
        next(error);
    }
};

module.exports = {
    // Subjects
    createSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject,
    // Batches
    createBatch,
    getAllBatches,
    updateBatch,
    deleteBatch,
    // Rooms
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
    // Departments
    getAllDepartments
};
