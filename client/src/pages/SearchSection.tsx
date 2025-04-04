import React, { useState, useEffect } from 'react';
import '../css/Search.css'; // Import CSS file

function SearchSection() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [allCars, setAllCars] = useState<any[]>([]);

  const years = Array.from({ length: 11 }, (_, i) => 2015 + i);

  const priceRanges = [
    { label: "Under $30,000", value: "0-30000" },
    { label: "$30,000 - $35,000", value: "30000-35000" },
    { label: "$35,000 - $45,000", value: "35000-45000" },
    { label: "Above $45,000", value: "45000-999999" },
  ];

  const carMakes = [...new Set(allCars.map((car) => car.brand).filter(Boolean))];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = 'YOUR_BEARER_TOKEN'; // Replace with actual token
        const response = await fetch('http://localhost:3001/api/cars/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setAllCars(data);
        console.log("Fetched Cars:", data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = () => {
    if (!allCars.length) {
      console.warn("No cars available to filter");
      return;
    }

    const filtered = allCars.filter((car) => {
      const isYearMatch = selectedYear ? car.year === Number(selectedYear) : true;
      const isMakeMatch = selectedMake ? car.brand === selectedMake : true;
      const isPriceMatch = selectedPrice
        ? car.price >= parseInt(selectedPrice.split('-')[0]) && car.price <= parseInt(selectedPrice.split('-')[1])
        : true;

      return isYearMatch && isMakeMatch && isPriceMatch;
    });

    console.log("Filtered Cars:", filtered);
    setFilteredCars(filtered);
  };

  return (
    <div className="search-container">
      <div className="select-container">
        <select onChange={(e) => setSelectedYear(e.target.value)} className="select-box">
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>{year}</option>
          ))}
        </select>
      </div>

      <div className="separator"></div>

      <div className="select-container">
        <select onChange={(e) => setSelectedMake(e.target.value)} className="select-box">
          <option value="">Car Makes</option>
          {carMakes.map((make, index) => (
            <option key={index} value={make}>{make}</option>
          ))}
        </select>
      </div>

      <div className="separator"></div>

      <div className="select-container">
        <select onChange={(e) => setSelectedPrice(e.target.value)} className="select-box">
          <option value="">Pricing</option>
          {priceRanges.map((range, index) => (
            <option key={index} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      <div className="search-btn-container">
        <button className="search-btn" onClick={handleSearch}>
          <span className="search-icon">🔍</span>
        </button>
      </div>

      <div className="hero-section-placeholder">
        {filteredCars.length > 0 ? (
          <div>
            <h2>Filtered Cars</h2>
            {filteredCars.map((car, index) => (
              <div key={index} className="car-card">
                <h3>{car.brand} {car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Price: ${car.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No cars match your criteria</p>
        )}
      </div>
    </div>
  );
}

export default SearchSection;
