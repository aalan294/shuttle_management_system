# Shuttle Management System - Backend

## 🚀 Overview
The Shuttle Management System is designed to manage bus transportation for students within a college. It enables students to book rides, admins to manage buses and stops, and drivers to update bus locations.

---

## 📌 Project Structure
```
moveinsync-backend/
|-- models/        # Contains MongoDB schemas
|   |-- Admin.js   # Admin schema
|   |-- Student.js # Student schema
|   |-- Bus.js     # Bus schema
|   |-- Ride.js    # Ride schema
|
|-- routes/        # Contains API routes
|   |-- adminRoutes.js   # Admin routes
|   |-- studentRoutes.js # Student routes
|
|-- controllers/   # Contains API logic
|   |-- adminController.js   # Admin functionalities
|   |-- studentController.js # Student functionalities
|
|-- server.js      # Main Express.js server
|-- .env           # Environment variables (PORT, DB_URL)
|-- package.json   # Dependencies and project metadata
```

---

## 📌 Features Implemented

### **1️⃣ Admin Functionalities**
✅ Register & Login Admin (JWT Auth)  
✅ Add, View, Update & Delete Buses  
✅ Create & Update Stops with Timings & Fares  
✅ View All Students & Ride Logs  

### **2️⃣ Student Functionalities**
✅ Register & Login Student (JWT Auth)  
✅ Book a Ride by Selecting "In" or "Out"  
✅ Check Fare, Estimated Arrival & Travel Time  
✅ View Ride History & Token Balance  

### **3️⃣ Bus Management**
✅ Store & Retrieve Bus Information  
✅ Update Seat Availability on Booking  
✅ Reset Seat Count When the Bus Completes Route  
✅ Manually Update Bus Location (Driver Controlled)  

---

## 📌 API Endpoints

### **1️⃣ Admin APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/admin/register` | Register Admin |
| **POST** | `/api/admin/login` | Admin Login (Default Username: `admin123`, Password: `1234`) |
| **POST** | `/api/admin/new-bus` | Add New Bus |
| **GET** | `/api/admin/get-bus` | Fetch All Buses |

### **2️⃣ Student APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/student/register` | Register Student |
| **POST** | `/api/student/login` | Student Login |
| **POST** | `/api/student/book-ride` | Book a Ride |
| **GET** | `/api/student/all` | Get All Students |

---

## 📌 Sample JSON Requests

### **1️⃣ Register Student**
```json
{
  "name": "John Doe",
  "regNo": "SRM12345",
  "email": "johndoe@example.com",
  "mobile": "9876543210",
  "department": "Computer Science",
  "password": "securepassword"
}
```

### **2️⃣ Add a Bus**
```json
{
  "busNumber": "BUS-001",
  "type": "in",
  "seatsAvailable": 30,
  "route": [
    { "stop": "Main Gate", "time": 5, "fare": 10 },
    { "stop": "Library", "time": 7, "fare": 15 }
  ]
}
```

### **3️⃣ Book a Ride**
```json
{
  "studentId": "65f4c8d7f9e8c543a7b2e123",
  "type": "in",
  "source": "Main Gate",
  "destination": "Library"
}
```

---

## 📌 Installation & Setup
1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-repo/shuttle-management.git
cd shuttle-management-backend
```

2️⃣ **Install Dependencies**  
```sh
npm install
```

3️⃣ **Set Up Environment Variables (`.env`)**  
```
PORT=3500
DB_URL=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/yourdbname
```

4️⃣ **Run the Server**  
```sh
nodemon server.js
```

---

## 📌 Next Steps
🚀 Implement real-time bus tracking with WebSockets  
🚀 Add a front-end for students & admin dashboard  
🚀 Optimize route selection using AI-based travel estimation  

---

## 👨‍💻 Contributors
- **Aalan Sason Singarayan A** - (Developer)  

🚀 *Happy Coding!* 🔥

