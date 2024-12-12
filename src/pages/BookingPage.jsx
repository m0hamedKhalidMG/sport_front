import React, { useState,useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { TrainerContext } from '../context/TrainerContext';
import axios from 'axios'; // تأكد من تثبيت Axios



const BookingPage = () => {
  const { user } = useAuth();
  const { trainerId } = useParams();
  const { t, i18n } = useTranslation();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [confirmation, setConfirmation] = useState(false);
  const { trainers, loading, error } = useContext(TrainerContext);
  // Find the trainer by ID
  const trainer = trainers.find((t) => t._id === trainerId);
  const trainerName = i18n.language === 'ar' ? trainer?.name : trainer?.nameEn;
console.log(trainer)
const handleBooking = async () => {
    try {
      // تجهيز البيانات
      const bookingData = {
        trainer: i18n.language === 'ar' ? trainer.nameAr : trainer.name,
        sport: i18n.language === 'ar' ? trainer.sportAr : trainer.sport,
        time: i18n.language === 'ar'
          ? trainer.availableTimesAr[selectedSlot]
          : trainer.availableTimes[selectedSlot],
      };

      // استخراج التوكن من localStorage
      const token = localStorage.getItem('token');

      // إرسال الطلب إلى الـ API مع الـ Authorization header
      const response = await axios.post(
        'https://server-sport.vercel.app/bookings',
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة التوكن
          },
        }
      );

      // عرض رسالة نجاح
      setConfirmation(true);
      console.log('Booking saved:', response.data);
    } catch (error) {
      console.error('Failed to save booking:', error);
    }
  
};

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-tr from-blue-500 to-green-500 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Title with Trainer's Name */}
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('booking.title')} {trainerName}
        </h1>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">
            {t('booking.available_slots')}
          </h2>
          <ul className="space-y-4">
  {(
    i18n.language === 'ar' ? trainer.availableTimesAr : trainer.availableTimes
  ).map((time, index) => (
    <li
      key={index}
      className={`cursor-pointer p-4 border rounded-lg ${
        selectedSlot === index
          ? 'bg-green-100 border-green-500'
          : 'hover:bg-gray-100'
      }`}
      onClick={() => setSelectedSlot(index)}
    >
      {time}
    </li>
  ))}
</ul>


<button
  onClick={handleBooking}
  className={`mt-6 px-6 py-3 rounded-lg text-white font-bold ${
    selectedSlot !== null
      ? 'bg-purple-500 hover:bg-purple-400'
      : 'bg-gray-300 cursor-not-allowed'
  }`}
  disabled={selectedSlot === null}
>
  {t('booking.confirm')}
</button>

          {confirmation && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              {t('booking.success')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
