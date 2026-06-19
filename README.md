# Freelancer Marketplace API

A full-stack MERN Freelancer Marketplace (Mini Fiverr Clone) where freelancers can create service listings (gigs) and clients can purchase them.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes
* Role-Based Access Control

  * Client
  * Freelancer

### Freelancer Features

* Create Gig
* Update Gig
* Delete Gig
* View Own Gigs

### Client Features

* Browse Gigs
* Search Gigs
* Filter Gigs by Category
* Sort Gigs by Price
* Purchase Gigs
* View Order History

### Orders System

* Create Orders
* View Received Orders
* Update Order Status

### Reviews System

* Leave Reviews After Purchase
* Rating & Comment Support
* Prevent Duplicate Reviews

### Dashboard

* Dashboard Statistics
* Total Users
* Total Clients
* Total Freelancers
* Total Gigs
* Total Orders
* Total Reviews
* Revenue Calculation
* Recent Orders
* Recent Reviews

### Validation & Error Handling

* Request Validation using express-validator
* Global Error Handling Middleware
* 404 Route Handling

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Security

* JWT
* bcryptjs

### Validation

* express-validator

---

## Project Structure

src/

├── config/

├── controllers/

├── middleware/

├── models/

├── routes/

├── utils/

├── validations/

├── app.js

└── server.js

---

## Environment Variables

Create a `.env` file in the root directory:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

---

## Installation

Clone the repository:

git clone < repository-url >

Install dependencies:

npm install

Run the server:

npm run dev

Server will run on:

Local host 5000 :

---

## Main API Modules

### Authentication

* Register User
* Login User
* Get Profile

### Users

* User Management

### Gigs

* Create Gig
* Update Gig
* Delete Gig
* Get All Gigs
* Get Single Gig
* Search
* Filter
* Sort

### Orders

* Create Order
* My Orders
* Received Orders
* Update Order Status

### Reviews

* Create Review
* Get Gig Reviews

### Dashboards

* Stats
* Revenue
* Recent Orders
* Recent Reviews

---

## Author

Ubaid Awan

Freelancer Marketplace Backend Project
