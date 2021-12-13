import React from 'react';
import {Image} from 'semantic-ui-react'
import styles from "../styles/components/Layout.module.scss"; // Styles
/**

/**
 * Footer component
 * @returns {ReactElement} Footer
 */
function Footer() {
  return (
    <div className="bg-black">
      <div className={styles.footer}>

        Website code and Smart Contract code are{" "}
        <a
          href="https://github.com/jacmos3/TravelerLoot"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>{" "}
        and licensed under MIT license.
        <br />
        Traveler Loot modifications and NFTs are CC0 Public Domain
        <div className="flex py-8 w-full justify-center space-x-6">
          <Image className="text-white mx-2" src="https://i.creativecommons.org/p/zero/1.0/88x31.png" />
        </div>
        Inspired by <a target= "_blank" href="https://www.lootproject.com/"> Project Loot</a>
        {" "}
        and forked by <a target="_blank" href="https://www.tripscommunity.com">Trips Community</a>

      </div>
    </div>
  );
}

export default Footer;
