import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[mobile,setMobile]=useState("");
  const[u_id,setU_id]=useState("");
  const[username,setUsername]=useState("");
  const[upi,setUpi]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data={email:email,password:password,mobile:mobile,username:username,u_id:u_id}
    console.log("Logging in with:", { email, password,mobile,u_id,username });
    await fetch('http://localhost:5000/adminlogin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    
  };

  return (
    <Wrapper>
      <div className="admin-login-container">
        <h2>Welcome Back Admin  </h2>
        <p> Please Login to continue</p>
        <form onSubmit={handleSubmit}>
        <input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /> 
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           <input
            type="mobile"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
           <input
            type="u_id"
            placeholder="Unique id"
            value={u_id}
            onChange={(e) => setU_id(e.target.value)}
            required
          />
           <input
            type="upi"
            placeholder="upi"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
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

  .admin-login-container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
    color: #333;
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
    background: #870f0f;
    color: white;
    font-size: 16px;
    transition: 0.3s;
    font-weight: bold;
  }

  button:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .login-container {
      width: 90%;
    }
  }
`;

export default AdminLogin