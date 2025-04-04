# Lowball Motors 🚗💨

A Marketplace for Used Cars with a Twist!
Welcome to **Lowball Motors**, the ultimate used car marketplace where bargain hunters and hagglers rejoice! This unique platform allows buyers to make lowball offers on listed cars, turning price negotiation into a fun and interactive experience.

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

# Description

Buying and selling cars has never been this much fun! **Lowball Motors** connects buyers and sellers while encouraging negotiation through its lowball offer feature. Buyers can browse listings, make outrageous offers (or fair ones!), and sellers can choose to accept, decline, or counter these offers. It's car shopping, reimagined.

# Table of Contents

1. Description
2. Features
3. Technologies Used
4. Installation
5. Usage
6. Screenshots
7. API Endpoints
8. Contributing
9. License

# Features

- **User Roles**: Separate accounts for buyers and sellers with secure JWT authentication.

- **Car Listing**: Sellers can upload car details, descriptions, and images.

- **Lowball Offers**: Buyers can make offers with a focus on negotiations.

- **Search and Filter**: Find cars by make, model, price, location, and more.

- **Responsive Design**: Optimized for mobile and desktop devices.

# Technologies Used

**Backend**:

- **Node.js** with **Express.js**: For RESTful API developement.
- **PostgreSQL** with **Sequelize**: As the database and ORM.
- **JWT**: For secure usere authentrication.
- **APIs**: Intergrated APIs for vehicle data.

# Frontend:

- **React**: For dynamic, interactive user interface.
- **CSS/SCSS**: For responsive and polished styling.

# Deployment:

- **Render**: Backend and database hosting.
- **Netlify** (or equivalent): Frontend hosting.

# Installation

**Prerequisites**

- Node.js and npm
- PostgreSQL installed locally
- A env. file with the folling keys

  - DATABASE_URL= your-database-url
  - JWT_SECRET= your-secret-key
  - API_KEYS= your-api-keys

# Steps

1. Clone the repo:

   - cs ../client
   - npm install

2. Navigate to the server folder and install backend dependencies

   - cd lowball-motors/server
   - npm install

3. Set up the PostgreSQL database:

   - npx sequelize-cli db:migrate

4. Navigate to the client folder and install frontend dependecies:

   - cs ../client
   - npm install

5. Run the developement servers
   - Start the backend
     (npm run dev)
   - Start the frontend
     (npm start)

# Usage

1. Sign up as a buyer or seller.
2. Sellers can list cars with photos and descriptions.
3. Buyers can browse cars, filter results, and make offers.
4. Sellers recive offers and can accept, decline, or counter them in real-time.

# Screenshots

(Include screenshots or mockups of the app's interface. For now, placeholders like “Coming soon!” can suffice.)

# API Endpoints

**Authentication**

- **POST** /api/auth/resiter: Register a new user.
- **POST** /api/auth/login: Log in with credentials.

# Listings

- **GET** /api/cars: Fetch all car listings.
- **POST** /api/cars: Add a new car listing.

# Offers

- **POST** /api/offers: Make an offer on a car.
- **GET** /api/offers/:carId: View offers for a specific car.

# Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request. Please follow the project’s code style and include relevant tests.

# License

This project is licensed under the MIT License. See the file for more details.
