# FoodExpress - Multi Restaurant Food Delivery Platform

## Project Overview

FoodExpress is a full-stack multi-restaurant food delivery platform developed using the MERN stack. The platform allows customers to browse restaurants, place food orders, track deliveries in real time, and earn loyalty points. Restaurant owners can manage menus and orders, while drivers can update delivery statuses and live locations. An admin dashboard is included for approving restaurants/drivers and assigning delivery drivers to orders.

The project focuses on providing a complete real-time food delivery ecosystem similar to modern platforms like Swiggy, Zomato, and Uber Eats.

---

# Features

## Customer Features

* User Registration and Login
* Browse Restaurants
* View Restaurant Menus
* Add Items to Cart
* Increase/Decrease Item Quantity
* Cash on Delivery (COD)
* Place Orders
* Live Order Tracking
* Google Maps Driver Tracking
* Order History
* Loyalty Points System
* Food and Driver Ratings
* Logout Functionality

---

## Restaurant Features

* Restaurant Dashboard
* Add Menu Items
* Edit Menu Items
* Delete Menu Items
* View Incoming Orders
* Accept Orders
* Reject Orders
* Mark Orders as Preparing
* Track Driver Location
* View Customer Details

---

## Driver Features

* Driver Dashboard
* View Assigned Deliveries
* Update Delivery Status
* Live Location Updates
* Delivery Tracking on Map
* Earnings Display

---

## Admin Features

* Admin Login
* Approve Restaurants
* Approve Drivers
* View Pending Approvals
* Assign Drivers to Orders
* Manage Delivery Workflow

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Context API
* Socket.io Client

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.io

---

## Database

* MongoDB Atlas / Local MongoDB

---

# System Architecture

The application follows a client-server architecture.

## Frontend

Handles:

* User Interface
* State Management
* API Calls
* Real-Time Updates
* Map Tracking

## Backend

Handles:

* Authentication
* Authorization
* REST APIs
* Database Operations
* Driver Assignment
* Loyalty Point Management

## Database

Stores:

* Users
* Restaurants
* Orders
* Driver Locations
* Ratings
* Loyalty Points

---

# Modules

## Authentication Module

Supports:

* Customer Login
* Restaurant Login
* Driver Login
* Admin Login

Uses JWT-based authentication for secure access.

---

## Restaurant Module

Restaurant owners can:

* Create restaurants
* Manage menus
* Receive orders
* Update order statuses
* Track deliveries

---

## Cart Module

Customers can:

* Add products to cart
* Update quantities
* Remove products
* View total bill

---

## Order Module

Supports:

* Order creation
* Order history
* Live order tracking
* Driver assignment
* Status updates

---

## Loyalty Points Module

Customers earn points based on order value.

### Formula

```text
Loyalty Points = Total Order Price / 10
```

Example:

* ₹500 order → 50 loyalty points

---

## Tracking Module

Real-time tracking includes:

* Order status updates
* Driver details
* Google Maps location tracking
* Live delivery movement

---

# Real-Time Features

The project uses Socket.io for:

* Driver connection status
* Live delivery tracking
* Instant updates
* Real-time dashboard refresh

---

# API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

---

## Restaurants

```text
GET /api/restaurants
GET /api/restaurants/:id
POST /api/restaurants
POST /api/restaurants/:id/menu
PUT /api/restaurants/:id/menu/:menuId
DELETE /api/restaurants/:id/menu/:menuId
```

---

## Orders

```text
POST /api/orders
GET /api/orders
PUT /api/orders/:id/status
PUT /api/orders/:id/assign-driver
PUT /api/orders/:id/rate
```

---

## Admin

```text
GET /api/admin/pending-users
PUT /api/admin/approve/:id
GET /api/admin/drivers
```

---

# Folder Structure

```text
FoodDeliveryAppProject
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── server.js
│
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   ├── App.jsx
│
├── frontendAdmin
│   ├── FDAPAdmin
│
└── README.md
```

---

# Installation Guide

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Start backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Admin Dashboard Setup

## Navigate to admin frontend

```bash
cd frontendAdmin/FDAPAdmin
```

## Install dependencies

```bash
npm install
```

## Start admin frontend

```bash
npm run dev
```

Admin dashboard runs on:

```text
http://localhost:5174
```

---

# Environment Variables

Create `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

# Database Models

## User Model

Stores:

* Name
* Email
* Password
* Role
* Approval Status
* Driver Location
* Loyalty Points

---

## Restaurant Model

Stores:

* Restaurant Name
* Owner
* Menu
* Cuisine
* Location

---

## Order Model

Stores:

* Customer
* Restaurant
* Items
* Total Price
* Order Status
* Driver
* Ratings

---

# Security Features

* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Approval Middleware
* Secure API Access

---

# Future Enhancements

* Online Payments
* AI-Based Recommendations
* Push Notifications
* Estimated Delivery Time
* Advanced Analytics
* Chat Support
* Mobile Application

---

# Learning Outcomes

Through this project we learned:

* MERN Stack Development
* REST API Design
* Authentication & Authorization
* Real-Time Communication
* Database Design
* State Management
* Full Stack Integration

---

# Conclusion

FoodExpress successfully demonstrates a scalable and real-time food delivery ecosystem using modern web technologies. The platform integrates customers, restaurants, drivers, and administrators into a single workflow while supporting live tracking, loyalty rewards, and efficient order management.

The project reflects practical implementation of full-stack development concepts and real-world delivery management systems.
