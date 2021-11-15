import React from 'react';
import styles from "../styles/components/Layout.module.scss"; // Styles
/**

/**
 * Footer component
 * @returns {ReactElement} Footer
 */
function Footer() {
  return (
    <div className={styles.footer}>

      <p>Inspired by <a target= "_blank" href="https://www.lootproject.com/"> Project Loot </a> and
      edited by <a target="_blank" href="https://www.tripscommunity.com">Trips Community</a></p>

      <p>
        This website is{" "}
        <a
          href="https://github.com/jacmos3/TravelerLoot"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>
        .
      </p>
    </div>
  );
}

export default Footer;
