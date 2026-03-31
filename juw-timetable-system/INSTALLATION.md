# JUW Timetable System - Installation Guide

This guide will walk you through the complete installation process step-by-step.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v16 or higher)
- ✅ MySQL installed (v8.0 or higher)
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/Command Prompt access

### Verify Installations

```bash
# Check Node.js version
node --version
# Should output: v16.x.x or higher

# Check npm version
npm --version
# Should output: 8.x.x or higher

# Check MySQL
mysql --version
# Should output: mysql Ver 8.0.x
```

## Step-by-Step Installation

### Step 1: Extract Project Files

Extract the `juw-timetable-system` folder to your desired location.

```bash
cd /path/to/juw-timetable-system
```

### Step 2: MySQL Database Setup

#### 2.1 Start MySQL Server

**Windows:**
- Open MySQL Workbench or
- Start MySQL service from Services app

**Mac:**
```bash
mysql.server start
```

**Linux:**
```bash
sudo systemctl start mysql
```

#### 2.2 Login to MySQL

```bash
mysql -u root -p
```
Enter your MySQL root password.

#### 2.3 Create Database

```sql
CREATE DATABASE juw_timetable;
USE juw_timetable;
EXIT;
```

#### 2.4 Import Database Schema

```bash
# From project root directory
mysql -u root -p juw_timetable < database/schema.sql
```

#### 2.5 Import Sample Data (Optional but Recommended)

```bash
mysql -u root -p juw_timetable < database/sample_data.sql
```

#### 2.6 Verify Database Setup

```bash
mysql -u root -p juw_timetable
```

```sql
SHOW TABLES;
-- Should show: batches, departments, rooms, subjects, teachers, timetable_entries, users

SELECT COUNT(*) FROM users;
-- Should return 8 (if sample data imported)

EXIT;
```

### Step 3: Backend Setup

#### 3.1 Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- mysql2
- bcrypt
- jsonwebtoken
- cors
- dotenv
- helmet
- morgan
- winston

#### 3.2 Configure Environment

```bash
# Copy environment template
cp .env.example .env
```

#### 3.3 Edit .env File

Open `.env` in your text editor and update:

```env
NODE_ENV=development
PORT=5000

# Update these with your MySQL credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=juw_timetable

# Generate a strong secret (or use this for testing)
JWT_SECRET=juw_super_secret_key_2024_change_in_production
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

**Important:** Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL password.

#### 3.4 Create Logs Directory

```bash
mkdir logs
```

#### 3.5 Test Backend Connection

```bash
npm start
```

You should see:
```
┌─────────────────────────────────────────────────┐
│  JUW Timetable Management System API            │
│  Server running on port 5000                     │
│  Environment: development                        │
│  API Version: v1                                 │
└─────────────────────────────────────────────────┘
✅ Database connection established successfully
```

#### 3.6 Test API Health Endpoint

Open browser and go to: http://localhost:5000/health

You should see:
```json
{
  "success": true,
  "message": "JUW Timetable API is running",
  "timestamp": "2024-..."
}
```

### Step 4: Frontend Setup

#### Option A: Standalone HTML File (Simplest)

1. Open `frontend/index.html` in your web browser
2. Login with test credentials:
   - JUW ID: `JUW-OA-001`
   - Password: `password123`

That's it! The standalone version works directly.

#### Option B: React Development Server

```bash
cd frontend
npm install
npm start
```

Frontend will open automatically at: http://localhost:3000

### Step 5: Password Setup (Important for Production)

The sample data includes placeholder passwords. To create secure passwords:

#### 5.1 Create Password Hash

Create a file `create-password.js`:

```javascript
const bcrypt = require('bcrypt');

async function createPassword() {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    console.log('Password:', password);
    console.log('Hash:', hash);
}

