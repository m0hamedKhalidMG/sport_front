import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../index.css';

const ErrorPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-red-400 to-pink-500 text-white flex flex-col justify-center items-center ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <h1 className="text-6xl font-bold mb-4">{t('error.title')}</h1>
      <p className="text-lg mb-6">{t('error.description')}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 shadow-lg"
      >
        {t('error.go_back')}
      </Link>
    </div>
  );
};

export default ErrorPage;
