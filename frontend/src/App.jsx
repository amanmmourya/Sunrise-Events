import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import Header from './components/Header';
import Services from './pages/Services';
import Home from './pages/Home';
import Service from './pages/Service';
import Footer from './components/Footer';
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

  return (  // Fixed the typo here
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service" element={<Service />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
