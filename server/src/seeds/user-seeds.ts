import { User } from '../models/user.js';

export const seedUsers = async () => {
  try {
    console.log('Seeding users...');

    const users = await User.bulkCreate([
      { username: 'Anshul', password: 'password' },
      { username: 'Sharma', password: 'password' },
      { username: 'RadiantComet', password: 'password' },
    ], { individualHooks: true });

    // Log the seeded users to confirm
    console.log('Users seeded:', users);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
