# TaskFlow & NoteVault — React Productivity Suite
> **Web Development Week 04 Minor Project: To-Do App + Notes App in React**

A modern, responsive, and unified productivity web application combining a feature-rich **To-Do Task Manager** and an organized **Notes Knowledge Vault**, unified by an interactive **Executive Dashboard** and dynamic sidebar navigation.

Built with **React.js (Functional Components, Hooks)**, **Vite**, **Vanilla CSS3**, and **Browser Local Storage** for offline-first data persistence.

---

## 1. Project Overview

TaskFlow & NoteVault was designed to meet and exceed all specifications for the Web Development Week 04 Minor Project. Rather than presenting two disjointed pages, the project provides a unified dashboard interface with dedicated workspaces for task planning and rich note-taking.

### Key Highlights:
- **Unified Productivity Suite**: Seamless sidebar navigation switching between Dashboard, Tasks, and Notes without page reloads.
- **Persistent Offline Storage**: Synchronizes all task completions, edits, and note records directly with browser `localStorage`.
- **Modern UI/UX Design System**: Built with an off-white background, crisp white cards, charcoal typography, vibrant indigo accents, subtle shadows, and smooth micro-interactions.
- **Zero Heavy Backend Required**: Runs 100% locally in the browser with fast client-side performance.

---

## 2. Features Implemented

### Executive Dashboard
- **Dynamic Real-Time Statistics**: Total tasks, completed tasks, pending tasks, total notes, and completion percentage.
- **Visual Progress Bar**: Real-time completion progress tracking with gradient indicators.
- **Recent Feeds**: At-a-glance lists of recent tasks and recently updated notes with direct click-throughs.
- **Quick Action Triggers**: Instant modal launchers to add tasks or create notes from anywhere.
- **Active Storage Status**: Live indicator confirming localStorage synchronization is active.

### Project 1: To-Do App
- **Task Creation**: Input form with validation for task title, optional detailed description, and optional due date.
- **Completion Toggle**: Interactive custom checkboxes that apply strikethrough styling and update statistics instantly.
- **Inline & Modal Task Editing**: Modify task title, description, and due date with Save and Cancel actions without creating duplicates.
- **Task Deletion**: Safe delete workflow with an inline confirmation prompt (`Delete? Yes | No`).
- **Clear Status Visibility**: Accessible badges distinguishing **Pending** vs. **Completed** tasks.
- **Bonus Feature 1 — Task Filtering**: Working filter tabs for **All**, **Pending**, and **Completed** with live count badges.
- **Bonus Feature 2 — Due Dates & Overdue Detection**: Assign due dates with visual badges (`Due Today`, `Due Tomorrow`, `Due in X days`) and automated alert styling for overdue pending tasks.
- **Bonus Feature 3 — Local Storage Persistence**: Stored under the key `week04_tasks`, preserving all tasks across browser refreshes.

### Project 2: Notes App
- **Rich Note Creation**: Modal editor for note title, content, and category assignment.
- **Category Taxonomy**: Pre-configured categories including **Personal**, **Work**, **Study**, **Ideas**, and **General**, with color-coded badges.
- **Note Editing**: Update title, content, and category with automatic updating of the `updatedAt` timestamp.
- **Note Deletion**: Delete notes with immediate list and storage synchronization, protected by confirmation.
- **Card Grid Layout**: Responsive grid layout with content line-clamping and date metadata.
- **Bonus Feature 1 — Real-Time Search**: Instant, case-insensitive search filtering across both note titles and content.
- **Bonus Feature 2 — Category Filtering**: Dedicated category pills with item counts to filter notes on the fly.
- **Bonus Feature 3 — Local Storage Persistence**: Stored under the key `week04_notes`, restoring notes automatically.
- **Bonus Feature 4 — Dual Timestamps**: Tracks both `createdAt` and `updatedAt` ISO timestamps, displaying formatted human-readable dates and sorting the most recently updated notes first.

