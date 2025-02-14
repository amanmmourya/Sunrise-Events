import React, { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import Agent from '../components/Agent';
import Testimonials from '../components/Testimonial';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // High-quality wedding-themed images
  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
      title: "Elegant Celebrations",
    },
    {
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Magical Moments",
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070",
      title: "Perfect Details",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
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
  const [showAgent, setshowAgent] = useState(false);
  const handleAgent=()=>{
    setshowAgent(true)

  }

  return (
    <Wrapper>
      <div className="fixed bottom-4 text-6xl right-4 w-[5vw] h-[5vw] bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-blue-600" onClick={handleAgent}>
        💬
      </div>
      <div>
        {showAgent?(<Agent showAgent={showAgent} setshowAgent={setshowAgent}/>):<div></div>}
      </div>

      {/* Hero Section with Slider */}
      <div className="hero-slider">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={(currentSlide + 1) % sliderImages.length}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="slide"
            style={{
              backgroundImage: `url(${sliderImages[currentSlide].url})`,
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="slide-overlay">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="slide-content"
              >
                <h1 className="main-title ">Create Unforgettable</h1>
                <h2 className="accent-title">Wedding Moments</h2>
                <p className="hero-description">
                  Let us create the wedding of your dreams with our expert planning and
                  exquisite attention to detail
                </p>
                <NavLink to="/login" className="cta-button">
                  Begin Your Journey
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <div className="slider-nav">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container"
        >
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="text-red-500">Services</span>
            </h2>
            <div className="title-underline"></div>
          </div>

          <div className="services-grid">
            {serviceCards.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="service-card"
              >
                <div className="icon-wrapper">
                  {service.icon}
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Services />
      <Testimonials/>
      <Conact />
      <Contact />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hero-slider {
    position: relative;
    height: 70vh;
    overflow: hidden;
    background-color: #000;
    
  }

  .slide {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  .slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .slide-content {
    max-width: 800px;
    text-align: center;
    color: white;
  }

  .main-title {
    color:white;
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .accent-title {
    font-size: 3.5rem;
    font-weight: bold;
    color: #DC2626;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .hero-description {
    color:white;
    font-size: 1.25rem;
    margin-bottom: 2rem;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .cta-button {
    display: inline-block;
    background: #DC2626;
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 1.125rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);

    &:hover {
      background: #B91C1C;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(220, 38, 38, 0.3);
    }
  }

  .slider-nav {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1rem;
    z-index: 10;
  }

  .nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: white;
      transform: scale(1.2);
    }
  }

  .services-section {
    padding: 5rem 2rem;
    background: linear-gradient(to bottom, #fff, #f8f8f8);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  .title-underline {
    width: 60px;
    height: 3px;
    background: #DC2626;
    margin: 0 auto;
    border-radius: 2px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .service-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
  }

  .icon-wrapper {
    background: #FEF2F2;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  .card-description {
    color: #666;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }

    .service-card {
      padding: 1.5rem;
    }
  }
`;

export default Home;