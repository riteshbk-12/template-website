// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import validator from "validator";
import githubIcon from "../static/assets/GitHub-Mark-ea2971cee799.png";
import googleIcon from "../static/assets/Google_Icons-09-512.webp";
import "../static/register.css";

const API_BASE_URL = "http://localhost:5000"; // Adjust for deployment

function Register() {
  const [formData, setFormData] = useState({
    username: { value: "", isValid: true, errorMessage: "" },
    email: { value: "", isValid: true, errorMessage: "" },
    password: { value: "", isValid: true, errorMessage: "" },
    cpassword: { value: "", isValid: true, errorMessage: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const validateField = (field, value, allValues = {}) => {
    if (field === "username") {
      if (!value.trim()) {
        return { isValid: false, errorMessage: "Username is required" };
      }
      if (value.length < 3) {
        return { isValid: false, errorMessage: "Username must be at least 3 characters" };
      }
      return { isValid: true, errorMessage: "" };
    }
    
    if (field === "email") {
      if (!value) {
        return { isValid: false, errorMessage: "Email is required" };
      }
      if (!validator.isEmail(value)) {
        return { isValid: false, errorMessage: "Please enter a valid email address" };
      }
      return { isValid: true, errorMessage: "" };
    }
    
    if (field === "password") {
      if (!value) {
        return { isValid: false, errorMessage: "Password is required" };
      }
      if (!validator.isStrongPassword(value)) {
        return { 
          isValid: false, 
          errorMessage: "Password must contain at least 8 characters, including uppercase, lowercase, number and symbol" 
        };
      }
      return { isValid: true, errorMessage: "" };
    }
    
    if (field === "cpassword") {
      if (!value) {
        return { isValid: false, errorMessage: "Please confirm your password" };
      }
      if (value !== allValues.password?.value) {
        return { isValid: false, errorMessage: "Passwords do not match" };
      }
      return { isValid: true, errorMessage: "" };
    }
    
    return { isValid: true, errorMessage: "" };
  };

  const handleInputChange = (evt) => {
    const { id, value } = evt.target;
    
    setFormData(prevData => {
      // Create new state with updated value
      const newData = {
        ...prevData,
        [id]: { 
          ...prevData[id], 
          value,
          isValid: true // Reset validation on change
        }
      };
      
      // Special case for confirm password - validate against current password
      if (id === "cpassword" && value) {
        const validation = validateField(id, value, newData);
        newData[id].isValid = validation.isValid;
        newData[id].errorMessage = validation.errorMessage;
      }
      
      // When password changes, revalidate confirm password
      if (id === "password" && prevData.cpassword.value) {
        const cpassValidation = validateField("cpassword", prevData.cpassword.value, newData);
        newData.cpassword.isValid = cpassValidation.isValid;
        newData.cpassword.errorMessage = cpassValidation.errorMessage;
      }
      
      return newData;
    });
  };

  const handleInputBlur = (evt) => {
    const { id, value } = evt.target;
    const validation = validateField(id, value, formData);
    
    setFormData((prevData) => ({
      ...prevData,
      [id]: { 
        ...prevData[id],
        isValid: validation.isValid, 
        errorMessage: validation.errorMessage 
      },
    }));
  };

  const handleRegister = async (evt) => {
    evt.preventDefault();
    
    // Validate all fields
    const usernameValidation = validateField("username", formData.username.value);
    const emailValidation = validateField("email", formData.email.value);
    const passwordValidation = validateField("password", formData.password.value);
    const cpasswordValidation = validateField("cpassword", formData.cpassword.value, formData);
    
    // Update form state with validations
    setFormData({
      username: { 
        ...formData.username, 
        isValid: usernameValidation.isValid, 
        errorMessage: usernameValidation.errorMessage 
      },
      email: { 
        ...formData.email, 
        isValid: emailValidation.isValid, 
        errorMessage: emailValidation.errorMessage 
      },
      password: { 
        ...formData.password, 
        isValid: passwordValidation.isValid, 
        errorMessage: passwordValidation.errorMessage 
      },
      cpassword: { 
        ...formData.cpassword, 
        isValid: cpasswordValidation.isValid, 
        errorMessage: cpasswordValidation.errorMessage 
      }
    });
    
    // Check if any validation failed
    if (!usernameValidation.isValid || !emailValidation.isValid || 
        !passwordValidation.isValid || !cpasswordValidation.isValid) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.value,
          email: formData.email.value,
          password: formData.password.value,
        }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        navigate("/");
      } else {
        // Handle specific error cases
        if (data.field) {
          setFormData(prev => ({
            ...prev,
            [data.field]: {
              ...prev[data.field],
              isValid: false,
              errorMessage: data.message
            }
          }));
        } else {
          alert(data.message || "Registration failed");
        }
      }
    } catch (error) {
      alert("Error: " + (error.message || "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExternalSignup = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="register-subtitle">Join us today</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username" className={formData.username.isValid ? "" : "invalid-label"}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username.value}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={formData.username.isValid ? "" : "invalid"}
              placeholder="Choose a username"
              disabled={isSubmitting}
            />
            {!formData.username.isValid && (
              <p className="error-message">{formData.username.errorMessage}</p>
            )}
          </div>

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
                placeholder="Create a strong password"
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

          <div className="form-group">
            <label htmlFor="cpassword" className={formData.cpassword.isValid ? "" : "invalid-label"}>
              Confirm Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="cpassword"
                value={formData.cpassword.value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={formData.cpassword.isValid ? "" : "invalid"}
                placeholder="Confirm your password"
                disabled={isSubmitting}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {!formData.cpassword.isValid && (
              <p className="error-message">{formData.cpassword.errorMessage}</p>
            )}
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and <a href="/privacy" className="terms-link">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="external-signup">
          <button
            className="social-btn google-btn"
            onClick={() => handleExternalSignup("google")}
            disabled={isSubmitting}
          >
            <img src={googleIcon} alt="Google" className="social-icon" />
            <span>Sign up with Google</span>
          </button>

          <button
            className="social-btn github-btn"
            onClick={() => handleExternalSignup("github")}
            disabled={isSubmitting}
          >
            <img src={githubIcon} alt="GitHub" className="social-icon" />
            <span>Sign up with GitHub</span>
          </button>
        </div>

        <p className="login-prompt">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;