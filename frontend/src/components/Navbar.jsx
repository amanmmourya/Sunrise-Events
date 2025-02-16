import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styled from 'styled-components';
import Profile from './Profile';

const Navbar = () => {
  const [toShow, setToShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfile = () => {
    setToShow(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <div className="navbar">
        <div className="brand flex justify-center items-center">
          <div className='img-logo h-12 w-12 rounded-full m-2'></div>
          <h2 className="brand-name ">Sunrise Events</h2>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/home" className="nav-item">Home</NavLink>
          <NavLink to="/services" className="nav-item">Services</NavLink>
          <NavLink to="/gallery" className="nav-item">Gallery</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
          <NavLink to="/login" className="btn">Log In</NavLink>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
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
.img-logo{
  background-image:url('../../img/logosr.png');
  background-size:contain;
  margin-right:20px;
  height:7vh;
  width:7vh;
  margin:3vh;
}
.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  padding: 10px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.profile-image:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height:9vh;
  background-color: #c62828;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  z-index: 20;
}
.brand {
  display: flex;
  align-items: center;
}
.brand-name {
  color: #fff;
  font-size: 4vh;
  font-weight: bold;
}
.menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 2vw;
}
.nav-links {
  display: flex;
  align-items: center;
}
.nav-item {
  color: white;
  text-decoration: none;
  margin: 0 1vw;
  font-size: 2vh;
  transition: color 0.3s;
}
.nav-item:hover {
  color: #f0b642;
}
.btn {
  background-color: #f31919;
  color: white;
  font-weight:500;
  padding: 0.5vh 1.5vw;
  margin: 0 0.5vw;
  border-radius: 1vh;
  text-align: center;
  text-decoration: none;
  font-size: 2vh;
  transition: transform 0.3s;
}
.btn:hover {
  transform: scale(1.05);
}
@media (max-width: 768px) {
  
  .menu-button {
    display: block;
    margin-left: auto;
  }
  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 8vh;
    left: 0;
    width: 100%;
    background-color: #c62828;
    display: none;
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
