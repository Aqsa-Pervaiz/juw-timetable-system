-- =====================================================
-- YOUR REAL DATA - SQL INSERT STATEMENTS (FIXED)
-- SlotSync Timetable Management System
-- =====================================================

-- Run the schema.sql first, then run this file!

-- ===========================
-- 0. INSERT DEPARTMENT FIRST (THIS WAS MISSING!)
-- ===========================

INSERT INTO departments (id, name, code) VALUES
(1, 'Computer Science & Software Engineering', 'CS_SE');

-- ===========================
-- 1. INSERT YOUR REAL TEACHERS
-- ===========================

-- Department ID 1 = CS & SE Department (from schema.sql)

INSERT INTO teachers (teacher_code, full_name, department_id, email, specialization) VALUES
('T001', 'Ms. Ummay Faseaha', 1, 'ummay.faseaha@juw.edu.pk', 'Computer Organization & Assembly Language, AI'),
('T002', 'Ms. Anum Furqan Akbani', 1, 'anum.akbani@juw.edu.pk', 'Computer Organization & Assembly Language'),
('T003', 'Ms. Kanwal Zahoor', 1, 'kanwal.zahoor@juw.edu.pk', 'Software Requirement Engineering, Machine Learning'),
('T004', 'Ms. Bhanuk Kulsom', 1, 'bhanuk.kulsom@juw.edu.pk', 'Software Requirement Engineering'),
('T005', 'Ms. Ushna Tasleem', 1, 'ushna.tasleem@juw.edu.pk', 'Software Design & Architecture, Business Intelligence'),
('T006', 'Ms. Neha', 1, 'neha@juw.edu.pk', 'Linear Algebra, Multivariable Calculus'),
('T007', 'Ms. Ayesha Zulfiqar', 1, 'ayesha.zulfiqar@juw.edu.pk', 'Theory of Automata'),
('T008', 'Ms. Arifa Shamim', 1, 'arifa.shamim@juw.edu.pk', 'Artificial Intelligence'),
('T009', 'Ms. Safia Feroz', 1, 'safia.feroz@juw.edu.pk', 'Theory of Automata, Applied Physics'),
('T010', 'Ms. Rahila', 1, 'rahila@juw.edu.pk', 'Linear Algebra'),
('T011', 'Ms. Samia Ghazala', 1, 'samia.ghazala@juw.edu.pk', 'Artificial Intelligence'),
('T012', 'Ms. Nimra', 1, 'nimra@juw.edu.pk', 'Artificial Intelligence'),
('T013', 'Ms. Saba Mazhar', 1, 'saba.mazhar@juw.edu.pk', 'Technical & Business Writing, Professional Practices'),
('T014', 'Ms. Fabihah', 1, 'fabihah@juw.edu.pk', 'Computer Organization & Assembly Language, Applied Physics'),
('T015', 'Ms. Anam Ilyas', 1, 'anam.ilyas@juw.edu.pk', 'Introduction to Data Science, Enterprise Web App'),
('T016', 'Ms. Syeda Anum Zamir', 1, 'anum.zamir@juw.edu.pk', 'Advanced Statistics, Mathematics Foundation'),
('T017', 'Ms. Mehak', 1, 'mehak@juw.edu.pk', 'Artificial Intelligence'),
('T018', 'Ms. Hafiza Amna Ahmed', 1, 'hafiza.amna@juw.edu.pk', 'Object Oriented Programming, Software Construction'),
('T019', 'Ms. Farah Fatima', 1, 'farah.fatima@juw.edu.pk', 'Object Oriented Programming'),
('T020', 'Ms. Manashi', 1, 'manashi@juw.edu.pk', 'Data Structures, Artificial Intelligence'),
('T021', 'Ms. Namal', 1, 'namal@juw.edu.pk', 'Discrete Structures, Multivariable Calculus'),
('T022', 'Ms. Arfa Arsa', 1, 'arfa.arsa@juw.edu.pk', 'Applied Physics'),
('T023', 'Ms. Tehreen Qamar', 1, 'tehreen.qamar@juw.edu.pk', 'Object Oriented Programming'),
('T024', 'Ms. Mehak Akhlaq', 1, 'mehak.akhlaq@juw.edu.pk', 'Data Structures'),
('T025', 'Ms. Zainab', 1, 'zainab@juw.edu.pk', 'Applied Physics'),
('T026', 'Ms. Arfa Ahsan', 1, 'arfa.ahsan@juw.edu.pk', 'Applied Physics'),
('T027', 'Sir Tariquesh', 1, 'tariquesh@juw.edu.pk', 'Data Structures'),
('T028', 'Ms. Hira Sultan', 1, 'hira.sultan@juw.edu.pk', 'Software Construction, Web Engineering, Software Quality'),
('T029', 'Sir Farrukh', 1, 'farrukh@juw.edu.pk', 'Information Security'),
('T030', 'Prof. Dr. Narmeen Zakaria Bawany', 1, 'narmeen.bawany@juw.edu.pk', 'Human Computer Interaction'),
('T031', 'Sir Amir Imam', 1, 'amir.imam@juw.edu.pk', 'Software Quality Engineering'),
('T032', 'Ms. Surayya Obaid', 1, 'surayya.obaid@juw.edu.pk', 'Professional Practices, Mobile Application Development'),
('T033', 'Ms. Soomaiya Hamid', 1, 'soomaiya.hamid@juw.edu.pk', 'Computer Networks, Professional Practices, Software Quality'),
('T034', 'Sir Noman', 1, 'noman@juw.edu.pk', 'Advance Database Management Systems'),
('T035', 'Dr. Hussain Mughal', 1, 'hussain.mughal@juw.edu.pk', 'Data Science'),
('T036', 'Sir Muhammad Noman', 1, 'muhammad.noman@juw.edu.pk', 'Advance Database Management Systems');

