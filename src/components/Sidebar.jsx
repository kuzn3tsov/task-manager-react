import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function Sidebar({
  lists,
  activeListId,
  onListSelect,
  onListCreate,
  onListEdit,
  onListDelete,
  onShowReminders,
  t
}) {
  const [newListName, setNewListName] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [editingListName, setEditingListName] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    listId: null,
    listName: ''
  });

  const handleCreateList = () => {
    if (newListName.trim()) {
      onListCreate(newListName.trim());
      setNewListName('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateList();
    }
  };

  const handleEditList = (listId, currentName) => {
    setEditingListId(listId);
    setEditingListName(currentName);
  };

  const handleSaveEdit = (listId) => {
    if (editingListName.trim()) {
      onListEdit(listId, editingListName.trim());
    }
    setEditingListId(null);
    setEditingListName('');
  };

  const handleCancelEdit = () => {
    setEditingListId(null);
    setEditingListName('');
  };

  const handleDeleteList = (listId, listName) => {
    setDeleteModal({
      isOpen: true,
      listId,
      listName
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.listId) {
      onListDelete(deleteModal.listId);
      setDeleteModal({ isOpen: false, listId: null, listName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, listId: null, listName: '' });
  };

  const handleEditKeyDown = (e, listId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(listId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const getReminderIcon = (list) => {
    if (!list.reminders) return null;
    const { emailEnabled, smsEnabled } = list.reminders;
    if (emailEnabled || smsEnabled) {
      return <i className="fa-solid fa-bell reminder-active"></i>;
    }
    return null;
  };

  return (
    <>
      <aside style={{ marginRight: '1rem' }}>
        <h2 id="txt_createList">{t('createList')}</h2>
        <div
          className="new-list-row"
          style={{ marginRight: '0.5rem' }}
        >
          <input
            type="text"
            id="newListName"
            placeholder={t('newListPlaceholder')}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            id="createListBtn"
            className="icon-btn add-btn"
            title="Add List"
            onClick={handleCreateList}
            style={{ marginLeft: 'auto' }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <ul id="lists" style={{ marginRight: '0.5rem' }}>
          {lists.map((list) => (
            <li
              key={list.id}
              data-id={list.id}
              className={activeListId === list.id ? 'active' : ''}
              style={{ marginRight: '0.5rem' }}
            >
              {editingListId === list.id ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  marginRight: '0.5rem'
                }}>
                  <input
                    type="text"
                    value={editingListName}
                    onChange={(e) => setEditingListName(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, list.id)}
                    style={{
                      flex: 1,
                      padding: '0.3rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px'
                    }}
                    autoFocus
                  />
                  <div className="edit-mode-actions" style={{ marginRight: '0.5rem' }}>
                    <button
                      className="icon-btn save"
                      onClick={() => handleSaveEdit(list.id)}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      className="icon-btn cancel"
                      onClick={handleCancelEdit}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <div className="list-content" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      onClick={() => onListSelect(list.id)}
                      style={{ flex: 1, cursor: 'pointer' }}
                    >
                      {list.name}
                    </span>
                    {getReminderIcon(list)}
                  </div>
                  <div className="list-actions" style={{ marginRight: '0.5rem' }}>
                    <button
                      className="icon-btn"
                      title={t('reminderSettings')}
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowReminders(list);
                      }}
                      style={{ fontSize: '0.8rem', color: '#f39c12' }}
                    >
                      <i className="fa-solid fa-bell"></i>
                    </button>
                    <button
                      className="icon-btn"
                      title={t('editList')}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditList(list.id, list.name);
                      }}
                      style={{ fontSize: '0.8rem' }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="icon-btn"
                      title={t('deleteList')}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteList(list.id, list.name);
                      }}
                      style={{ fontSize: '0.8rem', color: '#e74c3c' }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemType="list"
        itemName={deleteModal.listName}
        t={t}
      />
    </>
  );
}

export default Sidebar;