import React, { useState } from 'react';
import '../css/Sell.css';

function Sell() {
  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { brand, model, year, mileage, price } = carDetails;

    if (!brand || !model || !year || !mileage || !price) {
      alert('Please fill in all required fields');
      return;
    }

    const yearNum = parseInt(year);
    const mileageNum = parseInt(mileage);
    const priceNum = parseFloat(price);

    if (yearNum < 2015 || yearNum > 2025) {
      alert('Model year must be between 2015 and 2025');
      return;
    }

    if (mileageNum < 0) {
      alert('Mileage cannot be negative');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand,
          model,
          year: yearNum,
          mileage: mileageNum,
          price: priceNum,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit car details');
      }

      alert('Car listed successfully!');
      setCarDetails({ brand: '', model: '', year: '', mileage: '', price: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to list car. Please try again later.');
    }
  };

  return (
    <div className="sell-container">
      <div className="sell-header">
        <h2>Sell Your Car</h2>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={carDetails.brand}
            onChange={handleInputChange}
            placeholder="Enter car brand"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={carDetails.model}
            onChange={handleInputChange}
            placeholder="Enter car model"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year">Model Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={carDetails.year}
            onChange={handleInputChange}
            placeholder="Enter car model year"
            min="2015"
            max="2025"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mileage">Mileage (in miles)</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={carDetails.mileage}
            onChange={handleInputChange}
            placeholder="Enter car mileage"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={carDetails.price}
            onChange={handleInputChange}
            placeholder="Enter car price"
          />
        </div>

        <button type="submit" className="btn-sell">
          Sell
        </button>
      </form>
    </div>
  );
}

export default Sell;