-- ===========================
-- 2. INSERT YOUR REAL SUBJECTS
-- ===========================

INSERT INTO subjects (code, name, department_id, credit_hours, semester, program) VALUES
-- CS 2025 Subjects (1st Year - Semester 2)
('CS-OOP-2025', 'Object Oriented Programming', 1, 3, 2, 'CS'),
('CS-DS-2025', 'Data Structures', 1, 3, 2, 'CS'),
('CS-DFS-2025', 'Discrete Structures', 1, 3, 2, 'CS'),
('CS-CALC-2025', 'Multivariable Calculus', 1, 3, 2, 'CS'),
('CS-PHY-2025', 'Applied Physics', 1, 3, 2, 'CS'),
('CS-MATH-2025', 'Mathematics Foundation Course (Pre-Calculus II)', 1, 3, 2, 'CS'),

-- CS 2024 Subjects (2nd Year - Semester 4)
('CS-COAL-2024', 'Computer Organization & Assembly Language', 1, 3, 4, 'CS'),
('CS-TOA-2024', 'Theory of Automata', 1, 3, 4, 'CS'),
('CS-LA-2024', 'Linear Algebra', 1, 3, 4, 'CS'),
('CS-AI-2024', 'Artificial Intelligence', 1, 3, 4, 'CS'),
('CS-TBW-2024', 'Technical & Business Writing', 1, 3, 4, 'CS'),

-- CS 2023 Subjects (3rd Year - Semester 6)
('CS-PP-2023', 'Professional Practices', 1, 3, 6, 'CS'),
('CS-HCI-2023', 'Human Computer Interaction', 1, 3, 6, 'CS'),
('CS-WE-2023', 'Web Engineering', 1, 3, 6, 'CS'),
('CS-CN-2023', 'Computer Networks', 1, 3, 6, 'CS'),
('CS-AI-2023', 'Artificial Intelligence', 1, 3, 6, 'CS'),

-- CS 2022 Subjects (4th Year - Semester 8)
('CS-ADBMS-2022', 'Advance Database Management Systems', 1, 3, 8, 'CS'),
('CS-ENT-2022', 'Entrepreneurship', 1, 3, 8, 'CS'),
('CS-SQE-2022', 'Software Quality Engineering', 1, 3, 8, 'CS'),
('CS-ML-2022', 'Machine Learning', 1, 3, 8, 'CS'),

-- SE 2025 Subjects (1st Year - Semester 2)
('SE-OOP-2025', 'Object Oriented Programming', 1, 3, 2, 'SE'),
('SE-DS-2025', 'Data Structures', 1, 3, 2, 'SE'),
('SE-DFS-2025', 'Discrete Structures', 1, 3, 2, 'SE'),
('SE-CALC-2025', 'Multivariable Calculus', 1, 3, 2, 'SE'),
('SE-PHY-2025', 'Applied Physics', 1, 3, 2, 'SE'),
('SE-MATH-2025', 'Mathematics Foundation Course (Pre-Calculus II)', 1, 3, 2, 'SE'),