---

## 3. Technologies Used

- **React 18.3.1**: Functional components, React Hooks (`useState`, `useEffect`, `useMemo`).
- **Vite 6.1.0**: Fast build tool and modern local development server.
- **JavaScript (ES6+)**: Arrow functions, destructuring, spread operators, modern array methods.
- **CSS3 / Vanilla CSS**: Custom CSS variables, responsive grid & flexbox, accessible focus rings.
- **Lucide React**: Clean, modern iconography.
- **HTML5**: Semantic elements (`<aside>`, `<header>`, `<main>`, `<article>`, `<nav>`, `<section>`).
- **Browser LocalStorage**: Persistent client-side key-value storage.

---

## 4. Setup Instructions

### Prerequisites
- **Node.js**: Version 18.x, 20.x, or 24.x installed on your machine.
- **npm**: Version 9.x or higher (comes bundled with Node.js).
- **Git**: For version control.

### Installation Steps
1. Open your terminal and navigate to the project directory:
   ```bash
   cd "Mini project 4-To-Do App + Notes App in React"
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

---

## 5. How to Run the Application

### Start Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the printed URL (typically `http://localhost:3000` or `http://localhost:5173`).

### Production Build
To create an optimized, minified production bundle:
```bash
npm run build
```
The output files will be compiled into the `dist/` directory.

### Preview Production Build
To test the production build locally:
```bash
npm run preview
```

---

## 6. Project Structure

```
task-notes-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EmptyState.jsx       # Reusable empty states with actions
│   │   ├── Header.jsx           # Top navigation bar with quick triggers & mobile hamburger
│   │   ├── NoteCard.jsx         # Card preview with category pill, timestamps, & delete prompt
│   │   ├── NoteForm.jsx         # Accessible modal editor for creating/editing notes
│   │   ├── NotesList.jsx        # Search bar, category filter pills, & notes grid
│   │   ├── Sidebar.jsx          # Left menu navigation with badges & storage status
│   │   ├── StatCard.jsx         # Dynamic dashboard metrics cards with colored bubbles
│   │   ├── TaskFilters.jsx      # Filter buttons (All, Pending, Completed) with counts
│   │   ├── TaskForm.jsx         # Task creation/editing form with date picker & validation
│   │   ├── TaskItem.jsx         # Individual task card with checkbox, overdue badge, & actions
│   │   └── TaskList.jsx         # List rendering with filter-aware empty states
│   ├── data/
│   │   └── initialData.js       # Default sample tasks and notes for demonstration
│   ├── hooks/
│   │   └── useLocalStorage.js   # Reusable custom hook for robust localStorage synchronization
│   ├── pages/
│   │   ├── Dashboard.jsx        # Executive summary, progress bar, & recent activity feeds
│   │   ├── NotesPage.jsx        # Notes management workspace view
│   │   └── TasksPage.jsx        # To-Do management workspace view
│   ├── utils/
│   │   └── dateUtils.js         # Overdue calculations, date formatting, & timestamp helpers
│   ├── App.jsx                  # Main application state orchestrator & view router
│   ├── App.css                  # Responsive UI design system styles & animations
│   ├── index.css                # Base tokens, resets, typography, and color palette
│   └── main.jsx                 # React root DOM rendering entry point
├── index.html                   # HTML5 template with SEO meta tags & Google Inter font
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite bundler configuration
├── .gitignore                   # Ignores node_modules, build artifacts, & system files
└── README.md                    # Complete project documentation
```

---

## 7. React Concepts Demonstrated

