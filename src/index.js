/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route index path="/" element={<Index />} />
      <Route exact path="/user-profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
);
