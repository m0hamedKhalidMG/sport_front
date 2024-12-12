import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State for form fields and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Store error messages

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await axios.post('https://server-sport.vercel.app/api/auth/login', {
        username,
        password,
      });

      // Get the JWT token from the response
      const { token } = response.data;

      // Store token in localStorage (or state/context if necessary)
      localStorage.setItem('token', token);

      // Optionally, use context to store the token or user data
      login(username);

      // Redirect to the dashboard or the main page
      navigate('/dashboard');
    } catch (err) {
      // If error, display it on the frontend
      if (err.response && err.response.data && err.response.data.errors) {
        const backendErrors = err.response.data.errors.map((error) => error.msg).join(', ');
        setErrorMessage(backendErrors);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          {t('auth.login')}
        </h1>

        {/* Display error message if any */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white text-lg">{t('auth.username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label className="block text-white text-lg">{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg shadow-lg transition-all"
          >
            {t('auth.submit')}
          </button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          {t('auth.not_registered')}{' '}
          <a href="/register" className="text-yellow-300 hover:underline">
            {t('auth.register')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