| Concept | Implementation in Code |
| :--- | :--- |
| **Functional Components** | All components (`App`, `Dashboard`, `TaskItem`, `NoteForm`, etc.) are written as modern functional components. |
| **JSX** | Clean markup combining semantic HTML with dynamic JavaScript expressions and conditional attributes. |
| **Props** | Unidirectional data flow passing data (e.g., `tasks`, `notes`, `filter`) and event handler callbacks down component trees. |
| **State (`useState`)** | Manages view selection (`currentView`), modal open/closed states, form inputs, validation errors, and active filter tabs. |
| **Side Effects (`useEffect`)** | Powers the custom `useLocalStorage` hook to synchronize state to browser storage whenever data changes, and manages form pre-filling. |
| **Event Handling** | `onSubmit`, `onClick`, `onChange`, `onKeyDown` with input sanitization and `preventDefault()` handling. |
| **Conditional Rendering** | Renders distinct views based on `currentView`, conditionally displays modals, inline delete confirmation prompts, and empty states. |
| **List Rendering (`.map()`)** | Renders tasks, notes, filter pills, and navigation menus using unique, stable IDs as React `key` props. |
| **Component Reusability** | `EmptyState`, `StatCard`, `TaskForm`, and `NoteForm` are reused across the dashboard, tasks, and notes views. |

---

## 8. JavaScript Concepts Demonstrated

| Feature | Usage in Project |
| :--- | :--- |
| **Arrow Functions** | Compact function syntax used across component callbacks, array iterators, and utility functions. |
| **Template Literals** | Dynamic class strings (e.g., `stat-card-${colorVariant}`), date labels, and confirmation messages. |
| **Destructuring** | Destructuring component props (`{ task, onToggle, onEdit }`), state arrays, and event targets. |
| **Spread Operator (`...`)** | Immutable array insertions (`[newTask, ...prevTasks]`), updates, and object property merges (`{ ...n, ...updatedFields }`). |
| **`let` and `const`** | Block-scoped declarations used throughout with zero `var` usage. |
| **Array `.map()`** | Rendering collections of tasks, notes, and category filters. |
| **Array `.filter()`** | Filtering tasks by status (All, Completed, Pending), searching notes by query, and category filtering. |
| **Array `.find()`** | Locating specific task and note objects by their unique IDs when modifying or deleting items. |
| **Object Manipulation** | Strictly immutable state updates; creating structured task and note objects with timestamps and unique IDs. |

---

## 9. Local Storage Details

Data is stored persistently in the user's browser using two dedicated keys:
- **`week04_tasks`**: Stores JSON serialized array of task objects:
  ```json
  [
    {
      "id": "task-1729060000000-abc123",
      "title": "Complete React assignment",
      "description": "Implement the required features",
      "completed": false,
      "dueDate": "2026-10-17",
      "createdAt": "2026-10-16T05:30:00.000Z"
    }
  ]
  ```
- **`week04_notes`**: Stores JSON serialized array of note objects:
  ```json
  [
    {
      "id": "note-1729060000000-xyz789",
      "title": "React Architecture Notes",
      "content": "Review React hooks and props",
      "category": "Study",
      "createdAt": "2026-10-16T05:30:00.000Z",
      "updatedAt": "2026-10-16T05:45:00.000Z"
    }
  ]
  ```

### Reliability & Error Handling
- Handled via `src/hooks/useLocalStorage.js`.
- Wrapped in `try...catch` blocks to protect against invalid JSON, corrupted records, or private browsing storage restrictions.
- Automatically seeds default demo records on first load so evaluators immediately experience a populated, live dashboard.
- Includes a **"Load Sample Data"** button in the sidebar footer to restore initial demo data at any time.

---

## 10. Screenshots

> *Add your application screenshots below to showcase your running project.*

