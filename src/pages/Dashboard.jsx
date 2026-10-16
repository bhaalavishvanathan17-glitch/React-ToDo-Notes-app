import React from 'react';
import StatCard from '../components/StatCard';
import TaskItem from '../components/TaskItem';
import NoteCard from '../components/NoteCard';
import EmptyState from '../components/EmptyState';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { isOverdue } from '../utils/dateUtils';

/**
 * Dashboard Page View
 *
 * @param {Array} tasks - All tasks
 * @param {Array} notes - All notes
 * @param {Function} onToggleTask - Toggle task completion
 * @param {Function} onEditTask - Edit task callback
 * @param {Function} onDeleteTask - Delete task callback
 * @param {Function} onEditNote - Edit note callback
 * @param {Function} onDeleteNote - Delete note callback
 * @param {Function} onNavigate - Switch page view ('tasks' | 'notes')
 * @param {Function} onOpenNewTaskModal - Open task modal
 * @param {Function} onOpenNewNoteModal - Open note modal
 */
export default function Dashboard({
  tasks,
  notes,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onEditNote,
  onDeleteNote,
  onNavigate,
  onOpenNewTaskModal,
  onOpenNewNoteModal
}) {
  // Dynamic stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const totalNotes = notes.length;

  const overdueCount = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Recent tasks (sorted by creation date descending, take top 4)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  // Recently updated notes (sorted by updatedAt/createdAt descending, take top 3)
  const recentNotes = [...notes]
    .sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt).getTime();
      return timeB - timeA;
    })
    .slice(0, 3);

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="dashboard-banner">
        <div className="banner-content">
          <h2 className="banner-heading">Welcome back to your workspace!</h2>
          <p className="banner-subheading">
            You have <span className="highlight-text">{pendingTasks} pending tasks</span> and{' '}
            <span className="highlight-text">{totalNotes} notes</span> stored in your vault.
            {overdueCount > 0 && (
              <span className="banner-overdue-alert">
                <AlertTriangle size={15} /> {overdueCount} task{overdueCount > 1 ? 's are' : ' is'} overdue!
              </span>
            )}
          </p>
        </div>
        <div className="banner-quick-actions">
          <button
            type="button"
            className="btn btn-banner-task"
            onClick={onOpenNewTaskModal}
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
          <button
            type="button"
            className="btn btn-banner-note"
            onClick={onOpenNewNoteModal}
          >
            <Plus size={16} />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <section className="stats-grid" aria-label="Key Productivity Metrics">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<CheckSquare size={20} />}
          subtitle={`${pendingTasks} pending, ${completedTasks} done`}
          colorVariant="indigo"
          onClick={() => onNavigate('tasks')}
        />
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon={<CheckCircle2 size={20} />}
          subtitle={`${completionRate}% completion rate`}
          colorVariant="emerald"
          onClick={() => onNavigate('tasks')}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Clock size={20} />}
          subtitle={overdueCount > 0 ? `${overdueCount} overdue` : 'On track'}
          colorVariant="amber"
          onClick={() => onNavigate('tasks')}
        />
        <StatCard
          title="Total Notes"
          value={totalNotes}
          icon={<FileText size={20} />}
          subtitle="Saved in browser vault"
          colorVariant="purple"
          onClick={() => onNavigate('notes')}
        />
      </section>

      {/* Progress Card */}
      <div className="productivity-progress-card">
        <div className="progress-info">
          <div className="progress-label-wrap">
            <TrendingUp size={18} className="text-primary" />
            <span className="progress-label">Overall Completion Progress</span>
          </div>
          <span className="progress-percentage">{completionRate}%</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={completionRate} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout for Recent Activity */}
      <div className="dashboard-columns-grid">
        {/* Recent Tasks Column */}
        <section className="dashboard-section-card">
          <div className="section-card-header">
            <div className="section-title-wrap">
              <CheckSquare size={18} className="text-primary" />
              <h3 className="section-title">Recent Tasks</h3>
            </div>
            <button
              type="button"
              className="btn-link-action"
              onClick={() => onNavigate('tasks')}
            >
              <span>View All</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="section-card-body">
            {recentTasks.length === 0 ? (
              <EmptyState
                icon={<CheckSquare size={32} className="text-muted" />}
                title="No tasks created"
                description="Create your first task to stay organized."
                actionLabel="+ Add Task"
                onAction={onOpenNewTaskModal}
              />
            ) : (
              <div className="dashboard-tasks-list">
                {recentTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggleTask}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Notes Column */}
        <section className="dashboard-section-card">
          <div className="section-card-header">
            <div className="section-title-wrap">
              <FileText size={18} className="text-purple" />
              <h3 className="section-title">Recently Updated Notes</h3>
            </div>
            <button
              type="button"
              className="btn-link-action"
              onClick={() => onNavigate('notes')}
            >
              <span>View All</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="section-card-body">
            {recentNotes.length === 0 ? (
              <EmptyState
                icon={<FileText size={32} className="text-muted" />}
                title="No notes saved"
                description="Add ideas, snippets, and study material."
                actionLabel="+ New Note"
                onAction={onOpenNewNoteModal}
              />
            ) : (
              <div className="dashboard-notes-list">
                {recentNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEditNote}
                    onDelete={onDeleteNote}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
