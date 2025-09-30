import React from 'react'
import styles from './FooterComponent.module.css'

const FooterComponent = () => {
  return(
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <span className={styles.copyrightText}>
          &copy; {new Date().getFullYear()} All rights reserved by <span className={styles.authorName}>Purvanshi Patidar</span>
        </span>
      </footer>
    </div>
  );
}

export default FooterComponent
