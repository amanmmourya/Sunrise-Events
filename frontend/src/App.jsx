import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import Services from './pages/Services';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Gallery from './pages/gallery';
<<<<<<< HEAD
import Login from './pages/login';
import Signup from './pages/SignUp';

=======
import Footer from './components/Footer';
import Contact from './components/Contact';
import  MyMap from './components/Map'
import Service from './pages/service';
import { AppProvider } from './Context'; // ✅ Import AppProvider
import Appointment from './components/Appointment';
>>>>>>> 5f2f04a1773adca5b3a3fb2c5a2b9c384cd5286b

function App() {
  const theme = {
    colors: {
      heading: "rgb(50 50 50)",
      text: "rgb(24 24 24)",
      white: "#fff",
      black: "#1f2832",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98,84,143,0.5)",
      hr: "#000",
      gradient: "linear-gradient(0deg,rgb(132 144 255) 0%,rgb(98 189 252) 100%)",
      shadow: "rgba(0,0,0,0.02) 0px 1px 3px 0px , rgba(27,31,35,0.15) 0px 0px 0px 1px",
      shadowSupport: "rgba(0,0,0,0.16) opx 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px"
    }
  };

  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      {/* <GlobalStyle/> */}
      <BrowserRouter>
        <Navbar/>
        <div className='global-wrapper'>
        {/* <GlobalStyle/> */}
        <Routes>
          <Route path="/" element={<><Home/></>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/service" element={<Service />} />
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </div>
      </BrowserRouter>
=======
             
    
      <AppProvider>
        <BrowserRouter>
          <div className='global-wrapper'>
          <Navbar/>
            <Routes>
            
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service" element={<Service />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<><Contact/><MyMap/></>}/>

            </Routes>
            <Footer/>
          </div>
        </BrowserRouter>
      </AppProvider>
>>>>>>> 5f2f04a1773adca5b3a3fb2c5a2b9c384cd5286b
    </ThemeProvider>
  );
}

export default App;
