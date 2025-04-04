import { Request, Response } from "express";
import { Car } from "../models/cars.js"; // Import Car model

// GET /cars → Fetch all cars
export const getAllCars = async (_req: Request, res: Response): Promise<void> => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// GET /cars/:id → Fetch a car by ID
export const getCarById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const car = await Car.findByPk(id);
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// POST /cars → Create a new car
export const createCar = async (req: Request, res: Response): Promise<void> => {
    const { brand, model, year, price }: { brand: string; model: string; year: number; price: number } = req.body;
    try {
        const newCar = await Car.create({ brand, model, year, price });
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// PUT /cars/:id → Update a car
export const updateCar = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const { brand, model, year, price }: { brand: string; model: string; year: number; price: number } = req.body;

    try {
        const car = await Car.findByPk(id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        car.brand = brand;
        car.model = model;
        car.year = year;
        car.price = price;
        await car.save();
        res.json(car);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// DELETE /cars/:id → Remove a car
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        await car.destroy();
        res.json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
