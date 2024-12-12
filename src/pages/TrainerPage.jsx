import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../index.css';
import axios from 'axios'; // Import axios

const trainers = [
  {
    id: 1,
    name: 'محمد علي',
    nameEn: 'Mohamed Ali',
    rating: 4.8,
    price: '200 جنيه',
    priceEn: '200 EGP',
    description:
      'مدرب محترف بخبرة تزيد عن 10 سنوات في تدريب التنس للمبتدئين والمحترفين.',
    descriptionEn:
      'Professional tennis coach with over 10 years of experience training beginners and professionals.',
    icon: '👨‍🏫',
  },
  {
    id: 2,
    name: 'سارة أحمد',
    nameEn: 'Sarah Ahmed',
    rating: 4.6,
    price: '250 جنيه',
    priceEn: '250 EGP',
    description: 'مدربة متميزة في تدريب الكبار والصغار.',
    descriptionEn: 'Specialized in training both adults and children.',
    icon: '👩‍🏫',
  },
];

const TrainerPage = () => {
  const { trainerId } = useParams();
  const { t, i18n } = useTranslation();

  const [trainer, setTrainer] = useState(null); // State to hold trainer data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);  // Start loading
        const response = await axios.get(`https://server-sport.vercel.app/trainerss/${trainerId}`); // Correct URL
        setTrainer(response.data[0]);  // Set trainer data from the response
      } catch (err) {
        console.error(err);
        setError(t('trainer.fetch_error', { message: 'Failed to load trainer.' })); // Error handling
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchTrainer();  // Call the function to fetch the trainer data
  }, [trainerId, t]);  // Depend on trainerId and translation function to re-fetch when they change

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (!trainer) {

    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-red-600">{t('trainer.not_found')}</h1>
      </div>
    );
  }
  console.log(trainer)

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-green-400 to-blue-400 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
          <div className="flex flex-col md:flex-row items-center mb-6">
            {/* Profile Icon */}
            <div className="text-6xl bg-gradient-to-r from-purple-400 to-pink-500 rounded-full p-4 shadow-lg text-white">
              {trainers[0].icon}
            </div>
            <div className="ml-0 md:ml-6 mt-6 md:mt-0">
              <h1 className="text-4xl font-bold text-gray-800">
                {i18n.language === 'ar' ? trainer.nameAr : trainer.name}
              </h1>
              <p className="text-gray-600 mt-2">
                {t('trainer.rating')}: <strong>3.5</strong>
              </p>
              <p className="text-gray-600 mt-2">
                {t('trainer.price')}: {i18n.language === 'ar' ? trainer.priceAr : trainer.price}
              </p>
            </div>
          </div>
          <p className="text-lg mt-4">
            {i18n.language === 'ar' ? trainer.descriptionAr : trainer.description}
          </p>
          <p className="text-lg mt-4">
            {i18n.language === 'ar' ? trainer.phone : trainer.phone}
          </p>
          <Link
            to={`/booking/${trainer._id}`}
            className="inline-block mt-6 bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-purple-400"
          >
            {t('booking.title')}{' '}
            {i18n.language === 'ar' ? trainer.name : trainer.nameEn}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerPage;
