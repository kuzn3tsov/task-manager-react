import React, { useState, useEffect } from 'react';
import { PRIORITIES } from '../utils/constants';

function TaskForm({ editingTask, onSave, onCancel, t, lang }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('low');
    const [due, setDue] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title || '');
            setDesc(editingTask.desc || '');
            setPriority(editingTask.priority || 'low');
            setDue(editingTask.due || '');
        } else {
            setTitle('');
            setDesc('');
            setPriority('low');
            setDue('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert(t('taskTitlePlaceholder') + ' required');
            return;
        }
        onSave({
            title: title.trim(),
            desc,
            priority,
            due
        });
    };

    const handleCancel = () => {
        onCancel();
    };

    const getPriorityLabel = (priorityValue) => {
        const priorityObj = PRIORITIES.find(p => p.value === priorityValue);
        return priorityObj ? priorityObj.label[lang] : priorityValue;
    };

    return (
        <form id="taskForm" onSubmit={handleSubmit}>
            <h3 id="txt_createTask">
                {editingTask ? 'Edit Task' : t('createTaskTitle')}
            </h3>
            <input
                type="text"
                id="taskTitle"
                placeholder={t('taskTitlePlaceholder')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                id="taskDesc"
                placeholder={t('taskDescPlaceholder')}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <label id="txt_taskPriority" htmlFor="taskPriority">
                {t('taskPriorityLabel')}
            </label>
            <select
                id="taskPriority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>
                        {getPriorityLabel(p.value)}
                    </option>
                ))}
            </select>
            <label id="txt_taskDue" htmlFor="taskDue">
                {t('taskDueLabel')}
            </label>
            <input
                type="date"
                id="taskDue"
                value={due}
                onChange={(e) => setDue(e.target.value)}
            />
            <div className="form-actions">
                <button type="submit" className="primary">
                    <i className="fa-solid fa-check"></i>
                    <span>{t('save')}</span>
                </button>
                <button type="button" onClick={handleCancel} className="cancel-btn">
                    <i className="fa-solid fa-xmark"></i>
                    <span>{t('cancel')}</span>
                </button>
            </div>
        </form>
    );
}

export default TaskForm;