import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Profile from './Profile';

const Navbar = () => {
  const [toShow, setToShow] = useState(false);

  const handleProfile = () => {
    setToShow(!toShow);
  };

  return (
    <Wrapper>
      <div className="navbar">
        <div className="brand">
          <div className="img-logo"></div>
          <h2 className="brand-name">Sunrise Events</h2>
        </div>

        <div className="nav-links">
          <NavLink to="/home" className="nav-item">Home</NavLink>
          <NavLink to="/services" className="nav-item">Services</NavLink>
          <NavLink to="/gallery" className="nav-item">Gallery</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
          <NavLink to="/login" className="btn">Log In</NavLink>

          {/* Profile Icon */}
          <div className="profile-container">
            <div className="profile" onClick={handleProfile}></div>
            {toShow && <Profile toShow={toShow} settoShow={setToShow} />}
          </div>
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
    height: 10vh;
    background: linear-gradient(90deg, #870f0f, #b22222);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3vw;
    z-index: 20;
<<<<<<< HEAD
  }


  .brand-name {
    color: #fff;
    font-size: 2.5vh;
    font-weight: bold;
  }

=======
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .brand {
    display: flex;
    align-items: center;
  }

  .img-logo {
    background-image: url('../../img/logosr.png');
    background-size: contain;
    background-repeat: no-repeat;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .brand-name {
    color: #fff;
    font-size: 2.2vh;
    font-weight: bold;
  }
>>>>>>> ca40581c7a58c5a35cd07d3f4330185dbb84fdc9

  .nav-links {
    display: flex;
    align-items: center;
  }

<<<<<<< HEAD

=======
>>>>>>> ca40581c7a58c5a35cd07d3f4330185dbb84fdc9
  .nav-item {
    color: white;
    text-decoration: none;
    margin: 0 1vw;
    font-size: 2vh;
<<<<<<< HEAD
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

=======
    font-weight: 500;
    transition: color 0.3s;
>>>>>>> ca40581c7a58c5a35cd07d3f4330185dbb84fdc9

    &:hover {
      color: #ffcc00;
    }
  }

  .btn {
    background: #ff3b3b;
    color: white;
    padding: 0.6vh 1.5vw;
    border-radius: 2vh;
    font-size: 2vh;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
      background: #e60000;
      transform: scale(1.05);
    }
  }

  /* Profile Styling */
  .profile-container {
    position: relative;
    margin-left: 1.5vw;
  }

  .profile {
    width: 45px;
    height: 45px;
    background-image: url('../../img/prf.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 2px solid transparent;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);

    &:hover {
      transform: scale(1.1);
      border-color: #ffcc00;
      box-shadow: 0px 4px 15px rgba(255, 204, 0, 0.5);
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .navbar {
      flex-direction: column;
      height: auto;
      padding: 1.5vh 2vw;
    }

    .nav-links {
      flex-direction: column;
      margin-top: 1vh;
    }

    .nav-item,
    .btn {
      margin: 1vh 0;
    }

    .profile {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 600px) {
    .brand-name {
      font-size: 1.8vh;
    }

    .nav-item,
    .btn {
      font-size: 1.6vh;
    }

    .profile {
      width: 40px;
      height: 40px;
    }
  }
`;

export default Navbar;
