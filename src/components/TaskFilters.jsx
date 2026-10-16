import React from 'react';

/**
 * TaskFilters component
 *
 * @param {string} currentFilter - 'all' | 'pending' | 'completed'
 * @param {Function} onFilterChange - Callback when filter changes
 * @param {number} totalCount - Total number of tasks
 * @param {number} pendingCount - Count of pending tasks
 * @param {number} completedCount - Count of completed tasks
 */
export default function TaskFilters({
  currentFilter,
  onFilterChange,
  totalCount,
  pendingCount,
  completedCount
}) {
  const filters = [
    { id: 'all', label: 'All Tasks', count: totalCount },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'completed', label: 'Completed', count: completedCount }
  ];

  return (
    <div className="task-filters-bar" role="tablist" aria-label="Filter tasks">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <span>{filter.label}</span>
            <span className={`filter-count ${isActive ? 'filter-count-active' : ''}`}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
