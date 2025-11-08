import React from 'react';

function HelpModal({ isOpen, onClose, t }) {
  if (!isOpen) return null;

  return (
    <div id="helpModal" className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span
          className="close"
          role="button"
          tabIndex="0"
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
        >
          &times;
        </span>
        <h2 id="txt_helpTitle">{t('helpTitle')}</h2>
        <ul id="txt_helpList">
          {(t('helpItems') || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HelpModal;