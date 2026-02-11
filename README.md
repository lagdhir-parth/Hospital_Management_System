# Hospital Management System

## Description

This Hospital Management System is a modern web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The system aims to digitize and streamline hospital operations, providing an efficient solution for managing patient records, appointments, staff management, and hospital resources.

The application leverages the power of React for a dynamic and responsive user interface, Node.js and Express for robust backend services, and MongoDB for flexible and scalable data storage. It provides a seamless experience for hospital staff, doctors, and administrators to manage day-to-day operations effectively.

Key benefits include:

- Real-time patient data management
- Efficient appointment scheduling and tracking
- Secure authentication and authorization
- Digital record keeping eliminating paper-based processes
- Scalable architecture for growing healthcare needs

## Technologies Used

![Tech Stack](./HMS%20snaps/HMS%20Techstack.png)

### 1. Frontend Technologies:

- **React** (v19.2.0) - Component-based UI library
- **Vite** (v7.2.2) - Next-generation frontend build tool
- **React Router DOM** (v7.10.1) - Client-side routing
- **TailwindCSS** (v4.1.17) - Utility-first CSS framework
- **Axios** (v1.13.2) - HTTP client for API requests
- **React Toastify** (v11.0.5) - Toast notifications
- **Leaflet** (v1.9.4) - Interactive maps
- **Lucide React** (v0.560.0) - Icon library

### 2. Backend Technologies:

- **Node.js** (>=18.0.0) - JavaScript runtime
- **Express** (v5.1.0) - Web application framework
- **Mongoose** (v8.20.0) - MongoDB object modeling
- **JWT** (v9.0.2) - JSON Web Token authentication
- **Bcrypt** (v6.0.0) - Password hashing
- **Nodemailer** (v7.0.12) - Email sending functionality
- **Resend** (v6.9.1) - Email sending service
- **Express rate limit** (v8.2.1) - Rate limiting middleware
- **Helmet** (v8.1.0) - Security middleware
- **Compression** (v1.8.1) - Response compression middleware

### 3. Database:

- **MongoDB** - NoSQL database for flexible data storage

### 4. Additional Tools & Libraries:

- **Cloudinary** (v2.8.0) - Cloud-based image management
- **Multer** (v2.0.2) - File upload handling
- **Cookie Parser** (v1.4.7) - Cookie parsing middleware
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **Dotenv** (v17.2.3) - Environment variable management
- **Nodemon** (v3.1.11) - Development auto-restart utility

## Project Structure

```
Hospital_Management_System/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend Node.js application
│   ├── src/              # Source files
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── server.js     # Main server file
│   ├── public/           # Public assets
│   └── package.json      # Backend dependencies
│
└── .gitignore
```

## Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Steps to configure this application on your system:

1. **Clone the repository**

   ```bash
   git clone https://github.com/lagdhir-parth/Hospital_Management_System.git
   cd Hospital_Management_System
   ```

2. **Setup Backend (Server)**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory with the following variables:

   ```env
    PORT = 3000
    CORS_ORIGIN = "http://localhost:5173, http://localhost:3000,http://10.71.214.253:5173/"

    NODE_ENV = development

    ACCESS_TOKEN_SECRET = access_token_secret
    ACCESS_TOKEN_EXPIRY = 1d
    REFRESH_TOKEN_SECRET = refresh_token_secret
    REFRESH_TOKEN_EXPIRY = 7d

    CLOUDINARY_CLOUD_NAME = cloudinary_name
    CLOUDINARY_API_KEY = cloudinary_api_key
    CLOUDINARY_API_SECRET = cloudinary_api_secret

    MongoDB_URI = mongodb_url
    DB_NAME = Hospital_Management_System

    SMTP_HOST = smtp.gmail.com
    SMTP_PORT = 587
    SMTP_SECURE = true
    SMTP_USER = smtp_user_email
    SMTP_PASS = smtp_user_password
    SMTP_FROM = smtp_from_email
    SMTP_TO = smtp_to_email

    CONTACT_EMAIL = contact_email
   ```

3. **Setup Frontend (Client)**

   ```bash
   cd ../client
   npm install
   ```

