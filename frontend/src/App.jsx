import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import Services from './pages/Services';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Gallery from './pages/gallery';
import Footer from './components/Footer';
import Contact from './components/Contact';
import  MyMap from './components/Map'
import Service from './pages/service';
import { AppProvider } from './Context'; // ✅ Import AppProvider
import Appointment from './components/Appointment';
import NewDash from './components/NewDash';
import Error from './pages/Error';
import Gototop from './components/Gototop';
import Confirmation from './pages/Confirmation';
import Appointments from './components/Appointments';
import Reports from './components/Reports';
import AdminBox from './components/AdminBox';
import Menubox from './components/Menubox';
import SettingPage from './pages/SettingPage';
import PrivateRoute from './components/PrivateRoute';
import ServicesUpdate from './pages/ServicesUpdate';
import Help from './pages/Help';
import Header from './components/Header';


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
            <Route path="/admin" element={<NewDash />} />

              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service" element={<Service />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<><Contact/><MyMap/></>}/>
              <Route path="/admin/appointments" element={<Appointments />} />
              <Route path="/admin/services-update" element={<ServicesUpdate />} />
              <Route path="/view-analytics" element={<Reports />} />
              <Route path="/admin/settings" element={<SettingPage />} />
              <Route path="/adminbox" element={<AdminBox />} />
              <Route path="/menubox" element={<Menubox />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Error />} />




              

            </Routes>
            <Footer/>
          </div>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
