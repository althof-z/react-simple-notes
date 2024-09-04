import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { HiOutlineLanguage } from 'react-icons/hi2';
import { FaRegSun, FaMoon } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';

function Navigation({ logout }) {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <h1>
        <Link to="/">
          {locale === 'id' ? 'Catatan Pribadi' : 'Personal Note'}
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
              aria-label="Change Language"
              onClick={toggleLocale}
              className="button-logout"
            >
              <HiOutlineLanguage />
            </button>
          </li>
          <li className="profile-menu nav-item">
            <button
              type="button"
              aria-label="Profile"
              onClick={toggleDropdown}
              className="button-logout"
            >
              <CgProfile />
            </button>
            <div ref={dropdownRef} style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <ul className="dropdown-menu">
                <Link to="/profile">
                  <li className="dropdown-item-profile">
                    <button type="button" className="note">
                      <p>Profile</p>
                    </button>
                  </li>
                </Link>
                <li className="dropdown-item-profile">
                  <button type="button" onClick={logout} className="note">
                    {locale === 'id' ? 'Keluar' : 'Logout'}
                  </button>
                </li>
                <Link to="/archived">
                  <li className="dropdown-item-profile">
                    <button type="button" className="note">
                      <p>
                        {locale === 'id' ? 'Arsip' : 'Archived'}
                      </p>
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navigation;
