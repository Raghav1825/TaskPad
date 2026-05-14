# TaskPad - Frontend

TaskPad is a React-based task management frontend for organizing projects, Kanban board tasks, and daily tasks in one place.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Heroicons
- dnd-kit
- Chart.js

## Key Features

- Home page with project creation entry point
- Login, signup, and profile UI screens
- Projects page with project cards, status updates, edit modal, and analysis section
- Project board page with three Kanban columns:
  - Not Started
  - In Progress
  - Done
- Task cards with description, status display, edit/delete icons, and details toggle
- Daily task page with add, edit, delete, complete, due date, and drag-and-drop reorder support
- Theme context setup for app-wide styling
- Responsive layout with navbar, sidebar, and routed main content

## Routes

- `/` - Home
- `/projects` - Project list
- `/projects/:projectId` - Project Kanban board
- `/dailytask` - Daily task manager
- `/profile` - User profile
- `/login` - Login
- `/signup` - Signup
- `/settings` - Settings

## Status

This repository currently contains the frontend implementation of TaskPad.

Backend is in working.
