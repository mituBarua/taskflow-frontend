# Taskflow — Frontend

I built Taskflow as part of my full-stack developer assignment. My goal was to create a simple task board that works well on both desktop and mobile.

Users can create tasks, edit their details, update their status, and delete them when needed. Search, filters, and summary cards make it easier to keep track of work.

**Author:** Mitu Barua

## 🔗 Project Links

- **Live application:** https://taskflow-frontend-q8ga.onrender.com
- **Frontend repository:** https://github.com/mituBarua/taskflow-frontend
- **Backend repository:** https://github.com/mituBarua/taskflow-backend

## Features

- Create, view, edit, and delete tasks.
- Set task priority to **Low**, **Medium**, or **High**.
- Update status to **Pending**, **In Progress**, or **Completed**.
- Search tasks by title or description.
- Filter tasks by status and priority.
- View task counts in dashboard summary cards.
- Confirm before deleting a task.
- Receive validation messages and success notifications.
- Use the application on desktop and mobile.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | User interface |
| Vite | Development server and production build |
| Tailwind CSS | Styling and responsive layout |
| Lucide React | Icons |
| Sonner | Toast notifications |
| Express and SQLite | Separate backend API and database |

## Getting Started

### Prerequisites

- **Node.js 24**
- **npm**
- Backend running on **port 4000**

### 1. Clone the repository

```bash
git clone https://github.com/mituBarua/taskflow-frontend.git
cd taskflow-frontend
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Start the development server

```bash
npm run dev
```

Open the address printed in your terminal, normally:

**http://localhost:5173**

By default, the frontend sends requests to `/api`. The Vite development proxy forwards these requests to `http://localhost:4000`.

### 4. Configure a different backend, if needed

Create a `.env.local` file in the frontend root:

```env
VITE_API_URL=http://localhost:4000/api
```

**Include `/api` at the end, but do not add `/tasks`.**

Restart the development server after changing environment variables. Variables beginning with `VITE_` are visible in the browser build, so they must not contain secrets.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## How I Organized the Code

I separated task components from shared UI components so that buttons, dialogs, and form fields can be reused. API requests have their own module, and a custom hook manages task data.

| Location | Responsibility |
| --- | --- |
| `src/pages/TasksPage.jsx` | Task board, filters, and dialogs |
| `src/hooks/useTasks.js` | Fetch tasks and manage task state |
| `src/api/client.js` | API configuration and error handling |
| `src/api/tasks.api.js` | Task API requests |
| `src/components/tasks/` | Task cards, forms, filters, and statistics |
| `src/components/ui/` | Reusable buttons, dialogs, and form fields |
| `src/components/layout/` | Application layout |
| `src/constants/` | Task options and styles |
| `src/index.css` | Tailwind and shared styles |

## Validation and Feedback

- **Title:** Required, with a maximum of 120 characters.
- **Description:** Maximum of 2,000 characters.
- **Loading:** Placeholders appear while tasks are loading.
- **Errors:** Form errors appear beside inputs, and failed task loads offer a retry button.
- **Success:** Notifications confirm completed actions.
- **Deletion:** A confirmation dialog appears before removing a task.

API requests time out after **15 seconds**.

## Deployment

I deployed the frontend as a **Render Static Site**.

| Setting | Value |
| --- | --- |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Node.js version | `24` |

The frontend build uses:

```env
VITE_API_URL=https://taskflow-backend-xi3z.onrender.com/api
```

The backend's `FRONTEND_URL` must match:

**https://taskflow-frontend-q8ga.onrender.com**

Rebuild the frontend after changing `VITE_API_URL`. The local Vite proxy is not available on the deployed static site.

## Testing

I completed manual testing of the application and included screenshots of the desktop board, title validation, and mobile layout in my submission.

A clean dependency installation and production build also passed during submission preparation.

**This version does not include an automated browser test suite.**

## Current Limitations

- The application uses one shared task board without user accounts.
- Search and filtering happen in the browser.
- PWA support and payment integration are not included.
- The free Render backend uses temporary storage, so SQLite data can be lost when the service restarts, redeploys, or spins down.
- An idle backend may take time to wake up. If the first request fails, wait briefly and try again.

## AI Assistance Disclosure

I used ChatGPT for ideas, implementation guidance, debugging, and assistance with parts of the code. I integrated the changes, deployed the application, and completed manual testing.

**Reference:** [ChatGPT](https://chatgpt.com/)

## References

- [React](https://react.dev/)
- [Vite Environment Variables](https://vite.dev/guide/env-and-mode)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)
- [Render Static Sites](https://render.com/docs/static-sites)
- [Render Free-Service Limitations](https://render.com/docs/free)
