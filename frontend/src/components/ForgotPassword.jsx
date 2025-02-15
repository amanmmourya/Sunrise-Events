import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from "../GlobalStyle";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message);
      } else {
        setMessage('A password reset link has been sent to your email.');
        setEmail('');
        localStorage.setItem('randomtoken', data.resetURL);
      }
    } catch (err) {
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <>   
      <GlobalStyle/>
      <Wrapper>
        <div className="forgot-password">
          <span className='cancel' onClick={() => navigate("/login")}>X</span>
            <h3>Forgot Password</h3>   
            <h2>dont worry enter your registered email id </h2>       
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  
  .forgot-password {
    padding: 2rem;

    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 100%;
    max-width: 400px;
    h3{
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .subtext {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #dcdde1;
  }

  label {
    display: block;
    text-align: left;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    color: black;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.4rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: #c3102e;
    color: white;
    transition: 0.3s;
  }

  button:hover {
    background: #d32f4b;
  }

  .error {
    color: #ff4d4d;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .success {
    color: #2ecc71;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  h3{
    color: black;
    font-size: 2.2rem;
  }

  .cancel {
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    color: #fff;
  }
  .cancel:hover {
    color: #ff4d4d;
  }

  @media (max-width: 480px) {
    .forgot-password {
      padding: 1.5rem;
      width: 90%;
    }
  }
`;

export default ForgotPassword;
