import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import { CheckCircle2, ClipboardList } from 'lucide-react';

/**
 * TaskList component for rendering tasks
 *
 * @param {Array} tasks - Array of task objects
 * @param {string} currentFilter - 'all' | 'pending' | 'completed'
 * @param {Function} onToggle - Toggle task completion status
 * @param {Function} onEdit - Edit task handler
 * @param {Function} onDelete - Delete task handler
 * @param {Function} onAddNew - Quick action to add a task
 */
export default function TaskList({
  tasks,
  currentFilter,
  onToggle,
  onEdit,
  onDelete,
  onAddNew
}) {
  if (tasks.length === 0) {
    if (currentFilter === 'completed') {
      return (
        <EmptyState
          icon={<CheckCircle2 size={40} className="text-muted" />}
          title="No completed tasks yet"
          description="Keep making progress! Completed tasks will be archived here."
        />
      );
    }

    if (currentFilter === 'pending') {
      return (
        <EmptyState
          icon={<CheckCircle2 size={40} className="text-emerald" />}
          title="All caught up!"
          description="You don't have any pending tasks right now. Great job!"
          actionLabel="Create a new task"
          onAction={onAddNew}
        />
      );
    }

    return (
      <EmptyState
        icon={<ClipboardList size={40} className="text-primary" />}
        title="No tasks found"
        description="Get organized by creating your first task today."
        actionLabel="Add your first task"
        onAction={onAddNew}
      />
    );
  }

  return (
    <div className="task-items-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
