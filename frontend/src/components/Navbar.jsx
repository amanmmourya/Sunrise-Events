import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Profile from './Profile';

const Navbar = () => {
  const [toShow, setToShow] = useState(false);

  const handleProfile = () => {
    setToShow(true);
  };

  return (
    <Wrapper>
      <div className="navbar">
        <div className="brand">
          <h2 className="brand-name">Sunrise Events</h2>
        </div>

        <div className="nav-links">
          <NavLink to="/home" className="nav-item">Home</NavLink>
          <NavLink to="/services" className="nav-item">Services</NavLink>
          <NavLink to="/gallery" className="nav-item">Gallery</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
          <NavLink to="/login" className="btn">Log In</NavLink>
          <NavLink to="/adminlogin" className="btn">Sign in as Admin</NavLink>
          <div className="profile" onClick={handleProfile}></div>
          {toShow && <Profile toShow={toShow} settoShow={setToShow} />}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 8vh;
    background-color: #870f0f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    z-index: 20;
  }

  .brand-name {
    color: #fff;
    font-size: 2.5vh;
    font-weight: bold;
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

    &:hover {
      color: #e0aa3e;
    }
  }

  .btn {
    background-color: red;
    color: white;
    padding: 0.5vh 1.5vw;
    margin: 0 0.5vw;
    border-radius: 1vh;
    text-align: center;
    text-decoration: none;
    font-size: 2vh;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .profile {
    width: 3vw;
    height: 3vw;
    background-image: url('../../img/prf.jpg');
    background-size: cover;
    background-position: center;
    // border: 2px solid black;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 1vw;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 1024px) {
    .navbar {
      flex-direction: column;
      height: auto;
      padding: 1vh 2vw;
      position:static;
    }

    .nav-links {
      flex-direction: column;
      margin-top: 1vh;
    }

    .nav-item, .btn {
      margin: 1vh 0;
    }

    .profile {
      width: 6vw;
      height: 6vw;
    }
  }

  @media (max-width: 600px) {
    .brand-name {
      font-size: 2vh;
    }

    .nav-item, .btn {
      font-size: 1.5vh;
    }

    .profile {
      width: 8vw;
      height: 8vw;
    }
  }
`;

export default Navbar;
