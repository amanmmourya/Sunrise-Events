import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Flower fall animation
const fall = keyframes`
  0% { transform: translateY(-10vh) translateX(0px) rotate(0deg); opacity: 1; }
  50% { transform: translateY(50vh) translateX(20px) rotate(180deg); }
  100% { transform: translateY(100vh) translateX(-20px) rotate(360deg); opacity: 0; }
`;

// Styled component for the container
const FlowerRainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;

  .flower {
    position: absolute;
    font-size: 2rem;
    animation: ${fall} linear;
    text-shadow: 0px 0px 8px rgba(255, 192, 203, 0.7); /* Soft pink glow */
  }
`;

const FlowerRain = () => {
  const flowerTypes = ["🌸", "🌿", "🍂", "🍁", "🌷", "🌻", "🌹", "🌺"];
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    setFlowers(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2, // Duration between 2-5 seconds
      }))
    );

    // Clear flowers after 2 seconds
    const timer = setTimeout(() => {
      setFlowers([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <FlowerRainContainer>
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="flower"
          style={{
            left: `${flower.left}vw`,
            animationDuration: `${flower.animationDuration}s`,
            fontSize: `${Math.random() * 1.5 + 1}rem`,
            opacity: Math.random() * 0.5 + 0.5,
          }}
        >
          {flowerTypes[Math.floor(Math.random() * flowerTypes.length)]}
        </span>
      ))}
    </FlowerRainContainer>
  );
};

export default FlowerRain;