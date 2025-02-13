import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password, confirmPassword });
  if(password===confirmPassword){
    await fetch('http://localhost:5000/signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "name":name,
        "email":email,
        "password":password,
        "confirmPassword":confirmPassword,
    }),
    })
      console.log({
        "name":name,
        "email":email,
        "password":password,
        "confirmPassword":confirmPassword,
    })
    console.log("successfull added");
    
  }else{
    // req.flash("error", "Password and confirm password should be same ");
  }
  };

  return (
    <Wrapper>
      <div className="signup-container">
        <h2>Create an Account</h2>
        <p>Sign up to get started</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email or Mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="or">OR</p>
        <div className="social-signup">
          <button className="facebook"><FaFacebookF /> Continue with Facebook</button>
          <button className="google"><FcGoogle /> Continue with Google</button>
        </div>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffffff;
  padding-top: 14vh;

  .signup-container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
    color: #333;
   margin-top: 46px;
   margin-bottom:22px;

  }

  h2 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .or {
    margin: 15px 0;
    font-size: 14px;
    font-weight: bold;
    opacity: 0.8;
  }

  input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    background: white;
    color: #333;
    transition: 0.3s;
  }

  input::placeholder {
    color: #999;
  }

  input:focus {
    border-color: #007bff;
  }

  button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #870f0f ;
    color: white;
    font-size: 16px;
    transition: 0.3s;
    font-weight: bold;
  }

  button:hover {
    transform: scale(1.05);
  }

  .social-signup {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .social-signup button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 16px;
    transition: 0.3s;
  }
  
  .facebook {
    background: #1877F2;
  }
  
  .google {
    background: white;
    color: #333;
    border: 1px solid #ccc;
  }

  @media (max-width: 768px) {
    .signup-container {
      width: 90%;
    }
  }
`;

export default Signup;
