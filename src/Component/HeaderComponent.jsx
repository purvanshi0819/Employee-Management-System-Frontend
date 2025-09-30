import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HeaderComponent.module.css';;

const HeaderComponent = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <header className={styles.headerContainer}>
        {/* <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Employee Management System</a>

          <div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav> */}

        <nav className={styles.navbar}>
          <a href="#" className={styles.brandLink}>
            <span className={styles.brandIcon}>🏢</span>
            Employee Management System
          </a>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <span className={styles.logoutIcon}>🚪</span>
            Logout
          </button>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
