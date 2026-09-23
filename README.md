Taskflow - Frontend

I built Taskflow as part of my full-stack developer assignment. My goal was to create a task board that is easy to use on both desktop and mobile. Users can create tasks, edit their details, change their status, and delete them when needed. Search, filters, and summary cards help keep track of the work.

Author: Mitu Barua

Live application

Frontend source

Backend source

Built with

I used React and Vite for the frontend, Tailwind CSS for styling, Lucide React for icons, and Sonner for notifications. The app connects to a separate Express API that stores tasks in SQLite.

Run locally

Use Node.js 24 and npm. Start the backend on port 4000 first using its README.

git clone https://github.com/mituBarua/taskflow-frontend.git
cd taskflow-frontend
npm ci
npm run dev

Open the local URL printed by Vite, normally http://localhost:5173. With no VITE_API_URL configured, requests use /api; the Vite development proxy forwards them to http://localhost:4000.

For a different API, create .env.local in this repository's root:

VITE_API_URL=http://localhost:4000/api

The value must include /api and must not include /tasks. Restart Vite after changing it. Variables prefixed with VITE_ are included in the browser build, so do not put secrets in them.

Useful commands

Command

Purpose

npm run dev

Start the development server

npm run build

Build the application into dist/

npm run preview

Preview the production build locally

npm run lint

Run the configured ESLint checks

How I organized the code

I separated task-specific components from shared UI components so that buttons, form fields, and dialogs can be reused. API requests live in their own module, and a custom hook manages task data.

Location

Responsibility

src/pages/TasksPage.jsx

Coordinate the board, filters, and task dialogs

src/hooks/useTasks.js

Load tasks and update React state after API operations

src/api/client.js

Handle the base URL, JSON responses, cancellation, and errors

src/api/tasks.api.js

Define task API calls

src/components/tasks/

Task cards, list, form, filters, stats, and deletion dialog

src/components/ui/

Reusable button, modal, and field components

src/components/layout/

Shared application layout

src/constants/

Shared task options and visual styles

src/index.css

Tailwind styles and shared field/panel classes

Features and behavior

Create and edit a task using the same form.

Set a priority of Low, Medium, or High.

Move tasks between Pending, In Progress, and Completed.

Search titles and descriptions, and combine status and priority filters.

Confirm deletion before removing a task.

Show loading placeholders, empty states, inline validation, success notifications, and retryable loading errors.

Adapt the layout for desktop and mobile screens.

Titles are required and limited to 120 characters. Descriptions are limited to 2,000 characters. Requests time out after 15 seconds; an idle hosted backend may need time to wake up before retrying.

Deploy on Render

Create a Static Site connected to this repository. Leave Root Directory empty when package.json is at the repository root.

Build command: npm ci && npm run build

Publish directory: dist

Build environment: VITE_API_URL=https://taskflow-backend-xi3z.onrender.com/api

Use Node.js 24 for the build.

Set the backend's FRONTEND_URL to https://taskflow-frontend-q8ga.onrender.com. Rebuild the frontend whenever VITE_API_URL changes. The development proxy does not run on the deployed static site.

Testing and limits

I completed manual testing of the application and included screenshots of the desktop board, title validation, and mobile layout in my submission. A clean dependency installation and production build also passed during submission preparation. There is no automated browser test suite in this version.

The application is a shared task board without accounts or user-specific access. Search and filtering run in the browser. PWA and payment integration are not implemented.

The live demo uses a local SQLite file on a free Render backend. Hosted data can be lost when that backend restarts, redeploys, or spins down. For durable hosting, use persistent storage or migrate to a managed SQL database.

AI assistance disclosure

I used ChatGPT for ideas, implementation guidance, debugging, and assistance with parts of the code. I integrated the changes, deployed the application, and completed manual testing.

Reference: ChatGPT.

References

https://react.dev/

https://vite.dev/guide/env-and-mode

https://tailwindcss.com/docs/installation/using-vite

https://render.com/docs/static-sites

https://render.com/docs/free
