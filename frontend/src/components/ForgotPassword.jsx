import React, {  useState } from 'react';
// import "../styles/forget.css"
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import styled from 'styled-components';
import { GlobalStyle } from "../GlobalStyle";




const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  // const {resetURL , setResetURL} = useContext(AuthContext);
// const [resetURL , setResetURL] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      // Assuming there's an API endpoint for forgot password
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json(); // Extract JSON data

      console.log(response,"response")

      if (!response.ok) {
       
      
        setError(data.message);
      } else {
        console.log(data.resetURL, "resetURL"); // Log the reset URL
        console.log(response.resetURL ,"resetURl")

        console.log("a password reset link has been sent to your email")
        setMessage('A password reset link has been sent to your g email.');
        setEmail('');
        localStorage.setItem('randomtoken', data.resetURL)
      }
    } catch (err) {
        console.log("error occuring in the catch error")
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <>   
    <GlobalStyle/>
    
     <Wrapper>    <div className="forgot-password">
      <span  className='cancel' onClick={()=>{navigate("/login")}}>X</span>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
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
    

    .forgot-password {
    width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .forgot-password h2 {
    text-align: center;
  }
  
  .forgot-password form {
    display: flex;
    padding: 20px;
    flex-direction: column;
  }
  
  .forgot-password input {
    padding: 0.8rem;
    margin-bottom: 15px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 14.5rem;
  }
  
  .forgot-password button {
    /* padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer; */
    background-color: black;
    color: white;
    padding: 0.8rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .forgot-password button:hover {
    background-color: #45a049;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .success {
    color: green;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .cancel{
    font-size: 1.4rem;
    cursor: pointer;
   &:hover {
    scale:2.8rem;
   }
  }
 
  
`

export default ForgotPassword ;
