import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import TrainerSlider from './components/TrainerSlider';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import EnquiryForm from './components/EnquiryForm';
import GymInfo from './components/GymInfo';
import Footer from './components/Footer';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';
import './index.css';

// 🔒 Simple Route Protection
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('albo_admin_auth') === 'true';
  // If not logged in, kick them back to the login page
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Public Website */}
        <Route 
          path="/" 
          element={
            <div className="bg-black text-white">
              <Header />
              <Hero />
              <WhyChooseUs />
              <section id="trainers"><TrainerSlider /></section>
              <Testimonials />
              <section id="faqs"><FAQSection /></section>
              <section id="contact"><EnquiryForm /></section>
              <GymInfo />
              <Footer />
            </div>
          } 
        />

        {/* 2. Admin Login Page (Publicly accessible) */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* 3. Admin Dashboard (Protected - Requires Login) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;