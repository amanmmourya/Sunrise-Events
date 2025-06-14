import React, { useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../GlobalStyle";
import { NavLink } from "react-router-dom";
import { Button } from "../components/Button";
import FlowerRain from "../components/FlowerRain";
import TiltCard from "../components/TiltCard";
import { motion } from "framer-motion"; // Import animation library
import '../style/services.css'
import { useGlobalContext } from "../Context";
import { useState } from "react";
import axios from "axios";


function Services() {
  const [servicesFromServer, setServicesFromServer] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.BACKEND_URL}/services`, {
          withCredentials: true
        });
        console.log("Response from server:", response);
        const services = response.data.data;
        setServicesFromServer(services);
        console.log("Fetched services:", services);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchServices();
  }, []);

 
  return (
    <>
    <GlobalStyle/>
    <FlowerRain/>
    <Wrapper>
      <div className="service-class">
      <h2 className="common-heading">Our Premium Services</h2>
      <div className="container grid grid-three-column">
        {servicesFromServer.map((curElem) => {
          const { id, name, description, imageUrl, price } = curElem;
          return (
             <motion.div
              className="card"
              key={id}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            >
              <figure>
                <img src={imageUrl} alt={name} />
              </figure>
              <div className="card-data">
                <h3>{name}</h3>
                <p>{description}</p>
                <NavLink to="/appointment" state={{service:{id,name,price}}}>
                  <Button className="btn">Know More</Button>
                </NavLink>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  padding: 6rem 0;
  /* background: linear-gradient(to bottom right, #fff5f8, #ff76cf); */
  text-align: center;

  .container {
    max-width: 120rem;
  }
  // flower rain animation 
  .flower-container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;

  }
 
  .flower{
    position: absolute;
    width: 30px;
    height: 30px;
    background-image: url("https://media.istockphoto.com/id/1370630918/photo/purple-magnolia-flower-magnolia-felix-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=N4_DMM4CdVK-t5NmD31D6vxhcfSpeDGyJV08y_KmdbM=");
    background-size:cover;
    opacity: 0.8;
    animation: fall 10s linear infinite;
  }

  @keyframes fall {
    0%{
        transform: translateY(-10vh) rotate(0deg);
    }
    100%{
        transform: translateY(100vh) rotate(360deg);
    }
  }

  .card {
    /* border-radius: 15px; */
    overflow: hidden;
    background: white;
    padding: 1rem;
    transition: 0.3s;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  }

  .card-data {
    padding: 1rem 2rem;
  }

  .price-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #870f0f;
    color: white;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 2.2rem;
    color: #333;
    font-weight: 500;
  }

  .btn {
    
    border: 1px solid #a0001b;
    background-color: white;
    color: #a0001b;
    font-size: 1.4rem;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
    margin: 2rem;

    &:hover {
        /* background: linear-gradient(135deg, #d607b0, #6e0732); */
        background-color: #870f0f;
        color: #ffffff;
      box-shadow: 0px 4px 10px rgba(255, 95, 162, 0.5);
    }
  }

  figure {
    position: relative;
    width: 100%;
    overflow: hidden;
    /* border-radius: 12px; */
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      /* background-color: rgba(190, 24, 24, 0.2); */
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
  }

  figure img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
  }

  figure:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .grid-three-column {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 500px) {
    .grid-three-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Services;
