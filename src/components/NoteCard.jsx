import React, { useState } from 'react';
import { Edit2, Trash2, Clock, Calendar } from 'lucide-react';
import { formatDateTime, formatDateShort } from '../utils/dateUtils';

// Category badge styles
const CATEGORY_STYLES = {
  Work: { bg: 'var(--cat-work-bg)', color: 'var(--cat-work-text)' },
  Personal: { bg: 'var(--cat-personal-bg)', color: 'var(--cat-personal-text)' },
  Study: { bg: 'var(--cat-study-bg)', color: 'var(--cat-study-text)' },
  Ideas: { bg: 'var(--cat-ideas-bg)', color: 'var(--cat-ideas-text)' },
  General: { bg: 'var(--cat-general-bg)', color: 'var(--cat-general-text)' }
};

/**
 * NoteCard component
 *
 * @param {Object} note - Note object { id, title, content, category, createdAt, updatedAt }
 * @param {Function} onEdit - Edit note callback
 * @param {Function} onDelete - Delete note callback
 */
export default function NoteCard({ note, onEdit, onDelete }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const categoryStyle = CATEGORY_STYLES[note.category] || CATEGORY_STYLES.General;

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(note.id);
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <article className="note-card">
      <div className="note-card-top">
        <span
          className="note-category-badge"
          style={{
            backgroundColor: categoryStyle.bg,
            color: categoryStyle.color
          }}
        >
          {note.category || 'General'}
        </span>

        <div className="note-card-actions">
          {showConfirmDelete ? (
            <div className="note-confirm-delete-box">
              <span className="confirm-delete-text">Delete?</span>
              <button
                type="button"
                className="btn-confirm-delete-yes"
                onClick={handleDelete}
                title="Confirm delete note"
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
                className="note-action-btn btn-action-edit"
                onClick={() => onEdit(note)}
                aria-label={`Edit note "${note.title}"`}
                title="Edit Note"
              >
                <Edit2 size={15} />
              </button>
              <button
                type="button"
                className="note-action-btn btn-action-delete"
                onClick={handleDelete}
                aria-label={`Delete note "${note.title}"`}
                title="Delete Note"
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        </div>
      </div>

      <h4 className="note-card-title">{note.title}</h4>

      <p className="note-card-content">{note.content}</p>

      {/* Timestamps footer */}
      <footer className="note-card-footer">
        <div className="note-timestamp" title={`Created: ${formatDateTime(note.createdAt)}`}>
          <Clock size={12} />
          <span>Updated {formatDateTime(note.updatedAt || note.createdAt)}</span>
        </div>
      </footer>
    </article>
  );
}
