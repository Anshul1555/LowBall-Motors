import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const handleSignOut = () => {
    localStorage.removeItem('id_token'); // Clear the token from local storage
  }

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">LowBall Motors</h1>
      </div>
      {/* Hide navigation when on the Login page */}
      {!isLoginPage && (
        <div className="header-bottom">
          <nav className="header-menu">
            <ul className="menu-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/new">New</Link></li>
              <li><Link to="/preowned">PreOwned</Link></li>
            </ul>
          </nav>
          <div className="header-signin">
            <Link to="/" className="signin-link sign-out" onClick={handleSignOut}>Sign Out</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
