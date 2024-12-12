import React from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';

const AboutPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          {t('about.title')}
        </h1>
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-lg mb-4">{t('about.description')}</p>
          <h2 className="text-3xl font-semibold text-blue-600 mb-2">
            {t('about.mission_title')}
          </h2>
          <p className="text-gray-700 mb-4">{t('about.mission')}</p>
          <h2 className="text-3xl font-semibold text-blue-600 mb-2">
            {t('about.vision_title')}
          </h2>
          <p className="text-gray-700">{t('about.vision')}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
