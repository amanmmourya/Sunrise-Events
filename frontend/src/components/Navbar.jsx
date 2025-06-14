import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styled from 'styled-components';
import Profile from './Profile';

const Navbar = () => {
  const [toShow, setToShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('myemail') || false;

  const handleProfile = () => {
    setToShow(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <div className="navbar">
        <div className="brand">
          <div className="img-logo" />
          <h2 className="brand-name">Sunrise Events</h2>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/home" className="nav-item">Home</NavLink>
          <NavLink to="/services" className="nav-item">Services</NavLink>
          <NavLink to="/gallery" className="nav-item">Gallery</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
          <NavLink to="/login" className={`btn ${isLoggedIn ? 'hidden' : ''}`}>Log In</NavLink>
          <img
            src="img/profilemy.webp"
            alt="Profile Logo"
            className="profile-image"
            onClick={handleProfile}
          />
          {toShow && <Profile toShow={toShow} settoShow={setToShow} />}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
// .img-logo {
//   background-image: url('../../img/logosr.png');
//   background-size: contain;
//   background-repeat: no-repeat;
//   height: 7vh;
//   width: 7vh;
//   margin: 3vh;
//   border-radius: 50%;
//   box-shadow: 0 4px 10px rgba(0,0,0,0.4);
// }

.profile-image {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #fef2f2;
  object-fit: cover;
  cursor: pointer;
  background-size: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
.profile-image:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 9vh;
  background: linear-gradient(to right, #8B0000, #b91c1c);
  background-image: url('img/toran.avif');
  background-size: contain;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  z-index: 50;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  border-bottom: 3px solid gold;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-name {
  color: #fff5e0;
  font-size: 4vh;
  font-weight: 700;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  font-family: 'Georgia', serif;
  letter-spacing: 1px;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 2vw;
  transition: transform 0.3s;
}
.menu-button:hover {
  transform: scale(1.15);
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  margin: 0 1vw;
  font-size: 2.2vh;
  font-weight: 600;
  transition: color 0.3s ease, transform 0.3s;
}
.nav-item:hover {
  color: gold;
  transform: scale(1.05);
  text-shadow: 0 0 10px gold;
}

.btn {
  color: white;
  background-color: #dc2626;
  font-weight: 600;
  padding: 0.5vh 1.5vw;
  margin: 0 0.5vw;
  border: 2px solid #fff0f0;
  border-radius: 2vh;
  text-align: center;
  text-decoration: none;
  font-size: 2vh;
  transition: transform 0.3s, background 0.3s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
.btn:hover {
  transform: scale(1.07);
  background-color: #f87171;
}

@media (max-width: 768px) {
  .menu-button {
    display: block;
    margin-left: auto;
  }
  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 9vh;
    left: 0;
    width: 100%;
    background: linear-gradient(to right, #8B0000, #b91c1c);
    background-image: url('https://img.freepik.com/premium-photo/beautiful-decorative-toran-doorway-hanging-background-diwali-indian-background-concept_1279562-7659.jpg');
    background-size: cover;
    background-position: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    display: none;
    padding-bottom: 2vh;
  }
  .nav-links.open {
    display: flex;
  }
  .nav-item, .btn {
    margin: 1vh 0;
  }
}
`;

export default Navbar;
