// LoginScreen.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import validator from "validator";
import githubIcon from "../static/assets/GitHub-Mark-ea2971cee799.png";
import googleIcon from "../static/assets/Google_Icons-09-512.webp";
import "../static/login.css";

const API_BASE_URL = "http://localhost:5000";

function LoginScreen() {
  const [formData, setFormData] = useState({
    email: { value: "", isValid: true, errorMessage: "" },
    password: { value: "", isValid: true, errorMessage: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const validateField = (field, value) => {
    if (field === "email") {
      return {
        isValid: validator.isEmail(value),
        errorMessage: value ? "Please enter a valid email address" : "Email is required"
      };
    }
    
    if (field === "password") {
      if (!value) {
        return { isValid: false, errorMessage: "Password is required" };
      }
      const isStrong = validator.isStrongPassword(value);
      return {
        isValid: isStrong,
        errorMessage: isStrong ? "" : "Password must contain at least 8 characters, including uppercase, lowercase, number and symbol"
      };
    }
    
    return { isValid: true, errorMessage: "" };
  };

  const handleInputChange = (evt) => {
    const { id, value } = evt.target;
    const validation = validateField(id, value);
    
    setFormData((prevData) => ({
      ...prevData,
      [id]: { 
        value, 
        isValid: value ? validation.isValid : true, 
        errorMessage: validation.errorMessage 
      },
    }));
  };

  const handleInputBlur = (evt) => {
    const { id, value } = evt.target;
    const validation = validateField(id, value);
    
    setFormData((prevData) => ({
      ...prevData,
      [id]: { 
        ...prevData[id],
        isValid: validation.isValid, 
        errorMessage: validation.errorMessage 
      },
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    // Validate all fields
    const emailValidation = validateField("email", formData.email.value);
    const passwordValidation = validateField("password", formData.password.value);
    
    setFormData({
      email: { 
        ...formData.email, 
        isValid: emailValidation.isValid, 
        errorMessage: emailValidation.errorMessage 
      },
      password: { 
        ...formData.password, 
        isValid: passwordValidation.isValid, 
        errorMessage: passwordValidation.errorMessage 
      }
    });
    
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email: formData.email.value,
          password: formData.password.value,
        },
        { withCredentials: true }
      );
      
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data || "Login failed. Please try again.";
      setFormData(prev => ({
        ...prev,
        password: {
          ...prev.password,
          value: "",
          isValid: false,
          errorMessage: errorMessage
        }
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExternalLogin = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user`, { withCredentials: true })
      .then((response) => {
        if (response.data) navigate("/");
      })
      .catch(() => console.log("No active session"));
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className={formData.email.isValid ? "" : "invalid-label"}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email.value}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={formData.email.isValid ? "" : "invalid"}
              placeholder="name@example.com"
              autoComplete="email"
              disabled={isSubmitting}
            />
            {!formData.email.isValid && (
              <p className="error-message">{formData.email.errorMessage}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className={formData.password.isValid ? "" : "invalid-label"}>
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password.value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={formData.password.isValid ? "" : "invalid"}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {!formData.password.isValid && (
              <p className="error-message">{formData.password.errorMessage}</p>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="external-login">
          <button
            className="social-btn google-btn"
            onClick={() => handleExternalLogin("google")}
            disabled={isSubmitting}
          >
            <img src={googleIcon} alt="Google" className="social-icon" />
            <span>Continue with Google</span>
          </button>

          <button
            className="social-btn github-btn"
            onClick={() => handleExternalLogin("github")}
            disabled={isSubmitting}
          >
            <img src={githubIcon} alt="GitHub" className="social-icon" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <a href="/register" className="register-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;