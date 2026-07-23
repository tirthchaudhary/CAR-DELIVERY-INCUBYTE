# AI Tooling Chat History & Prompts

This document contains the prompt history and outcomes recorded during the development of the Car Dealership Inventory System.

---

## 1. Project Roadmap & Setup

- **Prompt:** "see this is assessment for the full stack project for placement so give me the roadmap how to complete this project step by step just give me roadmap so i will selected for interview"
  - **Outcome:** Received a structured 5-step roadmap covering backend architecture, TDD Red-Green-Refactor workflow, MongoDB integration, RBAC rules, AI transparency standards, and React SPA development.

- **Prompt:** "ok lets start with first step what is first step and guide me to complete first step i means just guide i want to do it by myself"
  - **Outcome:** Set up git repository, root `.gitignore`, `PROMPTS.md`, Express project inside `server/`, installed dependencies (`express`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `jest`, `supertest`, `nodemon`), and created initial `src/app.js` and `src/server.js`.

- **Prompt:** "<AI@users.noreply.github.com> what is this"
  - **Outcome:** Understood the Git co-author trailer syntax required for AI transparency in commit messages as per project evaluation requirements.

- **Prompt:** "check once is everything okay?"
  - **Outcome:** Checked and verified package scripts, folder structure, `.gitignore` rules, and successfully ran the initial health check test with Jest.

---

## 2. Database Choice & MongoDB Setup

- **Prompt:** "see see i want to work with mongoDB database so for that guide me for this step in details"
  - **Outcome:** Chose MongoDB + Mongoose over SQLite. Configured `server/src/config/db.js` for database connection and introduced `mongodb-memory-server` for isolated TDD testing.

- **Prompt:** "If i want to create cluster in compass so tell me how to do it?"
  - **Outcome:** Learned how to create a free M0 cluster on MongoDB Atlas, setup database user credentials, configure IP whitelist access (`0.0.0.0/0`), and connect via MongoDB Compass.

- **Prompt:** "how to take mongo uri in .env?"
  - **Outcome:** Created `server/.env` with `MONGO_URI`, `PORT`, and `JWT_SECRET`, and loaded environment variables in `server/src/server.js` using `dotenv.config()`.

- **Prompt:** "why we create .env inside server why its not global means outside client and server"
  - **Outcome:** Understood the security boundary difference between server-side secret environment variables (DB credentials, JWT secrets) and frontend client-side public variables.

- **Prompt:** "check just that db conn is correct or not?"
  - **Outcome:** Tested and confirmed successful connection to MongoDB Atlas database `car-dealership` with active node process.

- **Prompt:** "why i get this error? Error: Cannot find module './config/db'"
  - **Outcome:** Resolved relative file import path issue by aligning `db.js` location inside `server/src/config/db.js`.

---

## 3. User Authentication & TDD Setup

- **Prompt:** "what is Mongomemmory server means i didnt use it before anywhere means if i create cluster and connect to compass so what does the means of use it"
  - **Outcome:** Understood the distinction between testing with an in-memory database (`mongodb-memory-server`) to keep unit tests fast and isolated vs running the live development server on MongoDB Atlas.

- **Prompt:** "let mongoServer; why we use thia outside the function of test in testing function explain"
  - **Outcome:** Learned JavaScript variable scoping rules for sharing the `mongoServer` instance across Jest `beforeAll` and `afterAll` lifecycle hooks.

- **Prompt:** "in user schema instead of hidde it manually i want to do select:false"
  - **Outcome:** Updated `User.model.js` schema with `select: false` on the password field, and updated `login` controller to explicitly use `.select('+password')` for password comparison.

- **Prompt:** "why npm test give this echo 'Error: no test specified' && exit 1 output"
  - **Outcome:** Fixed directory context by navigating into `server/` before running `npm test`.

- **Prompt:** "why npm test fails with Cannot find module '../src/models/User.js'"
  - **Outcome:** Corrected file import path from `User.js` to `User.model.js` inside `auth.test.js`.

- **Prompt:** "why npm test fails with Your test suite must contain at least one test"
  - **Outcome:** Added test assertion blocks (`it(...)`) inside `auth.test.js` to complete the TDD RED phase for registration and login endpoints.

- **Prompt:** "why npm test fails with 404 and password property check on register"
  - **Outcome:** Implemented `auth.controller.js`, `auth.route.js`, mounted `/api/auth` in `app.js`, and sanitized password hash from registration response object, turning all auth tests GREEN.

---

## 4. Vehicle API, TDD & RBAC Logic

- **Prompt:** "make means in Vehicle schem"
  - **Outcome:** Understood vehicle domain terms (`make` = Brand/Manufacturer like Toyota/Tesla, `model` = Camry/Model 3, `category` = Sedan/SUV). Defined `Vehicle.model.js`.

- **Prompt:** "first of all explain the all the times in TDD Like beforeAll ,beforeEach,AfterAll and all that timeline that came in TDD so explain this"
  - **Outcome:** Understood the execution lifecycle sequence (`beforeAll` -> `beforeEach` -> `it` -> `afterEach` -> `afterAll`) for setting up and tearing down test database states.

