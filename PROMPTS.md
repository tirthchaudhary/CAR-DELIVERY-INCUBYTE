# AI Tooling Chat History & Prompts

This file records all AI prompts used during the development of the Car Dealership Inventory System, as required by the assignment guidelines.

---

## 1. Project Setup & Architecture Planning
- **Prompt:** "Give me the step-by-step roadmap for completing the full-stack Car Dealership Inventory System kata with TDD and MongoDB."
- **Outcome:** Received comprehensive project roadmap, folder structure guidelines, and initial setup instructions for Express and Jest.

- **Prompt:** "What is `<AI@users.noreply.github.com>` and why is it used in commit messages?"
- **Outcome:** Learned Git co-authorship syntax standard required for AI transparency in commit trailers.

---

## 2. Database Connection & Environment Configuration
- **Prompt:** "Guide me step-by-step to use MongoDB with Mongoose and set up environment variables in .env."
- **Outcome:** Created `server/src/config/db.js`, configured `dotenv`, and established MongoDB Atlas database connection.

---

## 3. Test-Driven Development (TDD) for Auth Endpoints
- **Prompt:** "Explain how to set up `mongodb-memory-server` with Jest for testing auth endpoints without polluting the production database."
- **Outcome:** Implemented `auth.test.js` using `mongodb-memory-server` in Jest `beforeAll`/`afterAll` lifecycle hooks to isolate unit tests.


- **Prompt:** "Fix failing integration test where password property was present in registration response."
- **Outcome:** Sanitized output object in `auth.controller.js` to ensure passwords are never returned in API JSON responses.
