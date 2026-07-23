# AI Tooling Chat History & Prompts

This document contains the prompt history and outcomes recorded during the development of the Car Dealership Inventory System.

---

## 1. Project Roadmap & Setup

- **Prompt:** "see this is assessment for the full stack project for placement so give me the roadmap how to complete this project step by step just give me roadmap so i will selected for interview"
  - **Outcome:** Received a comprehensive 5-step roadmap covering backend architecture, TDD Red-Green-Refactor workflow, MongoDB integration, RBAC rules, AI transparency standards, and React SPA development.

- **Prompt:** "ok lets start with first step what is first step and guide me to complete first step i means just guide i want to do it by myself"
  - **Outcome:** Set up git repository, root `.gitignore`, `PROMPTS.md`, Express project inside `server/`, installed dependencies (`express`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `jest`, `supertest`, `nodemon`), and created initial `src/app.js` and `src/server.js`.

- **Prompt:** "Co-authored-by: Gemini <AI@users.noreply.github.com> what is this"
  - **Outcome:** Understood the Git co-author trailer syntax required for AI transparency in commit messages as per project evaluation requirements.

- **Prompt:** "check once is everything okay?"
  - **Outcome:** Checked and verified package scripts, folder structure, `.gitignore` rules, and successfully ran the initial health check test with Jest.

---

## 2. Database Choice & MongoDB Setup

- **Prompt:** "If i want to create cluster in compass so tell me how to do it?"
  - **Outcome:** Learned how to create a free M0 cluster on MongoDB Atlas, setup database user credentials, configure IP whitelist access (`0.0.0.0/0`), and connect via MongoDB Compass.


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


## 4. Vehicle API, TDD & RBAC Logic

- **Prompt:** "make in Vehicle schema"
  - **Outcome:** Understood vehicle domain terms (`make` = Brand/Manufacturer like Toyota/Tesla, `model` = Camry/Model 3, `category` = Sedan/SUV). Defined `Vehicle.model.js`.

- **Prompt:** "first of all explain the all the times in TDD Like beforeAll ,beforeEach,AfterAll and all that timeline that came in TDD so explain this"
  - **Outcome:** Understood the execution lifecycle sequence (`beforeAll` -> `beforeEach` -> `it` -> `afterEach` -> `afterAll`) for setting up and tearing down test database states.

- **Prompt:** "RABC RULES MEAN?"
  - **Outcome:** Understood Role-Based Access Control logic for distinguishing regular customer permissions (view, search, purchase) from Admin permissions (add, update, delete, restock). Created `authenticateUser` and `authAdmin` in `auth.middleware.js`.

- **Prompt:** "why vehicle test fails"
  - **Outcome:** Identified unmounted vehicle routes in `app.js`, missing `getVehicles` controller, error key mismatch, and string splitting bug in `auth.middleware.js`. Fixed all issues to bring all 13 test cases across the entire test suite to GREEN.



- **Prompt:** "const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'; what happen if we remove 'supersecretkey123' bcz its not valid token"
  - **Outcome:** Clarified the difference between a JWT Secret (server signing key) and a JWT Token (client authorization header value), and why fallback strings prevent test environment crashes.
