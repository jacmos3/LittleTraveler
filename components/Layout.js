import React from 'react';
import {Container} from 'semantic-ui-react';
import { useRouter } from "next/router"; // Routing
import Link from "next/link"; // Routing
import Head from 'next/head';
import styles from "../styles/components/Layout.module.scss"; // Styles
import { default as HTMLHead } from "next/head"; // Meta

const Layout = (props) =>{
  const links = [
    { name: "FAQ", path: "/faq" },
    { name: "Resources", path: "/resources" },
  ];
  return (
    <Container>
      <Head/>
     <Header />
      {props.children}
      <Footer />
    </Container>
  )


  /**
   * Meta HTML Head
   * @returns {ReactElement} HTML Head component
   */
  function Head() {
    return (
      <HTMLHead>
        {/* Primary Meta Tags */}
        <title>Loot</title>
        <meta name="title" content="Loot" />
        <meta
          name="description"
          content="The Traveler Loot is randomized character generated and stored on chain."
        />

        {/* OG + Faceook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="#" />
        <meta property="og:title" content="The Traveler Loot" />
        <meta
          property="og:description"
          content="The Traveler Loot is randomized character generated and stored on chain."
        />
        <meta property="og:image" content="#" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="#" />
        <meta property="twitter:title" content="The Traveler Loot" />
        <meta
          property="twitter:description"
          content="Loot is randomized adventurer gear generated and stored on chain."
        />
        <meta property="twitter:image" content="https://lootproject.com/meta.png" />

        {/* Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel = "stylesheet" href = "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
      </HTMLHead>
    );
  }

  /**
 * Header
 * @returns {ReactElement} Header
 */
function Header() {
  // Collect current path for active links
  const { pathname } = useRouter();
  // All links
  const links = [
    { name: "FAQ", path: "/faq" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <div className={styles.header}>
      {/* Main logo */}
      <div className={styles.header__logo}>
        <Link href="/">
          <a>The Traveler Loot</a>
        </Link>
      </div>

      {/* Navigation */}
      <div className={styles.header__links}>
        <ul>
          {links.map(({ name, path }, i) => {
            // For each link, render link
            return (
              <li key={i}>
                <Link href={path}>
                  <a
                    className={
                      pathname === path
                        ? // Active class if pathname matches current path
                          styles.header__links_active
                        : undefined
                    }
                  >
                    {name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
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
          href="https://github.com/jacmos3/TheTravelerLoot"
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
};
export default Layout;
