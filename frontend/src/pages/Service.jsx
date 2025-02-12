import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GlobalStyle } from "../GlobalStyle";
import Header from "../components/Header";
import { Button } from "../components/Button";
import Appointment from "../components/Appointment";

const Service = () => {
  const packages = [
    {
      name: "Basic",
      price: "₹7,000",
      features: {
        "Venue Decoration": "Standard Floral & Fabric",
        "Stage Design": "Simple Backdrop",
        Lighting: "Standard Lights",
        "Seating Arrangement": "Normal Chairs & Tables",
        "Floral Arrangements": "Standard Flowers",
        Centerpieces: "Basic",
        "Entry Setup": "Basic Entry Gate",
        "Mandap (for weddings)": "Simple Mandap",
        "Photography & Videography": "No",
        "Sound & DJ": "No",
        Fireworks: "No",
        Catering: "No",
      },
    },
    {
      name: "Premium",
      price: "₹15,000",
      features: {
        "Venue Decoration": "Themed Decoration",
        "Stage Design": "Custom Stage Design",
        Lighting: "LED & Fairy Lights",
        "Seating Arrangement": "Decorated Seating",
        "Floral Arrangements": "Premium Flowers",
        Centerpieces: "Customized",
        "Entry Setup": "Themed Entry",
        "Mandap (for weddings)": "Themed Mandap",
        "Photography & Videography": "HD Photography",
        "Sound & DJ": "Basic DJ",
        Fireworks: "Yes",
        Catering: "Standard Buffet",
      },
    },
    {
      name: "Luxury",
      price: "₹25,000",
      features: {
        "Venue Decoration": "Customized 3D Decor & Luxury Elements",
        "Stage Design": "Grand Stage with LED, Floral & Unique Props",
        Lighting: "Intelligent Lighting & Special Effects",
        "Seating Arrangement": "VIP Lounge & Premium Seating",
        "Floral Arrangements": "Exotic & Imported Flowers",
        Centerpieces: "Luxury",
        "Entry Setup": "Royal Entry with Fireworks/Effects",
        "Mandap (for weddings)": "Grand Mandap with Designer Props",
        "Photography & Videography": "4K Cinematic Videography",
        "Sound & DJ": "Professional DJ & Live Band",
        Fireworks: "Luxury Fireworks",
        Catering: "Customized Multi-Cuisine Menu",
      },
    },
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.package-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <HeroSection>
          <div className="blackdiv">
            <h2>
              <span className="writeup">Wedding Stage Decor Setup</span>
              <span className="subhead">SunRise</span>
            </h2>
          </div>
        </HeroSection>

        <PackagesContainer>
          {packages.map((pkg, index) => (
            <div key={index} className="package-card">
              <div className="text">
                <h3>{pkg.name}</h3>
              </div>
              <div className="card-content">
                <div className="leftside">
                  <div className="top">
                    <span>
                      <h3>SunRise {pkg.name} Package</h3>
                    </span>
                  </div>
                  <div className="features-list">
                    {Object.entries(pkg.features).map(([feature, value]) => (
                      <li key={feature} className="features">
                        <span className="checkmark">✓</span>
                        <span className="feature-text">
                          <strong>{feature}:</strong> {value}
                        </span>
                      </li>
                    ))}
                  </div>
                </div>

                <div className="rightside">
                  <div className="rupees">
                    <span className="price-tag">
                      <span className="price-val">{pkg.price}</span>
                    </span>
                  </div>
                  <button className="addbtn">
                    <span className="btn">Add</span>
                    <span className="plusdiv">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </PackagesContainer>
        <Appointment />
      </Wrapper>
    </>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.div`
  height: 50vh;
  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3");
  background-size: cover;
  background-position: center;
  position: relative;

  .blackdiv {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 3rem;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.8)
    );

    h2 {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .writeup {
        font-size: 3rem;
        color: white;
        font-weight: 300;
      }

      .subhead {
        font-size: 4rem;
        font-weight: 700;
        color: #e0aa3e;
        text-shadow: 0 0 10px rgba(224, 170, 62, 0.5);
      }
    }
  }
`;

const PackagesContainer = styled.div`
  padding: 4rem 2rem;
  background: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  .package-card {
    animation: ${fadeInUp} 0.6s ease forwards;
    opacity: 0;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(160, 0, 27, 0.15);
    }

    .text {
      background: #a0001b;
      padding: 1rem;
      text-align: center;

      h3 {
        color: white;
        font-size: 1.5rem;
        margin: 0;
      }
    }

    .card-content {
      display: flex;
      padding: 1.5rem;
      background: white;
    }

    .leftside {
      flex: 1;

      .top {
        margin-bottom: 1.5rem;

        h3 {
          color: #a0001b;
          font-size: 1.2rem;
          margin: 0;
        }
      }

      .features-list {
        .features {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          color: #333;

          .checkmark {
            color: #e0aa3e;
            margin-right: 0.5rem;
            font-weight: bold;
          }

          strong {
            color: #a0001b;
            margin-right: 0.3rem;
          }
        }
      }
    }

    .rightside {
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      padding-left: 1.5rem;

      .rupees {
        .price-tag {
          color: #a0001b;
          font-size: 1.8rem;
          font-weight: bold;
        }
      }

      .addbtn {
        display: flex;
        align-items: center;
        background: #a0001b;
        color: white;
        border: none;
        border-radius: 0.5rem;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
          background: #800016;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(160, 0, 27, 0.3);

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to right,
              transparent 0%,
              rgba(255, 255, 255, 0.2) 50%,
              transparent 100%
            );
            animation: ${shimmer} 1s infinite;
          }
        }

        .btn {
          padding: 0.8rem 1.5rem;
        }

        .plusdiv {
          padding: 0.8rem 1rem;
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
`;

const Wrapper = styled.section`
  background: white;
  min-height: 100vh;
`;

export default Service;