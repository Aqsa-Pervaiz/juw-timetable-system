// src/App.jsx
import React, { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedBatch, setSelectedBatch] = useState('BSSE(A)');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Timetable data from PDF - CS & SE Department only
  const timetableData = {
    '2025': {
      'BSSE(A)': {
        semester: '2nd Semester 2025',
        room: 'B-16',
        schedule: [
          { day: 'Monday', time1: 'B-16', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'D-19', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: 'MVC (C-60)', time5: 'OOP(D-19)' },
          { day: 'Wednesday', time1: 'B-17', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: 'MVC (B-17)', time5: 'Data.Stru(B-17)' },
          { day: 'Thursday', time1: 'B-17', time2: 'App Phy', time3: 'Data.Stru', time4: '', time5: '' },
          { day: 'Friday', time1: 'C-60', time2: 'MVC', time3: 'OOP', time4: 'Dis Stru(D-31)', time5: 'Data.Stru' },
          { day: 'Saturday', time1: 'C-60', time2: 'OOP', time3: 'Dis Stru(D-31)', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Object Oriented Programming', teacher: 'Ms. Hafiza Anisa Ahmed (th), Ms.Farah Fatima(lab)' },
          { title: 'Data Structures', teacher: 'Ms.Manahil' },
          { title: 'Discrete Structures', teacher: 'Ms.Namal' },
          { title: 'Multivariable Calculus', teacher: 'Ms. Syeda Anum Zamir' },
          { title: 'Applied Physics', teacher: 'Ms.Fabiha(th), Ms.Asfa Ahsan(lab)' },
          { title: 'Mathematics Foundation Course', teacher: 'Ms. Syeda Anum Zamir' }
        ]
      },
      'BSSE(B)': {
        semester: '2nd Semester 2025',
        room: 'B-16',
        schedule: [
          { day: 'Monday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: '', time5: '' },
          { day: 'Tuesday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: '', time5: '' },
          { day: 'Wednesday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: 'MVC', time5: 'Dis Stru' },
          { day: 'Thursday', time1: 'OOP', time2: 'OOP', time3: 'App Phy', time4: 'Dis Stru', time5: 'Data.Stru' },
          { day: 'Friday', time1: '', time2: 'Data.Stru', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'MVC', time2: 'MVC', time3: 'App Phy', time4: 'Dis Stru(D-31)', time5: 'Data.Stru' }
        ],
        courses: [
          { title: 'Object Oriented Programming', teacher: 'Ms. Hafiza Anisa Ahmed (th), Ms.Farah Fatima(lab)' },
          { title: 'Data Structures', teacher: 'Ms.Manahil' },
          { title: 'Discrete Structures', teacher: 'Ms.Namal' },
          { title: 'Multivariable Calculus', teacher: 'Ms.Neha' },
          { title: 'Applied Physics', teacher: 'Ms.Fabiha(th), Ms.Asfa Ahsan(lab)' },
          { title: 'Mathematics Foundation Course', teacher: 'Ms. Syeda Anum Zamir' }
        ]
      },
      'BSCS': {
        semester: '2nd Semester 2025',
        room: 'C-61',
        schedule: [
          { day: 'Monday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: 'MVC(D-31)', time5: 'App Phy' },
          { day: 'Tuesday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: 'MVC(C-61)', time5: 'OOP' },
          { day: 'Wednesday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Dis Stru', time2: 'OOP(C-62)', time3: 'OOP(C-62)', time4: 'Data.Stru(D-31)', time5: 'Data.Stru(D-31)' },
          { day: 'Friday', time1: 'MVC(B-16)', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'App Phy', time2: 'Data.Stru', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Object Oriented Programming', teacher: 'Ms.Tehreem Qamar(th), Ms.Farah Fatima(lab)' },
          { title: 'Data Structures', teacher: 'Ms.Mehak Abbas' },
          { title: 'Discrete Structures', teacher: 'Ms.Anum Zamir' },
          { title: 'Multivariable Calculus', teacher: 'Ms.Namal' },
          { title: 'Applied Physics', teacher: 'Ms.Fabiha(th), Ms.Safia Feroz(lab)' },
          { title: 'Mathematics Foundation Course', teacher: 'Ms. Syeda Anum Zamir' }
        ]
      },
      'BSDS': {
        semester: '2nd Semester 2025',
        room: 'B-17',
        schedule: [
          { day: 'Monday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: 'App Phy', time5: 'Dis Stru' },
          { day: 'Tuesday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: '', time5: '' },
          { day: 'Wednesday', time1: '', time2: 'Fehm-e-Quran', time3: 'M.FC(B-16)', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Data.Stru(D-31)', time2: 'Data.Stru(D-31)', time3: 'Dis Stru', time4: 'MVC', time5: 'App Phy' },
          { day: 'Friday', time1: 'MVC', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'Dis Stru', time2: 'Data.Stru', time3: 'OOP', time4: 'OOP', time5: 'MVC' }
        ],
        courses: [
          { title: 'Object Oriented Programming', teacher: 'Ms.Tehreem Qamar(th), Ms.Farah Fatima(lab)' },
          { title: 'Data Structures', teacher: 'Sir Tarique(th), Ms.Mehak Abbas(lab)' },
          { title: 'Discrete Structures', teacher: 'Ms.Namal' },
          { title: 'Multivariable Calculus', teacher: 'Ms.Neha' },
          { title: 'Applied Physics', teacher: 'Ms.Fabiha(th), Ms.Asfa Ahsan/Ms.Fabiha(lab)' },
          { title: 'Mathematics Foundation Course', teacher: 'Ms. Syeda Anum Zamir' }
        ]
      }
    },
    '2024': {
      'BSSE(A)': {
        semester: '2nd Semester 2025',
        room: 'B-13',
        schedule: [
          { day: 'Monday', time1: 'Automata', time2: 'Coal', time3: 'SDA(B-16)', time4: 'LA(D-31)', time5: '' },
          { day: 'Tuesday', time1: 'Coal', time2: 'SRE', time3: 'SDA(B-16)', time4: 'AI(B-16)', time5: 'LA(D-31)' },
          { day: 'Wednesday', time1: 'SRE', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Thursday', time1: 'LA', time2: 'Automata', time3: '', time4: '', time5: '' },
          { day: 'Friday', time1: 'AI', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'Automata', time2: '', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Computer Organization & Assembly Language', teacher: 'Ms. Ummay Faseeha(th), Ms.Anum Furqan Akbani(lab)' },
          { title: 'Software Requirement Engineering', teacher: 'Ms. Kanwal Zahoor(th), Ms.Bismah Kulsoom(lab)' },
          { title: 'Software Design & Architecture', teacher: 'Ms.Ushna Tasleem' },
          { title: 'Linear Algebra', teacher: 'Ms.Neha' },
          { title: 'Theory of Automata', teacher: 'Ms. Ayesha Zulfiqar' },
          { title: 'Artificial Intelligence', teacher: 'Ms.Arifa Shamim' }
        ]
      },
      'BSSE(B)': {
        semester: '2nd Semester 2025',
        room: 'B-14',
        schedule: [
          { day: 'Monday', time1: 'Automata', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'SDA', time2: 'LA(D-31)', time3: 'Coal', time4: 'Automata', time5: 'AI' },
          { day: 'Wednesday', time1: 'SDA', time2: 'Automata', time3: 'SRE', time4: 'LA', time5: '' },
          { day: 'Thursday', time1: 'AI', time2: 'Coal', time3: '', time4: '', time5: '' },
          { day: 'Friday', time1: 'LA', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'SRE', time2: '', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Computer Organization & Assembly Language', teacher: 'Ms. Ummay Faseeha(th), Ms.Anum Furqan Akbani(lab)' },
          { title: 'Software Requirement Engineering', teacher: 'Ms. Kanwal Zahoor(th), Ms.Bismah Kulsoom(lab)' },
          { title: 'Software Design & Architecture', teacher: 'Ms.Ushna Tasleem' },
          { title: 'Linear Algebra', teacher: 'Ms.Neha' },
          { title: 'Theory of Automata', teacher: 'Ms. Ayesha Zulfiqar' },
          { title: 'Artificial Intelligence', teacher: 'Ms.Arifa Shamim' }
        ]
      },
      'BSCS': {
        semester: '2nd Semester 2025',
        room: 'C-63',
        schedule: [
          { day: 'Monday', time1: 'Automata', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'AI', time2: 'TBW', time3: 'Coal', time4: '', time5: '' },
          { day: 'Wednesday', time1: 'Coal', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Automata', time2: 'LA(D-31)', time3: 'TBW', time4: '', time5: '' },
          { day: 'Friday', time1: 'LA(D-31)', time2: 'AI(C-62)', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'LA(D-31)', time2: 'TBW(D-19)', time3: 'Automata(D-19)', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Computer Organization & Assembly Language', teacher: 'Ms. Ummay Faseeha(th), Ms.Anum Furqan Akbani(lab)' },
          { title: 'Theory of Automata', teacher: 'Ms.Safia Feroz' },
          { title: 'Linear Algebra', teacher: 'Ms.Rahila' },
          { title: 'Artificial Intelligence', teacher: 'Ms. Samia Ghazala(th), Ms.Nimra(lab)' },
          { title: 'Technical & Business Writing', teacher: 'Ms.Saba Mazhar' }
        ]
      },
      'BSDS': {
        semester: '2nd Semester 2025',
        room: 'B-15',
        schedule: [
          { day: 'Monday', time1: 'Coal', time2: 'AI', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'Automata', time2: 'Intro to DS', time3: '', time4: '', time5: '' },
          { day: 'Wednesday', time1: 'LA(D-31)', time2: 'AI', time3: '', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Automata', time2: 'Adv.Statistics', time3: 'LA', time4: '', time5: '' },
          { day: 'Friday', time1: 'Intro to DS', time2: 'Coal', time3: 'LA(D-31)', time4: 'Adv.Statistics', time5: '' },
          { day: 'Saturday', time1: 'Automata', time2: '', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Computer Organization & Assembly Language', teacher: 'Ms.Fabiha(th), Ms.Anum Furqan Akbani(lab)' },
          { title: 'Introduction to Data Science', teacher: 'Ms. Anum Ilyas' },
          { title: 'Advanced Statistics', teacher: 'Ms. Syeda Anum Zamir' },
          { title: 'Linear Algebra', teacher: 'Ms.Rahila' },
          { title: 'Theory of Automata', teacher: 'Ms.Safia Feroz' },
          { title: 'Artificial Intelligence', teacher: 'Ms. Samia Ghazala(th), Ms. Mehak(lab)' }
        ]
      }
    },
    '2023': {
      'BSSE': {
        semester: '2nd Semester 2025',
        room: 'C-62',
        schedule: [
          { day: 'Monday', time1: 'SQE(D-31)', time2: 'SQE(D-31)', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'HCI(C-61)', time2: 'HCI(C-61)', time3: 'AI', time4: 'BI', time5: '' },
          { day: 'Wednesday', time1: 'Soft Cons', time2: 'HCI(C-61)', time3: '', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Soft Cons', time2: 'BI', time3: '', time4: '', time5: '' },
          { day: 'Friday', time1: 'AI', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'IS', time2: 'IS', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Software Construction & Development', teacher: 'Ms. Hafiza Anisa Ahmed (th), Ms.Hira Sultan(Lab)' },
          { title: 'Information Security', teacher: 'Sir Farrukh' },
          { title: 'Human Computer Interaction', teacher: 'Prof. Dr. Narmeen Zakaria Bawany' },
          { title: 'Software Quality Engineering', teacher: 'Sir Amir imam (th), Ms.Hira Sultan(lab)' },
          { title: 'Business Intelligence', teacher: 'Ms.Ushna Tasleem' },
          { title: 'Artificial Intelligence', teacher: 'Ms. Samia Ghazala(th), Ms.Arifa Shamim(lab)' }
        ]
      },
      'BSCS': {
        semester: '2nd Semester 2025',
        room: 'D-19',
        schedule: [
          { day: 'Monday', time1: 'HCI(C-61)', time2: 'HCI(C-61)', time3: 'CN', time4: 'AI', time5: '' },
          { day: 'Tuesday', time1: 'PP', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Wednesday', time1: 'PP', time2: 'CN', time3: 'HCI(C-61)', time4: 'Web Eng(C-61)', time5: '' },
          { day: 'Thursday', time1: 'PP', time2: 'AI', time3: 'Web Eng', time4: '', time5: '' },
          { day: 'Friday', time1: 'AI', time2: '', time3: '', time4: '', time5: '' },
          { day: 'Saturday', time1: 'AI (LAB)', time2: 'CN', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Professional Practices', teacher: 'Ms.Surayya Obaid' },
          { title: 'Human Computer Interaction', teacher: 'Prof. Dr. Narmeen Zakaria Bawany' },
          { title: 'Web Engineering', teacher: 'Ms.Hira Sultan' },
          { title: 'Computer Networks', teacher: 'Ms.Soomaiya Hamid' },
          { title: 'Artificial Intelligence', teacher: 'Ms. Ummay Faseeha(th), Ms.Manahil (lab)' }
        ]
      }
    },
    '2022': {
      'BSSE(A)': {
        semester: '2nd Semester 2025',
        room: 'D-20',
        schedule: [
          { day: 'Monday', time1: 'MA', time2: 'MA', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'FYP Meeting', time2: 'FYP Meeting', time3: 'FYP Meeting', time4: 'FYP Meeting', time5: 'FYP Meeting' },
          { day: 'Wednesday', time1: 'Data Science', time2: 'Data Science', time3: '', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Enterprise Web', time2: 'Enterprise Web', time3: '', time4: '', time5: '' },
          { day: 'Friday', time1: 'PP', time2: 'FYP Meeting', time3: 'PP', time4: 'PP', time5: '' },
          { day: 'Saturday', time1: 'Adv.DMS', time2: 'Adv.DMS', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Mobile Application Development', teacher: 'Ms.Surayya Obaid' },
          { title: 'Professional Practices', teacher: 'Ms.Saba Mazhar' },
          { title: 'Enterprise Web App', teacher: 'Ms. Anum Ilyas' },
          { title: 'Data Science', teacher: 'Dr. Hussain Mughal' },
          { title: 'Advance Database Management Systems', teacher: 'Sir Noman' }
        ]
      },
      'BSSE(B)': {
        semester: '2nd Semester 2025',
        room: 'D-20',
        schedule: [
          { day: 'Monday', time1: 'MA', time2: 'MA', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'FYP Meeting', time2: 'PP(D-20)', time3: 'PP(D-20)', time4: 'FYP Meeting', time5: 'PP(D-20)' },
          { day: 'Wednesday', time1: 'Data Science', time2: 'Data Science', time3: '', time4: '', time5: '' },
          { day: 'Thursday', time1: 'Enterprise Web', time2: 'Enterprise Web', time3: '', time4: '', time5: '' },
          { day: 'Friday', time1: 'FYP Meeting', time2: 'FYP Meeting', time3: 'FYP Meeting', time4: 'FYP Meeting', time5: '' },
          { day: 'Saturday', time1: 'Adv.DMS', time2: 'Adv.DMS', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Mobile Application Development', teacher: 'Ms.Surayya Obaid' },
          { title: 'Professional Practices', teacher: 'Ms.Soomaiya Hamid/Ms.Saba Mazhar' },
          { title: 'Enterprise Web App', teacher: 'Ms. Anum Ilyas' },
          { title: 'Data Science', teacher: 'Dr. Hussain Mughal' },
          { title: 'Advance Database Management Systems', teacher: 'Sir Noman' }
        ]
      },
      'BSCS': {
        semester: '2nd Semester 2025',
        room: 'C-60',
        schedule: [
          { day: 'Monday', time1: 'ML', time2: 'ML', time3: '', time4: '', time5: '' },
          { day: 'Tuesday', time1: 'FYP Meeting', time2: 'FYP Meeting', time3: 'FYP Meeting', time4: 'FYP Meeting', time5: 'FYP Meeting' },
          { day: 'Wednesday', time1: 'FYP Meeting', time2: 'Entrepreneurship', time3: 'Entrepreneurship', time4: 'FYP Meeting', time5: 'Entrepreneurship' },
          { day: 'Thursday', time1: 'SQE', time2: 'SQE', time3: '', time4: '', time5: '' },
          { day: 'Friday', time1: 'FYP Meeting', time2: 'FYP Meeting', time3: 'FYP Meeting', time4: 'FYP Meeting', time5: '' },
          { day: 'Saturday', time1: 'Adv.DMS', time2: 'Adv.DMS', time3: '', time4: '', time5: '' }
        ],
        courses: [
          { title: 'Advance Database Management Systems', teacher: 'Sir.Muhammad Noman' },
          { title: 'Entrepreneurship', teacher: 'Ms.Saba Mazhar' },
          { title: 'Software Quality Engineering', teacher: 'Ms.Soomaiya Hamid(th), Ms.Hira Sultan(lab)' },
          { title: 'Machine Learning', teacher: 'Ms. Kanwal Zahoor' }
        ]
      }
    }
  };

  const timeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '1:00-2:00'];

  const handleLogin = (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const logout = () => {
    setCurrentView('login');
    setUserRole(null);
    setActiveSection('overview');
  };

  // Get available batches for selected year
  const getAvailableBatches = () => {
    if (timetableData[selectedYear]) {
      return Object.keys(timetableData[selectedYear]);
    }
    return [];
  };

  // Update selected batch when year changes
  React.useEffect(() => {
    const batches = getAvailableBatches();
    if (batches.length > 0 && !batches.includes(selectedBatch)) {
      setSelectedBatch(batches[0]);
    }
  }, [selectedYear]);

  // Login Page
  if (currentView === 'login') {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <img src="/logo.jpeg" alt="SlotSync Logo" className="logo" />
            <h1>SlotSync</h1>
            <p>CS & SE Department Timetable System</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>User ID</label>
              <input type="text" placeholder="Enter your User ID" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" required>
                <option value="">Select Role</option>
                <option value="office_assistant">Office Assistant</option>
                <option value="department_admin">Department Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <div className="demo-credentials">
            <p><small>Demo: Use any credentials to login</small></p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.jpeg" alt="SlotSync" className="sidebar-logo" />
          <h2>SlotSync</h2>
          <p className="user-role">{userRole?.replace('_', ' ').toUpperCase()}</p>
        </div>
        <nav className="nav-menu">
          <div 
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <span className="nav-icon">📊</span>
            <span>Overview</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveSection('timetable')}
          >
            <span className="nav-icon">📅</span>
            <span>Timetable</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveSection('courses')}
          >
            <span className="nav-icon">📚</span>
            <span>Courses</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveSection('teachers')}
          >
            <span className="nav-icon">👩‍🏫</span>
            <span>Teachers</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveSection('rooms')}
          >
            <span className="nav-icon">🏫</span>
            <span>Rooms</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1>CS & SE Department</h1>
          <div className="user-info">
            <span className="user-name">Welcome, User</span>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </div>
        </header>

        <div className="content-area">
          {activeSection === 'overview' && (
            <div className="overview-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🎓</div>
                  <div className="stat-info">
                    <h3>Programs</h3>
                    <p className="stat-value">3</p>
                    <p className="stat-label">CS, SE, DS</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Total Batches</h3>
                    <p className="stat-value">14</p>
                    <p className="stat-label">Active batches</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👩‍🏫</div>
                  <div className="stat-info">
                    <h3>Faculty</h3>
                    <p className="stat-value">25+</p>
                    <p className="stat-label">Teaching staff</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏫</div>
                  <div className="stat-info">
                    <h3>Rooms</h3>
                    <p className="stat-value">20+</p>
                    <p className="stat-label">Labs & Lecture halls</p>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>📅 Academic Year 2024-2025</h3>
                <p>2nd Semester - Classes in Session</p>
                <div className="programs-list">
                  <div className="program-badge">Computer Science</div>
                  <div className="program-badge">Software Engineering</div>
                  <div className="program-badge">Data Science</div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'timetable' && (
            <div className="timetable-section">
              <div className="section-header">
                <h2>Timetable View</h2>
                <div className="filters">
                  <div className="filter-group">
                    <label>Year:</label>
                    <select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="filter-select"
                    >
                      <option value="2025">BS 2025 (1st Year)</option>
                      <option value="2024">BS 2024 (2nd Year)</option>
                      <option value="2023">BS 2023 (3rd Year)</option>
                      <option value="2022">BS 2022 (4th Year)</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Batch:</label>
                    <select 
                      value={selectedBatch} 
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="filter-select"
                    >
                      {getAvailableBatches().map(batch => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {timetableData[selectedYear] && timetableData[selectedYear][selectedBatch] && (
                <>
                  <div className="batch-info">
                    <span className="badge">{timetableData[selectedYear][selectedBatch].semester}</span>
                    <span className="badge">Room: {timetableData[selectedYear][selectedBatch].room}</span>
                  </div>

                  <div className="timetable-container">
                    <table className="timetable">
                      <thead>
                        <tr>
                          <th className="day-column">Day</th>
                          {timeSlots.map((slot, idx) => (
                            <th key={idx}>{slot}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {timetableData[selectedYear][selectedBatch].schedule.map((daySchedule, idx) => (
                          <tr key={idx}>
                            <td className="day-cell">{daySchedule.day}</td>
                            <td className="slot-cell">{daySchedule.time1 || '-'}</td>
                            <td className="slot-cell">{daySchedule.time2 || '-'}</td>
                            <td className="slot-cell">{daySchedule.time3 || '-'}</td>
                            <td className="slot-cell">{daySchedule.time4 || '-'}</td>
                            <td className="slot-cell">{daySchedule.time5 || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {activeSection === 'courses' && (
            <div className="courses-section">
              <h2>Courses - {selectedBatch} ({selectedYear})</h2>
              {timetableData[selectedYear] && timetableData[selectedYear][selectedBatch] && (
                <div className="courses-grid">
                  {timetableData[selectedYear][selectedBatch].courses.map((course, idx) => (
                    <div key={idx} className="course-card">
                      <h3>{course.title}</h3>
                      <p className="teacher-name">👨‍🏫 {course.teacher}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'teachers' && (
            <div className="teachers-section">
              <h2>Faculty Members</h2>
              <div className="info-message">
                <p>Faculty directory and contact information will be available here.</p>
              </div>
            </div>
          )}

          {activeSection === 'rooms' && (
            <div className="rooms-section">
              <h2>Rooms & Facilities</h2>
              <div className="info-message">
                <p>Room allocation and facility information will be available here.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
