import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css'; // Ensure this file exists

const Home: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch car data from API (with authorization token if available)
    const fetchCars = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      try {
        const response = await axios.get('http://localhost:3001/api/cars', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Pass token if available
        });
        console.log('Fetched cars:', response.data); // Log the fetched data
        setCars(response.data); // Set the fetched car data to state
        setLoading(false); // Stop the loading spinner
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to load cars. Please try again later.'); // Set error state
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCars(); // Fetch cars data
  }, []);

  return (
    <div className="home-container">
      <h2>Available Cars</h2>
      {loading ? (
        <p>Loading...</p>  // Show loading message while fetching
      ) : error ? (
        <p className="error-message">{error}</p> // Show error message if fetching fails
      ) : (
        <div className="car-cards-container">
          {cars.length === 0 ? (
            <p>No cars available at the moment.</p> // Message if no cars are found
          ) : (
            cars.map((car) => (
              <div className="car-card" key={car.id}>
                <h3>{car.brand} {car.model}</h3>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Price:</strong> ${car.price}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
