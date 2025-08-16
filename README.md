# LeoChat – Real-time Chat Application

A **real-time chat application** built with the **MERN Stack** and **Socket.io**, allowing private messaging, online/offline status, notifications, and profile picture uploads.

**Live Demo:** [https://real-time-chat-with-leo-chat.vercel.app/](https://real-time-chat-with-leo-chat.vercel.app/)  

---

## Project Overview

LeoChat is a full-stack application designed for **real-time communication**. Users can:

- Send and receive messages instantly.
- See which users are online/offline.
- Receive notifications for new messages.
- Upload and update profile pictures.
- Experience a responsive and user-friendly UI.

This project was built as a learning and portfolio project demonstrating **frontend/backend integration**, **real-time communication**, and deployment skills.

---

## Features

- Real-time messaging using **Socket.io**
- Online/offline status of users
- Private messaging
- Notifications for new messages
- Profile picture upload
- Responsive UI using **Tailwind CSS**
- User authentication with JWT
- Persistent data storage using MongoDB

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Context API  
- **Backend:** Node.js, Express.js, Socket.io  
- **Database:** MongoDB  
- **Deployment:** Vercel  

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or above)  
- npm or yarn  
- MongoDB Atlas account (or local MongoDB)

---

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/URVIL2512/Real-time-chat-with-LeoChat.git
cd Real-time-chat-with-LeoChat

2. Install dependencies for frontend and backend



# Frontend
cd client
npm install
cd ..

# Backend
cd server
npm install
cd ..

3. Configure Environment Variables



Create a .env file in the server folder with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Run the application



# Start backend
cd server
npm run dev

# Start frontend (in a new terminal)
cd client
npm start

Visit http://localhost:3000 to use the app locally.
