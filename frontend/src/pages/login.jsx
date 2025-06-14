import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail, rememberMe: true }));
    }

  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password, rememberMe } = formData;
      const response = await axios.post(`https://sunrise-events-wty9.onrender.com/api/auth/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("myemail", response.data.email);
      localStorage.setItem("myname", response.data.name)  ;
      console.log(response.data.ACCESS_TOKEN);
      console.log(response);
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("name", response.data.name);
      } else {
        localStorage.removeItem("email");
      }
      
      toast.success('Successfully logged in!');
      navigate('/services');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <motion.div className="login-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue your journey</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="form-input" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-input" />
          <div className="remember-me-container">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="remember-me-checkbox" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <motion.a href="/forgot-password" className="forgot-password" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Forgot Password?</motion.a>
          <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isLoading}>{isLoading ? "Signing in..." : "Sign In"}</motion.button>
        </form>
        <p className="signup-prompt">Don't have an account? <motion.a href="/register" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Sign up</motion.a></p>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px;

  .login-container {
    background: white;
    padding: 2.5rem;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    text-align: center;
    margin-top: 80px;
  }
  .form-header h2 {
    font-size: 1.8rem;
    color: #1a1a1a;
    margin-bottom: 10px;
  }
  .subtitle {
    color: #666;
    font-size: 1rem;
    margin-bottom: 20px;
  }
  .form-input {
    width: 100%;
    padding: 0.8rem;
    margin: 0.8rem 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }
  .remember-me-container {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
  }
  .remember-me-checkbox {
    cursor: pointer;
  }
  .forgot-password {
    font-size: 0.9rem;
    color: #870f0f;
    text-decoration: none;
    display: block;
    text-align: right;
    margin-top: 10px;
  }
  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: #870f0f;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 15px;
  }
  .signup-prompt {
    margin-top: 1.5rem;
    font-size: 1rem;
  }
  .signup-prompt a {
    color: #870f0f;
    text-decoration: none;
    font-weight: 600;
  }
  @media (max-width: 480px) {
    .login-container {
      padding: 1.8rem;
      margin-top: 60px;
    }
    .form-header h2 {
      font-size: 1.5rem;
    }
    .form-input {
      font-size: 0.9rem;
      padding: 0.7rem;
    }
    .submit-btn {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
  }
`;

export default Login;
