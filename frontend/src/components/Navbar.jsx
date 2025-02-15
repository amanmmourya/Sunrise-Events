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
    <NavWrapper scrolled={scrolled}>
      <NavContainer>
        <LogoContainer>
          <BrandName>Sunrise Events</BrandName>
        </LogoContainer>

        <MobileMenuIcon onClick={toggleMenu}>{isOpen ? <FaTimes /> : <FaBars />}</MobileMenuIcon>

        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLink to="/home" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/services" onClick={() => setIsOpen(false)}>
              Services
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/gallery" onClick={() => setIsOpen(false)}>
              Gallery
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <StyledButton to="/signin" onClick={() => setIsOpen(false)}>
              Sign In
            </StyledButton>
          </NavItem>
          <NavItem>
            <StyledButton to="/admin-signin" onClick={() => setIsOpen(false)} admin>
              Sign in as Admin
            </StyledButton>
          </NavItem>
          <ProfileContainer>
            <ProfileIcon onClick={toggleProfile}>
              <FaUser />
            </ProfileIcon>
            {showProfile && <Profile setShowProfile={setShowProfile} />}
          </ProfileContainer>
        </NavMenu>
      </NavContainer>
    </NavWrapper>
  )
}

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => (props.scrolled ? "#870f0f" : "transparent")};
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: ${(props) => (props.scrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none")};
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
    background-color: ${(props) => (props.admin ? "#187bcd" : "#c99c3a")};
    transform: translateY(-2px);
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
  margin-left: 1rem;

  &:hover {
    color: #e0aa3e;
  }
`

export default Navbar

