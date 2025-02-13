<<<<<<< HEAD
"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { FaUser, FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  return (
    <NavWrapper>
      <NavContainer>
        <LogoContainer>
          <LogoImage className="logo-sunrise" />
          <BrandName>Sunrise Events</BrandName>
        </LogoContainer>

        <MenuIcon onClick={toggleMenu}>{isOpen ? <FaTimes /> : <FaBars />}</MenuIcon>

        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLink to="/home" activeClassName="active">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/services" activeClassName="active">
              Services
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/gallery" activeClassName="active">
              Gallery
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" activeClassName="active">
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <SignInButton to="/signin">Sign In</SignInButton>
          </NavItem>
          <NavItem>
            <AdminSignInButton to="/admin-signin">Sign in as Admin</AdminSignInButton>
          </NavItem>
          <ProfileContainer>
            <ProfileIcon onClick={toggleProfile}>
              <FaUser />
            </ProfileIcon>
            <ProfileDropdown isOpen={isProfileOpen}>
              <DropdownItem to="/profile">Profile</DropdownItem>
              <DropdownItem to="/settings">Settings</DropdownItem>
              <DropdownItem to="/help">Help</DropdownItem>
              <DropdownItem to="/about">About</DropdownItem>
            </ProfileDropdown>
          </ProfileContainer>
        </NavMenu>
      </NavContainer>
    </NavWrapper>
  )
}

const NavWrapper = styled.nav`
  background-color: #870f0f;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoImage = styled.div`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 1rem;
`

const BrandName = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #870f0f;
    padding: 1rem 0;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`

const NavItem = styled.li`
  margin: 0 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover, &.active {
      color: #e0aa3e;
    }
  }
`

const SignInButton = styled(NavLink)`
  background-color: #e0aa3e;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c99c3a;
    transform: translateY(-2px);
  }
`

const AdminSignInButton = styled(SignInButton)`
  background-color: #1e90ff;

  &:hover {
    background-color: #187bcd;
  }
`

const ProfileContainer = styled.div`
  position: relative;
`

const ProfileIcon = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e0aa3e;
  }
`

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  min-width: 150px;
`

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  color: #333333;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`

export default Navbar

=======
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
          <NavLink to="/signin" className="btn">Sign In</NavLink>
          <NavLink to="/admin-signin" className="btn">Sign in as Admin</NavLink>
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
    width: 3.5vw;
    height: 3.5vw;
    background-image: url('../../img/profile.png');
    background-size: cover;
    background-position: center;
    border: 2px solid white;
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
>>>>>>> 121f08c99798298687265529da08f0639ec30ea0
