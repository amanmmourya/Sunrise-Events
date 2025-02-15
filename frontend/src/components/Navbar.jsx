"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { FaBars, FaTimes, FaUser } from "react-icons/fa"
import Profile from "./Profile"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleProfile = () => setShowProfile(!showProfile)

  return (
    <Wrapper>
      <div className="navbar">
        
        <div className="brand flex justify-center items-center">
          <div className='img-logo h-16 w-16 rounded-full'></div>
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
.img-logo{
background-image:url('../../img/logosr.png');
background-size:contain;
margin-right:4px;
}
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
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const BrandName = styled.h1`
  font-size: 1.8rem;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const MobileMenuIcon = styled.div`
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const StyledButton = styled(NavLink)`
  background-color: ${(props) => (props.admin ? "#1e90ff" : "#e0aa3e")};
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

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
    color: #e0aa3e;
  }
`

export default Navbar

