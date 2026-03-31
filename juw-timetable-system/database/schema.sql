-- =====================================================
-- SLOTSYNC TIMETABLE MANAGEMENT SYSTEM - DATABASE SCHEMA (PostgreSQL)
-- CS & SE Department Only
-- =====================================================

-- Drop tables in proper order
DROP TABLE IF EXISTS timetable_entries;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS batches;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS room_type CASCADE;
DROP TYPE IF EXISTS day_of_week CASCADE;
DROP TYPE IF EXISTS session_type CASCADE;
DROP TYPE IF EXISTS entry_status CASCADE;
DROP TYPE IF EXISTS program_type CASCADE;

-- -------------------------
-- ENUM types
-- -------------------------
CREATE TYPE user_role AS ENUM ('office_assistant', 'department_admin', 'teacher', 'student');
CREATE TYPE room_type AS ENUM ('lecture', 'lab', 'seminar');
CREATE TYPE day_of_week AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
CREATE TYPE session_type AS ENUM ('theory', 'lab', 'tutorial');
CREATE TYPE entry_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE program_type AS ENUM ('CS', 'SE', 'DS');

-- -------------------------
-- Departments (CS & SE Department Only)
-- -------------------------
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Users
-- -------------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT REFERENCES departments(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Teachers
-- -------------------------
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id),
    teacher_code VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL REFERENCES departments(id),
    email VARCHAR(100),
    phone VARCHAR(20),
    designation VARCHAR(50),
    specialization VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Subjects
-- -------------------------
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL REFERENCES departments(id),
    credit_hours INT DEFAULT 3,
    semester INT,
    program program_type,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Batches
-- -------------------------
CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    batch_code VARCHAR(50) NOT NULL UNIQUE,
    department_id INT NOT NULL REFERENCES departments(id),
    program program_type NOT NULL,
    semester INT NOT NULL,
    year INT NOT NULL,
    section VARCHAR(10),
    student_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Rooms
-- -------------------------
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL UNIQUE,
    room_name VARCHAR(100),
    building VARCHAR(50),
    capacity INT DEFAULT 30,
    room_type room_type DEFAULT 'lecture',
    has_projector BOOLEAN DEFAULT FALSE,
    facilities TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- Timetable Entries
-- -------------------------
CREATE TABLE timetable_entries (
    id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES teachers(id),
    subject_id INT NOT NULL REFERENCES subjects(id),
    batch_id INT NOT NULL REFERENCES batches(id),
    room_id INT NOT NULL REFERENCES rooms(id),
    day_of_week day_of_week NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    session_type session_type DEFAULT 'theory',
    status entry_status DEFAULT 'pending',
    created_by INT REFERENCES users(id),
    approved_by INT REFERENCES users(id),
    rejection_reason TEXT,
    notes TEXT,
    semester VARCHAR(20),
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP
);

