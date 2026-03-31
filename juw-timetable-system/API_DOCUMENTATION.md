# JUW Timetable System - API Documentation

Complete API reference for the JUW Timetable Management System backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All API endpoints except `/auth/login` require authentication using JWT (JSON Web Token).

### How to Authenticate

1. Login to get JWT token
2. Include token in subsequent requests

**Header Format:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## Authentication Endpoints

### POST /auth/login

Login and receive JWT token.

**Access:** Public

**Request Body:**
```json
{
  "juw_id": "JUW-OA-001",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "juw_id": "JUW-OA-001",
      "full_name": "Ayesha Khan",
      "email": "ayesha.khan@juw.edu.pk",
      "role": "office_assistant",
      "department_id": null,
      "department_name": null
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### GET /auth/me

Get current user profile.

**Access:** Authenticated users only

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "juw_id": "JUW-OA-001",
      "full_name": "Ayesha Khan",
      "email": "ayesha.khan@juw.edu.pk",
      "role": "office_assistant",
      "department_id": null
    }
  }
}
```

---

### PUT /auth/change-password

Change user password.

**Access:** Authenticated users only

**Request Body:**
```json
{
  "current_password": "password123",
  "new_password": "newpassword456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Teachers Endpoints

### GET /teachers

Get all teachers.

**Access:** All authenticated users

**Query Parameters:**
- `department_id` (optional) - Filter by department
- `is_active` (optional) - Filter by active status (true/false)

**Example Request:**
```
GET /api/teachers?department_id=1&is_active=true
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 7,
  "data": {
    "teachers": [
      {
        "id": 1,
        "teacher_code": "T-CS-001",
        "full_name": "Prof. Rabia Hussain",
        "department_id": 1,
        "department_name": "Computer Science",
        "department_code": "CS",
        "phone": "+92-300-1234567",
        "email": "rabia.hussain@juw.edu.pk",
        "specialization": "Data Structures & Algorithms",
        "is_active": true
      }
    ]
  }
}
```

---

### GET /teachers/:id

Get single teacher by ID.

**Access:** All authenticated users

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "teacher": {
      "id": 1,
      "teacher_code": "T-CS-001",
      "full_name": "Prof. Rabia Hussain",
      "department_id": 1,
      "department_name": "Computer Science",
      "phone": "+92-300-1234567",
      "email": "rabia.hussain@juw.edu.pk",
      "specialization": "Data Structures & Algorithms"
    }
  }
}
```

---

### POST /teachers

Create new teacher.

**Access:** Office Assistant only

**Request Body:**
```json
{
  "teacher_code": "T-CS-008",
  "full_name": "Dr. Sana Ahmed",
  "department_id": 1,
  "phone": "+92-300-9876543",
  "email": "sana.ahmed@juw.edu.pk",
  "specialization": "Machine Learning",
  "user_id": null
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Teacher created successfully",
  "data": {
    "id": 8
  }
}
```

---

### PUT /teachers/:id

Update teacher information.

**Access:** Office Assistant only

**Request Body:**
```json
{
  "full_name": "Dr. Sana Ahmed Khan",
  "phone": "+92-300-1111111",
  "specialization": "Machine Learning & AI"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Teacher updated successfully"
}
```

---

### DELETE /teachers/:id

Delete teacher.

**Access:** Office Assistant only

**Success Response (200):**
```json
{
  "success": true,
  "message": "Teacher deleted successfully"
}
```

---

## Subjects Endpoints

### GET /subjects

Get all subjects.

**Access:** All authenticated users