-- SE 2024 Subjects (2nd Year - Semester 4)
('SE-COAL-2024', 'Computer Organization & Assembly Language', 1, 3, 4, 'SE'),
('SE-SRE-2024', 'Software Requirement Engineering', 1, 3, 4, 'SE'),
('SE-SDA-2024', 'Software Design & Architecture', 1, 3, 4, 'SE'),
('SE-LA-2024', 'Linear Algebra', 1, 3, 4, 'SE'),
('SE-TOA-2024', 'Theory of Automata', 1, 3, 4, 'SE'),
('SE-AI-2024', 'Artificial Intelligence', 1, 3, 4, 'SE'),

-- SE 2023 Subjects (3rd Year - Semester 6)
('SE-SCD-2023', 'Software Construction & Development', 1, 3, 6, 'SE'),
('SE-IS-2023', 'Information Security', 1, 3, 6, 'SE'),
('SE-HCI-2023', 'Human Computer Interaction', 1, 3, 6, 'SE'),
('SE-SQE-2023', 'Software Quality Engineering', 1, 3, 6, 'SE'),
('SE-BI-2023', 'Business Intelligence', 1, 3, 6, 'SE'),
('SE-AI-2023', 'Artificial Intelligence', 1, 3, 6, 'SE'),

-- SE 2022 Subjects (4th Year - Semester 8)
('SE-MAD-2022', 'Mobile Application Development', 1, 3, 8, 'SE'),
('SE-PP-2022', 'Professional Practices', 1, 3, 8, 'SE'),
('SE-EWA-2022', 'Enterprise Web Application', 1, 3, 8, 'SE'),
('SE-ADBMS-2022', 'Advance Database Management Systems', 1, 3, 8, 'SE'),
('SE-DS-2022', 'Data Science', 1, 3, 8, 'SE'),

-- DS 2025 Subjects (1st Year - Semester 2)
('DS-OOP-2025', 'Object Oriented Programming', 1, 3, 2, 'DS'),
('DS-DS-2025', 'Data Structures', 1, 3, 2, 'DS'),
('DS-DFS-2025', 'Discrete Structures', 1, 3, 2, 'DS'),
('DS-CALC-2025', 'Multivariable Calculus', 1, 3, 2, 'DS'),
('DS-PHY-2025', 'Applied Physics', 1, 3, 2, 'DS'),
('DS-MATH-2025', 'Mathematics Foundation Course (Pre-Calculus II)', 1, 3, 2, 'DS'),

-- DS 2024 Subjects (2nd Year - Semester 4)
('DS-COAL-2024', 'Computer Organization & Assembly Language', 1, 3, 4, 'DS'),
('DS-IDS-2024', 'Introduction to Data Science', 1, 3, 4, 'DS'),
('DS-AS-2024', 'Advanced Statistics', 1, 3, 4, 'DS'),
('DS-LA-2024', 'Linear Algebra', 1, 3, 4, 'DS'),
('DS-TOA-2024', 'Theory of Automata', 1, 3, 4, 'DS'),
('DS-AI-2024', 'Artificial Intelligence', 1, 3, 4, 'DS');

-- ===========================
-- 3. INSERT YOUR REAL ROOMS
-- ===========================

INSERT INTO rooms (room_number, room_name, building, capacity, room_type, has_projector) VALUES
('TBA', 'To Be Assigned', 'Main', 50, 'lecture', true),
('101', 'Lecture Room 101', 'Main', 60, 'lecture', true),
('102', 'Lecture Room 102', 'Main', 60, 'lecture', true),
('103', 'Lecture Room 103', 'Main', 50, 'lecture', true),
('LAB-A', 'Computer Lab A', 'Lab Building', 40, 'lab', true),
('LAB-B', 'Computer Lab B', 'Lab Building', 40, 'lab', true),
('LAB-C', 'Computer Lab C', 'Lab Building', 35, 'lab', true);

-- ===========================
-- 4. INSERT YOUR REAL BATCHES
-- ===========================

