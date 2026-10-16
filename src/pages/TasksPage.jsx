import React, { useState, useMemo } from 'react';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import { Plus, CheckSquare, Search, X } from 'lucide-react';

/**
 * TasksPage - Complete To-Do App View
 *
 * @param {Array} tasks - Array of task objects
 * @param {Function} onAddTask - Add task handler
 * @param {Function} onUpdateTask - Update task handler
 * @param {Function} onDeleteTask - Delete task handler
 * @param {Function} onToggleTask - Toggle task completion
 * @param {Object|null} taskToEdit - Task currently being edited
 * @param {Function} setTaskToEdit - State setter for editing task
 */
export default function TasksPage({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
  taskToEdit,
  setTaskToEdit
}) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInlineForm, setShowInlineForm] = useState(false);

  // Derive counts
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && task.completed) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    });
  }, [tasks, filter, searchQuery]);

  const handleSaveTask = (taskData) => {
    if (taskToEdit) {
      onUpdateTask(taskToEdit.id, taskData);
      setTaskToEdit(null);
    } else {
      onAddTask(taskData);
      setShowInlineForm(false);
    }
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
    setShowInlineForm(false);
  };

  return (
    <div className="tasks-page">
      {/* Top Banner / Actions Bar */}
      <div className="tasks-top-bar">
        <div className="tasks-summary-info">
          <div className="tasks-summary-pill pill-pending">
            <span className="summary-count">{pendingCount}</span>
            <span className="summary-label">Pending</span>
          </div>
          <div className="tasks-summary-pill pill-completed">
            <span className="summary-count">{completedCount}</span>
            <span className="summary-label">Completed</span>
          </div>
          <div className="tasks-summary-pill pill-total">
            <span className="summary-count">{totalCount}</span>
            <span className="summary-label">Total</span>
          </div>
        </div>

        {!showInlineForm && !taskToEdit && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowInlineForm(true)}
          >
            <Plus size={18} />
            <span>Add New Task</span>
          </button>
        )}
      </div>

      {/* Task Creation or Editing Form */}
      {(showInlineForm || taskToEdit) && (
        <section className="task-form-section" aria-label="Task Editor">
          <TaskForm
            taskToEdit={taskToEdit}
            onSave={handleSaveTask}
            onCancel={handleCancelEdit}
          />
        </section>
      )}

      {/* Filter and Search Controls */}
      <div className="tasks-filter-search-row">
        <TaskFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          totalCount={totalCount}
          pendingCount={pendingCount}
          completedCount={completedCount}
        />

        <div className="task-search-wrapper">
          <Search size={16} className="task-search-icon" />
          <input
            type="text"
            className="task-search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Clear task search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Tasks List */}
      <section className="tasks-list-section" aria-label="Tasks List">
        <TaskList
          tasks={filteredTasks}
          currentFilter={filter}
          onToggle={onToggleTask}
          onEdit={(task) => {
            setTaskToEdit(task);
            setShowInlineForm(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDelete={onDeleteTask}
          onAddNew={() => setShowInlineForm(true)}
        />
      </section>
    </div>
  );
}
