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
      <div className="flex py-8 w-full justify-center space-x-6">

      </div>
        <p>Website code and Smart Contract code are <a
          href="https://github.com/jacmos3/TravelerLoot"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>{" "}
        and licensed under MIT license.
        <br />
        Final Traveler Loot NFTs are CC0 Public Domain
        <div className="flex py-8 w-full justify-center space-x-6">
          <Image className="text-white mx-2" src="https://i.creativecommons.org/p/zero/1.0/88x31.png" />
        </div>
        Project is insipired by <a target= "_blank" href="https://www.lootproject.com/"> Project Loot</a>
        {" "}
        and edited by <a target="_blank" href="https://www.tripscommunity.com">Trips Community</a>
        </p>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
