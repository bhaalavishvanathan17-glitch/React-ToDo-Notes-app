import React from 'react';

/**
 * Reusable StatCard component for the dashboard metrics
 *
 * @param {string} title - Metric label
 * @param {number|string} value - Metric value
 * @param {React.ReactNode} icon - Lucide icon
 * @param {string} [subtitle] - Contextual detail text
 * @param {string} [colorVariant] - 'indigo' | 'emerald' | 'amber' | 'purple'
 * @param {Function} [onClick] - Optional click callback
 */
export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  colorVariant = 'indigo',
  onClick
}) {
  const isClickable = typeof onClick === 'function';

  return (
    <div
      className={`stat-card stat-card-${colorVariant} ${isClickable ? 'stat-card-clickable' : ''}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className={`stat-card-icon-bubble stat-bubble-${colorVariant}`}>
          {icon}
        </div>
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        {subtitle && <div className="stat-card-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}
