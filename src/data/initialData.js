/**
 * Initial sample data for first-time visitors.
 * Demonstrates overdue tasks, completed tasks, and various note categories.
 */

// Helper to get relative ISO dates
const getOffsetDate = (daysOffset) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const INITIAL_TASKS = [
  {
    id: "task-demo-1",
    title: "Submit React Minor Project Week 4",
    description: "Finalize To-Do and Notes applications, review all PDF requirements, and prepare GitHub repository.",
    completed: false,
    dueDate: getOffsetDate(1), // Tomorrow
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "task-demo-2",
    title: "Review Component Hierarchy & Props",
    description: "Verify that functional components use props and callbacks cleanly without unnecessary re-renders.",
    completed: true,
    dueDate: getOffsetDate(-1), // Completed yesterday
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "task-demo-3",
    title: "Client UI/UX Design System Polish",
    description: "Ensure color palette conforms to dark charcoal text, off-white background, and indigo accent tokens.",
    completed: false,
    dueDate: getOffsetDate(-2), // Overdue task demonstration!
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "task-demo-4",
    title: "Test LocalStorage persistence on page refresh",
    description: "Verify that creating, editing, and deleting items correctly synchronizes with browser LocalStorage.",
    completed: true,
    dueDate: getOffsetDate(3),
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

export const INITIAL_NOTES = [
  {
    id: "note-demo-1",
    title: "React Hooks Cheat Sheet",
    content: "1. useState: Handles local reactive state and triggers re-renders.\n2. useEffect: Handles side effects such as synchronizing data with localStorage.\n3. Custom Hooks: Encapsulate reusable stateful logic like useLocalStorage.",
    category: "Study",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "note-demo-2",
    title: "Quarterly Frontend Goals",
    content: "Ship accessible UI components, optimize bundle sizes using Vite, and adopt standard JavaScript ES6+ features across all modules.",
    category: "Work",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "note-demo-3",
    title: "App Feature Brainstorming",
    content: "Idea for version 2.0: Add markdown export for notes, priority tags for tasks (High, Medium, Low), and audio reminders.",
    category: "Ideas",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "note-demo-4",
    title: "Weekly Grocery & Supplies List",
    content: "Almond milk, whole grain sourdough, organic eggs, fresh spinach, blueberries, dark roast coffee beans.",
    category: "Personal",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];
