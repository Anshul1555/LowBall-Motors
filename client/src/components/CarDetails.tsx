import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios';
import { CarData } from "../interfaces/Cars";
import '../css/CarDetails.css'
import ChatBox from "./OfferChat.tsx";



const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<CarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCar = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/cars/${id}`);
          setCar(response.data);
        } catch (err) {
          console.error('Failed to fetch car:', err);
          setError('Failed to load car details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCar();
    }, [id]);
  
    if (loading) return <p>Loading car details...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!car) return <p>Car not found.</p>;
  
    const carDescription = `The ${car.model} by ${car.brand} is a powerful, high-performance sports car. Known for its iconic design and aggressive engine, this car is built to offer both thrill and style. Whether you're looking for speed, luxury, or just a legendary drive, the ${car.model} delivers on all fronts.`;

    return (
      <div className="car-details-container">
        <div className="chatbox-wrapper">
          <ChatBox car={car} />
        </div>
    
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        <h2>{car.brand} {car.model}</h2>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> ${car.price}</p>
        <p><strong>Description:</strong> {carDescription}</p>
        <div className="rating-section">
          <div className="rating-stars">★★★★☆ 4.5/5</div>
          <div className="reviews">
            <p>"Smooth ride and great mileage!"</p>
            <p>"Excellent value for the price."</p>
            <p>"Would definitely buy again."</p>
          </div>
        </div>
      </div>
    );
}
  
  export default CarDetails;