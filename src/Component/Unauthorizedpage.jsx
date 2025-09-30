import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Unauthorizedpage.module.css'

const Unauthorizedpage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login"); // redirect as needed
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>403 - Unauthorized</h1>
      <p className={styles.message}>
        You don't have permission to access this page.
      </p>
      <button onClick={handleGoBack} className={styles.button}>
        Go to Login
      </button>
    </div>
  );
}

export default Unauthorizedpage
