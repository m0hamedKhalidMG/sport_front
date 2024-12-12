import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const TrainerContext = createContext();

// Create the Provider component
export const TrainerProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('https://server-sport.vercel.app/trainers'); // Replace with your API endpoint
        setTrainers(response.data); // Assuming response.data is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []); // Run only once when the component mounts

  return (
    <TrainerContext.Provider value={{ trainers, loading, error }}>
      {children}
    </TrainerContext.Provider>
  );
};
