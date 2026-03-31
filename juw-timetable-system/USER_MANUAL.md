# User Manual
## JUW Timetable Management System

**Version 1.0**  
**Last Updated:** January 2026

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Office Assistant Guide](#office-assistant-guide)
4. [Department Admin Guide](#department-admin-guide)
5. [Teacher Guide](#teacher-guide)
6. [Troubleshooting](#troubleshooting)
7. [FAQs](#faqs)

---

## Introduction

### What is JUW Timetable Management System?

The JUW Timetable Management System is a comprehensive web application designed to streamline the process of creating, managing, and viewing academic timetables at Jinnah University for Women.

### Key Benefits

- **Efficiency:** Automate timetable creation and conflict detection
- **Accuracy:** Eliminate scheduling errors and double-bookings
- **Transparency:** Real-time visibility for all stakeholders
- **Flexibility:** Easy rescheduling with drag-and-drop interface
- **Collaboration:** Workflow-based approval system

### System Requirements

- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Internet:** Stable connection required
- **Screen:** Minimum 1024x768 resolution
- **JavaScript:** Must be enabled

---

## Getting Started

### Accessing the System

1. **Open Web Browser**
   - Launch Chrome, Firefox, Safari, or Edge

2. **Navigate to URL**
   - Enter: `https://timetable.juw.edu.pk`
   - Or local: `http://localhost:3000`

3. **Login Page**
   - You will see the JUW login screen

### Login Process

**Step 1:** Enter Your Credentials
- **JUW ID:** Your university identification number
- **Password:** Your assigned password
- **Role:** Select your role from dropdown

**Step 2:** Click "Login" Button

**Step 3:** Dashboard Loads
- You will be redirected to your role-specific dashboard

### Demo Credentials

For testing purposes:

| Role | JUW ID | Password |
|------|--------|----------|
| Office Assistant | JUW-OFF-001 | password123 |
| Department Admin | JUW-ADM-CS | password123 |
| Teacher | JUW-TCH-001 | password123 |

### First Time Login

If this is your first login:
1. Note your temporary password
2. Change it immediately after login
3. Contact IT support if you encounter issues

---

## Office Assistant Guide

### Overview

As an Office Assistant, you are responsible for:
- Managing master data (teachers, subjects, rooms, batches)
- Creating initial timetable entries
- Maintaining accurate records
- Coordinating with department admins

### Dashboard Navigation

#### Sidebar Menu

- **📊 Overview:** Statistics and quick summary
- **👩‍🏫 Teachers:** Manage faculty members
- **📚 Subjects:** Manage courses
- **🏫 Classrooms:** Manage room inventory
- **👥 Batches:** Manage student groups
- **📅 Timetable:** Create schedule entries

#### Top Bar

- **User Avatar:** Your profile indicator
- **Logout Button:** End your session

### Managing Teachers

#### Adding a New Teacher

**Step 1:** Click "Teachers" in Sidebar

**Step 2:** Fill Teacher Form
- **JUW ID:** e.g., JUW-TCH-004
- **Full Name:** e.g., Dr. Amina Hassan
- **Email:** e.g., amina.hassan@juw.edu.pk
- **Phone:** e.g., +92-300-1234567
- **Department:** Select from dropdown
- **Designation:** e.g., Assistant Professor

**Step 3:** Click "Add Teacher"

**Step 4:** Confirmation
- Success message appears
- Teacher appears in list below
- Form resets for next entry

#### Viewing Teachers

- Scroll to "Teachers List" section
- View all active teachers
- Columns: JUW ID, Name, Department, Email, Phone

#### Tips

✓ Ensure JUW ID is unique  
✓ Use official email addresses  
✓ Double-check department assignment  
✓ Include phone numbers for contact

### Managing Subjects

#### Adding a New Subject

**Step 1:** Click "Subjects" in Sidebar

**Step 2:** Fill Subject Form
- **Subject Code:** e.g., CS301
- **Subject Name:** e.g., Web Development
- **Department:** Select from dropdown
- **Credit Hours:** e.g., 3
- **Semester:** e.g., 5 (for 5th semester)

**Step 3:** Click "Add Subject"

**Step 4:** Verification
- Subject appears in list
- Verify all details are correct

#### Naming Conventions

- **Code Format:** DEPT + Number (e.g., CS101, BA201)
- **Name:** Full descriptive name
- **Credit Hours:** Usually 2-4
- **Semester:** 1-8 for undergraduate

### Managing Classrooms

#### Adding a New Classroom

**Step 1:** Click "Classrooms" in Sidebar

**Step 2:** Fill Room Form
- **Room Number:** e.g., A-301
- **Building:** e.g., Academic Block A
- **Capacity:** Number of seats (e.g., 40)
- **Room Type:** Lecture / Lab / Seminar
- **Has Projector:** Yes / No

**Step 3:** Click "Add Classroom"

#### Room Naming System

| Building | Floor | Room | Full Name |
|----------|-------|------|-----------|
| A | 3 | 01 | A-301 |
| B | 2 | 05 | B-205 |
| C | 1 | Lab1 | C-Lab1 |

### Managing Batches

#### Adding a New Batch

**Step 1:** Click "Batches" in Sidebar

**Step 2:** Fill Batch Form
- **Batch Name:** e.g., BSCS-2024-A
- **Department:** Computer Science
- **Semester:** e.g., 1
- **Year:** e.g., 2024 (admission year)
- **Section:** e.g., A
- **Student Count:** e.g., 35

**Step 3:** Click "Add Batch"

#### Batch Naming Convention

Format: `PROGRAM-YEAR-SECTION`

Examples:
- BSCS-2024-A (BS Computer Science, 2024, Section A)
- BBA-2023-B (BBA, 2023, Section B)
- BSENG-2024-A (BS English, 2024, Section A)

### Creating Timetable Entries

#### Step-by-Step Process

**Step 1:** Click "Timetable" in Sidebar

**Step 2:** Select Resources
- **Teacher:** Choose from dropdown
- **Subject:** Choose from dropdown
- **Batch:** Choose from dropdown
- **Room:** Choose from dropdown

**Step 3:** Set Schedule
- **Day:** Monday - Saturday
- **Start Time:** e.g., 08:00
- **End Time:** e.g., 09:30

**Step 4:** Click "Create Entry"

**Step 5:** System Validation
- Checks for conflicts automatically
- Shows error if conflicts exist
- Creates entry if valid

#### Understanding Conflicts

When you create an entry, the system checks:

1. **Teacher Availability**
   - Is teacher free at this time?
   - Teacher can't be in two places at once

2. **Room Availability**
   - Is room free at this time?
   - Only one class per room at a time

3. **Batch Schedule**
   - Does batch have another class?
   - Students can't attend two classes simultaneously

#### Conflict Resolution

If you see a conflict message:

**Option 1:** Change Time Slot
- Select different start/end time
- Try another day

**Option 2:** Change Room
- Select different classroom
- Use lab if needed

**Option 3:** Change Teacher
- Assign different faculty member
- Coordinate with department

**Option 4:** Split Batch
- Divide into smaller sections
- Create separate entries

#### Entry Status

After creation:
- Status: **Pending** (yellow badge)
- Awaits department admin approval
- Visible in admin's pending queue
- Can be edited before approval

### Best Practices

#### Data Entry

✓ **Verify Before Submitting**
- Double-check all fields
- Confirm teacher availability
- Verify room capacity matches batch size

✓ **Consistent Naming**
- Use standardized formats
- Follow university conventions
- Maintain naming consistency

✓ **Regular Updates**
- Keep contact information current
- Update room facilities
- Mark inactive records

#### Timetable Creation

✓ **Plan Ahead**
- Create entries for entire semester
- Consider teacher preferences
- Balance workload across days

✓ **Coordinate**
- Communicate with teachers
- Confirm room bookings
- Notify department admins

✓ **Check Conflicts**
- Review before submission
- Test different combinations
- Use system's conflict checker

### Common Tasks

#### Updating Teacher Information

1. Create new entry with correct information
2. Mark old entry as inactive (via admin)
3. Update all related timetable entries

#### Rescheduling a Class

1. Delete existing entry (if not approved)
2. Create new entry with new time
3. Or: Request admin to move via drag-drop

#### Handling Errors

If you make a mistake:
- Pending entries can be recreated
- Contact admin to reject wrong entry
- Create corrected version

---

## Department Admin Guide

### Overview

As a Department Admin, you:
- Oversee department timetable
- Approve/reject timetable entries
- Detect and resolve conflicts
- Reschedule classes as needed
- Ensure optimal schedule

### Dashboard Layout

#### Sidebar Menu

- **📅 Timetable:** Visual weekly grid
- **⚠️ Conflicts:** Detected issues
- **⏳ Pending Approvals:** Queue of entries

#### Timetable View

The main timetable grid shows:
- **Rows:** Time slots (8 AM - 4:30 PM)
- **Columns:** Days (Monday - Saturday)
- **Cards:** Individual class entries

### Understanding the Timetable Grid

#### Color Coding

- **Purple Cards:** Approved classes
- **Orange Badge:** Pending approval
- **Green Badge:** Approved
- **Red Badge:** Rejected
- **Red Background:** Conflict detected

#### Card Information

Each class card displays:
- **Subject Code:** e.g., CS101
- **Teacher Name:** e.g., Prof. Hina Tariq
- **Batch:** e.g., BSCS-2024-A
- **Room:** e.g., A-101
- **Time:** e.g., 08:00 - 09:30
- **Status Badge:** Pending/Approved/Rejected

### Conflict Detection

#### Automatic Detection

System automatically checks for:

1. **Teacher Conflicts** ⚠️
   - Same teacher, same time slot
   - Different classes overlapping

2. **Room Conflicts** ⚠️
   - Same room, same time slot
   - Double-booking detected

3. **Batch Conflicts** ⚠️
   - Same batch, same time slot
   - Students can't attend both

#### Viewing Conflicts

**Method 1:** Visual Indicators
- Red highlighted cards in timetable
- Shaking animation on conflict

**Method 2:** Conflicts Section
- Click "Conflicts" in sidebar
- View detailed list
- See all affected entries

**Method 3:** Check Button
- Click "🔍 Check Conflicts" button
- Runs full system scan
- Displays results in alert box

### Drag & Drop Rescheduling

#### How to Reschedule

**Step 1:** Click and Hold
- Click on any class card
- Hold mouse button

**Step 2:** Drag
- Move cursor to desired slot
- Different time or different day
- Drop zone highlights

**Step 3:** Release
- Drop card in new slot
- System validates automatically
- Updates if no conflicts

**Step 4:** Confirmation
- Success message appears
- Card moves to new position
- Status remains unchanged

#### Drag & Drop Tips

✓ **Visual Feedback**
- Card becomes semi-transparent while dragging
- Drop zone highlights in purple
- Invalid zones remain unchanged

✓ **Conflict Prevention**
- System checks before allowing drop
- Shows error if conflicts exist
- Card returns to original position

✓ **Quick Rescheduling**
- Faster than deleting and recreating
- Preserves all other details
- Instant validation

### Approving Entries

#### Viewing Pending Entries

**Step 1:** Click "Pending Approvals"

**Step 2:** Review Table
- Lists all pending entries
- Shows teacher, subject, batch, room
- Displays day and time

**Step 3:** Check for Conflicts
- Look for red highlighting
- Review conflict alerts
- Verify resource availability

#### Approval Process

**Option 1:** Approve Entry

1. Click "Approve" button (green)
2. Confirm action
3. Entry status changes to "Approved"
4. Becomes visible to all users
5. Included in final timetable

**Option 2:** Reject Entry

1. Click "Reject" button (red)
2. Enter rejection reason
3. Confirm action
4. Entry status changes to "Rejected"
5. Office assistant notified

#### Approval Guidelines

**Approve if:**
- ✓ No conflicts detected
- ✓ Room capacity sufficient
- ✓ Teacher available
- ✓ Batch free at that time
- ✓ Follows university policies

**Reject if:**
- ✗ Conflicts exist
- ✗ Room too small
- ✗ Teacher overloaded
- ✗ Timing inappropriate
- ✗ Policy violation

### Resolving Conflicts

#### Conflict Resolution Strategies

**Strategy 1:** Change Time
- Move one class to different time slot
- Use drag & drop feature
- Verify no new conflicts

**Strategy 2:** Change Room
- Reject entry with note
- Request different room
- Office assistant recreates

**Strategy 3:** Reassign Teacher
- Reject entry with reason
- Suggest alternate teacher
- Coordinate with department

**Strategy 4:** Split Session
- Divide class into smaller groups
- Create multiple entries
- Different times/rooms

#### Example Scenario

**Conflict:** 
- Prof. Hina scheduled for CS101 and CS102
- Both Monday 8-9:30 AM

**Resolution Steps:**

1. **Identify Conflict**
   - Check conflicts section
   - Note both entries

2. **Evaluate Options**
   - Can CS102 move to 9:30-11?
   - Is another teacher available?
   - Can we use different day?

3. **Make Decision**
   - Approve CS101 (higher priority)
   - Reject CS102 with note
   - Suggest Tuesday 8-9:30 AM

4. **Notify Office**
   - Rejection reason explains
   - Offers alternative
   - Office recreates entry

### Weekly Timetable Review

#### Regular Review Checklist

□ **Monday Morning**
- Review all pending entries
- Check conflict alerts
- Approve valid entries

□ **Mid-Week**
- Monitor new submissions
- Address urgent changes
- Coordinate with office

□ **Friday Afternoon**
- Final review before week end
- Ensure no pending issues
- Prepare for next week

### Best Practices

#### Approval Workflow

✓ **Timely Review**
- Check pending queue daily
- Don't let entries accumulate
- Maintain quick turnaround

✓ **Clear Communication**
- Provide specific rejection reasons
- Suggest alternatives
- Be constructive

✓ **Systematic Approach**
- Review oldest entries first
- Group by priority
- Handle conflicts immediately

#### Timetable Optimization

✓ **Balanced Distribution**
- Spread classes evenly across week
- Avoid back-to-back same subjects
- Consider teacher workload

✓ **Resource Utilization**
- Maximize room usage
- Optimize lab time
- Balance peak hours

✓ **Student Consideration**
- Avoid excessive gaps
- Cluster related subjects
- Consider commute times

---

## Teacher Guide

### Overview

As a Teacher, you can:
- View your personal schedule
- See all assigned classes
- Check room locations
- Review batch assignments

Note: Teachers have read-only access and cannot modify the timetable.

### Dashboard

#### Navigation

- **📅 My Schedule:** Weekly timetable view
- **User Avatar:** Your profile (top right)
- **Logout:** End session

### Viewing Your Schedule

#### Timetable Display

Your weekly schedule shows:
- **Days:** Monday through Saturday
- **Time Slots:** Your class timings
- **Class Cards:** Each assigned class

#### Class Card Details

Each card displays:
- **Subject Code:** e.g., CS101
- **Subject Name:** Introduction to Programming
- **Batch:** Student group (e.g., BSCS-2024-A)
- **Room:** Classroom location (e.g., A-101)

### Understanding Your Schedule

#### Reading the Grid

- **Horizontal:** Days of week
- **Vertical:** Time slots
- **Colored Cards:** Your classes
- **Empty Slots:** Free time

#### Example Schedule

**Monday:**
- 08:00-09:30: CS101, BSCS-2024-A, Room A-101
- 11:30-13:00: CS101 Lab, BSCS-2024-A, Room A-Lab1

**Tuesday:**
- 09:30-11:00: CS102, BSCS-2023-A, Room A-201

#### Free Periods

Empty time slots indicate:
- No scheduled classes
- Office hours possible
- Available for meetings
- Personal time

### Practical Tips

#### Before Each Class

1. **Check Your Schedule**
   - Login to system
   - Verify today's classes
   - Note room numbers

2. **Plan Your Day**
   - Review batch details
   - Prepare materials
   - Note room locations

3. **Check for Changes**
   - Look for updates
   - Confirm timing
   - Note any reschedules

#### During Semester

✓ **Regular Monitoring**
- Check schedule weekly
- Note any changes
- Report conflicts to admin

✓ **Room Familiarization**
- Visit rooms beforehand
- Check equipment
- Note capacity

✓ **Batch Information**
- Know student count
- Understand semester level
- Note special requirements

### Frequently Asked Questions

**Q: Can I request a schedule change?**
A: Contact your Department Admin or Office Assistant with your request. They will evaluate and make necessary changes.

**Q: What if I see a conflict in my schedule?**
A: Report immediately to Department Admin. Conflicts should not occur, but if they do, they must be resolved quickly.

**Q: How do I know which room to go to?**
A: Each class card shows the room number and building. Refer to campus map if unfamiliar.

**Q: Can I see other teachers' schedules?**
A: No, you can only view your own schedule for privacy reasons.

**Q: What if I'm assigned to a wrong batch?**
A: Contact Office Assistant to correct the assignment.

---

## Troubleshooting

### Login Issues

**Problem:** Can't login

**Solutions:**
- Verify JUW ID is correct (check caps lock)
- Ensure password is correct
- Select correct role from dropdown
- Clear browser cache
- Try different browser
- Contact IT support

**Problem:** Forgot password

**Solutions:**
- Contact IT department
- Request password reset
- Verify identity
- Receive temporary password
- Change password on first login

### Display Issues

**Problem:** Page not loading

**Solutions:**
- Check internet connection
- Refresh page (F5)
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Update browser to latest version

**Problem:** Timetable not displaying

**Solutions:**
- Wait for page to load completely
- Check if data exists for your department
- Verify you're logged in
- Check browser console for errors
- Contact technical support

### Drag & Drop Issues

**Problem:** Can't drag classes

**Solutions:**
- Use supported browser (Chrome, Firefox, Edge)
- Ensure JavaScript is enabled
- Check if you have admin permissions
- Refresh page
- Clear cache

**Problem:** Drop not working

**Solutions:**
- Ensure drop zone is highlighted
- Check for conflicts
- Verify target slot is valid
- Try different time slot
- Contact support if persists

### Data Entry Issues

**Problem:** Form not submitting

**Solutions:**
- Check all required fields are filled
- Verify data format is correct
- Look for error messages
- Check for conflict alerts
- Try refreshing page

**Problem:** Duplicate entries

**Solutions:**
- Check existing records first
- Verify JUW ID is unique
- Review before submitting
- Contact admin if duplicate created

---

## FAQs

### General Questions

**Q: What browsers are supported?**
A: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**Q: Can I use mobile device?**
A: Yes, the system is responsive and works on tablets and large phones.

**Q: Is data saved automatically?**
A: Yes, all changes are saved immediately to the database.

**Q: Can multiple users access simultaneously?**
A: Yes, the system supports concurrent users.

### Security Questions

**Q: Is my data secure?**
A: Yes, we use encryption and secure protocols.

**Q: Can I change my password?**
A: Contact IT department for password changes.

**Q: What if I suspect unauthorized access?**
A: Report immediately to IT security team.

### Functionality Questions

**Q: How far ahead can I plan?**
A: You can create timetables for entire semester or academic year.

**Q: Can I export the timetable?**
A: This feature is planned for future updates.

**Q: Can I print my schedule?**
A: Use browser's print function (Ctrl+P) after viewing your schedule.

**Q: How do I report a bug?**
A: Contact IT support with detailed description and screenshots.

---

## Getting Help

### Support Channels

**IT Department:**
- Email: it.support@juw.edu.pk
- Phone: +92-21-XXXXXXX
- Office: Computer Center, Ground Floor
- Hours: 9 AM - 5 PM, Monday - Friday

**Online Resources:**
- System Help: Click "?" icon in application
- Video Tutorials: Available on university portal
- Documentation: System documentation folder

### Reporting Issues

When reporting issues, include:
1. Your JUW ID
2. Role (Office Assistant / Admin / Teacher)
3. Description of problem
4. Steps to reproduce
5. Screenshots if possible
6. Browser and version
7. Date and time of issue

---

## Glossary

**Batch:** A group of students in same program, year, and section

**Conflict:** Scheduling overlap that creates impossibility

**Department Admin:** Staff member overseeing department timetable

**JUW ID:** Unique university identification number

**Office Assistant:** Staff managing master data and initial entries

**Pending:** Status of entry awaiting approval

**Session Type:** Theory, Lab, or Tutorial class

**Time Slot:** Fixed period for scheduled activity

**Timetable Entry:** Single scheduled class in system

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**For Support:** it.support@juw.edu.pk

---

© 2024-2026 Jinnah University for Women. All Rights Reserved.
