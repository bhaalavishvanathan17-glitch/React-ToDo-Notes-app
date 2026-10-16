import React, { useState, useMemo } from 'react';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';
import { Search, FileText, Plus, X } from 'lucide-react';

const CATEGORIES = ['All', 'Work', 'Personal', 'Study', 'Ideas', 'General'];

/**
 * NotesList component with search, category filtering, and responsive grid
 *
 * @param {Array} notes - Array of note objects
 * @param {Function} onEdit - Edit note handler
 * @param {Function} onDelete - Delete note handler
 * @param {Function} onAddNew - Create note trigger handler
 */
export default function NotesList({ notes, onEdit, onDelete, onAddNew }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and sort notes (latest updated first)
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'All' || note.category === selectedCategory;

        // Search term filter (case-insensitive across title and content)
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.createdAt).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt).getTime();
        return timeB - timeA;
      });
  }, [notes, searchTerm, selectedCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: notes.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = notes.filter((n) => n.category === cat).length;
      }
    });
    return counts;
  }, [notes]);

  return (
    <div className="notes-list-wrapper">
      {/* Search and Category Control Bar */}
      <div className="notes-controls-card">
        {/* Search Input */}
        <div className="notes-search-wrapper">
          <Search size={18} className="notes-search-icon" />
          <input
            type="text"
            className="notes-search-input"
            placeholder="Search notes by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="category-pills-bar" role="tablist" aria-label="Filter notes by category">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`category-pill ${isSelected ? 'category-pill-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="category-pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={<FileText size={42} className="text-muted" />}
          title={
            searchTerm || selectedCategory !== 'All'
              ? 'No matching notes found'
              : 'No notes yet'
          }
          description={
            searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search keywords or switching category filters.'
              : 'Capture your thoughts, daily plans, and study notes all in one place.'
          }
          actionLabel={
            searchTerm || selectedCategory !== 'All'
              ? 'Clear filters'
              : 'Create your first note'
          }
          onAction={
            searchTerm || selectedCategory !== 'All'
              ? () => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }
              : onAddNew
          }
        />
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
