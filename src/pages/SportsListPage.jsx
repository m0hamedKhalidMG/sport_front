import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../index.css';

const sports = [
  { id: 1, name: 'تنس', nameEn: 'Tennis', icon: '🎾' },
  { id: 2, name: 'كرة الطائرة', nameEn: ' ', icon: '🏐' },
  { id: 3, name: 'كاراتيه', nameEn: 'Karate', icon: '🥋' },
];

const SportsListPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-600 to-blue-400 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-bold mb-8">
          {t('sports.list_title')}
        </h1>

        {/* Sports List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <Link
              to={`/sport/${sport.id}`}
              key={sport.id}
              className="bg-white text-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center p-6">
                <span className="text-6xl">{sport.icon}</span>
                <h2 className="text-2xl font-semibold mt-4">
                  {i18n.language === 'ar' ? sport.name : sport.nameEn}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsListPage;