INSERT INTO batches (name, batch_code, department_id, program, semester, year, section, student_count) VALUES
-- CS Batches
('CS-2022', 'CS-2022', 1, 'CS', 8, 2022, 'A', 45),
('CS-2023', 'CS-2023', 1, 'CS', 6, 2023, 'A', 50),
('CS-2024', 'CS-2024', 1, 'CS', 4, 2024, 'A', 55),
('CS-2025', 'CS-2025', 1, 'CS', 2, 2025, 'A', 60),

-- SE Batches
('SE-2022', 'SE-2022', 1, 'SE', 8, 2022, 'A', 40),
('SE-2023', 'SE-2023', 1, 'SE', 6, 2023, 'A', 45),
('SE-2024', 'SE-2024', 1, 'SE', 4, 2024, 'A', 50),
('SE-2025', 'SE-2025', 1, 'SE', 2, 2025, 'A', 55),

-- DS Batches
('DS-2024', 'DS-2024', 1, 'DS', 4, 2024, 'A', 35),
('DS-2025', 'DS-2025', 1, 'DS', 2, 2025, 'A', 40);

-- ===========================
-- 5. INSERT TIMETABLE ENTRIES
-- ===========================

DO $$
DECLARE
    v_room_tba_id INT;
    v_cs_2022_id INT;
    v_cs_2023_id INT;
    v_cs_2024_id INT;
    v_cs_2025_id INT;
    v_se_2022_id INT;
    v_se_2023_id INT;
    v_se_2024_id INT;
    v_se_2025_id INT;
    v_ds_2024_id INT;
    v_ds_2025_id INT;
