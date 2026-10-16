import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Calendar, AlertCircle } from 'lucide-react';

/**
 * TaskForm component for creating and editing tasks
 *
 * @param {Object|null} taskToEdit - Task object if in edit mode, or null if creating
 * @param {Function} onSave - Callback to create or update task
 * @param {Function} onCancel - Callback when cancelling edit mode
 */
export default function TaskForm({ taskToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate || '');
      setError('');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setError('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title is required.');
      return;
    }

    if (trimmedTitle.length < 2) {
      setError('Task title must be at least 2 characters long.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const taskData = {
      title: trimmedTitle,
      description: description.trim(),
      dueDate: dueDate || ''
    };

    onSave(taskData);

    // Reset form if in create mode
    if (!taskToEdit) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }

    setIsSubmitting(false);
  };

  const isEditing = Boolean(taskToEdit);

  return (
    <div className="task-form-card">
      <div className="task-form-header">
        <h3 className="task-form-title">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h3>
        {isEditing && (
          <button
            type="button"
            className="btn-form-close"
            onClick={onCancel}
            aria-label="Cancel editing"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {error && (
        <div className="form-alert-error" role="alert">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Title input */}
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Task Title <span className="text-required">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className={`form-input ${error ? 'form-input-error' : ''}`}
            placeholder="e.g., Complete React assignment"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            maxLength={120}
            required
            autoComplete="off"
          />
        </div>

        {/* Description textarea */}
        <div className="form-group">
          <label htmlFor="task-description" className="form-label">
            Description <span className="text-optional">(Optional)</span>
          </label>
          <textarea
            id="task-description"
            className="form-textarea"
            placeholder="Add relevant notes, links, or context..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        {/* Due date picker */}
        <div className="form-group">
          <label htmlFor="task-due-date" className="form-label">
            Due Date <span className="text-optional">(Optional)</span>
          </label>
          <div className="input-with-icon">
            <input
              id="task-due-date"
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <Calendar size={18} className="input-affix-icon" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isEditing ? (
              <>
                <Check size={16} />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
