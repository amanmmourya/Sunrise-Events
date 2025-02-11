import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalStyle } from "../GlobalStyle";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="container">
          <div className="left">
            <img
              src="https://i.pinimg.com/736x/b1/d2/7b/b1d27bbe96cc8a1c05d91befc40613a7.jpg"
              alt="Event"
            />
          </div>
          <div className="right">
            <form action="">
              <h2>Book Your Appointment</h2>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your Name"
                autoComplete="true"
                className="input"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your Email"
                autoComplete="true"
                className="input"
              />
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                required
                placeholder="Enter your Contact Number"
                autoComplete="true"
                className="input"
              />
              <div className="date-picker-container">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  className="date-picker"
                  placeholderText="Select Date"
                />
              </div>
              <input
                type="text"
                name="venue"
                required
                placeholder="Enter Venue Location"
                autoComplete="true"
                className="input"
              />
              <button className="glow-button">Proceed to Pay ₹1000</button>
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px #faa108; }
  50% { box-shadow: 0 0 20px #ddc108; }
  100% { box-shadow: 0 0 5px #ffd000; }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1f1c2c, #a0001b);
  padding: 20px;

  .container {
    display: flex;
    flex-wrap: wrap;
    max-width: 900px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    animation: ${fadeIn} 1s ease-in-out;
  }

  .date-picker-container {
    width: 100%;
    margin: 10px 0;
  }

  .date-picker {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    text-align: center;
  }

  .date-picker::placeholder {
    color: #ddd;
  }

  .glow-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(90deg, #a0001b, #a0001b);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    animation: ${glow} 1.5s infinite alternate;
  }

  .glow-button:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      text-align: center;
    }
    .date-picker {
      font-size: 14px;
    }
  }
`;

export default Appointment;
