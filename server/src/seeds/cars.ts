import { Car } from "../models/cars.js";

export const seedCars = async () => {
    try {
        console.log('Seeding cars...');

         await Car.bulkCreate([
            {
              brand: 'Toyota',
              model: 'Camry',
              year: 2022,
              price: 25000,
            },
            {
              brand: 'Honda',
              model: 'Civic',
              year: 2021,
              price: 22000,
            },
            {
              brand: 'Ford',
              model: 'Mustang',
              year: 2023,
              price: 40000,
            },
            {
              brand: 'Chevrolet',
              model: 'Silverado',
              year: 2020,
              price: 35000,
            },
            {
              brand: 'Nissan',
              model: 'Altima',
              year: 2022,
              price: 26000,
            },
            {
              brand: 'BMW',
              model: 'X5',
              year: 2023,
              price: 60000
            }
          ]);
      
          console.log('Cars seeded successfully.');
        } catch (error) {
          console.error('Error seeding cars:', error);
        }
};