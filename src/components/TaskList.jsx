import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ title, tasks, listId, onToggleComplete, onEdit, onDelete, lang, t }) {
  return (
    <div className="task-group">
      <h2>{title}</h2>
      <div>
        {tasks.length === 0 ? (
          <p className="empty-msg">{t('empty')}</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              listId={listId}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              lang={lang}
              t={t}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;