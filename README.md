# Content Broadcasting System (Backend)

A backend system that allows teachers to upload content, principals to approve it, and users to view live scheduled content.

---

# Tech Stack

* Node.js
* Express.js
* SQLite (Sequelize ORM)
* JWT Authentication
* Multer (File Upload)

---

# 📂 Project Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd content-broadcasting-system
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Run Server

```bash
npx nodemon src/server.js
```

Server will run on:

```
http://localhost:5000
```

---

# 🔐 Authentication System

Uses JWT-based authentication with role-based access:

* **Teacher** → Upload content
* **Principal** → Approve / Reject content

---

# 👤 Test Credentials

## Teacher

```
email: teacher@test.com
password: 123456
```

## Principal

```
email: principal@test.com
password: 123456
```

---

# 📡 API Endpoints

## 🔐 Auth

### Register

```
POST /api/register
```

### Login

```
POST /api/login
```

---

## Teacher APIs

### Upload Content

```
POST /api/upload
```

**Headers:**

```
Authorization: Bearer <teacher_token>
```

**Body (form-data):**

* title (Text)
* subject (Text)
* description (Text)
* file (File)
* start_time (Text - ISO format)
* end_time (Text - ISO format)
* duration (Text)

---

## Principal APIs

### Approve Content

```
POST /api/approve/:id
```

### Reject Content

```
POST /api/reject/:id
```

**Headers:**

```
Authorization: Bearer <principal_token>
```

---

##  Public API

### Get Live Content

```
GET /api/live/:teacherId
```

Returns currently active approved content based on schedule.

---

#  Scheduling Logic

* Each content has:

  * `start_time`
  * `end_time`
* Only content within this time window is considered active
* If multiple contents are active:

  * Rotation logic is applied using duration
  * Content is served dynamically based on time

---

# Database Design

### Users

* id
* name
* email
* password
* role

### Content

* id
* title
* subject
* description
* file_path
* uploaded_by
* start_time
* end_time
* status (pending / approved / rejected)

### Schedule

* id
* content_id
* rotation_order
* duration

---

# 📦 Postman Collection



```
https://drive.google.com/file/d/13MHUIuZOrNL4SP2oeVTemO0J_F3VJXni/view?usp=drive_link
```

---



# Assumptions

* Only teachers can upload content
* Only principals can approve/reject
* Content must be approved to go live
* Scheduling works within given time window

---

#  Limitations

* No frontend (API-based system)
* Basic scheduling (can be enhanced)
* File storage is local

---

# Future Improvements

* Add frontend dashboard
* Cloud file storage (AWS S3)
* Advanced scheduling (priority-based)
* Notifications system

---

# Conclusion

This project demonstrates:

* Backend architecture
* Authentication & authorization
* File handling
* Scheduling logic
* Clean API design

---
