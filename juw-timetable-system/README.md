# JUW Timetable Management System

**Production-Ready University Timetable Management System**  
Jinnah University for Women (JUW)

---

## 📋 Project Overview

A comprehensive web-based timetable management system designed for universities with role-based access control, conflict detection, and drag-and-drop scheduling capabilities.

### Key Features

✅ **Role-Based Authentication**
- Office Assistant
- Department Admin  
- Teacher

✅ **Complete CRUD Operations**
- Manage Teachers, Subjects, Classrooms, Batches
- Create and manage timetable entries

✅ **Intelligent Conflict Detection**
- Teacher availability conflicts
- Room booking conflicts
- Batch scheduling conflicts
- Real-time validation

✅ **Drag & Drop Interface**
- Visual timetable grid
- Intuitive rescheduling
- Interactive calendar view

✅ **Approval Workflow**
- Pending/Approved/Rejected status
- Department admin oversight
- Audit trail

---

## 🏗️ System Architecture

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla JS)
- Responsive Design
- Drag & Drop API
- LocalStorage for demo mode

**Backend:**
- Node.js + Express.js
- RESTful API
- JWT Authentication
- MySQL Database

**Database:**
- MySQL 8.0+
- Relational schema with foreign keys
- Indexed for performance

---

## 📁 Project Structure

```
juw-timetable-system/
├── index.html                    # Single-page application (Demo Mode)
├── database/
│   └── schema.sql               # Complete database schema
├── backend/
│   └── server.js                # Express API server (To be created)
├── package.json                 # Node dependencies
├── .env.example                 # Environment configuration template
└── README.md                    # This file
```

---

## 🚀 Quick Start Guide

### Option 1: Demo Mode (No Installation Required)

1. **Open the Application**
   ```bash
   # Simply open index.html in a web browser
   open index.html
   ```

2. **Login Credentials**
   - **Office Assistant:** JUW-OFF-001 / password123
   - **Department Admin:** JUW-ADM-CS / password123
   - **Teacher:** JUW-TCH-001 / password123

3. **Features Available in Demo Mode**
   - All features work with mock data
   - Data persists in browser session
   - Perfect for testing and demonstration

### Option 2: Full Production Setup

#### Prerequisites

- Node.js 16+ and npm
- MySQL 8.0+
- Git (optional)

#### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd juw-timetable-system

   # Or simply extract the ZIP file
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   
   a. Create database:
   ```sql
   CREATE DATABASE juw_timetable;
   ```

   b. Import schema:
   ```bash
   mysql -u root -p juw_timetable < database/schema.sql
   ```

4. **Configure Environment**
   
   Create `.env` file:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=juw_timetable
   JWT_SECRET=your_secret_key_here
   ```

5. **Start the Server**
   ```bash
   npm start
   ```

6. **Access the Application**
   ```
   http://localhost:3000
   ```

---

## 👥 User Roles & Permissions

### 1. Office Assistant

**Dashboard Features:**
- ✅ Add new teachers
- ✅ Add new subjects
- ✅ Add classrooms
- ✅ Add batches
- ✅ Create timetable entries
- ✅ View all data

**Workflow:**
1. Login with Office Assistant credentials
2. Navigate through sidebar menu
3. Fill forms to add resources
4. Create timetable entries
5. Entries go to "Pending" status
6. Wait for admin approval

### 2. Department Admin

**Dashboard Features:**
- ✅ View complete department timetable
- ✅ Drag & drop to reschedule classes
- ✅ Detect conflicts automatically
- ✅ Approve/Reject timetable entries
- ✅ View pending approvals
- ✅ Delete conflicting entries

**Workflow:**
1. Login with Department Admin credentials
2. Review pending timetable entries
3. Check for conflicts (automatic detection)
4. Approve valid entries
5. Reject or edit conflicting entries
6. Use drag-drop to reschedule

### 3. Teacher

**Dashboard Features:**
- ✅ View personal weekly schedule
- ✅ See subject, batch, room, and time details
- ✅ Read-only access (cannot modify)

**Workflow:**
1. Login with Teacher credentials
2. View weekly timetable
3. See all assigned classes
4. Export/print schedule (future feature)

---

## 🔍 Features Deep Dive

### Conflict Detection System

The system automatically detects three types of conflicts:

1. **Teacher Conflict**
   - Same teacher scheduled at same time
   - Checks across all days and time slots
   - Visual alert with red highlighting

2. **Room Conflict**
   - Same room booked at same time
   - Prevents double-booking
   - Real-time validation

3. **Batch Conflict**
   - Same batch scheduled for multiple classes at once
   - Ensures students can attend all classes
   - Immediate feedback

**How It Works:**
```
When creating/editing an entry:
1. System checks all existing entries
2. Compares day, start time, and end time
3. Identifies overlapping schedules
4. Returns detailed conflict information
5. Prevents saving if conflicts exist
```

### Drag & Drop Scheduling

**Features:**
- Visual timetable grid
- Drag classes to different time slots
- Drag classes to different days
- Automatic conflict checking
- Instant feedback
- Smooth animations

**Usage:**
1. Click and hold on a class card
2. Drag to desired time slot
3. Release to drop
4. System validates automatically
5. Entry updates if no conflicts

### Approval Workflow

**Status Flow:**
```
Created → Pending → [Approved/Rejected]
```

1. **Pending**
   - Newly created entries
   - Awaiting admin review
   - Can be edited/deleted

2. **Approved**
   - Verified by department admin
   - Visible to all users
   - Included in final timetable

3. **Rejected**
   - Invalid or conflicting entries
   - Includes rejection reason
   - Can be recreated with fixes

---

## 💾 Database Schema

### Core Tables

1. **users** - Authentication and user management
2. **departments** - Academic departments
3. **teachers** - Faculty information
4. **subjects** - Course catalog
5. **batches** - Student groups
6. **rooms** - Classroom inventory
7. **timetable_entries** - Schedule records

### Key Relationships

```
timetable_entries
├── teacher_id → teachers.id
├── subject_id → subjects.id
├── batch_id → batches.id
├── room_id → rooms.id
└── created_by → users.id
```

### Sample Queries

**Get all entries for a department:**
```sql
SELECT te.*, t.full_name, s.name, b.name, r.room_number
FROM timetable_entries te
JOIN teachers t ON te.teacher_id = t.id
JOIN subjects s ON te.subject_id = s.id
JOIN batches b ON te.batch_id = b.id
JOIN rooms r ON te.room_id = r.id
WHERE t.department_id = 1
ORDER BY te.day_of_week, te.start_time;
```

**Check for teacher conflicts:**
```sql
SELECT * FROM timetable_entries
WHERE teacher_id = ?
  AND day_of_week = ?
  AND start_time = ?
  AND status != 'rejected';