4. **Start the Application**

   Open two terminal windows:

   **Terminal 1 - Start Backend Server:**

   ```bash
   cd server
   npm start
   ```

   The server will run on `http://localhost:5000`

   **Terminal 2 - Start Frontend Development Server:**

   ```bash
   cd client
   npm run dev
   ```

   The client will run on `http://localhost:5173`

5. **Access the Application**

   Open your browser and navigate to `http://localhost:5173`

## Features

### Core Modules:

1. **Patient Management**
   - Register new patients with complete details
   - View and update patient information
   - Search patients by name, ID, or contact number
   - Track patient visit history
   - Digital medical records storage

2. **Doctor Module**
   - Separate authenticated accounts for doctors
   - Access to patient history and medical records
   - Appointment management
   - Prescription generation
   - Patient queue management

3. **Appointment System**
   - Schedule and manage appointments
   - Real-time appointment status updates
   - Appointment reminders via email
   - Calendar view for better planning

4. **Administrator Dashboard**
   - Add/remove hospital staff
   - Manage user roles and permissions
   - View system analytics and reports
   - Monitor active users
   - System configuration settings

5. **Authentication & Security**
   - Secure login with JWT authentication
   - Password encryption using Bcrypt
   - Role-based access control
   - Session management
   - Protected routes

6. **File Management**
   - Upload and store medical documents
   - Image storage via Cloudinary
   - Secure file access
   - Document history tracking

## Issues that proposed system overcomes

- Eliminates paper-based record keeping
- Reduces data storage and retrieval time
- Minimizes human errors in data management
- Improves data durability and backup
- Provides better accessibility to medical records
- Enhances communication between different departments
- Streamlines appointment scheduling
- Enables real-time updates and notifications

## Security Features

- **JWT Authentication**: Secure token-based authentication for user sessions
- **Password Encryption**: Bcrypt hashing for password security
- **Protected Routes**: Role-based access control for different user types
- **Environment Variables**: Sensitive data stored in environment variables
- **CORS Configuration**: Controlled cross-origin resource sharing

## API Endpoints

The application provides RESTful API endpoints for:

- User authentication (login, register, logout)
- Patient management (CRUD operations)
- Appointment scheduling
- Doctor management
- File uploads
- Email notifications

## API Documentation

You can explore and test the API using Postman:

👉 [Postman Collection](https://www.postman.com/parthlagdhir2007-8738400/workspace/lagdhir-parth-s-workspace/collection/48928563-eb042555-fc44-4781-bdae-11aad61315ce?action=share&creator=48928563&active-environment=48928563-519e235f-f11f-4dd6-93d4-afa134e86a4c)

## Development Tools

- **ESLint** - Code linting and formatting
- **Nodemon** - Auto-restart during development
- **Vite** - Fast development and build tool
- **React DevTools** - React component debugging

## Diagrams

#### 1. Activity Diagram:

![Hospital Management System](./HMS%20snaps/HMS_ActivityDiagram.drawio.png)
_Activity Diagram_

#### 2. ER Diagram:

![Hospital Management System](./HMS%20snaps/Hospital_Management_System.drawio.png)
_ER Diagram_

## Snapshots

#### 1. Home Page:

![Home Page](./HMS%20snaps/HomePage.png)
_Home Page_

#### 2. Login Page:

![Login Page](./HMS%20snaps/login.png)
_Login Page_

#### 3. Dashboard Pages:

_Admin Dashboard_
![Admin Dashboard](./HMS%20snaps/AdminProfile.png)

_Doctor Dashboard_
![Doctor Dashboard](./HMS%20snaps/DoctorProfile.png)

_Patient Dashboard_
![Patient Dashboard](./HMS%20snaps/PatientProfile.png)

#### 4. Book Appointment Page:

![Book Appointment Page](./HMS%20snaps/BookAppointment.png)
_Book Appointment Page_

## Future Enhancements

- Video consultation feature
- SMS notifications
- Payment gateway integration
- Prescription e-pharmacy integration
- Lab test management
- Inventory management
- Mobile application
- Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any queries or support, please reach out to:

- GitHub: [@lagdhir-parth](https://github.com/lagdhir-parth)
- Repository: [Hospital_Management_System](https://github.com/lagdhir-parth/Hospital_Management_System)

---

### Thank You!

**Note:** Make sure to keep your `.env` file secure and never commit it to version control. The `.gitignore` file is already configured to exclude sensitive files.
