import React, { useState, useEffect } from 'react';
import { X, Check, FilePlus, AlertCircle } from 'lucide-react';

const CATEGORIES = ['General', 'Work', 'Personal', 'Study', 'Ideas'];

/**
 * NoteForm modal/drawer component for creating and editing notes
 *
 * @param {Object|null} noteToEdit - Note object if editing, or null if creating
 * @param {boolean} isOpen - Whether the form modal is open
 * @param {Function} onClose - Close/Cancel handler
 * @param {Function} onSave - Save handler receives { title, content, category }
 */
export default function NoteForm({ noteToEdit, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [error, setError] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '');
      setContent(noteToEdit.content || '');
      setCategory(noteToEdit.category || 'General');
      setError('');
    } else {
      setTitle('');
      setContent('');
      setCategory('General');
      setError('');
    }
  }, [noteToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      setError('Note title is required.');
      return;
    }

    if (!trimmedContent) {
      setError('Note content cannot be empty.');
      return;
    }

    onSave({
      title: trimmedTitle,
      content: trimmedContent,
      category
    });

    onClose();
  };

  const isEditing = Boolean(noteToEdit);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-bubble">
              <FilePlus size={18} />
            </div>
            <h3 className="modal-title">
              {isEditing ? 'Edit Note' : 'Create New Note'}
            </h3>
          </div>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="form-alert-error" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="modal-form">
          {/* Note Title */}
          <div className="form-group">
            <label htmlFor="note-title" className="form-label">
              Title <span className="text-required">*</span>
            </label>
            <input
              id="note-title"
              type="text"
              className="form-input"
              placeholder="e.g., React Architecture Notes"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              maxLength={100}
              required
              autoFocus
            />
          </div>

          {/* Note Category */}
          <div className="form-group">
            <label htmlFor="note-category" className="form-label">
              Category
            </label>
            <select
              id="note-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Note Content */}
          <div className="form-group">
            <label htmlFor="note-content" className="form-label">
              Content <span className="text-required">*</span>
            </label>
            <textarea
              id="note-content"
              className="form-textarea form-textarea-large"
              placeholder="Write your note here..."
              rows={7}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError('');
              }}
              required
            />
            <div className="textarea-meta">
              <span>{content.length} characters</span>
              <span>{content.trim() ? content.trim().split(/\s+/).length : 0} words</span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Check size={16} />
              <span>{isEditing ? 'Save Changes' : 'Create Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
