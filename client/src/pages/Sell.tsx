import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

function Sell({ onSubmit }) {
  const [carDetails, setCarDetails] = useState({
    name: '',
    year: '',
    mileage: '',
    price: '',
    image: '', // Added field for car image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(carDetails);  // Send car details to parent (App.js)
    setCarDetails({ name: '', year: '', mileage: '', price: '', image: '' }); // Reset form
  };

  return (
    <div className="px-10 md:px-20 my-10">
      <div className="flex items-center">
        <div className="flex-grow text-center">
          <h2 className="font-bold text-4xl inline-block">Sell Your Car</h2>
        </div>
        {/* Sell button triggers the form submission */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-8 py-4 text-xl rounded"
          onClick={handleSubmit} // Directly trigger handleSubmit
        >
          Sell
        </button>
      </div>

      <form className="p-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">Car Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={carDetails.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter car name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-lg font-medium">Model Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={carDetails.year}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter car model year"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mileage" className="block text-lg font-medium">Mileage (in miles)</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={carDetails.mileage}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter car mileage"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-medium">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={carDetails.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter car price"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium">Car Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={carDetails.image}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter car image URL"
          />
        </div>
      </form>
    </div>
  );
}

export default Sell;
