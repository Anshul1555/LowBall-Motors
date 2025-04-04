import { seedUsers } from './user-seeds.js';
import { seedCars } from './cars.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    console.log('Syncing database...');

    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedCars();
    console.log('\n----- TICKETS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