BEGIN
    -- Get room ID
    SELECT id INTO v_room_tba_id FROM rooms WHERE room_number = 'TBA';
    
    -- Get batch IDs
    SELECT id INTO v_cs_2022_id FROM batches WHERE batch_code = 'CS-2022';
    SELECT id INTO v_cs_2023_id FROM batches WHERE batch_code = 'CS-2023';
    SELECT id INTO v_cs_2024_id FROM batches WHERE batch_code = 'CS-2024';
    SELECT id INTO v_cs_2025_id FROM batches WHERE batch_code = 'CS-2025';
    SELECT id INTO v_se_2022_id FROM batches WHERE batch_code = 'SE-2022';
    SELECT id INTO v_se_2023_id FROM batches WHERE batch_code = 'SE-2023';
    SELECT id INTO v_se_2024_id FROM batches WHERE batch_code = 'SE-2024';
    SELECT id INTO v_se_2025_id FROM batches WHERE batch_code = 'SE-2025';
    SELECT id INTO v_ds_2024_id FROM batches WHERE batch_code = 'DS-2024';
    SELECT id INTO v_ds_2025_id FROM batches WHERE batch_code = 'DS-2025';
    
    -- CS-2022 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Sir Noman'), (SELECT id FROM subjects WHERE code = 'CS-ADBMS-2022'), v_cs_2022_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Saba Mazhar'), (SELECT id FROM subjects WHERE code = 'CS-ENT-2022'), v_cs_2022_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Soomaiya Hamid'), (SELECT id FROM subjects WHERE code = 'CS-SQE-2022'), v_cs_2022_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Kanwal Zahoor'), (SELECT id FROM subjects WHERE code = 'CS-ML-2022'), v_cs_2022_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '8', '2024-2025');
    
    -- CS-2023 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Saba Mazhar'), (SELECT id FROM subjects WHERE code = 'CS-PP-2023'), v_cs_2023_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Prof. Dr. Narmeen Zakaria Bawany'), (SELECT id FROM subjects WHERE code = 'CS-HCI-2023'), v_cs_2023_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Hira Sultan'), (SELECT id FROM subjects WHERE code = 'CS-WE-2023'), v_cs_2023_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Soomaiya Hamid'), (SELECT id FROM subjects WHERE code = 'CS-CN-2023'), v_cs_2023_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Arifa Shamim'), (SELECT id FROM subjects WHERE code = 'CS-AI-2023'), v_cs_2023_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '6', '2024-2025');
    
    -- CS-2024 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Ummay Faseaha'), (SELECT id FROM subjects WHERE code = 'CS-COAL-2024'), v_cs_2024_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Ayesha Zulfiqar'), (SELECT id FROM subjects WHERE code = 'CS-TOA-2024'), v_cs_2024_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Neha'), (SELECT id FROM subjects WHERE code = 'CS-LA-2024'), v_cs_2024_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Arifa Shamim'), (SELECT id FROM subjects WHERE code = 'CS-AI-2024'), v_cs_2024_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Saba Mazhar'), (SELECT id FROM subjects WHERE code = 'CS-TBW-2024'), v_cs_2024_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '4', '2024-2025');
    
    -- CS-2025 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Farah Fatima'), (SELECT id FROM subjects WHERE code = 'CS-OOP-2025'), v_cs_2025_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Mehak Akhlaq'), (SELECT id FROM subjects WHERE code = 'CS-DS-2025'), v_cs_2025_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Namal'), (SELECT id FROM subjects WHERE code = 'CS-DFS-2025'), v_cs_2025_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Namal'), (SELECT id FROM subjects WHERE code = 'CS-CALC-2025'), v_cs_2025_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Fabihah'), (SELECT id FROM subjects WHERE code = 'CS-PHY-2025'), v_cs_2025_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Syeda Anum Zamir'), (SELECT id FROM subjects WHERE code = 'CS-MATH-2025'), v_cs_2025_id, v_room_tba_id, 'Monday', '14:00', '15:00', 'approved', '2', '2024-2025');
    
    -- SE-2022 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Surayya Obaid'), (SELECT id FROM subjects WHERE code = 'SE-MAD-2022'), v_se_2022_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Soomaiya Hamid'), (SELECT id FROM subjects WHERE code = 'SE-PP-2022'), v_se_2022_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Anam Ilyas'), (SELECT id FROM subjects WHERE code = 'SE-EWA-2022'), v_se_2022_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Sir Noman'), (SELECT id FROM subjects WHERE code = 'SE-ADBMS-2022'), v_se_2022_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '8', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Dr. Hussain Mughal'), (SELECT id FROM subjects WHERE code = 'SE-DS-2022'), v_se_2022_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '8', '2024-2025');
    
    -- SE-2023 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Hafiza Amna Ahmed'), (SELECT id FROM subjects WHERE code = 'SE-SCD-2023'), v_se_2023_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Sir Farrukh'), (SELECT id FROM subjects WHERE code = 'SE-IS-2023'), v_se_2023_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Prof. Dr. Narmeen Zakaria Bawany'), (SELECT id FROM subjects WHERE code = 'SE-HCI-2023'), v_se_2023_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Sir Amir Imam'), (SELECT id FROM subjects WHERE code = 'SE-SQE-2023'), v_se_2023_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Ushna Tasleem'), (SELECT id FROM subjects WHERE code = 'SE-BI-2023'), v_se_2023_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '6', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Samia Ghazala'), (SELECT id FROM subjects WHERE code = 'SE-AI-2023'), v_se_2023_id, v_room_tba_id, 'Monday', '14:00', '15:00', 'approved', '6', '2024-2025');
    
    -- SE-2024 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Ummay Faseaha'), (SELECT id FROM subjects WHERE code = 'SE-COAL-2024'), v_se_2024_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Kanwal Zahoor'), (SELECT id FROM subjects WHERE code = 'SE-SRE-2024'), v_se_2024_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Ushna Tasleem'), (SELECT id FROM subjects WHERE code = 'SE-SDA-2024'), v_se_2024_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Neha'), (SELECT id FROM subjects WHERE code = 'SE-LA-2024'), v_se_2024_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Ayesha Zulfiqar'), (SELECT id FROM subjects WHERE code = 'SE-TOA-2024'), v_se_2024_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Arifa Shamim'), (SELECT id FROM subjects WHERE code = 'SE-AI-2024'), v_se_2024_id, v_room_tba_id, 'Monday', '14:00', '15:00', 'approved', '4', '2024-2025');
    
    -- SE-2025 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Hafiza Amna Ahmed'), (SELECT id FROM subjects WHERE code = 'SE-OOP-2025'), v_se_2025_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Manashi'), (SELECT id FROM subjects WHERE code = 'SE-DS-2025'), v_se_2025_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Namal'), (SELECT id FROM subjects WHERE code = 'SE-DFS-2025'), v_se_2025_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Neha'), (SELECT id FROM subjects WHERE code = 'SE-CALC-2025'), v_se_2025_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Fabihah'), (SELECT id FROM subjects WHERE code = 'SE-PHY-2025'), v_se_2025_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Syeda Anum Zamir'), (SELECT id FROM subjects WHERE code = 'SE-MATH-2025'), v_se_2025_id, v_room_tba_id, 'Monday', '14:00', '15:00', 'approved', '2', '2024-2025');
    
    -- DS-2024 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Fabihah'), (SELECT id FROM subjects WHERE code = 'DS-COAL-2024'), v_ds_2024_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Anam Ilyas'), (SELECT id FROM subjects WHERE code = 'DS-IDS-2024'), v_ds_2024_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Syeda Anum Zamir'), (SELECT id FROM subjects WHERE code = 'DS-AS-2024'), v_ds_2024_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Rahila'), (SELECT id FROM subjects WHERE code = 'DS-LA-2024'), v_ds_2024_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Safia Feroz'), (SELECT id FROM subjects WHERE code = 'DS-TOA-2024'), v_ds_2024_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '4', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Samia Ghazala'), (SELECT id FROM subjects WHERE code = 'DS-AI-2024'), v_ds_2024_id, v_room_tba_id, 'Monday', '14:00', '15:00', 'approved', '4', '2024-2025');
    
    -- DS-2025 Timetable
    INSERT INTO timetable_entries (teacher_id, subject_id, batch_id, room_id, day_of_week, start_time, end_time, status, semester, academic_year)
    VALUES
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Tehreen Qamar'), (SELECT id FROM subjects WHERE code = 'DS-OOP-2025'), v_ds_2025_id, v_room_tba_id, 'Monday', '09:00', '10:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Sir Tariquesh'), (SELECT id FROM subjects WHERE code = 'DS-DS-2025'), v_ds_2025_id, v_room_tba_id, 'Tuesday', '10:00', '11:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Namal'), (SELECT id FROM subjects WHERE code = 'DS-DFS-2025'), v_ds_2025_id, v_room_tba_id, 'Wednesday', '11:00', '12:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Neha'), (SELECT id FROM subjects WHERE code = 'DS-CALC-2025'), v_ds_2025_id, v_room_tba_id, 'Thursday', '09:00', '10:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Fabihah'), (SELECT id FROM subjects WHERE code = 'DS-PHY-2025'), v_ds_2025_id, v_room_tba_id, 'Friday', '10:00', '11:00', 'approved', '2', '2024-2025'),
    ((SELECT id FROM teachers WHERE full_name = 'Ms. Syeda Anum Zamir'), (SELECT id FROM subjects WHERE code = 'DS-MATH-2025'), v_ds_2025_id, v_room_tba_id, 'Monday', '14:00', '15:00', 'approved', '2', '2024-2025');

