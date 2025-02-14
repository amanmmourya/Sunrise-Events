import { useContext, useState } from "react"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import axios from "axios" // Add axios import
import { useNavigate } from "react-router-dom"
import { GlobalStyle } from "../GlobalStyle"
import styled from "styled-components"


const ResetPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();
  // const { resetURL } = useContext(AuthContext) // Make sure resetURL is valid
const api = localStorage.getItem('randomtoken')
console.log(api , "api")
  const getPasswordStrength = (password) => {
    const strengthChecks = {
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
    const strength = Object.values(strengthChecks).filter(Boolean).length
    return {
      score: strength,
      class: strength < 2 ? "weak" : strength < 4 ? "medium" : "strong",
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    if (getPasswordStrength(password).score < 3) {
      setError("Password is not strong enough");
      return;
    }
  
    try {
      // Retrieve the reset token from localStorage
      console.log("in the try function function of handlesubmit")
      const api = localStorage.getItem("randomtoken");
      console.log(api);
      if (!api) {
        console.log("api is not there that is randomtoken ")
        setError("Reset token is missing.");
        return;
      }
  
      // Construct the API endpoint
      const response = await axios.post(
        api, 
        { newPassword: password }, // ✅ Fix: Use `newPassword` instead of `password`
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
        localStorage.removeItem("randomtoken"); // ✅ Remove token after reset
        setError("");
        setConfirmPassword("");
        setPassword("");
        navigate("/home")
      }
    } catch (error) {
      console.log("Reset Password Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };
  

  const strength = getPasswordStrength(password)

  return (
    <>
    <GlobalStyle/>
       <Wrapper>
    <div className="reset-password-container">
      <div className="reset-password-card">
        <span onClick={()=>{navigate("/home")}}> X</span>
        <h2>Reset Password</h2>
        <p className="description">Enter your new password below</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div
                    className={`strength-meter-fill ${strength.class}`}
                    style={{ width: `${(strength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <p>Password strength: {strength.score < 3 ? "Weak" : strength.score < 5 ? "Medium" : "Strong"}</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>
        <p className="footer-text">Make sure your password is strong and unique</p>
      </div>
      <FaLock className="background-icon top-left" />
      <FaLock className="background-icon bottom-right" />
    </div>
    </Wrapper>
    </>
 
  )
}
const Wrapper  = styled.section`
  .reset-password-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: linear-gradient(135deg, #e0e0ff 0%, #d5d5ff 100%); */
    padding: 20px;
    position: relative;
  }
  
  .reset-password-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .description {
    text-align: center;
    color: #666;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .password-input {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
  }
  
  .password-strength {
    margin-top: 10px;
  }
  
  .strength-meter {
    height: 4px;
    background-color: #ddd;
    border-radius: 2px;
    overflow: hidden;
  }
  
  .strength-meter-fill {
    height: 100%;
    transition: width 0.3s ease-in-out;
  }
  
  .strength-meter-fill.weak {
    background-color: #ff4d4d;
  }
  .strength-meter-fill.medium {
    background-color: #ffa500;
  }
  .strength-meter-fill.strong {
    background-color: #00cc00;
  }
  
  .error {
    color: #ff4d4d;
    margin-bottom: 10px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #4a4aff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #3a3aff;
  }
  
  .footer-text {
    text-align: center;
    color: #666;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .background-icon {
    position: fixed;
    font-size: 48px;
    color: rgba(74, 74, 255, 0.1);
    animation: pulse 2s infinite;
  }
  
  .background-icon.top-left {
    top: 20px;
    left: 20px;
  }
  
  .background-icon.bottom-right {
    bottom: 20px;
    right: 20px;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  
  @media (max-width: 480px) {
    .reset-password-card {
      padding: 20px;
    }
  }
  
  
`

export default ResetPage
