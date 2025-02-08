import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>

      <h1>Hello Home this side</h1>
      <NavLink to="/services">Go to Services</NavLink>

    </div>
  )
}

export default Home
