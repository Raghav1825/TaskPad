# TaskPad

TaskPad is a full-stack project and task management application built with React and Node.js. It provides Kanban-style project boards with drag-and-drop task management, a personal daily task tracker, team collaboration through project membership, and per-user theme preferences -- all backed by a RESTful API with JWT-based authentication.

## Features

- **User Authentication** -- Registration with profile image upload, login, logout, and automatic access token refresh using HTTP-only cookies.
- **Project Management** -- Create, edit, and delete projects. Each project has a name, description, and status (Not Started, In Progress, Done). Project status can be changed inline from project cards.
- **Kanban Board** -- Each project opens into a three-column board (Not Started, In Progress, Done). Tasks can be dragged between columns to update their status. Tasks track who added and last edited them, with creation and update timestamps shown on hover.
- **Project Membership** -- Project owners can add and remove members by email. Members have read and task-editing access to shared projects.
- **Daily Tasks** -- A personal task list with add, edit, delete, mark complete, and due date assignment. Tasks are sortable via drag-and-drop reordering, with completed tasks automatically sorted to the bottom.
- **Home Dashboard** -- Displays today's due tasks, projects owned by the user, and projects where the user is a member. Includes a quick-access button to create new projects.
- **Project Analytics** -- Doughnut charts (Chart.js) showing the distribution of project and task statuses.
- **Profile Management** -- View and edit personal details (name, email, phone number), change password, and update profile image via Cloudinary.
- **Theme Switching** -- Dark and light themes persisted per user in the database. Theme preference is loaded on login and toggled from the settings page.
- **Responsive Layout** -- Desktop sidebar navigation and a mobile slide-out menu. The layout adapts across breakpoints using Tailwind CSS responsive utilities.
- **Animated UI** -- Text blur-in animations (GSAP/Motion) on the home page and hover/scale transitions throughout the interface.

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool and dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router 7 | Client-side routing |
| dnd-kit | Drag-and-drop (Kanban columns and daily task reordering) |
| Chart.js + react-chartjs-2 | Doughnut charts for project/task analytics |
| Heroicons | Icon library |
| GSAP / Motion | UI animations |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose 9 | Database and ODM |
| JWT (jsonwebtoken) | Access and refresh token authentication |
| bcrypt | Password hashing |
| Cloudinary | Profile image storage |
| Multer | File upload handling |
| cookie-parser | HTTP-only cookie management |

## Architecture Overview

TaskPad follows a client-server architecture with clear separation between frontend and backend repositories.

The React frontend communicates with the Express backend exclusively through a centralized API client (`src/api/apiClient.js`). This client wraps the native `fetch` API and automatically:
- Attaches credentials (cookies) to every request.
- Intercepts 401 responses and attempts to refresh the access token before retrying the original request.
- Redirects to the login page if the refresh token is also expired.

Authentication uses a dual-token strategy: a short-lived access token and a long-lived refresh token, both stored as HTTP-only cookies. The backend validates the access token via JWT middleware on protected routes.

Theme preferences are stored per user in the database and loaded into a React Context on login, with changes persisted through the settings API.

## Project Structure

### Frontend

