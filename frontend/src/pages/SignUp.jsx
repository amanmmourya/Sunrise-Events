import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";


const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      console.log("till frontend fine");
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },{withCredentials: true});
      localStorage.setItem("token", response.data.token);
      toast.success("Successfully registered!");
      navigate("/home");
    } catch (error) {
      console.log("Error at frontend submission");
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <motion.div className="signup-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="form-header">
          <h2>Create an Account</h2>
          <p className="subtitle">Join our community today</p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
            <div className="input-group" key={index}>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                name={field}
                placeholder={field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          ))}
          <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>
        <p className="login-prompt">Already have an account? <a href="/login">Sign in</a></p>
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
  padding: 2rem;

  .signup-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 3rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 450px;
    text-align: center;
  }

  .form-header h2 {
    font-size: 2rem;
    color: #333;
  }
  .form-header .subtitle {
    font-size: 1rem;
    color: #666;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .form-input {
    width: 100%;
    padding: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
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
    transition: 0.3s;
  }
  .submit-btn:hover {
    background: #5a0a0a;
  }
  .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .login-prompt {
    margin-top: 1rem;
    font-size: 1rem;
    color: #666;
  }
  .login-prompt a {
    color: #870f0f;
    font-weight: bold;
    text-decoration: none;
  }
  .login-prompt a:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .signup-container {
      padding: 2rem;
    }
    .form-header h2 {
      font-size: 1.75rem;
    }
    .form-header .subtitle {
      font-size: 0.9rem;
    }
    .form-input {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
    .submit-btn {
      font-size: 0.9rem;
      padding: 0.9rem;
    }
  }
`;

export default Register;
