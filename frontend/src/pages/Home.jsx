import React from 'react';
import styled from 'styled-components';
import '../index.css';
import Services from './Services';
import Conact from './Conact';
import '../style/home.css';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Appointment from '../components/Appointment';
import { NavLink } from 'react-router-dom';
import { Flower2, Landmark, Music, Sun, Package, Armchair } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const serviceCards = [
    {
      icon: <Flower2 className="text-red-500" size={60} />,
      title: "Wedding Decoration",
      description: "Transform your special day with breathtaking decor!"
    },
    {
      icon: <Landmark className="text-red-500" size={60} />,
      title: "Reception Setup",
      description: "Elegant setups for a grand wedding reception!"
    },
    {
      icon: <Music className="text-red-500" size={60} />,
      title: "Sangeet Decoration",
      description: "Dance, music, and dazzling décor for a magical night!"
    },
    {
      icon: <Sun className="text-red-500" size={60} />,
      title: "Haldi Decoration",
      description: "Bright & beautiful Haldi décor for a joyful celebration!"
    },
    {
      icon: <Package className="text-red-500" size={60} />,
      title: "Rental Furnitures",
      description: "Hassle-free rentals for a stress-free wedding!"
    },
    {
      icon: <Armchair className="text-red-500" size={60} />,
      title: "Sitting Arrangement",
      description: "Luxury seating for a comfortable wedding experience!"
    }
  ];

  return (
    <Wrapper>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-img1 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            Create Unforgettable
            <span className="block text-red-500 mt-2">Wedding Moments</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Let us create the wedding of your dreams with our expert planning and
            exquisite attention to detail
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <NavLink 
              to="/signup"
              className="inline-block bg-red-500 text-white text-lg font-medium px-8 py-4 rounded-full
                hover:bg-red-600 transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-red-500/30"
            >
              Begin Your Journey
            </NavLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our <span className="text-red-500">Services</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceCards.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-red-50 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Services />
      <Conact />
      <Contact />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hero-section {
    background-attachment: fixed;
  }

  .bg-img1 {
    background-image: url('your-image-url.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media (max-width: 768px) {
    .bg-img1 {
      background-attachment: scroll;
    }
  }
`;

export default Home;