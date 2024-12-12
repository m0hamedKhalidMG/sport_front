import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../index.css';
import '../i18n/i18n';

// Default trainer icon (Fallback)
const defaultTrainerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-24 h-24 text-gray-400"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25a5.25 5.25 0 00-5.25 5.25v.396c0 1.682.814 3.177 2.154 4.143C4.702 13.684 2.25 17.011 2.25 21v.375c0 .207.168.375.375.375h18.75a.375.375 0 00.375-.375V21c0-3.989-2.452-7.316-6.654-9.156A5.252 5.252 0 0017.25 7.896v-.396A5.25 5.25 0 0012 2.25zm-3.75 5.25a3.75 3.75 0 117.5 0v.396a3.75 3.75 0 01-7.5 0v-.396zM4.028 20.25c.34-3.34 3.687-6 7.972-6s7.632 2.66 7.972 6H4.028z"
      clipRule="evenodd"
    />
  </svg>
);

const SportPage = () => {
  const { sportId } = useParams();
  const { t, i18n } = useTranslation();
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch trainers from backend
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `https://server-sport.vercel.app/Sport?sportId=${sportId}`
        );
        setTrainers(response.data); // Update trainers
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setError(t('trainer.fetch_error', 'Failed to load trainers.'));
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTrainers();
  }, [sportId, t]);

  // Filter trainers based on search query
  const filteredTrainers = trainers.filter((trainer) => {
    // Check if name is available and use correct language field (nameAr or nameEn)
    const trainerName = i18n.language === 'ar' ? trainer.nameAr : trainer.nameEn;
    return trainerName?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-lg">{t('loading', 'Loading...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-500 to-green-500 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-6">
          {t('home.trainers')}
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder={t('trainer.search_placeholder')}
            className="w-full max-w-lg px-4 py-3 rounded-lg shadow-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Trainers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Link
  to={{
    pathname: `/trainer/${trainer._id}`,
    state: { trainer }  // Optionally pass the full trainer object as state
  }}
  key={trainer._id}
  className="bg-white text-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
>
              <div>
                {/* Trainer Image or Default Icon */}
                {trainer.image ? (
                  <img
                    src={trainer.image}
                    alt={i18n.language === 'ar' ? trainer.name : trainer.nameEn}
                    className="rounded-t-lg w-full h-48 object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-200 rounded-t-lg w-full h-48">
                    {defaultTrainerIcon}
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-semibold">
                    {i18n.language === 'ar' ? trainer.nameAr : trainer.name}
                  </h2>
                  <p className="text-gray-600">
                    {t('trainer.rating')}: 4.5
                  </p>
                  <p className="text-gray-600">
                    {t('trainer.experience')}:
                    {i18n.language === 'ar'
                      ? trainer.experienceAr
                      : trainer.experience}
                  </p>
                  <p className="text-gray-600">
                    {t('trainer.price')}:
                    {i18n.language === 'ar' ? trainer.priceAr : trainer.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportPage;