```
src/
  api/
    apiClient.js            # Centralized fetch wrapper with token refresh
  assets/                   # Static images (logo, demo screenshot)
  context/
    ThemeContext.jsx         # Theme state and toggle logic
  Components/
    NavBar.jsx              # Top navigation bar
    SideBar.jsx             # Desktop sidebar navigation
    SlideMenu.jsx           # Mobile slide-out menu
    Home/
      Home.jsx              # Dashboard with today's tasks and project summaries
      TodaysTaskSection.jsx # Today's due tasks display
      OwnerProjects.jsx     # Projects owned by user
      MemberProjects.jsx    # Projects where user is a member
    Projects/
      Projects.jsx          # Project listing page
      ProjectCard.jsx       # Individual project card
      ProjectsAnalysisSection.jsx  # Doughnut chart for project status
    Board/
      MainBoard.jsx         # Kanban board with three columns
      TaskCard.jsx          # Individual task card with drag support
      TaskNotStarted.jsx    # "Not Started" column
      TaskInProgress.jsx    # "In Progress" column
      TaskDone.jsx          # "Done" column
      AnalyseBox.jsx        # Doughnut chart for task status
      MembersSection.jsx    # Project member list and management
    DailyTask/
      DailyTask.jsx         # Daily task page with drag-and-drop sorting
      TaskCard.jsx          # Daily task card
    LoginPage/
      Login.jsx             # Login form with stepper UI
      SignUp.jsx            # Multi-step registration form
    Profile/
      Profile.jsx           # User profile with image upload
    Settings/
      Settings.jsx          # Theme toggle, logout, account deletion
    Modals/                 # Modal dialogs for CRUD operations
    UI/
      BlurText.jsx          # Animated blur-in text component
      Stepper.jsx           # Multi-step form component
  chartSetup.jsx            # Chart.js global registration
  main.jsx                  # App entry point and route definitions
  index.css                 # Tailwind imports and theme token definitions
```

### Backend

```
src/
  index.js                  # Server entry point
  app.js                    # Express app configuration (CORS, routes, error handler)
  constants.js              # Database name constant
  db/
    index.js                # MongoDB connection
  models/
    user.model.js           # User schema with bcrypt and JWT methods
    project.model.js        # Project schema with owner and members
    projectTask.model.js    # Project task schema with status tracking
    dailyTask.model.js      # Daily task schema with completion and date
    userSettings.model.js   # User settings schema (theme preference)
  controllers/
    user.controller.js      # Auth, profile, and account management
    project.controller.js   # Project CRUD and membership
    projectTask.controller.js  # Project task CRUD and status updates
    dailyTask.controller.js # Daily task CRUD and date filtering
    userSettings.controller.js # Theme settings initialization and updates
  routes/
    user.routes.js          # /api/v1/users/*
    project.routes.js       # /api/v1/projects/*
    projectTask.routes.js   # /api/v1/projectTasks/*
    dailyTask.routes.js     # /api/v1/dailyTasks/*
    userSettings.routes.js  # /api/v1/userSettings/*
  middlewares/
    auth.middleware.js       # JWT verification middleware
    multer.middleware.js     # File upload configuration
  utils/
    ApiError.js             # Custom error class with status codes
    ApiResponse.js          # Standardized response wrapper
    asyncHandler.js         # Async route handler wrapper
    cloudinary.js           # Cloudinary upload and delete utilities
```

## Key Implementation Details

**Token Refresh Mechanism** -- The API client intercepts 401 responses and automatically refreshes the access token before retrying. A mutex (`isRefreshing` flag with shared promise) prevents multiple concurrent refresh requests when several API calls fail simultaneously.

**Theme System** -- Tailwind CSS 4's `@theme` directive defines CSS custom properties for colors. The `data-theme` attribute on the root HTML element switches between dark and light palettes. Theme state is managed via React Context and persisted to the backend on every toggle.

**Drag-and-Drop** -- The Kanban board uses `@dnd-kit/core` with `DndContext` and `useDraggable` for cross-column task movement. The daily task list uses `@dnd-kit/sortable` with `SortableContext` for reordering within a single list. Both use pointer, touch, and keyboard sensors.

**Authorization Model** -- Project edit and delete operations are restricted to the project owner. Project viewing is allowed for both owners and members. All project and task routes are protected behind the `verifyJWT` middleware at the router level.

**File Uploads** -- Profile images are uploaded via Multer to a local `public/temp` directory, then transferred to Cloudinary. The local file is cleaned up after upload regardless of success or failure. The frontend sends images as `FormData`, and the API client automatically skips the `Content-Type` header to let the browser set the multipart boundary.

**Standardized API Responses** -- All backend responses use `ApiResponse` (success) and `ApiError` (failure) wrappers. A global Express error handler catches thrown `ApiError` instances and returns consistent JSON error responses with status codes and messages.
