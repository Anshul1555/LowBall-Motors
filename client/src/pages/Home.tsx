import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../css/Home.css';
import '../components/CarDetails';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cars');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

 // Calculate unique brands using useMemo
  const brands = useMemo(() => {
  return Array.from(new Set(cars.map((car) => car.brand)));
  }, [cars]);
  const years = Array.from(new Set(cars.map((car) => car.year)));

  const priceRanges = [
    { label: 'All', value: '' },
    { label: 'Under $10,000', value: 'under-10000' },
    { label: '$10,000 - $20,000', value: '10000-20000' },
    { label: '$20,000 - $30,000', value: '20000-30000' },
    { label: '$30,000 - $45,000', value: '30000-45000' },
    { label: 'Over $45,000', value: 'over-45000' },
  ];;

  const filterCars = () => {
    return cars.filter((car) => {
      const brandMatch = selectedBrand ? car.brand === selectedBrand : true;
      const yearMatch = selectedYear ? car.year.toString() === selectedYear : true;

      let priceMatch = true;
      if (selectedPriceRange === 'under-10000') priceMatch = car.price < 10000;
      else if (selectedPriceRange === '10000-20000') priceMatch = car.price >= 10000 && car.price <= 20000;
      else if (selectedPriceRange === '20000-30000') priceMatch = car.price >= 20000 && car.price <= 30000;
      else if (selectedPriceRange === '30000-45000') priceMatch = car.price >= 30000 && car.price <= 45000;
      else if (selectedPriceRange === 'over-45000') priceMatch = car.price > 45000;

      return brandMatch && yearMatch && priceMatch;
    });
  };

  const handleResetFilters = () => {
    setSelectedBrand('');
    setSelectedYear('');
    setSelectedPriceRange('');
  };

  const filteredCars = filterCars();

  return (
    <div className="home-container">
      <h2>Available Cars</h2>

      {/* Filter Controls */}
      <div className="filter-controls">
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">All Years</option>
          {years.sort().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>

        {/* Reset Button */}
        <button className="reset-button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>

      {/* Car Cards */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="car-cards-container">
                          
          {filteredCars.length === 0 ? (
            <p>No matching cars found.</p>
          ) : (
            filteredCars.map((car) => (
              <div className="car-card" key={car.id}
              onClick={() => navigate(`/cars/${car.id}`)}>
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
