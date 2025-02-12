import React from 'react'
// import '../style/navbar.css'
import '../output.css'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <Wrapper>
    <div className='mynav fixed z-20 h-40 sm:h-60 lg:h-[8vh] w-full bg-[#870f0f]  lg:flex lg:justify-center lg:items-center xl:space-x-[35vw] lg:space-x-[20vw] sm:space-x-0 '>
        <div className='flex justify-center items-center space-x-3'>
            {/* <div className='logo-sunrise h-10 w-10'></div> */}
            <h2 className='brand-name text-blue-50 font-bold lg:text-4xl sm:text-2xl'>Sunrise Events</h2>
        </div>
        <div className='lg:flex lg:justify-center lg:items-center'>
            <NavLink to={'/home'} className='navbar-items  text-white text-lg lg:text-xl mx-3 cursor-pointer hover:text-[#e0aa3e]'>Home</NavLink>
            <NavLink to={'/services'} className='navbar-items  text-white text-lg lg:text-xl mx-3 cursor-pointer hover:text-[#e0aa3e]'>Services</NavLink>
            <NavLink to={'/gallery'} className='navbar-items  text-white text-lg lg:text-xl mx-3 cursor-pointer hover:text-[#e0aa3e]'>Gallery</NavLink>
            <NavLink to={'/contact'} className='navbar-items  text-white text-lg lg:text-xl mx-3 cursor-pointer hover:text-[#e0aa3e]'>Contact</NavLink>
            <NavLink to={'/book'} className='book-btn bg-red-500 text-center mt-2 lg:mt-0 w-28 ml-2 lg:p-2 lg:px-4 lg:w-36 sm:w-28 sm:px-2 sm:p-1 rounded-2xl lg:text-xl lg:font-medium sm:text-sm sm:font-medium  text-white'>Book Now</NavLink>
        </div>

    </div>
    </Wrapper>
  )
}
const Wrapper=styled.section`
.brand-name{
font-size:5vh;
}
.navbar-items{
font-size:2vh}
.book-btn{
font-size:2vh;
width:auto
}
`

export default Navbar