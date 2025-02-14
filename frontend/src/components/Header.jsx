import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import styled from 'styled-components'

function Header() {
  return (
   <>
   <MainHeader>
   <NavLink to="/">
    <h3 className='logo'>SALON EASE</h3>
   </NavLink>
   <Navbar/>
   </MainHeader>
   </>
  )
}
const MainHeader = styled.header`
padding: 0 4.8rem;
height: 10rem;
display: flex;
background-color: #855c5c ;
justify-content: space-between;
align-items: center;
gap: 5rem;







    
`

export default Header
