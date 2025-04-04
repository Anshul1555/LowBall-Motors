import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the child routes defined in the router setup */}
      </main>
      <Footer />
    </>
  );
}

export default App;
