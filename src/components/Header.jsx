import React from 'react';

function Header({ lang, setLang, t, onHelpClick }) {
  return (
    <header>
      <div className="left">
        <h1 id="txt_appTitle">{t('appTitle')}</h1>
        <span id="txt_appSubtitle">{t('appSubtitle')}</span>
      </div>
      <div className="right">
        <select
          id="langSelect"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="hr">HR</option>
        </select>
        <button
          id="helpBtn"
          className="icon-btn"
          title={t('helpTooltip')}
          onClick={onHelpClick}
        >
          <i className="fa-solid fa-circle-question"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;