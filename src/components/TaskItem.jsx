import React from 'react';

function TaskItem({ task, listId, onToggleComplete, onEdit, onDelete, lang, t }) {
  const formatDateForDisplay = (dstr) => {
    if (!dstr) return '';
    const date = new Date(dstr + 'T00:00:00');
    try {
      if (lang === 'hr') return date.toLocaleDateString('hr-HR');
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dstr;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'low': return t('priorityLow');
      case 'medium': return t('priorityMedium');
      case 'high': return t('priorityHigh');
      default: return '';
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(t('deleteConfirm'))) {
      onDelete(listId, task.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(listId, task.id);
  };

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onClick={() => onEdit(listId, task.id)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete(listId, task.id, e.target.checked);
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{task.title}</strong>
          {task.desc && <small>{task.desc}</small>}
          <small>
            {getPriorityText(task.priority)}
            {task.due && ` · ${formatDateForDisplay(task.due)}`}
          </small>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="icon-btn" title="Edit" onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="icon-btn" title="Delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;