/**
 * Teacher Controller
 * SlotSync - CS & SE Department
 * Handles teacher CRUD operations
 */

const { executeQuery } = require('../config/database');
const logger = require('../config/logger');

/**
 * Create new teacher
 * POST /api/teachers
 */
const createTeacher = async (req, res, next) => {
    try {
        const { teacher_code, full_name, department_id, phone, email, specialization, user_id } = req.body;

        if (!teacher_code || !full_name || !department_id) {
            return res.status(400).json({
                success: false,
                message: 'Teacher code, name, and department are required'
            });
        }

        const query = `
            INSERT INTO teachers (teacher_code, full_name, department_id, phone, email, specialization, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const result = await executeQuery(query, [
            teacher_code, full_name, department_id, phone, email, specialization, user_id || null
        ]);

        logger.info(`Teacher created: ${teacher_code} by user ${req.user.user_id}`);

        res.status(201).json({
            success: true,
            message: 'Teacher created successfully',
            data: { id: result[0].id }
        });
    } catch (error) {
        logger.error('Create teacher error:', error.message);
        next(error);
    }
};

/**
 * Get all teachers
 * GET /api/teachers
 */
const getAllTeachers = async (req, res, next) => {
    try {
        const { department_id, is_active } = req.query;

        let query = `
            SELECT t.*, d.name as department_name, d.code as department_code
            FROM teachers t
            JOIN departments d ON t.department_id = d.id
            WHERE 1=1
        `;

        const params = [];
        let paramCount = 0;

        if (department_id) {
            paramCount++;
            query += ` AND t.department_id = $${paramCount}`;
            params.push(department_id);
        }

        if (is_active !== undefined) {
            paramCount++;
            query += ` AND t.is_active = $${paramCount}`;
            params.push(is_active === 'true');
        }

        query += ' ORDER BY t.full_name';

        const teachers = await executeQuery(query, params);

        res.json({
            success: true,
            count: teachers.length,
            data: { teachers }
        });
    } catch (error) {
        logger.error('Get teachers error:', error.message);
        next(error);
    }
};

/**
 * Get single teacher
 * GET /api/teachers/:id
 */
const getTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT t.*, d.name as department_name, d.code as department_code
            FROM teachers t
            JOIN departments d ON t.department_id = d.id
            WHERE t.id = $1
        `;

        const teachers = await executeQuery(query, [id]);

        if (teachers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.json({
            success: true,
            data: { teacher: teachers[0] }
        });
    } catch (error) {
        logger.error('Get teacher error:', error.message);
        next(error);
    }
};

/**
 * Update teacher
 * PUT /api/teachers/:id
 */
const updateTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { teacher_code, full_name, department_id, phone, email, specialization, is_active } = req.body;

        const updates = [];
        const params = [];
        let paramCount = 0;

        if (teacher_code) { 
            paramCount++;
            updates.push(`teacher_code = $${paramCount}`); 
            params.push(teacher_code); 
        }
        if (full_name) { 
            paramCount++;
            updates.push(`full_name = $${paramCount}`); 
            params.push(full_name); 
        }
        if (department_id) { 
            paramCount++;
            updates.push(`department_id = $${paramCount}`); 
            params.push(department_id); 
        }
        if (phone) { 
            paramCount++;
            updates.push(`phone = $${paramCount}`); 
            params.push(phone); 
        }
        if (email) { 
            paramCount++;
            updates.push(`email = $${paramCount}`); 
            params.push(email); 
        }
        if (specialization) { 
            paramCount++;
            updates.push(`specialization = $${paramCount}`); 
            params.push(specialization); 
        }
        if (is_active !== undefined) { 
            paramCount++;
            updates.push(`is_active = $${paramCount}`); 
            params.push(is_active); 
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        paramCount++;
        params.push(id);
        const query = `UPDATE teachers SET ${updates.join(', ')} WHERE id = $${paramCount}`;
        await executeQuery(query, params);

        logger.info(`Teacher updated: ID ${id} by user ${req.user.user_id}`);

        res.json({
            success: true,
            message: 'Teacher updated successfully'
        });
    } catch (error) {
        logger.error('Update teacher error:', error.message);
        next(error);
    }
};

/**
 * Delete teacher
 * DELETE /api/teachers/:id
 */
const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM teachers WHERE id = $1';
        await executeQuery(query, [id]);

        logger.info(`Teacher deleted: ID ${id} by user ${req.user.user_id}`);

        res.json({
            success: true,
            message: 'Teacher deleted successfully'
        });
    } catch (error) {
        logger.error('Delete teacher error:', error.message);
        next(error);
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher
};
