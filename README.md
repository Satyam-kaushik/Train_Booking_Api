# Railway Management System

## Overview
The Railway Management System is a web-based platform that allows users to check train availability, book seats, and manage bookings. Admins have full control over train management, including adding new trains and updating seat availability. The system ensures real-time booking with concurrency control to handle multiple users booking simultaneously.

## Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** MySQL/PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Concurrency Handling:** Transactions and Row Locking

## Features
### User
- Register and login
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
- MySQL/PostgreSQL installed and running

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
- **POST /api/register** - Register a new user
- **POST /api/login** - Login user

### Train Management (Admin)
- **POST /api/trains** - Add a new train
- **PUT /api/trains/:id** - Update train details

### User Actions
- **GET /api/trains?source=xxx&destination=yyy** - Check train availability
- **POST /api/bookings** - Book a seat
- **GET /api/bookings/:id** - Get booking details

## Concurrency Handling
To prevent race conditions while booking seats, the system implements:
- Row locking using **SELECT ... FOR UPDATE**
- Database transactions to ensure atomic operations
- Proper error handling and rollback in case of failures

## Contribution
1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
