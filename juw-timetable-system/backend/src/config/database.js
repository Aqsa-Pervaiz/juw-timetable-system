/**
 * Database Configuration
 * PostgreSQL connection for SlotSync
 * CS & SE Department Timetable System
 */

const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'juw_timetable',
    ssl: false
});

const testConnection = async () => {
    try {
        await pool.query('SELECT 1');
        logger.info('✅ PostgreSQL connected successfully - SlotSync Database');
        return true;
    } catch (err) {
        logger.error('❌ PostgreSQL connection failed:', err.message);
        return false;
    }
};

const executeQuery = async (query, params = []) => {
    const result = await pool.query(query, params);
    return result.rows;
};

const executeTransaction = async (callback) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    pool,
    testConnection,
    executeQuery,
    executeTransaction
};