### 1. Dashboard Overview
![Dashboard Overview Placeholder](https://via.placeholder.com/800x450/4f46e5/ffffff?text=Dashboard+Overview+%28TaskFlow+%26+NoteVault%29)
*Caption: Executive dashboard showing dynamic metrics, completion progress, and recent feeds.*

### 2. To-Do Tasks Workspace & Filters
![To-Do Tasks Placeholder](https://via.placeholder.com/800x450/10b981/ffffff?text=To-Do+Tasks+Workspace+%26+Filters)
*Caption: Task management view demonstrating task creation, overdue badges, completion toggling, and status filters.*

### 3. Notes Vault & Real-Time Search
![Notes Vault Placeholder](https://via.placeholder.com/800x450/8b5cf6/ffffff?text=Notes+Vault+%26+Category+Filtering)
*Caption: Notes vault featuring multi-line card previews, category tags, dual timestamps, and search filtering.*

### 4. Responsive Mobile Navigation
![Mobile Layout Placeholder](https://via.placeholder.com/400x700/0f172a/ffffff?text=Mobile+Responsive+View)
*Caption: Mobile-adapted view with drawer navigation and full-width touch-friendly cards.*

---

## 11. GitHub Repository Setup and Push Instructions

Follow these step-by-step instructions to create your GitHub repository and submit your project:

### Step 1: Initialize Git (if not already inside a repository)
From the project folder:
```bash
git init
```

### Step 2: Check Status and Stage Files
Verify that `.gitignore` prevents `node_modules` and `dist` from being tracked:
```bash
git status
git add .
```

### Step 3: Create Your Initial Commit
```bash
git commit -m "feat: complete Week 04 Minor Project - To-Do App + Notes App in React"
```

### Step 4: Create a New GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click the **+** (New repository) button in the upper right.
3. Repository name: `react-todo-notes-app` (or your preferred name).
4. Description: `Web Development Week 04 Minor Project — To-Do App + Notes App in React`.
5. Set visibility to **Public**.
6. Do **not** initialize with a README, .gitignore, or license (we already created them locally).
7. Click **Create repository**.

### Step 5: Link Local Repository and Push
Copy the remote repository URL provided by GitHub and run:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 12. PDF Requirements Verification Checklist

- [x] **Unified Website**: Accessible through a fixed/collapsible sidebar navigation.
- [x] **Dashboard View**: Dynamic stats (total tasks, completed, pending, total notes), recent tasks, recent notes, quick actions.
- [x] **To-Do App — Add Tasks**: Form with title (required), optional description, and optional due date.
- [x] **To-Do App — Mark Completed**: Checkbox control with strikethrough distinction and live statistic updates.
- [x] **To-Do App — Delete Tasks**: Delete button with inline confirmation prompt.
- [x] **To-Do App — Edit Tasks**: Edit title, description, and due date with Save/Cancel controls.
- [x] **To-Do App — Status Display**: Accessible badges clearly indicating Completed vs. Pending.
- [x] **To-Do App — Bonus 1 (Filtering)**: Filter by All, Completed, Pending with count badges.
- [x] **To-Do App — Bonus 2 (Due Dates)**: Formatted due date display with red overdue indicators for past-due pending tasks.
- [x] **To-Do App — Bonus 3 (Local Storage)**: Persistent storage under `week04_tasks`.
- [x] **Notes App — Create Notes**: Note title, category selection, content validation, and save trigger.
- [x] **Notes App — Edit Notes**: Modifies title, content, and category; preserves `createdAt` and updates `updatedAt`.
- [x] **Notes App — Delete Notes**: Removes note from UI and storage with confirmation.
- [x] **Notes App — View All Notes**: Organized card layout with line clamping, category badge, and timestamps.
- [x] **Notes App — Bonus 1 (Search)**: Real-time, case-insensitive search by title and content.
- [x] **Notes App — Bonus 2 (Categories)**: Personal, Work, Study, Ideas, and General with category filter tabs.
- [x] **Notes App — Bonus 3 (Local Storage)**: Persistent storage under `week04_notes`.
- [x] **Notes App — Bonus 4 (Timestamps)**: `createdAt` and `updatedAt` tracked; most recently updated notes sorted first.
- [x] **React & JS Concepts**: All 9 React concepts and ES6+ requirements naturally implemented and documented.
- [x] **Production Build**: Verified with `npm run build` (zero errors).
