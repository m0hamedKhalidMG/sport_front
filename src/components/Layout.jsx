import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import logo from '../components/log.png'; // Adjust the path based on where your image is located

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // State for mobile navigation

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr'; // Change document direction
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 shadow-md">
        <div className="container flex justify-between items-center px-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Thunderbolt Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-bold m-100">Thunderbolt</h1>
          </div>

          {/* Toggle Button for Sidebar */}
          <button
            className="text-white block md:hidden focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={navOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-lg font-semibold hover:text-yellow-300">
              {t('home.title')}
            </Link>
            <Link to="/trainers" className="text-lg font-semibold hover:text-yellow-300">
              {t('trainers.list_title')}
            </Link>
            <Link to="/about" className="text-lg font-semibold hover:text-yellow-300">
              {t('about.title')}
            </Link>
            <Link to="/contact" className="text-lg font-semibold hover:text-yellow-300">
              {t('contact.title')}
            </Link>

            {/* Login and Register Links */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                >
                  {t('register')}
                </Link>
              </>
            ) : (
              <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="block text-lg font-semibold px-4 py-2 bg-gray-700 text-white hover:bg-gray-600"
              >
                {user ? user.username : t('auth.login')}
              </button>

              {/* Dropdown Menu in Top Navbar */}
              {menuOpen && (
                <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded w-full z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('dashboard.title')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {t('auth.logout')}
                  </button>
                </div>
              )}
            </div>
          )}


            {/* Language Switcher */}
            <div className="flex space-x-2">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-4 py-2 rounded ${
                  i18n.language === 'en' ? 'bg-gray-700' : 'bg-gray-500'
                } hover:bg-gray-600 text-white`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('ar')}
                className={`px-4 py-2 rounded ${
                  i18n.language === 'ar' ? 'bg-gray-700' : 'bg-gray-500'
                } hover:bg-gray-600 text-white`}
              >
                AR
              </button>
            </div>
          </nav>
        </div>
      </header>

   {navOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50">
      <button
        className="absolute top-4 right-4 text-gray-800 focus:outline-none"
        onClick={() => setNavOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav className="flex flex-col space-y-4 p-4">
        <Link
          to="/"
          className="text-lg font-semibold text-gray-800 hover:text-purple-600"
          onClick={() => setNavOpen(false)}
        >
          {t('home.title')}
        </Link>
        <Link
          to="/trainers"
          className="text-lg font-semibold text-gray-800 hover:text-purple-600"
          onClick={() => setNavOpen(false)}
        >
          {t('trainers.list_title')}
        </Link>
        <Link
          to="/about"
          className="text-lg font-semibold text-gray-800 hover:text-purple-600"
          onClick={() => setNavOpen(false)}
        >
          {t('about.title')}
        </Link>
        <Link
          to="/contact"
          className="text-lg font-semibold text-gray-800 hover:text-purple-600"
          onClick={() => setNavOpen(false)}
        >
          {t('contact.title')}
        </Link>

        {/* Login/Register or Logout in Sidebar */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400"
              onClick={() => setNavOpen(false)}
            >
              {t('login')}
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
              onClick={() => setNavOpen(false)}
            >
              {t('register')}
            </Link>
          </>
        ) : (
          
          <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block w-full text-left px-4 py-2 bg-gray-700 text-white hover:bg-gray-600"
          >
   {user ? user.username : t('auth.login')}
             </button>

          {/* Dropdown Menu in Sidebar */}
          {menuOpen && (
            <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded w-full z-50">
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setNavOpen(false)}
              >
                {t('dashboard.title')}
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t('auth.logout')}
              </button>
            </div>
          )}
        </div>
      )}

        {/* Language Switcher */}
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => switchLanguage('en')}
            className={`px-4 py-2 rounded ${
              i18n.language === 'en' ? 'bg-gray-700' : 'bg-gray-500'
            } hover:bg-gray-600 text-white`}
          >
            EN
          </button>
          <button
            onClick={() => switchLanguage('ar')}
            className={`px-4 py-2 rounded ${
              i18n.language === 'ar' ? 'bg-gray-700' : 'bg-gray-500'
            } hover:bg-gray-600 text-white`}
          >
            AR
          </button>
        </div>
      </nav>
    </div>
  </div>
)}

      {/* Main Content */}
      <main className="min-h-screen bg-gray-100">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Sports Trainers Platform. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
