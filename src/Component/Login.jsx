import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/EmployeeService";
import styles from "./Login.module.css";
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigator = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        seterror("");
        const user = {
            username,
            password,
        };

        loginUser(user)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                navigator("/employees");
            })
            .catch((error) => {
                seterror("Invalid credentials!");
            }).finally(()=>{
                setIsLoading(false);
            });
    };

    return <div className={`${styles.authContainer} ${styles.loginTheme}`}>
      <div className={styles.authBackdrop}></div>
      <div className={styles.floatingOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
      </div>
      
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={`${styles.authIcon} ${styles.loginIcon}`}>
            <User />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
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
                required
              />
            </div>
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
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`${styles.authButton} ${styles.loginButton}`}
          >
            {isLoading ? (
              <div className={styles.loadingContent}>
                <div className={styles.spinner}></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className={styles.authSwitch}>
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigator('/register')}
                className={styles.switchLink}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>;
    
};

export default Login;