**Query Parameters:**
- `department_id` (optional) - Filter by department

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": {
    "subjects": [
      {
        "id": 1,
        "subject_code": "CS-101",
        "subject_name": "Introduction to Programming",
        "department_id": 1,
        "department_name": "Computer Science",
        "credit_hours": 3,
        "semester": 1,
        "is_active": true
      }
    ]
  }
}
```

---

### POST /subjects

Create new subject.

**Access:** Office Assistant only

**Request Body:**
```json
{
  "subject_code": "CS-501",
  "subject_name": "Advanced Algorithms",
  "department_id": 1,
  "credit_hours": 3,
  "semester": 7
}
```

---

## Batches Endpoints

### GET /batches

Get all batches.

**Access:** All authenticated users

**Query Parameters:**
- `department_id` (optional) - Filter by department
- `semester` (optional) - Filter by semester

**Success Response (200):**
```json
{
  "success": true,
  "count": 6,
  "data": {
    "batches": [
      {
        "id": 1,
        "batch_code": "CS-2024-A",
        "batch_name": "BSCS 2024 Section A",
        "department_id": 1,
        "department_name": "Computer Science",
        "semester": 1,
        "section": "A",
        "student_count": 45,
        "academic_year": "2024-2025",
        "is_active": true
      }
    ]
  }
}
```

---

### POST /batches

Create new batch.

**Access:** Office Assistant only

**Request Body:**
```json
{
  "batch_code": "CS-2024-C",
  "batch_name": "BSCS 2024 Section C",
  "department_id": 1,
  "semester": 1,
  "section": "C",
  "student_count": 40,
  "academic_year": "2024-2025"
}
```

---

## Rooms Endpoints

### GET /rooms

Get all rooms.

**Access:** All authenticated users

**Query Parameters:**
- `building` (optional) - Filter by building
- `room_type` (optional) - Filter by type (lecture_hall, lab, seminar_room, auditorium)

**Success Response (200):**
```json
{
  "success": true,
  "count": 7,
  "data": {
    "rooms": [
      {
        "id": 1,
        "room_number": "A-101",
        "room_name": "Lecture Hall 101",
        "building": "Block A",
        "capacity": 50,
        "room_type": "lecture_hall",
        "facilities": "Projector, Whiteboard, AC",
        "is_active": true
      }
    ]
  }
}
```

---

### POST /rooms

Create new room.

**Access:** Office Assistant only

**Request Body:**
```json
{
  "room_number": "A-105",
  "room_name": "Lecture Hall 105",
  "building": "Block A",
  "capacity": 45,
  "room_type": "lecture_hall",
  "facilities": "Projector, Whiteboard, AC, Smart Board"
}
```

---

## Departments Endpoints

### GET /departments

Get all departments.

**Access:** All authenticated users

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": {
    "departments": [
      {
        "id": 1,
        "department_code": "CS",
        "department_name": "Computer Science",
        "created_at": "2024-01-03T12:00:00.000Z"
      }
    ]
  }
}
```

---

## Timetable Endpoints

### GET /timetable

Get timetable entries with filters.

**Access:** All authenticated users

**Query Parameters:**
- `department_id` - Filter by department
- `teacher_id` - Filter by teacher
- `batch_id` - Filter by batch
- `room_id` - Filter by room
- `day_of_week` - Filter by day (Monday, Tuesday, etc.)
- `status` - Filter by status (pending, approved, rejected)
- `semester` - Filter by semester
- `academic_year` - Filter by academic year

**Example Request:**
```
GET /api/timetable?department_id=1&status=approved
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 15,
  "data": {
    "entries": [
      {
        "id": 1,
        "teacher_id": 1,
        "teacher_code": "T-CS-001",
        "teacher_name": "Prof. Rabia Hussain",
        "subject_id": 1,
        "subject_code": "CS-101",
        "subject_name": "Introduction to Programming",
        "batch_id": 1,
        "batch_code": "CS-2024-A",
        "batch_name": "BSCS 2024 Section A",
        "section": "A",
        "room_id": 1,
        "room_number": "A-101",
        "room_name": "Lecture Hall 101",
        "building": "Block A",
        "department_id": 1,
        "department_code": "CS",
        "department_name": "Computer Science",
        "day_of_week": "Monday",
        "start_time": "09:00:00",
        "end_time": "10:30:00",
        "status": "approved",
        "semester": 1,
        "academic_year": "2024-2025",
        "notes": null,
        "created_at": "2024-01-03T12:00:00.000Z",
        "approved_at": "2024-01-03T13:00:00.000Z",
        "created_by_name": "Ayesha Khan",
        "approved_by_name": "Dr. Fatima Ahmed"
      }
    ]
  }
}
```

---

### GET /timetable/:id

Get single timetable entry by ID.

