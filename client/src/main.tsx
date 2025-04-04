import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Sell from './pages/Sell.tsx';
import New from './pages/New.tsx';
import ComingSoon from './pages/PreOwned.tsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App.tsx must have <Outlet /> for child routes
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login /> // Root "/" should show Login page
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/sell',
        element: <Sell /> 
      },
      {
        path: '/new',
        element: <New />
      },
      {
        path: '/coming-soon',
        element: <ComingSoon />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
