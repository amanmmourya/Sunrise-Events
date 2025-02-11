import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

function Header() {
  return (
    <Wrapper>
      <div className="navbar">
        {/* <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul> */}
        
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .navbar {
    color: black;
    height: 50px; /* Increased for better visibility */
    width: 100%;
    display: flex;
    align-items: center;

    ul {
      display: flex;
      gap: 20px;
      list-style: none; /* Removes default bullet points */
      padding: 0;
      margin: 0;

      li {
        font-weight: 500;
        font-size: large;

        a {
          text-decoration: none;
          color: black ;/* Better contrast */
          transition: color 0.3s ease-in-out;

          &:hover {
            color: yellow;
          }
        }
      }
    }
  }
`;

export default Header;
