// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const Home = () => {
//   return (
//     <div>

//       <h1>Hello Home this side</h1>
//       <NavLink to="/services">Go to Services</NavLink>

//     </div>
//   )
// }

// export default Home
import React from 'react'
import styled from 'styled-components'
import '../index.css'
import '../style/home.css'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import Appointment from '../components/Appointment'
import { NavLink } from 'react-router-dom'
import { Flower2, Landmark, Music, Sun, Package, Armchair } from 'lucide-react'
const Home = () => {
  return (
    <Wrapper>
      <div>
        {/* navbar */}
        {/* hero section */}
        <>
          <div className="bg-img1 h-[100vh] w-full relative flex flex-col justify-center items-center">
            <div className="text-items absolute">
              <div className="create relative text-white text-6xl font-bold z-10 text-center">Create Unforgettable</div>
              <div className="wedding relative text-red-500 text-6xl font-bold z-10 ml-3 text-center">Wedding Moments</div>
              <div className="perfect relative text-white text-2xl z-10 ml-3 mt-3 text-center">Let us create the wedding of your dreams with our expert planning and</div>
              <div className="perfect relative text-white text-2xl z-10 ml-3 text-center">exquisite attention to detail</div>
              <div className='btn-c'>
              <NavLink to={'/signup'} className='signup-btn relative z-10 bg-red-500 text-center mt-2 lg:mt-0 w-28 ml-2 lg:p-2 lg:px-4 lg:w-36 sm:w-28 sm:px-2 sm:p-1 rounded-full lg:text-xl lg:font-medium sm:text-sm sm:font-medium  text-white hover:scale-105 hover:bg-red-700 hover:shadow-xl transition-all duration-300 ease-in-out'><div className='nav-text'>Sign Up and Be a Part of Our Family</div></NavLink>
  
              </div>              

            </div>
            <div class="absolute inset-0 bg-black opacity-50 z-0"></div>
          </div>
          {/* services */}
          <>
            <div className='our-services text-center text-4xl font-medium text-[#DC2626] mt-5 '>Our Services</div>
            <div className='for-center'>
            <div className="container">
              <div className="trio1 flex justify-center items-center space-x-7 m-5">
                <div className="inner-divs wedding-decoration hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                  <Flower2 className="text-[#DC2626]" size={60} />
                  <div className='text-2xl text-[#DC2626] font-medium'>Wedding Decoration</div>
                  <div className="msg-text text-center text-[#4B5563]">Transform your special day with breathtaking decor!</div>
                </div>
                <div className="inner-divs reception-setup hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                  <Landmark className="text-[#DC2626] " size={60} />
                  <div className='text-2xl text-[#DC2626] font-medium'>Reception Setup</div>
                  <div className="msg-text text-center text-[#4B5563]">Elegant setups for a grand wedding reception!</div>
                </div>
                <div className="inner-divs sangeet-decoration hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                  <Music className="text-[#DC2626] " size={60} />
                  <div className='text-2xl text-[#DC2626] font-medium'>Sangeet Decoration</div>
                  <div className="msg-text text-center text-[#4B5563]">Dance, music, and dazzling décor for a magical night!</div>
                </div>
              </div>
              <div className="trio2 flex justify-center items-center space-x-7 m-5">
                <div className="inner-divs haldi hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                  <Sun className="text-[#DC2626] " size={60} />
                  <div className='text-2xl text-[#DC2626] font-medium'>Haldi Decoration</div>
                  <div className="msg-text text-center text-[#4B5563]">Bright & beautiful Haldi décor for a joyful celebration!</div>
                </div>
                <div className="inner-divs rental hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                  <Package className="text-[#DC2626] " size={60} />
                  <div className='text-2xl text-[#DC2626] font-medium'>Rental Furnitures</div>
                  <div className="msg-text text-center text-[#4B5563]">Hassle-free rentals for a stress-free wedding!</div>
                </div>
                <div className="inner-divs sitting-arrangement hover:scale-105 hover:shadow-lg rounded-2xl space-y-3 w-72 h-72 flex flex-col justify-center items-center">
                  <Armchair className="text-[#DC2626] " size={60} />
                  <div className='text-2xl text-[#DC2626] font-medium'>Sitting Arrangement</div>
                  <div className="msg-text text-center text-[#4B5563]">Luxury seating for a comfortable wedding experience!</div>

                </div>
              </div>
              </div>
            </div>
          </>


        </>
        <Contact />

      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
.nav-text{
font-size:x-large;
}
.signup-btn{
padding:1% 5% 1% 5%;
width:100%;
font-size:3xl;
border-radius:20px;

}
.btn-c{
padding:5%;
display:flex;
justify-content:center;
align-items:center;
}
.create{
font-size:7vh
}
.our-services{
margin-top:5vh;
font-size:6vh
}
.container{
padding:5%;
}
.for-center{
display:flex;
justify-content:center;
align-items:center;
}
.text-2xl{
font-size:3vh
}
.inner-divs{
width:40vh
}
.msg-text{
font-size:2vh;
padding:2vh
}
`

export default Home