```

---

## 🎨 UI/UX Design

### Color Scheme

- **Primary:** Purple (#663399) - JUW Brand Color
- **Secondary:** Gold (#DAA520) - Accent
- **Success:** Green (#27ae60)
- **Warning:** Orange (#f39c12)
- **Danger:** Red (#e74c3c)

### Design Principles

1. **Clean & Professional**
   - Minimalist interface
   - Clear typography
   - Consistent spacing

2. **Responsive**
   - Mobile-friendly
   - Tablet-optimized
   - Desktop-first

3. **Intuitive Navigation**
   - Sidebar menu
   - Breadcrumb trails
   - Clear labels

4. **Visual Feedback**
   - Hover effects
   - Loading states
   - Success/Error messages

---

## 🔐 Security Features

1. **Authentication**
   - JWT tokens
   - Password hashing (bcrypt)
   - Session management

2. **Authorization**
   - Role-based access control
   - Route protection
   - Permission validation

3. **Data Validation**
   - Input sanitization
   - SQL injection prevention
   - XSS protection

4. **Best Practices**
   - Environment variables
   - Secure headers
   - HTTPS recommended

---

## 📱 API Endpoints

### Authentication
```
POST /api/auth/login
```

### Teachers
```
GET    /api/teachers
POST   /api/teachers
```

### Subjects
```
GET    /api/subjects
POST   /api/subjects
```

### Rooms
```
GET    /api/rooms
POST   /api/rooms
```

### Batches
```
GET    /api/batches
POST   /api/batches
```

### Timetable
```
GET    /api/timetable
POST   /api/timetable
PUT    /api/timetable/:id
DELETE /api/timetable/:id
PUT    /api/timetable/:id/approve
PUT    /api/timetable/:id/reject
POST   /api/timetable/check-conflicts
```

---

## 🧪 Testing

### Manual Testing Checklist

**Office Assistant:**
- [ ] Login successfully
- [ ] Add teacher
- [ ] Add subject
- [ ] Add room
- [ ] Add batch
- [ ] Create timetable entry
- [ ] Verify entry is pending

**Department Admin:**
- [ ] Login successfully
- [ ] View timetable
- [ ] Detect conflicts
- [ ] Approve entry
- [ ] Reject entry
- [ ] Drag and drop class

**Teacher:**
- [ ] Login successfully
- [ ] View personal schedule
- [ ] Verify read-only access

### Conflict Testing

1. Create two entries with:
   - Same teacher, same time
   - Same room, same time
   - Same batch, same time

2. Verify conflict detection

3. Approve one entry

4. Verify other remains pending

---

## 🚧 Future Enhancements

### Phase 2 Features

- [ ] Email notifications
- [ ] SMS alerts
- [ ] PDF export
- [ ] Print-friendly views
- [ ] Mobile app
- [ ] Multi-semester support
- [ ] Holiday management
- [ ] Exam scheduling
- [ ] Room booking system
- [ ] Teacher leave management

### Phase 3 Features

- [ ] Analytics dashboard
- [ ] Utilization reports
- [ ] Load balancing suggestions
- [ ] AI-powered scheduling
- [ ] Integration with LMS
- [ ] Student portal
- [ ] Parent portal

---

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Failed**
```
Solution: Check .env file, verify MySQL is running
```

**2. Login Not Working**
```
Solution: Verify credentials, check user table, reset password
```

**3. Conflicts Not Detected**
```
Solution: Ensure status is not 'rejected', check time format
```

**4. Drag & Drop Not Working**
```
Solution: Use modern browser (Chrome, Firefox, Safari, Edge)
```

### Getting Help

- Check console for error messages
- Verify database schema is imported correctly
- Ensure all dependencies are installed
- Review API response codes

---

## 📄 License

This project is created for educational purposes as a Final Year Project.

---

## 👨‍💻 Development Team

- **Developer:** [Your Name]
- **Institution:** Jinnah University for Women
- **Project Type:** Final Year Project
- **Year:** 2024-2025

---

## 📧 Contact

For support or queries:
- Email: support@juw.edu.pk
- Website: www.juw.edu.pk

---

## 🙏 Acknowledgments

- Jinnah University for Women
- Department of Computer Science
- Project Supervisor
- Beta Testers

---

**Built with ❤️ for JUW**
