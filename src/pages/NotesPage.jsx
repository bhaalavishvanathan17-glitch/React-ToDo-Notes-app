import React from 'react';
import NotesList from '../components/NotesList';
import { Plus, Sparkles } from 'lucide-react';

/**
 * NotesPage - Complete Notes App View
 *
 * @param {Array} notes - Array of note objects
 * @param {Function} onEditNote - Handler to initiate editing a note
 * @param {Function} onDeleteNote - Handler to delete a note
 * @param {Function} onOpenNewNoteModal - Handler to open note creation modal
 */
export default function NotesPage({
  notes,
  onEditNote,
  onDeleteNote,
  onOpenNewNoteModal
}) {
  return (
    <div className="notes-page">
      {/* Page Header Bar */}
      <div className="notes-top-bar">
        <div className="notes-heading-group">
          <div className="notes-icon-tag">
            <Sparkles size={16} />
            <span>Organized Notes</span>
          </div>
          <p className="notes-page-desc">
            Manage your thoughts, daily documentation, meeting notes, and knowledge base.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenNewNoteModal}
        >
          <Plus size={18} />
          <span>Create Note</span>
        </button>
      </div>

      {/* Main Notes List & Explorer */}
      <NotesList
        notes={notes}
        onEdit={onEditNote}
        onDelete={onDeleteNote}
        onAddNew={onOpenNewNoteModal}
      />
    </div>
  );
}
