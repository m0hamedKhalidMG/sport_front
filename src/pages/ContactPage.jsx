import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          {t('contact.title')}
        </h1>
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
              {t('contact.success')}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('contact.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 font-semibold"
            >
              {t('contact.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
