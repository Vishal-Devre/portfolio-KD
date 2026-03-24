import { useState } from 'react';
import {
  FaSun, FaMoon, FaTimes,
} from 'react-icons/fa';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme, activePage, setActivePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    setActivePage(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => handleNav('home')}>
          KD<span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>.</span>
        </div>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                id={`${item.id}-link`}
                className={`nav-link-btn ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
                {activePage === item.id && <span className="nav-dot" />}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span style={{ fontSize: '1.1rem', display: 'flex' }}><FaTimes /></span>
            ) : (
              <>
                <span /><span /><span />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-link-btn ${activePage === item.id ? 'active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
