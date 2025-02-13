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

<<<<<<< HEAD
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
=======
// const Home = () => {
//   return (
//     <div>

//       <h1>Hello Home this side</h1>
//       <NavLink to="/services">Go to Services</NavLink>

//     </div>
//   )
// }

// export default Home
import React from 'react'
import styled from 'styled-components'
import '../index.css'
import '../style/home.css'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import Appointment from '../components/Appointment'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Agent from '../components/Agent'
import { Flower2, Landmark, Music, Sun, Package, Armchair } from 'lucide-react'
const Home = () => {
  const [showAgent, setshowAgent] = useState(false)
  const handleAgent=()=>{
    setshowAgent(true);
  }
  return (
    <Wrapper>
      <div>
      {showAgent?(<Agent/>):<div></div>}
        {/* navbar */}
        {/* hero section */}
        <>
        
        <div className='agent-button rounded-full sticky h-[10vh] w-[10vh] hover:scale-105 cursor-pointer' onClick={handleAgent}></div>

          <div className="bg-img1 h-[100vh] w-full relative flex flex-col justify-center items-center">

            <div className="text-items absolute">
              <div className="create relative text-white text-6xl font-bold z-10 text-center">Create Unforgettable</div>
              <div className="wedding relative text-red-500 text-6xl font-bold z-10 ml-3 text-center">Wedding Moments</div>
              <div className="perfect relative text-white text-2xl z-10 ml-3 mt-3 text-center">Let us create the wedding of your dreams with our expert planning and</div>
              <div className="perfect relative text-white text-2xl z-10 ml-3 text-center">exquisite attention to detail</div>
              <div className='btn-c'>
                <NavLink to={'/signup'} className='signup-btn relative z-10 bg-red-500 text-center mt-2 lg:mt-0 w-28 ml-2 lg:p-2 lg:px-4 lg:w-36 sm:w-28 sm:px-2 sm:p-1 rounded-full lg:text-xl lg:font-medium sm:text-sm sm:font-medium  text-white hover:scale-105 hover:bg-red-700 hover:shadow-xl transition-all duration-300 ease-in-out'><div className='nav-text'>Sign Up and Be a Part of Our Family</div></NavLink>

              </div>
>>>>>>> 121f08c99798298687265529da08f0639ec30ea0

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
<<<<<<< HEAD

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
=======
          {/* services */}
          <>
            <div className='our-services text-center text-4xl font-medium text-[#DC2626] mt-5 '>Our Services</div>
            <div className='for-center'>
              <div className="container">
                <div className="trio1 flex justify-center items-center space-x-7 m-5">
                  <div className="inner-divs wedding-decoration hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                    <Flower2 className="text-[#DC2626]" size={60} />
                    <div className='text-2xl text-[#DC2626] font-medium'>Wedding Decoration</div>
                    <div className="msg-text text-center text-[#4B5563]">Transform your special day with breathtaking decor!</div>
                  </div>
                  <div className="inner-divs reception-setup hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                    <Landmark className="text-[#DC2626] " size={60} />
                    <div className='text-2xl text-[#DC2626] font-medium'>Reception Setup</div>
                    <div className="msg-text text-center text-[#4B5563]">Elegant setups for a grand wedding reception!</div>
                  </div>
                  <div className="inner-divs sangeet-decoration hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                    <Music className="text-[#DC2626] " size={60} />
                    <div className='text-2xl text-[#DC2626] font-medium'>Sangeet Decoration</div>
                    <div className="msg-text text-center text-[#4B5563]">Dance, music, and dazzling décor for a magical night!</div>
                  </div>
                </div>
                <div className="trio2 flex justify-center items-center space-x-7 m-5">
                  <div className="inner-divs haldi hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                    <Sun className="text-[#DC2626] " size={60} />
                    <div className='text-2xl text-[#DC2626] font-medium'>Haldi Decoration</div>
                    <div className="msg-text text-center text-[#4B5563]">Bright & beautiful Haldi décor for a joyful celebration!</div>
                  </div>
                  <div className="inner-divs rental hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                    <Package className="text-[#DC2626] " size={60} />
                    <div className='text-2xl text-[#DC2626] font-medium'>Rental Furnitures</div>
                    <div className="msg-text text-center text-[#4B5563]">Hassle-free rentals for a stress-free wedding!</div>
                  </div>
                  <div className="inner-divs sitting-arrangement hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                    <Armchair className="text-[#DC2626] " size={60} />
                    <div className='text-2xl text-[#DC2626] font-medium'>Sitting Arrangement</div>
                    <div className="msg-text text-center text-[#4B5563]">Luxury seating for a comfortable wedding experience!</div>

                  </div>
                </div>
              </div>
            </div>
          </>
>>>>>>> 121f08c99798298687265529da08f0639ec30ea0

      <Services />
      <Conact />
      <Contact />
    </Wrapper>
  );
};

const Wrapper = styled.section`
<<<<<<< HEAD
  .hero-section {
    background-attachment: fixed;
  }
=======
.agent-button{
z-index:20;
position:absolute;
bottom:1vh;
right:2vh;
background-image:url('../../img/chat.webp');
background-size:contain;

}
.nav-text{
font-size:x-large;
}
.signup-btn{
padding:1% 5% 1% 5%;
width:100%;
font-size:3xl;
border-radius:20px;
>>>>>>> 121f08c99798298687265529da08f0639ec30ea0

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