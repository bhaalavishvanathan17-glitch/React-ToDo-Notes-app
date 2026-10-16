import React, { useState } from 'react';
import {
  Check,
  Calendar,
  AlertCircle,
  Clock,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { isOverdue, formatDueDate, formatDateShort } from '../utils/dateUtils';

/**
 * TaskItem component
 *
 * @param {Object} task - Task object { id, title, description, completed, dueDate, createdAt }
 * @param {Function} onToggle - Callback to toggle completed status
 * @param {Function} onEdit - Callback to edit task
 * @param {Function} onDelete - Callback to delete task
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const overdue = isOverdue(task.dueDate, task.completed);
  const formattedDueDate = formatDueDate(task.dueDate);

  const handleDeleteClick = () => {
    if (showConfirmDelete) {
      onDelete(task.id);
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className={`task-item-card ${task.completed ? 'task-completed' : ''} ${overdue ? 'task-overdue-border' : ''}`}>
      <div className="task-item-main">
        {/* Checkbox completion control */}
        <button
          type="button"
          className={`task-checkbox ${task.completed ? 'task-checkbox-checked' : ''}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? `Mark "${task.title}" as pending` : `Mark "${task.title}" as completed`}
          aria-checked={task.completed}
          role="checkbox"
        >
          {task.completed && <Check size={14} className="checkbox-check-icon" strokeWidth={3} />}
        </button>

        {/* Task Details */}
        <div className="task-content">
          <div className="task-header-line">
            <h4 className={`task-title ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h4>

            {/* Status Badge */}
            <span className={`status-pill ${task.completed ? 'status-pill-completed' : 'status-pill-pending'}`}>
              {task.completed ? (
                <>
                  <CheckCircle2 size={12} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle size={10} />
                  <span>Pending</span>
                </>
              )}
            </span>
          </div>

          {task.description && (
            <p className={`task-description ${task.completed ? 'text-muted-completed' : ''}`}>
              {task.description}
            </p>
          )}

          {/* Metadata: Due Date & Created Date */}
          <div className="task-meta-row">
            {task.dueDate && (
              <div className={`task-meta-badge ${overdue ? 'meta-badge-overdue' : 'meta-badge-date'}`}>
                {overdue ? <AlertCircle size={13} /> : <Calendar size={13} />}
                <span>{formattedDueDate}</span>
              </div>
            )}

            {task.createdAt && (
              <div className="task-meta-badge meta-badge-created">
                <Clock size={12} />
                <span>Created {formatDateShort(task.createdAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Actions */}
      <div className="task-actions">
        {showConfirmDelete ? (
          <div className="task-confirm-delete-box">
            <span className="confirm-delete-text">Delete?</span>
            <button
              type="button"
              className="btn-confirm-delete-yes"
              onClick={handleDeleteClick}
              title="Confirm Delete"
            >
              Yes
            </button>
            <button
              type="button"
              className="btn-confirm-delete-no"
              onClick={handleCancelDelete}
              title="Cancel"
            >
              No
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="task-action-btn btn-action-edit"
              onClick={() => onEdit(task)}
              aria-label={`Edit task "${task.title}"`}
              title="Edit Task"
            >
              <Edit2 size={16} />
            </button>
            <button
              type="button"
              className="task-action-btn btn-action-delete"
              onClick={handleDeleteClick}
              aria-label={`Delete task "${task.title}"`}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
