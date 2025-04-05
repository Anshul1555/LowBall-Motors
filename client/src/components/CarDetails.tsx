import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios';
import { CarData } from "../interfaces/Cars";
import '../css/CarDetails.css'



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
  
    return (
      <div className="">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h2>{car.brand} {car.model}</h2>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> ${car.price}</p>
      </div>
    );
  };
  
  export default CarDetails;