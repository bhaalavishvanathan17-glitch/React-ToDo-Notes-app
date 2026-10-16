import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Database,
  Sparkles,
  X
} from 'lucide-react';

/**
 * Sidebar navigation component
 *
 * @param {string} currentView - 'dashboard' | 'tasks' | 'notes'
 * @param {Function} onViewChange - Callback to switch active view
 * @param {number} pendingTasksCount - Dynamic count of pending tasks
 * @param {number} totalNotesCount - Dynamic count of total notes
 * @param {boolean} isMobileOpen - Mobile drawer toggle state
 * @param {Function} setIsMobileOpen - Toggle mobile drawer
 * @param {Function} onResetDemoData - Callback to restore sample tasks and notes
 */
export default function Sidebar({
  currentView,
  onViewChange,
  pendingTasksCount,
  totalNotesCount,
  isMobileOpen,
  setIsMobileOpen,
  onResetDemoData
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      badge: null
    },
    {
      id: 'tasks',
      label: 'To-Do Tasks',
      icon: <CheckSquare size={20} />,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
      badgeColor: 'amber'
    },
    {
      id: 'notes',
      label: 'Notes Vault',
      icon: <FileText size={20} />,
      badge: totalNotesCount > 0 ? totalNotesCount : null,
      badgeColor: 'indigo'
    }
  ];

  const handleNavClick = (viewId) => {
    onViewChange(viewId);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isMobileOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrap">
            <div className="brand-logo-icon">
              <Sparkles size={20} className="brand-icon-svg" />
            </div>
            <div className="brand-text">
              <span className="brand-title">TaskFlow</span>
              <span className="brand-subtitle">& NoteVault</span>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">MAIN MENU</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge !== null && (
                      <span className={`nav-badge nav-badge-${item.badgeColor || 'indigo'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Storage status & utility footer */}
        <div className="sidebar-footer">
          <div className="storage-status-pill">
            <Database size={14} className="storage-icon" />
            <div className="storage-text">
              <span className="storage-label">Local Storage</span>
              <span className="storage-sub">Auto-sync Active</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-reset-demo"
            onClick={onResetDemoData}
            title="Restore default sample tasks and notes for demonstration"
          >
            Load Sample Data
          </button>
        </div>
      </aside>
    </>
  );
}
