// pages/_app.js
import '../styles/global.scss'
import "../styles/app.css";
import { Web3ModalProvider } from '../context/Web3Modal';

export default function MyApp({ Component, pageProps }) {
  return (
    <Web3ModalProvider>
      <Component {...pageProps} />
    </Web3ModalProvider>
  );
}