**Access:** All authenticated users

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "entry": {
      "id": 1,
      "teacher_name": "Prof. Rabia Hussain",
      "subject_name": "Introduction to Programming",
      "batch_name": "BSCS 2024 Section A",
      "room_number": "A-101",
      "day_of_week": "Monday",
      "start_time": "09:00:00",
      "end_time": "10:30:00",
      "status": "approved"
    }
  }
}
```

---

### POST /timetable

Create new timetable entry.

**Access:** Office Assistant only

**Request Body:**
```json
{
  "teacher_id": 1,
  "subject_id": 1,
  "batch_id": 1,
  "room_id": 1,
  "day_of_week": "Monday",
  "start_time": "09:00:00",
  "end_time": "10:30:00",
  "semester": 1,
  "academic_year": "2024-2025",
  "notes": "Introduction class"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Timetable entry created successfully",
  "data": {
    "id": 25,
    "conflicts": null
  }
}
```

**With Conflicts:**
```json
{
  "success": true,
  "message": "Timetable entry created successfully",
  "data": {
    "id": 25,
    "conflicts": {
      "hasConflict": true,
      "teacherConflict": [
        {
          "entry_id": 10,
          "teacher": "Prof. Rabia Hussain",
          "subject": "Data Structures",
          "batch": "BSCS 2023 Section A",
          "room": "A-102",
          "time": "09:00:00 - 10:30:00",
          "day": "Monday"
        }
      ],
      "roomConflict": [],
      "batchConflict": []
    }
  }
}
```

---

### POST /timetable/check-conflicts

Check for conflicts before creating entry.

**Access:** All authenticated users

**Request Body:**
```json
{
  "teacher_id": 1,
  "room_id": 1,
  "batch_id": 1,
  "day_of_week": "Monday",
  "start_time": "09:00:00",
  "end_time": "10:30:00"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "conflicts": {
      "hasConflict": true,
      "teacherConflict": [...],
      "roomConflict": [...],
      "batchConflict": [...]
    }
  }
}
```

---

### PUT /timetable/:id

Update timetable entry.

**Access:** Office Assistant, Department Admin

**Request Body:**
```json
{
  "room_id": 2,
  "start_time": "11:00:00",
  "end_time": "12:30:00",
  "notes": "Time changed due to room availability"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Timetable entry updated successfully",
  "data": {
    "conflicts": null
  }
}
```

---

### PUT /timetable/:id/approve

Approve timetable entry.

**Access:** Department Admin only

**Success Response (200):**
```json
{
  "success": true,
  "message": "Timetable entry approved successfully"
}
```

**Error Response (400) - Has Conflicts:**
```json
{
  "success": false,
  "message": "Cannot approve entry with conflicts",
  "data": {
    "conflicts": {
      "hasConflict": true,
      "teacherConflict": [...]
    }
  }
}
```

---

### PUT /timetable/:id/reject

Reject timetable entry.

**Access:** Department Admin only

**Request Body:**
```json
{
  "rejection_reason": "Teacher not available at this time"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Timetable entry rejected successfully"
}
```

---

### DELETE /timetable/:id

Delete timetable entry.

**Access:** Office Assistant, Department Admin

**Success Response (200):**
```json
{
  "success": true,
  "message": "Timetable entry deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request

Missing or invalid parameters.

```json
{
  "success": false,
  "message": "All fields are required"
}
```

### 401 Unauthorized

Invalid or missing token.

```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

or

```json
{
  "success": false,
  "message": "Token has expired. Please login again."
}
```

### 403 Forbidden

Insufficient permissions.

```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### 404 Not Found

Resource not found.

```json
{
  "success": false,
  "message": "Teacher not found"
}
```

### 500 Internal Server Error

Server error.

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing with Postman

### 1. Import Environment

Create a Postman environment:
- Name: JUW Timetable - Development
- Variables:
  - `base_url`: http://localhost:5000/api
  - `token`: (will be set after login)

### 2. Login Request

```
POST {{base_url}}/auth/login

Body (raw JSON):
{
  "juw_id": "JUW-OA-001",
  "password": "password123"
}
```

Copy the token from response.

### 3. Authenticated Request

```
GET {{base_url}}/teachers

Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production:
- Login: 5 requests per minute
- Other endpoints: 100 requests per minute

---

## API Versioning

Current version: v1

All endpoints are prefixed with `/api/`

Future versions will use: `/api/v2/`

---

## Support

For API support, consult the development team or refer to the source code in `backend/src/controllers/`
