import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../index.css';
import axios from 'axios';

const trainers = [
  {
    id: 1,
    name: 'محمد علي',
    nameEn: 'Mohamed Ali',
    sport: 'تنس',
    sportEn: 'Tennis',
    rating: 4.5,
    price: '200 جنيه',
    priceEn: '200 EGP',
    icon: '👨‍🏫',
  },
  {
    id: 2,
    name: 'سارة أحمد',
    nameEn: 'Sarah Ahmed',
    sport: 'كرة الطائرة',
    sportEn: 'Volleyball',
    rating: 4.8,
    price: '250 جنيه',
    priceEn: '250 EGP',
    icon: '👩‍🏫',
  },
];

const TrainersListPage = () => {
  const { t, i18n } = useTranslation();
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 


  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('https://server-sport.vercel.app/trainers');  // Replace with your API endpoint
        setTrainers(response.data);  // Assuming the data is an array of trainer objects
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchTrainers();
  }, []);


  const sportMapping = {
    1: i18n.language === 'ar' ? 'تنس' : 'Tennis',
    2: i18n.language === 'ar' ? 'كرة الطائرة' : 'Volleyball',
    3: i18n.language === 'ar' ? 'كاراتيه' : 'Karate',
    4: i18n.language === 'ar' ? 'كره الريشة' : 'Badminton',
    5: i18n.language === 'ar' ? 'الصقارة' : 'Falconry', // Added Falconry
};

  const filteredTrainers = trainers.filter((trainer) => {
    const nameToFilter = i18n.language === 'ar' ? trainer.nameAr : trainer.name;
    return nameToFilter?.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  console.log(filteredTrainers);
  
    return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          {t('trainers.list_title')}
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder={t('trainers.search_placeholder')}
            className="w-full max-w-lg px-4 py-3 rounded-lg shadow-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Trainers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <Link
              to={`/trainer/${trainer._id}`}
              key={trainer.id}
              className="bg-white text-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">👨‍🏫</div>
                <h2 className="text-2xl font-semibold">
                  {i18n.language === 'ar' ? trainer.nameAr : trainer.name}
                </h2>
                <p className="text-gray-600">
                  {t('trainers.sport')}:{' '}
                  <strong className="font-medium text-gray-900">
  </strong> {sportMapping[trainer.sport]}                </p>
                <p className="text-gray-600">
                  {t('trainers.rating')}: 3.5
                </p>
                <p className="text-gray-600">
                  {t('trainers.price')}:{' '}
                  {i18n.language === 'ar' ? trainer.price : trainer.priceAr}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainersListPage;
