import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const RegisterPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State for form fields and error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Store backend error messages

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert(t('auth.password_mismatch'));
      return;
    }

    try {
      // Send registration data to the backend
      const response = await axios.post('https://server-sport.vercel.app/api/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      // Handle successful registration
      const { token } = response.data; // Extract the JWT token from the response
      login(username); // Store token or user in context if needed
      localStorage.setItem('token', token); // Store token in local storage (optional)
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data && err.response.data.errors) {
        // Extract the error messages from the backend
        const backendErrors = err.response.data.errors.map(error => error.msg).join(', ');
        setErrorMessage(backendErrors); // Set the error messages to state
      } else {
        // Generic error message for other cases
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          {t('auth.register')}
        </h1>

        {/* Display error message if any */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-white text-lg">
              {t('auth.username')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label className="block text-white text-lg">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label className="block text-white text-lg">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label className="block text-white text-lg">
              {t('auth.confirm_password')}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          {t('auth.already_registered')}{' '}
          <a href="/login" className="text-yellow-300 hover:underline">
            {t('auth.login')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
