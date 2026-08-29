# Freelancing Marketplace

A modern full-stack freelancing marketplace platform that connects clients with freelancers and provides a complete workflow for finding jobs, submitting proposals, communicating, and managing freelance work.

## 🚀 Overview

**Freelancing Marketplace** is a full-stack web application designed to connect clients and freelancers in one platform.

Clients can publish jobs, receive proposals, communicate with freelancers, and manage their hiring process.

Freelancers can browse available jobs, submit proposals, communicate with clients, manage their profiles, and track their activities.

The project is built with a modern **React + Vite frontend** and a **Node.js + Express + MongoDB backend**.

---

## ✨ Features

### 👤 Authentication

- User Registration
- User Login
- Logout
- JWT Authentication
- Protected Routes
- Forgot Password
- Reset Password
- Role-based access
- Client and Freelancer accounts

### 💼 Client Features

- Client Dashboard
- Create Job
- Edit Job
- View My Jobs
- View Job Details
- Receive Freelancer Proposals
- Review Proposals
- Accept Proposal
- Reject Proposal
- Client Conversations
- Messaging with Freelancers
- Client Profile
- Client Settings
- Notifications

### 👨‍💻 Freelancer Features

- Freelancer Dashboard
- Find Jobs
- Search and browse jobs
- View Job Details
- Apply to Jobs
- Submit Proposals
- View My Proposals
- Withdraw Proposals
- Freelancer Profile
- Portfolio Information
- Skills and Experience
- Messaging with Clients
- Freelancer Settings
- Notifications
- Earnings Dashboard

### 💬 Messaging

- Client ↔ Freelancer conversations
- Create conversations
- Send messages
- Receive messages
- Conversation history
- Automatic message polling
- Separate Client and Freelancer messaging interfaces

### 📄 Proposals

Freelancers can:

- Submit proposals
- Add cover letters
- Set proposed budgets
- Set estimated duration
- Track proposal status
- Withdraw pending proposals

Clients can:

- View proposals submitted to their jobs
- Review freelancer information
- Accept proposals
- Reject proposals

### 🎨 UI/UX

- Responsive design
- Modern dashboard layout
- Dark mode support
- Mobile-friendly interfaces
- Clean component-based architecture
- Loading states
- Error handling
- Empty states
- Interactive cards and dashboards

---

## 🛠️ Technologies

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- Cookie Parser
- Multer

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

## 📁 Project Structure

```text
Freelancing-Marketplace/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── client/
│   │   │   └── freelancers/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Workflow

### Freelancer Workflow

```text
Register
   ↓
Complete Profile
   ↓
Find Jobs
   ↓
View Job
   ↓
Submit Proposal
   ↓
Wait for Client Response
   ↓
Accept / Reject
   ↓
Start Conversation
   ↓
Manage Work
```

### Client Workflow

```text
Register
   ↓
Complete Profile
   ↓
Post Job
   ↓
Receive Proposals
   ↓
Review Freelancers
   ↓
Accept / Reject Proposal
   ↓
Start Conversation
   ↓
Manage Freelance Work
```

---

## 🔐 Authentication

The application uses JWT-based authentication with protected routes.

Authentication is used to identify the current user and separate:

```text
Client
```

from:

```text
Freelancer
```

Protected API requests use authenticated sessions and credentials.

---

## 📡 Main API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Jobs

```http
POST /api/jobs
GET  /api/jobs
GET  /api/jobs/:id
PUT  /api/jobs/:id
DELETE /api/jobs/:id
```

### Freelancer Proposals

```http
POST  /api/jobs/:jobId/proposals
GET   /api/proposals/my
GET   /api/proposals/:id
PATCH /api/proposals/:id/withdraw
```

### Client Proposals

```http
GET   /api/client/proposals
GET   /api/client/jobs/:jobId/proposals
GET   /api/client/proposals/:id
PATCH /api/client/proposals/:id/accept
PATCH /api/client/proposals/:id/reject
```

### Conversations

```http
POST /api/conversations
GET  /api/conversations
```

### Messages

```http
POST /api/conversations/:conversationId/messages
GET  /api/conversations/:conversationId/messages
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Freelancing-Marketplace.git
```

### 2. Open the project

```bash
cd Freelancing-Marketplace
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_PASSWORD=your_email_app_password
```

Never upload your `.env` file to GitHub.

---

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🧪 API Testing

The backend APIs can be tested using **Postman**.

Recommended testing order:

```text
Register
   ↓
Login
   ↓
Create Job
   ↓
Apply to Job
   ↓
Get Proposals
   ↓
Create Conversation
   ↓
Send Message
   ↓
Get Messages
```

---

## 🖥️ User Roles

The platform currently supports two main roles:

### Client

Clients can:

- Post jobs
- Manage jobs
- Receive proposals
- Hire freelancers
- Send messages
- Manage their account

### Freelancer

Freelancers can:

- Find jobs
- Apply to jobs
- Manage proposals
- Communicate with clients
- Manage profiles
- Track freelance activities

---

## 📱 Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The messaging interface also includes a responsive mobile conversation layout.

---

## 🔮 Future Improvements

Planned improvements include:

- Real-time messaging using Socket.IO
- Advanced notifications
- Online/offline presence
- Payment integration
- Stripe integration
- Escrow system
- Reviews and ratings
- Project milestones
- File sharing
- Advanced search and filtering
- Freelancer earnings and withdrawals
- Admin dashboard
- Analytics
- Deployment optimization

---

## 🎯 Project Goals

The main goals of this project are:

- Build a complete full-stack marketplace
- Practice React and modern frontend development
- Build REST APIs with Express.js
- Work with MongoDB and Mongoose
- Implement authentication and authorization
- Handle Client/Freelancer roles
- Build real-world messaging functionality
- Build a scalable component-based architecture

---

## 👨‍💻 Author

**Mohamed Elbatawi**

Full Stack MERN Developer

### Skills

```text
React.js
Node.js
Express.js
MongoDB
Mongoose
JavaScript
Vite
Tailwind CSS
REST APIs
Git & GitHub
```

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and portfolio purposes.
