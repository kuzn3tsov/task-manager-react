import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTranslation } from './hooks/useTranslation';
import { STORAGE_KEY } from './utils/constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import HelpModal from './components/HelpModal';
import ReminderSettings from './components/ReminderSettings';
import './App.css';

function App() {
  const { lang, setLang, t } = useTranslation();
  const [state, setState] = useLocalStorage(STORAGE_KEY, {
    lists: [
      { id: 'inbox', name: 'Inbox', tasks: [] },
      { id: 'personal', name: 'Personal', tasks: [] }
    ],
    activeListId: 'inbox'
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  // Generate unique ID
  const gid = () => 'id-' + Math.random().toString(36).slice(2, 9);

  // Get current list
  const getList = (listId) => state.lists.find(l => l.id === listId);

  // List operations
  const handleListCreate = (name) => {
    const newList = {
      id: gid(),
      name: name || t('defaultListName'),
      tasks: []
    };
    setState(prev => ({
      ...prev,
      lists: [...prev.lists, newList],
      activeListId: newList.id
    }));
  };

  const handleListSelect = (listId) => {
    setState(prev => ({ ...prev, activeListId: listId }));
    setEditingTask(null);
    setShowReminders(false);
  };

  const handleListEdit = (listId, newName) => {
    setState(prev => ({
      ...prev,
      lists: prev.lists.map(list =>
        list.id === listId ? { ...list, name: newName } : list
      )
    }));
  };

  const handleListDelete = (listId) => {
    setState(prev => {
      const filteredLists = prev.lists.filter(list => list.id !== listId);
      let newActiveListId = prev.activeListId;

      if (prev.activeListId === listId) {
        newActiveListId = filteredLists.length > 0 ? filteredLists[0].id : null;
        setEditingTask(null);
        setShowReminders(false);
      }

      return {
        ...prev,
        lists: filteredLists,
        activeListId: newActiveListId
      };
    });
  };

  // Reminder operations
  const handleShowReminders = (list) => {
    setSelectedList(list);
    setShowReminders(true);
  };

  const handleSaveReminders = (listId, reminderSettings) => {
    setState(prev => ({
      ...prev,
      lists: prev.lists.map(list =>
        list.id === listId
          ? { ...list, reminders: reminderSettings }
          : list
      )
    }));
    alert(t('remindersSaved'));
    setShowReminders(false);
  };

  const handleCloseReminders = () => {
    setShowReminders(false);
    setSelectedList(null);
  };

  // Task operations
  const handleTaskSave = (taskData) => {
    if (!state.activeListId) {
      const create = window.confirm('No list exists. Create "Inbox" list?');
      if (create) {
        handleListCreate('Inbox');
      } else {
        return;
      }
    }

    setState(prev => {
      const lists = prev.lists.map(list => {
        if (list.id === prev.activeListId) {
          if (editingTask) {
            const tasks = list.tasks.map(t =>
              t.id === editingTask.id ? { ...t, ...taskData } : t
            );
            return { ...list, tasks };
          } else {
            const newTask = { id: gid(), ...taskData, completed: false };
            return { ...list, tasks: [newTask, ...list.tasks] };
          }
        }
        return list;
      });
      return { ...prev, lists };
    });

    setEditingTask(null);
  };

  const handleTaskToggleComplete = (listId, taskId, completed) => {
    setState(prev => ({
      ...prev,
      lists: prev.lists.map(list =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === taskId ? { ...task, completed } : task
              )
            }
          : list
      )
    }));
  };

  const handleTaskEdit = (listId, taskId) => {
    const list = getList(listId);
    const task = list?.tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
    }
  };

  const handleTaskDelete = (listId, taskId) => {
    setState(prev => ({
      ...prev,
      lists: prev.lists.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(t => t.id !== taskId) }
          : list
      )
    }));
    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  const handleFormCancel = () => {
    setEditingTask(null);
  };

  // Simulate reminder checking (in a real app, this would connect to a backend)
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      state.lists.forEach(list => {
        if (list.reminders && list.reminders.reminderTime === currentTime) {
          console.log(`Should send reminders for list: ${list.name}`);
          // Here you would integrate with email/SMS APIs
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [state.lists]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowHelp(false);
        setEditingTask(null);
        setShowReminders(false);
      }
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setShowHelp(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentList = getList(state.activeListId);
  const activeTasks = currentList?.tasks.filter(t => !t.completed) || [];
  const completedTasks = currentList?.tasks.filter(t => t.completed) || [];

  return (
    <div className="App">
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        onHelpClick={() => setShowHelp(true)}
      />

      <main>
        <Sidebar
          lists={state.lists}
          activeListId={state.activeListId}
          onListSelect={handleListSelect}
          onListCreate={handleListCreate}
          onListEdit={handleListEdit}
          onListDelete={handleListDelete}
          onShowReminders={handleShowReminders}
          t={t}
        />

        <section>
          {showReminders && selectedList ? (
            <div className="reminder-modal">
              <div className="reminder-header">
                <h2>{t('reminderSettings')} - {selectedList.name}</h2>
                <button className="icon-btn" onClick={handleCloseReminders}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <ReminderSettings
                list={selectedList}
                onSaveReminders={handleSaveReminders}
                t={t}
                lang={lang}
              />
            </div>
          ) : state.activeListId ? (
            <>
              <TaskForm
                editingTask={editingTask}
                onSave={handleTaskSave}
                onCancel={handleFormCancel}
                t={t}
                lang={lang}
              />

              <TaskList
                title={t('activeTasks')}
                tasks={activeTasks}
                listId={state.activeListId}
                onToggleComplete={handleTaskToggleComplete}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                lang={lang}
                t={t}
              />

              <TaskList
                title={t('completedTasks')}
                tasks={completedTasks}
                listId={state.activeListId}
                onToggleComplete={handleTaskToggleComplete}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                lang={lang}
                t={t}
              />
            </>
          ) : (
            <div className="empty-state">
              <h2>Welcome to Task Tracker!</h2>
              <p>Create your first list to get started.</p>
            </div>
          )}
        </section>
      </main>

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        t={t}
      />
    </div>
  );
}

export default App;