- **Prompt:** "RABC RULES MEAN?"
  - **Outcome:** Understood Role-Based Access Control logic for distinguishing regular customer permissions (view, search, purchase) from Admin permissions (add, update, delete, restock). Created `authenticateUser` and `authAdmin` in `auth.middleware.js`.

- **Prompt:** "why vehicle test fails"
  - **Outcome:** Identified unmounted vehicle routes in `app.js`, missing `getVehicles` controller, error key mismatch, and string splitting bug in `auth.middleware.js`. Fixed all issues to bring all 13 test cases across the entire test suite to GREEN.

- **Prompt:** "explain this controller so i can explain to the interviewer so explain in details: searchVehicles"
  - **Outcome:** Mastered how `searchVehicles` dynamically constructs Mongoose queries using `$regex`, `$options: 'i'`, `$gte`, and `$lte`.

- **Prompt:** "why we use Number in searchvehicle controller"
  - **Outcome:** Understood that Express parses URL query string parameters as String primitives (`"20000"`), and wrapping them in `Number()` is required for accurate numerical comparison in MongoDB queries instead of alphabetical string comparison.

- **Prompt:** "const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'; what happen if we remove 'supersecretkey123' bcz its not valid token"
  - **Outcome:** Clarified the difference between a JWT Secret (server signing key) and a JWT Token (client authorization header value), and why fallback strings prevent test environment crashes.

- **Prompt:** "so is it valid if we write this const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'; only in test bcz everywhere else we need original key"
  - **Outcome:** Learned how JavaScript `||` fallback behavior prioritizes real `.env` variables during live server runs while protecting automated Jest tests.

---

## 5. React SPA Frontend Integration

- **Prompt:** "ok so now give me roadmap to create frontend just roadmap filestructure and basic setup"
  - **Outcome:** Received complete frontend architecture roadmap covering Vite setup, Axios intercepter, AuthContext, ProtectedRoute, Login/Register pages, and Vehicle Dashboard grid.

- **Prompt:** "import axios from 'axios'; const API_BASE_URL = ... explain this so i can explain in interviewer also"
  - **Outcome:** Understood how `axios.create()` and request interceptors automatically attach JWT Bearer tokens to outgoing HTTP requests.

- **Prompt:** "Returns the modified config object so the request continues to the backend server. what is this"
  - **Outcome:** Learned how Axios request configuration objects are passed to interceptors and forwarded to the backend server.

- **Prompt:** "const { token: authToken, user: userData } = res.data; explain this in login"
  - **Outcome:** Learned ES6 object destructuring with property aliasing (`key: newName`) to avoid variable collision with React `useState` hooks.

- **Prompt:** "explain this context file functionality of each function how its works"
  - **Outcome:** Understood `AuthContext.jsx` functionality including `useEffect` session restoration, `login`, `register`, `logout`, and `useAuth` hook.

- **Prompt:** "what is children in this?"
  - **Outcome:** Understood React built-in `children` prop and how wrapper components (`AuthProvider`, `ProtectedRoute`) render nested child components.

- **Prompt:** "return children; // Logged in? Render <Dashboard /> but how dashboard renders here?"
  - **Outcome:** Learned how React evaluates function components and renders children when authorization checks pass.

- **Prompt:** "const { isAdmin } = useAuth(); explain this in vehiclecard.jsx"
  - **Outcome:** Understood frontend Role-Based Access Control logic for showing/hiding Admin Restock and Delete buttons.

- **Prompt:** "but how useAuth() check is it valid or not"
  - **Outcome:** Understood 2-layer security model: frontend UI conditional rendering vs backend cryptographic JWT verification.

- **Prompt:** "in searchbar.jsx how onSearch function executes what it will do and where does it do"
  - **Outcome:** Learned React's Lifting State Up pattern for passing filter data from `SearchBar` to `Dashboard`.

- **Prompt:** "in Dashboard.jsx first explain handleSearch function works in details"
  - **Outcome:** Understood how `handleSearch` uses `URLSearchParams` to build clean query strings for Express backend filtering.

- **Prompt:** "but from where this filter object come and where its receive it?"
  - **Outcome:** Traced the exact data flow from `SearchBar` form submission callback up to `Dashboard` handler execution.

- **Prompt:** "const handleAddVehicle = async (newVehicle) => ... now explain this function"
  - **Outcome:** Learned how `handleAddVehicle` sends `POST /api/vehicles` to Express backend, displays success toasts, and re-fetches inventory.

- **Prompt:** "in this function why we take amount only one means what id we want to add multiple amount of cars of same type? handleRestock"
  - **Outcome:** Learned how to support custom restock quantities (`prompt()` or dynamic parameters) in restock requests.

- **Prompt:** "in this function from where amount came? const handleRestock = async (vehicleId, amount = 1)"
  - **Outcome:** Learned ES6 JavaScript default function parameters (`amount = 1`).

- **Prompt:** ":5000/api/auth/register:1 Failed to load resource: net::ERR_CONNECTION_REFUSED when i try to register"
  - **Outcome:** Resolved connection error by running the Express backend server on port 5000 alongside the Vite dev server.
