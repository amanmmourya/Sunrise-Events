import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import Services from './pages/Services';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Gallery from './pages/gallery';
import Login from './pages/login';
import Signup from './pages/SignUp';
import AdminLogin from './pages/AdminLogin';
import Footer from './components/Footer';
import Contact from './components/Contact';
import  MyMap from './components/Map'
import Service from './pages/service';
import { AppProvider } from './Context'; // ✅ Import AppProvider
import Appointment from './components/Appointment';
import Admin from './pages/Admin';

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
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/adminlogin" element={<AdminLogin/>}/>
              <Route path="/admin" element={<Admin/>} />
            </Routes>
            <Footer/>
          </div>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
