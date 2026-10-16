import React from 'react';

/**
 * Reusable EmptyState component
 *
 * @param {React.ReactNode} icon - Lucide or custom icon component
 * @param {string} title - Heading message
 * @param {string} description - Explanatory message
 * @param {string} [actionLabel] - Optional button label
 * @param {Function} [onAction] - Optional click handler
 */
export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-wrapper">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary empty-state-btn"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
