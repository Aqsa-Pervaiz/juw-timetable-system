/**
 * Authentication Controller (PostgreSQL)
 * SlotSync - CS & SE Department
 * Handles user login, profile, and password changes
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/database');
const logger = require('../config/logger');

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
    try {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(400).json({ success: false, message: 'Please provide User ID and password' });
        }

        // Fetch user with department info
        const query = `
            SELECT u.*, d.name AS department_name, d.code AS department_code
            FROM users u
            LEFT JOIN departments d ON u.department_id = d.id
            WHERE u.user_id = $1 AND u.is_active = TRUE
        `;
        const users = await executeQuery(query, [user_id]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                user_id: user.user_id,
                role: user.role,
                department_id: user.department_id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        // If teacher, fetch teacher info
        let additionalData = {};
        if (user.role === 'teacher') {
            const teacherQuery = 'SELECT id, teacher_code FROM teachers WHERE user_id = $1 AND is_active = TRUE';
            const teachers = await executeQuery(teacherQuery, [user.id]);
            if (teachers.length > 0) {
                additionalData.teacher_id = teachers[0].id;
                additionalData.teacher_code = teachers[0].teacher_code;
            }
        }

        logger.info(`User logged in: ${user.user_id} (${user.role})`);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    user_id: user.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    department_id: user.department_id,
                    department_name: user.department_name,
                    department_code: user.department_code,
                    ...additionalData
                }
            }
        });
    } catch (error) {
        logger.error('Login error:', error.message);
        next(error);
    }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
const getProfile = async (req, res, next) => {
    try {
        const query = `
            SELECT u.*, d.name AS department_name, d.code AS department_code
            FROM users u
            LEFT JOIN departments d ON u.department_id = d.id
            WHERE u.id = $1
        `;
        const users = await executeQuery(query, [req.user.id]);

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = users[0];
        delete user.password; // Remove password from response

        res.json({ success: true, data: { user } });
    } catch (error) {
        logger.error('Get profile error:', error.message);
        next(error);
    }
};

/**
 * Change password
 * PUT /api/auth/change-password
 */
const changePassword = async (req, res, next) => {
    try {
        const { current_password, new_password } = req.body;

        if (!current_password || !new_password) {
            return res.status(400).json({ success: false, message: 'Please provide current and new password' });
        }

        if (new_password.length < 6) {
            return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
        }

        const query = 'SELECT * FROM users WHERE id = $1';
        const users = await executeQuery(query, [req.user.id]);
        const user = users[0];

        const isPasswordValid = await bcrypt.compare(current_password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
        await executeQuery(updateQuery, [hashedPassword, req.user.id]);

        logger.info(`Password changed for user: ${user.user_id}`);

        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        logger.error('Change password error:', error.message);
        next(error);
    }
};

module.exports = {
    login,
    getProfile,
    changePassword
};
