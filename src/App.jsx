import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage';
import TaskForm from './components/TaskForm';
import NoteForm from './components/NoteForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_TASKS, INITIAL_NOTES } from './data/initialData';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import './App.css';

/**
 * Unique ID generator for tasks and notes
 */
const generateId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
};

export default function App() {
  // Navigation View State ('dashboard' | 'tasks' | 'notes')
  const [currentView, setCurrentView] = useState('dashboard');

  // Mobile sidebar open state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Local Storage synchronised states
  const [tasks, setTasks] = useLocalStorage('week04_tasks', INITIAL_TASKS);
  const [notes, setNotes] = useLocalStorage('week04_notes', INITIAL_NOTES);

  // Editing state for tasks and notes
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Modal visibility states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  /* ==========================================================================
     Task Operations (Immutable State Management)
     ========================================================================== */

  // Add new task
  const handleAddTask = ({ title, description, dueDate }) => {
    const newTask = {
      id: generateId('task'),
      title,
      description: description || '',
      completed: false,
      dueDate: dueDate || '',
      createdAt: new Date().toISOString()
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast(`Task "${title}" added successfully!`);
    setIsTaskModalOpen(false);
  };

  // Update existing task
  const handleUpdateTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
    showToast('Task updated successfully!');
    setTaskToEdit(null);
    setIsTaskModalOpen(false);
  };

  // Toggle task completion
  const handleToggleTask = (id) => {
    setTasks((prevTasks) => {
      const target = prevTasks.find((t) => t.id === id);
      const isNowCompleted = !target?.completed;
      const updated = prevTasks.map((t) =>
        t.id === id ? { ...t, completed: isNowCompleted } : t
      );
      showToast(
        isNowCompleted ? 'Task marked as completed!' : 'Task reopened as pending.'
      );
      return updated;
    });
  };

  // Delete task
  const handleDeleteTask = (id) => {
    const targetTask = tasks.find((t) => t.id === id);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    showToast(`Deleted task "${targetTask?.title || 'item'}"`, 'info');
  };

  /* ==========================================================================
     Note Operations (Immutable State Management)
     ========================================================================== */

  // Add new note
  const handleAddNote = ({ title, content, category }) => {
    const now = new Date().toISOString();
    const newNote = {
      id: generateId('note'),
      title,
      content,
      category: category || 'General',
      createdAt: now,
      updatedAt: now
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    showToast(`Note "${title}" created successfully!`);
    setIsNoteModalOpen(false);
    setNoteToEdit(null);
  };

  // Update existing note
  const handleUpdateNote = (id, updatedFields) => {
    const now = new Date().toISOString();
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === id
          ? {
              ...n,
              ...updatedFields,
              updatedAt: now
            }
          : n
      )
    );
    showToast('Note updated successfully!');
    setIsNoteModalOpen(false);
    setNoteToEdit(null);
  };

  // Delete note
  const handleDeleteNote = (id) => {
    const targetNote = notes.find((n) => n.id === id);
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
    showToast(`Deleted note "${targetNote?.title || 'item'}"`, 'info');
  };

  // Handle note save from modal (create or update)
  const handleSaveNoteModal = (noteData) => {
    if (noteToEdit) {
      handleUpdateNote(noteToEdit.id, noteData);
    } else {
      handleAddNote(noteData);
    }
  };

  // Reset to initial sample data
  const handleResetDemoData = () => {
    if (window.confirm('Restore default sample tasks and notes for demonstration? This will reset local data.')) {
      setTasks(INITIAL_TASKS);
      setNotes(INITIAL_NOTES);
      showToast('Sample tasks and notes restored!');
    }
  };

  // Derived counts for sidebar badges
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const totalNotesCount = notes.length;

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`app-toast toast-${toast.type}`} role="status">
          <div className="toast-icon">
            {toast.type === 'info' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          </div>
          <span className="toast-text">{toast.message}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        pendingTasksCount={pendingTasksCount}
        totalNotesCount={totalNotesCount}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onResetDemoData={handleResetDemoData}
      />

      {/* Main App Content Area */}
      <div className="app-main-wrapper">
        <Header
          currentView={currentView}
          onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
          onOpenNewTaskModal={() => {
            setTaskToEdit(null);
            setIsTaskModalOpen(true);
          }}
          onOpenNewNoteModal={() => {
            setNoteToEdit(null);
            setIsNoteModalOpen(true);
          }}
        />

        <main className="app-content-body">
          {currentView === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              notes={notes}
              onToggleTask={handleToggleTask}
              onEditTask={(task) => {
                setTaskToEdit(task);
                setIsTaskModalOpen(true);
              }}
              onDeleteTask={handleDeleteTask}
              onEditNote={(note) => {
                setNoteToEdit(note);
                setIsNoteModalOpen(true);
              }}
              onDeleteNote={handleDeleteNote}
              onNavigate={setCurrentView}
              onOpenNewTaskModal={() => {
                setTaskToEdit(null);
                setIsTaskModalOpen(true);
              }}
              onOpenNewNoteModal={() => {
                setNoteToEdit(null);
                setIsNoteModalOpen(true);
              }}
            />
          )}

          {currentView === 'tasks' && (
            <TasksPage
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              taskToEdit={taskToEdit}
              setTaskToEdit={setTaskToEdit}
            />
          )}

          {currentView === 'notes' && (
            <NotesPage
              notes={notes}
              onEditNote={(note) => {
                setNoteToEdit(note);
                setIsNoteModalOpen(true);
              }}
              onDeleteNote={handleDeleteNote}
              onOpenNewNoteModal={() => {
                setNoteToEdit(null);
                setIsNoteModalOpen(true);
              }}
            />
          )}
        </main>
      </div>

      {/* Quick Task Modal (triggered from Header, Dashboard, or Tasks) */}
      {isTaskModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setIsTaskModalOpen(false);
            setTaskToEdit(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <TaskForm
              taskToEdit={taskToEdit}
              onSave={(data) => {
                if (taskToEdit) {
                  handleUpdateTask(taskToEdit.id, data);
                } else {
                  handleAddTask(data);
                }
              }}
              onCancel={() => {
                setIsTaskModalOpen(false);
                setTaskToEdit(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Note Creation / Editing Modal */}
      <NoteForm
        noteToEdit={noteToEdit}
        isOpen={isNoteModalOpen}
        onClose={() => {
          setIsNoteModalOpen(false);
          setNoteToEdit(null);
        }}
        onSave={handleSaveNoteModal}
      />
    </div>
  );
}
