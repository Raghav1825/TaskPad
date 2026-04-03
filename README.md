# TaskPad – Kanban Board Web Application

TaskPad is a Kanban-style task management web application built using React and Tailwind CSS. It is designed to help users organize projects, manage daily tasks, and track progress efficiently through a clean and responsive interface.

---

## Current Implementation Overview

At this stage, the project focuses on building the core layout, navigation, and routing structure.

### Application Layout

The main layout is defined in App.jsx, which structures the application into three key sections:

- Top Navigation Bar
- Sidebar Navigation
- Main Content Area (dynamic via routing)

The layout uses a flex-based structure to ensure responsiveness and proper scaling across screen sizes.

---

### Navigation Bar

The NavBar component provides:

- Mobile menu icon (planned for sidebar toggle)
- Application logo display
- Navigation buttons (Projects, Daily Task)
- Authentication UI:
  - Login/Sign Up button (when logged out)
  - Profile icon (when logged in)

---

### Sidebar

The SideBar component includes:

- Navigation icons:
  - Home
  - Profile
- Settings section at the bottom

---

### Routing System

Routing is implemented using react-router-dom:

- Root route renders the main layout (App)
- Nested routes render inside Outlet
- Current route:
  - "/" → Home component

This structure allows easy scaling for future pages.

---

### Theme Management

The application uses a ThemeProvider:

- Supports theme-based styling (e.g., dark/light mode)
- Applied globally using React Context

---

## Tech Stack

- React
- Tailwind CSS

---

## Folder Structure

src/
│
├── Components/
│   ├── NavBar.jsx
│   ├── SideBar.jsx
│   └── Home/
│
├── context/
│   └── ThemeContext.jsx
│
├── App.jsx
├── main.jsx
├── index.css

---

## Features Implemented

- Responsive layout (mobile + desktop)
- Navigation bar with authentication UI
- Sidebar navigation
- Routing with nested layouts
- Theme integration
- Clean UI using Tailwind CSS

---

## Features Planned

- Kanban board with drag-and-drop functionality
- Project-based task management
- Daily task tracking module
- Theme toggle UI
- Backend integration (Node.js)
- User authentication system

---


## Design Philosophy

- Minimal and clean UI
- Scalable architecture
- Reusable components
- Clear separation of concerns

---

## Notes

- This is currently a frontend-only implementation
- Backend and authentication are not yet implemented
- Mobile sidebar toggle is planned but not yet functional