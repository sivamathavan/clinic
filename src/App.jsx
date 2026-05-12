import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Shield, Star, CheckCircle, Calendar, MessageSquare, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const services = [
  { id: 1, title: 'General Dentistry', desc: 'Comprehensive checkups, cleanings, and preventative care for all ages.', icon: Shield },
  { id: 2, title: 'Cosmetic Dentistry', desc: 'Whiten your smile and correct imperfections with our advanced treatments.', icon: Star },
  { id: 3, title: 'Dental Implants', desc: 'Permanent, natural-looking solutions for missing teeth with high success rates.', icon: CheckCircle },
  { id: 4, title: 'Orthodontics', desc: 'Traditional braces and clear aligners to straighten your teeth comfortably.', icon: Calendar },
  { id: 5, title: 'Oral Surgery', desc: 'Expert surgical care for complex dental issues in a safe, modern environment.', icon: Shield },
  { id: 6, title: 'Emergency Care', desc: 'Same-day appointments for urgent dental pain or injuries when you need it most.', icon: MessageSquare },
];

const doctors = [
  { id: 1, name: 'Dr. Sarah Wilson', role: 'Principal Dentist', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, name: 'Dr. Michael Chen', role: 'Orthodontist', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, name: 'Dr. James Miller', role: 'Implant Specialist', image: 'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', date: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <span><Phone size={14} /> +91 98765 43210</span>
            <span><Mail size={14} /> hello@smilecare.com</span>
          </div>
          <div className="hours">
            <span><Clock size={14} /> Mon - Sat: 9AM - 8PM</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">🦷</span>
            SMILECARE
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#doctors">Our Doctors</a>
            <a href="#contact" className="nav-cta">Book Appointment</a>
          </div>
          <div className="mobile-toggle" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-header">
              <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="mobile-menu-links">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#doctors" onClick={() => setIsMenuOpen(false)}>Our Doctors</a>
              <a href="#contact" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>Book Appointment</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Your Journey to a <span className="highlight">Perfect Smile</span> Starts Here.</h1>
              <p>Professional dental care delivered with compassion and advanced technology in the heart of Coimbatore.</p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>Book Now</button>
                <button className="btn-secondary" onClick={() => document.getElementById('services').scrollIntoView()}>Our Services</button>
              </div>
              <div className="stats">
                <div className="stat-item">
                  <h3>15k+</h3>
                  <p>Happy Patients</p>
                </div>
                <div className="stat-item">
                  <h3>12+</h3>
                  <p>Specialists</p>
                </div>
                <div className="stat-item">
                  <h3>20+</h3>
                  <p>Years Exp.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src="/dental.jpg" alt="Dental Care" className="main-img" />
              <div className="floating-card">
                <CheckCircle className="icon" />
                <div>
                  <h4>100% Safe</h4>
                  <p>Certified Clinic</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-title">
            <h2>Our Specialized Services</h2>
            <p>We provide a wide range of dental treatments to keep your smile healthy and bright.</p>
          </div>
          <div className="services-grid">
            {services.map(service => (
              <motion.div 
                key={service.id} 
                className="service-card"
                whileHover={{ y: -10 }}
              >
                <div className="icon-box">
                  <service.icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <a href="#contact">Learn More <ChevronRight size={16} /></a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="doctors">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Experts</h2>
            <p>Our team of highly qualified specialists is dedicated to your oral health.</p>
          </div>
          <div className="doctors-grid">
            {doctors.map(doc => (
              <div key={doc.id} className="doctor-card">
                <img src={doc.image} alt={doc.name} />
                <div className="doctor-info">
                  <h3>{doc.name}</h3>
                  <p>{doc.role}</p>
                  <div className="doctor-social">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="contact" className="appointment">
        <div className="container">
          <div className="appointment-grid">
            <div className="appointment-text">
              <h2>Schedule Your Visit</h2>
              <p>Ready for a better smile? Fill out the form and our team will get back to you within 2 hours to confirm your slot.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin className="icon" />
                  <div>
                    <h4>Visit Us</h4>
                    <p>123 Race Course Road, Coimbatore</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone className="icon" />
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="appointment-form-container">
              {isSubmitted ? (
                <div className="success-message">
                  <CheckCircle size={64} className="success-icon" />
                  <h3>Request Sent!</h3>
                  <p>We'll call you shortly to confirm your appointment.</p>
                </div>
              ) : (
                <form className="appointment-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <select 
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Select Service</option>
                      <option value="General">General Dentistry</option>
                      <option value="Cosmetic">Cosmetic Dentistry</option>
                      <option value="Implant">Dental Implants</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-submit">Book Appointment Now</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>SMILECARE</h3>
              <p>Premium dental care you can trust. Serving Coimbatore with pride since 2005.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#doctors">Our Team</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Dental Tips</h4>
              <p>Subscribe to our newsletter for oral health advice.</p>
              <div className="newsletter-box">
                <input type="email" placeholder="Email" />
                <button>Send</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 SmileCare Dental. All rights reserved.</p>
            <p className="developed-by">
              Developed by <a href="https://rturox.com/" target="_blank" rel="noopener noreferrer">Rturox Tech 🚀</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
