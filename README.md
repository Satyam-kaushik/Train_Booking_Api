# Railway Management System

## Overview
The Railway Management System is a web-based platform that allows users to check train availability, book seats, and manage bookings. Admins have full control over train management, including adding new trains and updating seat availability. The system ensures real-time booking with concurrency control to handle multiple users booking simultaneously.

## Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)
- **Password Security**Bcrypt
- **Concurrency Handling:** Transactions and Row Locking

## Features
### User
- Register and login/logout
- Check train availability between two stations
- View seat availability
- Book a seat (Handles race conditions)
- Get specific booking details

### Admin
- Add new trains
- Update total seats in a train
- Manage train details

## Installation
### Prerequisites
- Node.js installed
- MySQL installed and running

### Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd railway-management-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=railway_db
     JWT_SECRET=your_secret_key
     ```
4. Run database migrations:
   ```sh
   node migrate.js
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- **POST /user/register** - Register a new user
- **POST /user/login** - Login user

- **POST /admin/register** - Register a new admin
- **POST /admin/login** - Login admin

### Train Management (Admin)
- **POST /admin/addTrain** - Add a new train
- **PUT /admin/update-seats/:id** - Update train seat details

### User Actions
- **GET /user/availability?source=xxx&destination=yyy** - Check train availability
- **POST /user/book** - Book a seat
- **GET /api/bookings/:id** - Get booking details
- **GET/user/getAllbookings** - Get all booking details of a user

## Concurrency Handling
To prevent race conditions while booking seats, the system implements:
- Row locking using **SELECT ... FOR UPDATE**
- Database transactions to ensure atomic operations
- Proper error handling and rollback in case of failures

