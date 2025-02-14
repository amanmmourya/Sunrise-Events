import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

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
    console.log("in the handlesubmit function")
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      console.log("in the try function")

      const response = await axios.post('http://localhost:5000/api/auth/register', {
        
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      if(response.ok){
        console.log("response fetched")
      }else{
        console.log("reponse not fetched")
      }

      localStorage.setItem('token', response.data.token);
      toast.success('Successfully registered!');
      console.log("signup successfull")
      navigate('/dashboard');
    } catch (error) {
      console.log("error is coming")
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="signup-container"
      >
        <div className="form-header">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create an Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="subtitle"
          >
            Join our community today
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-signup">
          <motion.button
            className="social-btn facebook"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaFacebookF /> Facebook
          </motion.button>
          <motion.button
            className="social-btn google"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FcGoogle /> Google
          </motion.button>
        </div>

        <motion.p
          className="login-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Already have an account?{" "}
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in
          </motion.a>
        </motion.p>
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
  padding: 20px;

  .signup-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 420px;
    backdrop-filter: blur(10px);
  }

  .form-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .subtitle {
      color: #666;
      font-size: 1rem;
    }
  }

  .signup-form {
    margin-bottom: 1.5rem;
  }

  .input-group {
    margin-bottom: 1.25rem;
  }

  .form-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      border-color: #870f0f;
      box-shadow: 0 0 0 4px rgba(135, 15, 15, 0.1);
      outline: none;
    }

    &::placeholder {
      color: #999;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: #870f0f;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
      background: #5a0a0a;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .divider {
    text-align: center;
    margin: 1.5rem 0;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 45%;
      height: 1px;
      background: #e1e1e1;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    span {
      background: white;
      padding: 0 1rem;
      color: #666;
      font-size: 0.875rem;
    }
  }

  .social-signup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .social-btn {
    padding: 0.75rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #e1e1e1;

    &.facebook {
      background: #1877f2;
      color: white;
      border: none;

      &:hover {
        background: #1664d9;
      }
    }

    &.google {
      background: white;
      color: #333;

      &:hover {
        background: #f8f8f8;
      }
    }
  }

  .login-prompt {
    text-align: center;
    font-size: 0.875rem;
    color: #666;

    a {
      color: #870f0f;
      text-decoration: none;
      font-weight: 600;
      margin-left: 0.25rem;

      &:hover {
        color: #5a0a0a;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    .signup-container {
      padding: 1.5rem;
    }

    .form-header h2 {
      font-size: 1.75rem;
    }

    .social-signup {
      grid-template-columns: 1fr;
    }
  }
`;

export default Register;