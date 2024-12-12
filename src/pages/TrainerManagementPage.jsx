import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TrainerManagementPage = () => {
  const { t, i18n } = useTranslation();
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    nameAr: '',
    sport: '',
    sportAr: '',
    availableTimes: [],
    availableTimesAr: [],
    experience: '',
    experienceAr: '',
    description: '',
    descriptionAr: '',
    phone: '',
    price: '',
    priceAr: '',
  });
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  // Fetch trainers from the backend
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('https://server-sport.vercel.app/trainers');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };
    fetchTrainers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prev) => ({
      ...prev,
      [name]: name === 'sport' ? parseInt(value) : value, // Convert sport ID to a number
    }));
  };
  
  const addTimeSlot = () => {
    if (day && time) {
      const newSlot = `${day}, ${time}`;
      const newSlotAr = `${translateDayToArabic(day)}, ${time}`;
      setNewTrainer((prev) => ({
        ...prev,
        availableTimes: [...prev.availableTimes, newSlot],
        availableTimesAr: [...prev.availableTimesAr, newSlotAr],
      }));
      setDay('');
      setTime('');
    }
  };

  const translateDayToArabic = (day) => {
    const daysMap = {
      Monday: 'الإثنين',
      Tuesday: 'الثلاثاء',
      Wednesday: 'الأربعاء',
      Thursday: 'الخميس',
      Friday: 'الجمعة',
      Saturday: 'السبت',
      Sunday: 'الأحد',
    };
    return daysMap[day] || day;
  };
  const sportMapping = {
    1: i18n.language === 'ar' ? 'تنس' : 'Tennis',
    2: i18n.language === 'ar' ? 'كرة الطائرة' : 'Volleyball',
    3: i18n.language === 'ar' ? 'كاراتيه' : 'Karate',
    4: i18n.language === 'ar' ? 'كرة الريشة' : 'Badminton ',

  };
  
  const handleAddTrainer = async () => {
    try {
      const response = await axios.post('https://server-sport.vercel.app/trainers', newTrainer);
      setTrainers((prev) => [...prev, response.data]);
      setNewTrainer({
        name: '',
        nameAr: '',
        sport: '',
        sportAr: '',
        availableTimes: [],
        availableTimesAr: [],
        experience: '',
        experienceAr: '',
        description: '',
        descriptionAr: '',
        phone: '',
        price: '',
        priceAr: '',
      });
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  const handleDeleteTrainer = async (id) => {
    try {
      await axios.delete(`https://server-sport.vercel.app/trainers/${id}`);
      setTrainers((prev) => prev.filter((trainer) => trainer._id !== id));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          {t('trainerm.management_title', 'Trainer Management')}
        </h1>
        {/* Add Trainer Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t('trainerm.add_trainer', 'Add Trainer')}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTrainer();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700">
                {t('trainerm.name', 'Name (English)')}
              </label>
              <input
                type="text"
                name="name"
                value={newTrainer.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {t('trainerm.name_ar', 'Name (Arabic)')}
              </label>
              <input
                type="text"
                name="nameAr"
                value={newTrainer.nameAr}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
  <label className="block text-gray-700">
    {t('trainerm.sport', 'Sport')}
  </label>
  <select
    name="sport"
    value={newTrainer.sport}
    onChange={(e) => handleInputChange(e)}
    className="w-full px-4 py-2 border rounded-lg"
    required
  >
    <option value="">{t('trainerm.select_sport', 'Select Sport')}</option>
    {Object.entries(sportMapping).map(([id, name]) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))}
  </select>
</div>

           
            <div>
              <label className="block text-gray-700">
                {t('trainerm.experience', 'Experience (English)')}
              </label>
              <input
                type="text"
                name="experience"
                value={newTrainer.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">
                {t('trainerm.description', 'description (English)')}
              </label>
              <textarea
                type="text"
                name="description"
                value={newTrainer.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">
              {t('trainerm.descriptionAr', 'description (Arabic)')}
              </label>
              <textarea
                type="text"
                name="descriptionAr"
                value={newTrainer.descriptionAr}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700">
                {t('trainerm.phone', 'phone (English)')}
              </label>
              <input
                type="text"
                name="phone"
                value={newTrainer.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>


            <div>
              <label className="block text-gray-700">
                {t('trainerm.experience_ar', 'Experience (Arabic)')}
              </label>
              <input
                type="text"
                name="experienceAr"
                value={newTrainer.experienceAr}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {t('trainerm.price', 'Price (English)')}
              </label>
              <input
                type="text"
                name="price"
                value={newTrainer.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {t('trainerm.price_ar', 'Price (Arabic)')}
              </label>
              <input
                type="text"
                name="priceAr"
                value={newTrainer.priceAr}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {t('trainerm.add_time_slot', 'Add Time Slot')}
              </label>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-lg"
                  
                >
                  <option value="">{t('trainerm.select_day', 'Select Day')}</option>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-lg"
                  
                />
              </div>
              <button
                type="button"
                onClick={addTimeSlot}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {t('trainerm.add', 'Add')}
              </button>
              <ul className="mt-2">
                {newTrainer.availableTimes.map((time, index) => (
                  <li key={index} className="text-gray-600">
                    {time}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {t('trainerm.submit', 'Submit')}
            </button>
          </form>
        </div>

        {/* List of Trainers */}
        <div className="bg-white p-6 rounded-lg shadow-xl">
  <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900 tracking-tight">
    {t('trainerm.list_title', 'Trainer List')}
  </h2>
  <ul className="space-y-8">
    {trainers.map((trainer) => (
      <li
        key={trainer._id}
        className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-300 ease-in-out border border-gray-200 hover:border-gray-300"
      >
        {/* Trainer Information */}
        <div className="flex flex-col space-y-4 w-3/4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {i18n.language === 'ar' ? trainer.nameAr[0] : trainer.name[0]}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {i18n.language === 'ar' ? trainer.nameAr : trainer.name}
            </h3>
          </div>
          
          <p className="text-lg text-gray-700">
  <strong className="font-medium text-gray-900">
    {t('trainerm.sport', 'Sport')}:
  </strong> {sportMapping[trainer.sport]}
</p>

          <p className="text-lg text-gray-700">
            <strong className="font-medium text-gray-900">
              {t('trainerm.experience', 'Experience')}:
            </strong> {i18n.language === 'ar' ? trainer.experienceAr : trainer.experience}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-medium text-gray-900">
              {t('trainerm.price', 'Price')}:
            </strong> {i18n.language === 'ar' ? trainer.priceAr : trainer.price}
          </p>

          {/* Slot Time */}
          <p className="text-lg text-gray-700 flex items-center space-x-2">
  <strong className="font-medium text-gray-900">
    {t('trainerm.Slot_Time', 'Available Times')}:
  </strong>
  <div className="flex flex-wrap gap-2">
    {(i18n.language === 'ar' ? trainer.availableTimesAr : trainer.availableTimes).map(
      (time, index) => (
        <span
          key={index}
          className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 font-semibold rounded-full"
        >
          {time}
        </span>
      )
    )}
  </div>
</p>
        </div>

        {/* Delete Button */}
        <div className="flex flex-col justify-center items-center space-y-3">
          <button
            onClick={() => handleDeleteTrainer(trainer._id)}
            className="px-5 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 ease-in-out"
          >
            {t('trainerm.delete', 'Delete')}
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>


      </div>
    </div>
  );
};

export default TrainerManagementPage;