END $$;

-- ===========================
-- 6. CREATE TEST USERS
-- ===========================

-- Password for all test users: "admin123"
-- Hash generated with bcrypt (10 rounds)

INSERT INTO users (user_id, password, role, full_name, email, department_id) VALUES
('admin', '$2b$10$rZ1KPXGbLVGvvEj0xHRBxOqK7kxBnHpvDpN0jKQ8vKpJ7zJqGKvHG', 'department_admin', 'Admin User', 'admin@juw.edu.pk', 1),
('office', '$2b$10$rZ1KPXGbLVGvvEj0xHRBxOqK7kxBnHpvDpN0jKQ8vKpJ7zJqGKvHG', 'office_assistant', 'Office Assistant', 'office@juw.edu.pk', 1),
('teacher001', '$2b$10$rZ1KPXGbLVGvvEj0xHRBxOqK7kxBnHpvDpN0jKQ8vKpJ7zJqGKvHG', 'teacher', 'Ms. Ummay Faseaha', 'ummay@juw.edu.pk', 1);

-- ===========================
-- 7. VERIFICATION QUERIES
-- ===========================

SELECT 'Data insertion complete!' AS message;
SELECT 'Departments: ' || COUNT(*) AS department_count FROM departments;
SELECT 'Teachers: ' || COUNT(*) AS teacher_count FROM teachers;
SELECT 'Subjects: ' || COUNT(*) AS subject_count FROM subjects;
SELECT 'Batches: ' || COUNT(*) AS batch_count FROM batches;
SELECT 'Rooms: ' || COUNT(*) AS room_count FROM rooms;
SELECT 'Timetable Entries: ' || COUNT(*) AS timetable_count FROM timetable_entries;
SELECT 'Users: ' || COUNT(*) AS user_count FROM users;