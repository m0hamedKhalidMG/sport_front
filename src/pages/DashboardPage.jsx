import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // Import axios for API requests

const DashboardPage = () => {
  const { user } = useAuth(); // Get the user from context
  const { t, i18n } = useTranslation(); // i18n for translations
  const [bookings, setBookings] = useState([]); // State to store bookings
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Mapping of sports with language consideration
  const sportMapping = {
    1: i18n.language === 'ar' ? 'تنس' : 'Tennis',
    2: i18n.language === 'ar' ? 'كرة الطائرة' : 'Volleyball',
    3: i18n.language === 'ar' ? 'كاراتيه' : 'Karate',
  };

  // Fetch the bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {  // استخراج التوكن من localStorage
        const token = localStorage.getItem('token');
         
        const response = await axios.get('https://server-sport.vercel.app/bookings', {
          headers: {
            Authorization: `Bearer ${token}`, // Using the token to authenticate
          },
        });
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, i18n.language]); // Re-run the effect when the language changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error handling
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t('dashboard.title')}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-2xl font-bold mb-4">
            {t('auth.username')}: {user?.username || t('errors.login_required')}
          </h2>

          {/* Bookings List */}
          {bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking._id} // Use _id for the key
                  className="p-4 border rounded-lg bg-gradient-to-r from-purple-200 to-blue-200 shadow-md"
                >
                  <h3 className="text-xl font-semibold">
                    {t('dashboard.trainer')}:{' '}
                    {i18n.language === 'ar' ? booking.trainerAr : booking.trainer}
                  </h3>
                  <p className="mt-1">
                    {t('trainers.sport')}:{' '}
                    {sportMapping[booking.sport] || 'Unknown sport'}
                  </p>
                  <p className="mt-1">
                    {t('dashboard.time')}:{' '}
                    {i18n.language === 'ar' ? booking.timeAr : booking.time}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">{t('dashboard.no_bookings')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
