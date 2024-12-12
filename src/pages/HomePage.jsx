import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../index.css';
const sports = [
  { id: 1, name: 'تنس', nameEn: 'Tennis', icon: '🎾' },
  { id: 2, name: 'كرة الطائرة', nameEn: 'Volleyball', icon: '🏐' },
  { id: 3, name: 'كاراتيه', nameEn: 'Karate', icon: '🥋' },
  { id: 4, name: 'كره الريشة', nameEn: 'Badminton', icon: '🥋' },

];



const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
 
  const filteredSports = sports.filter((sport) =>
    (i18n.language === 'ar' ? sport.name : sport.nameEn)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const token = localStorage.getItem('token'); // Or use context/state if you store the token there
 
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-400 text-white py-10">
      {/* Page Header */}
      <h1 className="text-center text-5xl font-bold mb-8">{t('home.title')}</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder={t('home.search_placeholder')}
          className="w-full max-w-lg px-5 py-3 rounded-lg shadow-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sports Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {filteredSports.map((sport) => (
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
  );
  
};

export default HomePage;
