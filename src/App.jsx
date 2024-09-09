import React, { useState, useEffect, useMemo } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { HiOutlineLanguage } from 'react-icons/hi2';
import { FaRegSun, FaMoon } from 'react-icons/fa6';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import InputPage from './pages/InputPage';
import { getUserLogged, putAccessToken } from './utils/api';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';
import ProfilePage from './pages/ProfilePage';
import ArchivePage from './pages/ArchivePage';

function NoteApp() {
  const [authed, setAuthed] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const data = await getUserLogged();
    setAuthed(data);
  };

  const onLogout = () => {
    setAuthed(null);
    putAccessToken('');
  };

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthed(data);
      setInitializing(false);
    });
  }, []);

  const localeContextValue = useMemo(
    () => ({ locale, toggleLocale }),
    [locale],
  );
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  if (initializing) {
    return null;
  }

  if (authed === null) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {locale === 'id' ? 'Aplikasi Catatan' : 'Personal Notes'}
                </Link>
              </h1>
              <nav className="navigation">
                <ul>
                  <li className="nav-item">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="button-logout"
                    >
                      {theme === 'light' ? <FaRegSun /> : <FaMoon />}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      aria-label="LogOut"
                      onClick={toggleLocale}
                      className="button-logout"
                    >
                      <HiOutlineLanguage />
                    </button>
                  </li>
                </ul>
              </nav>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <Navigation logout={onLogout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/archived" element={<ArchivePage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default NoteApp;
