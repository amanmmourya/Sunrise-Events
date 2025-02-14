import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formData; // <-- Extract email and password from formData

      const response = await axios.post('http://localhost:5000/api/auth/login', 
        { email, password }, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      localStorage.setItem('token', response.data.token);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-container"
      >
        <div className="form-header">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="subtitle"
          >
            Login to continue your journey
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
            <motion.a
              href="/forgot-password"
              className="forgot-password"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot Password?
            </motion.a>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
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
          className="signup-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Don't have an account?{" "}
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign up
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

  .login-container {
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

  .login-form {
    margin-bottom: 1.5rem;
  }

  .input-group {
    margin-bottom: 1.25rem;
    position: relative;
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

  .forgot-password {
    position: absolute;
    right: 0;
    top: -1.5rem;
    font-size: 0.875rem;
    color: #870f0f;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #5a0a0a;
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

  .social-login {
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

  .signup-prompt {
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

    .login-container {
      padding: 1.5rem;
    }

    .form-header h2 {
      font-size: 1.75rem;
    }

    .social-login {
      grid-template-columns: 1fr;
    }
  }
`;

export default Login;