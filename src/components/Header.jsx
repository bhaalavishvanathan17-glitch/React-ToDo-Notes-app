import React from 'react';
import { Menu, Plus, CheckSquare, FileText, Calendar } from 'lucide-react';

/**
 * Global Header component
 *
 * @param {string} currentView - 'dashboard' | 'tasks' | 'notes'
 * @param {Function} onToggleMobileSidebar - Callback to open mobile navigation
 * @param {Function} onOpenNewTaskModal - Callback to trigger quick task modal
 * @param {Function} onOpenNewNoteModal - Callback to trigger quick note modal
 */
export default function Header({
  currentView,
  onToggleMobileSidebar,
  onOpenNewTaskModal,
  onOpenNewNoteModal
}) {
  const getPageInfo = () => {
    switch (currentView) {
      case 'tasks':
        return {
          title: 'To-Do Task Manager',
          subtitle: 'Organize, schedule, and accomplish your daily milestones.'
        };
      case 'notes':
        return {
          title: 'Notes Knowledge Vault',
          subtitle: 'Capture ideas, study material, and personal thoughts.'
        };
      case 'dashboard':
      default:
        return {
          title: 'Productivity Dashboard',
          subtitle: 'Real-time overview of your tasks, notes, and activity progress.'
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  // Current formatted date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="btn-hamburger"
          onClick={onToggleMobileSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <h1 className="header-main-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Date badge */}
        <div className="header-date-badge">
          <Calendar size={15} />
          <span>{todayFormatted}</span>
        </div>

        {/* Quick action buttons */}
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-secondary-header"
            onClick={onOpenNewTaskModal}
            title="Create a new task"
          >
            <CheckSquare size={16} />
            <span className="btn-text-desktop">New Task</span>
          </button>

          <button
            type="button"
            className="btn btn-primary-header"
            onClick={onOpenNewNoteModal}
            title="Create a new note"
          >
            <Plus size={16} />
            <span className="btn-text-desktop">New Note</span>
          </button>
        </div>
      </div>
    </header>
  );
}
