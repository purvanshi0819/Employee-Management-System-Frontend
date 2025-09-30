import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/EmployeeService';
import styles from "./Register.module.css";
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();
  const [errors, seterrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    seterrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const user = { username, email, password };

    registerUser(user).then((response) => {
      console.log(response);
      navigator("/login");
    }).catch(error => {
      alert("Registration failed");
    });

  }
  return (
   <div className={`${styles.authContainer} ${styles.registerTheme}`}>
      <div className={styles.authBackdrop}></div>
      <div className={styles.floatingOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
      </div>
      
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={`${styles.authIcon} ${styles.registerIcon}`}>
            <User />
          </div>
          <h2>Create Account</h2>
          <p>Join us today and get started</p>
        </div>

        <div className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e)=>setusername(e.target.value)}
                placeholder="Enter your username"
                className={`${errors.username ? styles.inputError : ''}`}
                required
              />
            </div>
            {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                placeholder="Enter your email"
                className={`${errors.email ? styles.inputError : ''}`}
                required
              />
            </div>
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={e=> setpassword(e.target.value)}
                placeholder="Enter your password"
                className={`${errors.password ? styles.inputError : ''}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <button
            onClick={handleRegister}
            className={`${styles.authButton} ${styles.registerButton}`}
          >
            Create Account
          </button>

          <div className={styles.authSwitch}>
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigator('/login')}
                className={styles.switchLink}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