createPassword();
```

Run it:
```bash
node create-password.js
```

#### 5.2 Update Database

```sql
UPDATE users 
SET password_hash = 'YOUR_GENERATED_HASH_HERE' 
WHERE juw_id = 'JUW-OA-001';
```

## Verification Checklist

After installation, verify everything works:

### ✅ Backend Verification
- [ ] MySQL server is running
- [ ] Database `juw_timetable` exists
- [ ] All tables created (8 tables)
- [ ] Sample data imported (8 users)
- [ ] Backend server starts without errors
- [ ] Health endpoint responds at http://localhost:5000/health
- [ ] No database connection errors in logs

### ✅ Frontend Verification
- [ ] Frontend opens in browser
- [ ] Login page displays correctly
- [ ] Can login with test credentials
- [ ] Dashboard loads after login
- [ ] Navigation menu works
- [ ] Data loads from backend

### ✅ Functionality Verification
- [ ] Office Assistant can add teachers
- [ ] Office Assistant can create timetable entries
- [ ] Department Admin sees pending approvals
- [ ] Teacher sees their timetable
- [ ] Conflict detection works

## Testing the System

### Test 1: Office Assistant Login

1. Login with:
   - JUW ID: `JUW-OA-001`
   - Password: `password123`

2. You should see:
   - Dashboard with statistics
   - Sidebar menu with options
   - Stats showing existing teachers, subjects, batches, rooms

3. Click "Manage Teachers" to see teacher list

### Test 2: Create Timetable Entry

1. As Office Assistant, click "Create Timetable"
2. Fill the form:
   - Select a teacher
   - Select a subject
   - Select a batch
   - Select a room
   - Choose day and time
3. Click "Create Timetable Entry"
4. Entry should be created successfully

### Test 3: Department Admin Approval

1. Logout and login as:
   - JUW ID: `JUW-DA-CS`
   - Password: `password123`

2. Click "Pending Approvals"
3. You should see the entry you created
4. Click ✓ to approve or ✗ to reject

### Test 4: Teacher View

1. Logout and login as:
   - JUW ID: `JUW-T-001`
   - Password: `password123`

2. You should see your personal timetable
3. Approved entries will be visible

### Test 5: Conflict Detection

1. Login as Office Assistant
2. Create a timetable entry
3. Try creating another entry with:
   - Same teacher at same time
4. System should show conflict warning

## Common Issues & Solutions

### Issue 1: "Cannot connect to database"

**Cause:** MySQL server not running or wrong credentials

**Solution:**
```bash
# Check MySQL is running
sudo systemctl status mysql  # Linux
mysql.server status          # Mac

# Test connection
mysql -u root -p

# If connection fails, restart MySQL
sudo systemctl restart mysql
```

### Issue 2: "Table doesn't exist"

**Cause:** Schema not imported

**Solution:**
```bash
# Re-import schema
mysql -u root -p juw_timetable < database/schema.sql
```

### Issue 3: "Invalid credentials" on login

**Cause:** Sample data not imported or password mismatch

**Solution:**
```bash
# Import sample data
mysql -u root -p juw_timetable < database/sample_data.sql
```

### Issue 4: "Port 5000 already in use"

**Cause:** Another process using port 5000

**Solution:**
```bash
# Find process
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 [PID]  # Mac/Linux
taskkill /PID [PID] /F  # Windows

# Or change port in .env
PORT=5001
```

### Issue 5: Frontend can't connect to backend

**Cause:** CORS or wrong API URL

**Solution:**
1. Check backend is running on port 5000
2. Verify CORS_ORIGIN in backend .env
3. Check API_BASE_URL in frontend code

### Issue 6: "JWT token expired"

**Cause:** Token validity expired

**Solution:** Simply logout and login again

## Development vs Production

### Development Setup (Current)
- Debug mode enabled
- Detailed error messages
- No HTTPS required
- Sample data for testing

### Production Considerations
1. **Security:**
   - Change JWT_SECRET to a strong random string
   - Use HTTPS/SSL certificates
   - Change all default passwords
   - Enable rate limiting

2. **Database:**
   - Use strong MySQL password
   - Restrict MySQL remote access
   - Regular backups
   - Remove sample data

3. **Server:**
   - Set NODE_ENV=production
   - Use process manager (PM2)
   - Setup proper logging
   - Configure firewall

## Next Steps

After successful installation:

1. **Familiarize yourself with the system:**
   - Test all user roles
   - Try all features
   - Understand the workflow

2. **Customize for your needs:**
   - Add your university departments
   - Add actual teachers and subjects
   - Configure academic year and semesters

3. **Deploy (if needed):**
   - Choose hosting provider
   - Configure production environment
   - Setup SSL/HTTPS
   - Configure domain

## Getting Help

If you encounter issues not covered here:

1. Check the main README.md
2. Review error logs in `backend/logs/`
3. Check browser console for frontend errors
4. Verify all installation steps completed

## Backup & Restore

### Backup Database

```bash
mysqldump -u root -p juw_timetable > backup.sql
```

### Restore Database

```bash
mysql -u root -p juw_timetable < backup.sql
```

---

**Congratulations!** 🎉 

Your JUW Timetable Management System is now installed and ready to use!
