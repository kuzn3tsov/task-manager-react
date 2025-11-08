import React from 'react';

function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    itemType,
    itemName,
    t
}) {
    if (!isOpen) return null;

    const getMessage = () => {
        if (itemType === 'list') {
            return t('deleteListConfirm');
        } else if (itemType === 'task') {
            return t('deleteConfirm');
        }
        return 'Are you sure you want to delete this item?';
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()}>
                <div className="confirmation-header">
                    <div className="confirmation-icon">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <h3>{t('confirmDelete')}</h3>
                </div>

                <div className="confirmation-body">
                    <p>{getMessage()}</p>
                    {itemName && (
                        <div className="item-to-delete">
                            <strong>"{itemName}"</strong>
                        </div>
                    )}
                </div>

                <div className="confirmation-actions">
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        <i className="fa-solid fa-xmark"></i>
                        {t('cancel')}
                    </button>
                    <button
                        className="confirm-delete-btn"
                        onClick={onConfirm}
                    >
                        <i className="fa-solid fa-trash"></i>
                        {t('confirmDelete')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;