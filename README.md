# Management System

A lightweight, full-stack management system combining a C++ backend (Crow) and a Next.js frontend. Designed for small institutions to manage users, enrollments, facilities, inventory, grades, and requests with a focus on simplicity and extensibility.

Key features
- RESTful C++ backend using Crow and CMake for fast, self-hosted APIs
- Modern React/Next.js frontend with modular components and routing
- Built-in routes for authentication, users, students, inventory, and requests
- Scripts to run backend and frontend quickly for local development

Repository layout (top-level)
- `backend/` — C++ server, CMake build, Crow headers, and source files
- `frontend/` — Next.js application, UI components, and API helpers
- `scripts/` — Helpful shell scripts: `run_backend.sh`, `run_frontend.sh`, `run_all.sh`

Quick start
1. Prerequisites: a C++17 toolchain and CMake for the backend; Node.js (18+) and a package manager (`pnpm` or `npm`) for the frontend.
2. Frontend (install + dev):
	- `cd frontend && pnpm install` (or `npm install`)
	- `./scripts/run_frontend.sh` to start the Next.js app
3. Backend (build + run):
	- Use the provided script: `./scripts/run_backend.sh`
	- Or manually: `cd backend && mkdir -p build && cd build && cmake .. && make && ./app`
4. Full stack: run `./scripts/run_all.sh` to start both services for local development.

Contributing
- Open an issue for bug reports or feature requests. Pull requests are welcome.

License
- See repository root for license information (if applicable).

If you want, I can expand this with setup details, environment variables, or step-by-step build instructions.

