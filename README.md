# 🚗 Car Dealership Inventory System (Full-Stack TDD Kata)

A full-stack Car Dealership Inventory Management application built using **Node.js, Express, MongoDB (Mongoose), React, Tailwind CSS, and Jest with Supertest**.

This project strictly follows **Test-Driven Development (TDD)** practices (Red-Green-Refactor), **Role-Based Access Control (RBAC)** security, and **AI Tooling Transparency**.

---

## 🌟 Key Features

### 🔑 Authentication & Authorization (RBAC)
- User Registration & Login with **bcrypt** password hashing and **JWT** token generation.
- **Role-Based Access Control**:
  - **`user` (Customer)**: Browse catalog, search/filter vehicles, and purchase vehicles.
  - **`admin` (Dealership Admin)**: Full CRUD access + exclusive **Delete** and **Restock (+Quantity)** capabilities.

### 🚗 Vehicle Catalog & Inventory Management
- **Dynamic Search & Filtering**: Multi-criteria search by Make, Model, Category, and Price Range ($min to $max) using case-insensitive Mongoose regex.
- **Stock Control**: Automated quantity decrements on purchase. The **"Purchase Vehicle" button is disabled** when stock reaches `0`.
- **Admin Modal**: Modal form for dealership admins to add new vehicles to live inventory.

---

## 🛠️ Tech Stack

- **Backend API**: Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, Bcrypt.js
- **Backend Testing**: Jest, Supertest, `mongodb-memory-server`
- **Frontend SPA**: React (Vite), Tailwind CSS, Axios, React Router v7, Lucide Icons

---

## 🚀 Local Setup & Installation Instructions

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/tirthchaudhary/CAR-DELIVERY-INCUBYTE.git
cd CAR-DELIVERY-INCUBYTE
```

### 2. Backend Setup
```bash
cd server
npm install
```

Set environment configuration for Backend (`PORT`, `JWT_SECRET`, `MONGO_URI`).

Run Backend Server:
```bash
npm run dev
```
*(Server listens on `http://localhost:5000`)*

### 3. Frontend Setup
In a new terminal window:
```bash
cd client
npm install
```

Set environment configuration for Frontend (`VITE_API_BASE_URL`).

Run Frontend SPA:
```bash
npm run dev
```
*(Client runs on `http://localhost:5173`)*

---

## 🧪 Test Execution Report

The backend was developed using strict **Test-Driven Development (TDD)**. Tests are executed against an in-memory database (`mongodb-memory-server`) to ensure zero pollution of the production MongoDB cluster.

To run the automated integration test suite:
```bash
cd server
npm test
```

### Passing Test Output (13 / 13 Passed):
```text
PASS __tests__/vehicle.test.js
PASS __tests__/auth.test.js
PASS __tests__/health.test.js

Test Suites: 3 passed, 3 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        9.339 s
Ran all test suites.
```

---

## 🖼️ UI Interface

### 1. Register / Login
<img width="1917" height="962" alt="Register Login 1" src="https://github.com/user-attachments/assets/06ae53aa-e1be-4006-a3f9-1f6a9d64441b" />
<img width="1917" height="946" alt="Register Login 2" src="https://github.com/user-attachments/assets/f3ddf8b0-5684-441c-9deb-4f3f343a2332" />

### 2. Admin Portal
<img width="1882" height="957" alt="Admin Portal 1" src="https://github.com/user-attachments/assets/499cd711-c23a-40da-82ad-b75524e33616" />
<img width="1917" height="967" alt="Admin Portal 2" src="https://github.com/user-attachments/assets/021062fe-6945-48fd-ae99-685312b4b207" />

### 3. Customer Portal
<img width="1917" height="963" alt="Customer Portal" src="https://github.com/user-attachments/assets/afb6ab5c-cac2-466c-b92b-ca9a240c2956" />

---

## 🤖 My AI Usage

In compliance with the assignment guidelines, AI tools were leveraged as developer assistance tools throughout the software development lifecycle.

### AI Tools Used
- **Gemini / AI Coding Assistant**

### How AI Was Used
1. **Architecture & Boilerplate Guidance**: Brainstorming modular Express folder structures (`controllers`, `routes`, `middleware`, `models`) and setting up Jest test runner configs.
2. **TDD Test Scaffolding**: Generating initial failing test assertion blocks (`expect(res.statusCode).toEqual(...)`) for authentication and vehicle CRUD endpoints before writing controller logic.
3. **Syntax Reference**: Quick reference for Mongoose regex options, JWT verification middleware, and Tailwind CSS utility classes.
4. **Debugging Edge Cases**: Resolving token header string splitting bugs and converting URL query strings into numbers for database price range queries.

---

## 📝 Deliverables Checklist

- [x] Public Git Repository Link (`https://github.com/tirthchaudhary/CAR-DELIVERY-INCUBYTE.git`)
- [x] Test-Driven Development (TDD) Red-Green-Refactor commit history
- [x] Git Commit Messages with `Co-authored-by: AI Tool Name <email>` trailers
- [x] Comprehensive `README.md` with setup instructions & test report
- [x] Mandatory "My AI Usage" reflection section in `README.md`
- [x] `PROMPTS.md` containing prompt history log in root folder
- [x] Role-Based Access Control (Admin vs User permissions)
- [x] Responsive React + Tailwind CSS SPA Frontend with disabled Purchase button on 0 stock
