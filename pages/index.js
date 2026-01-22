import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import Layout from '../components/Layout.js';
import Presentation from '../components/IndexSections/Presentation.js';
import Claim from '../components/IndexSections/Claim.js';
import Space from '../components/IndexSections/Space.js';
import Gallery from '../components/IndexSections/Gallery.js';
import Multichain from '../components/IndexSections/Multichain.js';
import DAO from '../components/IndexSections/DAO.js';
import Derivatives from '../components/IndexSections/Derivatives.js';
import Team from '../components/IndexSections/Team.js';
import Video from '../components/IndexSections/Video.js';
import Menu from '../components/IndexSections/Menu.js';
import TravelerLoot from '../components/IndexSections/TravelerLoot.js';

import { Header, Button } from 'semantic-ui-react';
import { Router } from '../routes';
import styles from "../styles/pages/INDEX.module.scss";

const CHAINS_CONFIG = [
  {
    name: "Ethereum",
    id: 1,
    opensea: "https://opensea.io/collection/little-traveler-pfp",
    openseaCard: "https://opensea.io/assets/",
    thumbsFolder: "https://littletraveler.org/img/thumbs/QmT9Sgcn6E5VvRyPtyLRkFwXPQSTywc83Nbz19VSFAgBLx/",
    options: {
      trips: {
        address: "0x1350fbe8ce27762ec19134bf8fc405a427fe9bf1",
        amount: "2000000000000000000000"
      },
      loot: "0x38Cd9992E44064Cb8bd68cDF17D164b82b25277c",
      coin: ""
    }
  },
  {
    name: "Polygon",
    id: 137,
    opensea: "https://opensea.io/collection/little-traveler-pfp-polygon",
    openseaCard: "https://opensea.io/assets/matic/",
    thumbsFolder: "https://littletraveler.org/img/thumbs/QmT9Sgcn6E5VvRyPtyLRkFwXPQSTywc83Nbz19VSFAgBLx/",
    options: {
      trips: {
        address: "0x77F0F7d657f362C4b703417B800B83B989a288a2",
        amount: "2000000000000000000000"
      },
      loot: "",
      coin: {
        name: "MATIC",
        amount: "60"
      }
    }
  },
  {
    name: "Sepolia (Testnet)",
    id: 11155111,
    opensea: "",
    openseaCard: "",
    thumbsFolder: "https://littletraveler.org/img/thumbs/QmT9Sgcn6E5VvRyPtyLRkFwXPQSTywc83Nbz19VSFAgBLx/",
    options: {
      trips: {
        address: "",
        amount: "2000000000000000000000"
      },
      loot: "",
      coin: {
        name: "ETH",
        amount: "0.01"
      }
    }
  }
];

function MyDapp() {
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [state, setState] = useState({
    daoNft: "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/93380629908989276154329187712159695682604484101294988604591734366325570535524",
    opensea: "https://opensea.io/collection/little-traveler-pfp",
    etherscan: "https://etherscan.io/",
    twitter: "https://twitter.com/tripscommunity",
    website: "https://www.littletraveler.org",
    travelerLoot: "https://www.travelerloot.com",
    discord: "https://discord.gg/tripscommunity",
    tripsCommunity: "https://www.tripscommunity.com",
    web3Settings: {
      isWeb3Connected: false,
      chains: CHAINS_CONFIG,
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      account: null,
      networkId: null,
      networkName: null,
      ethBalance: 0
    },
    provider: null,
    signer: null
  });

  // Update state when wallet connects/disconnects
  useEffect(() => {
    const updateWeb3State = async () => {
      if (isConnected && walletProvider && address) {
        try {
          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const balance = await ethersProvider.getBalance(address);

          // Check for contract address override on this chain
          const chainConfig = CHAINS_CONFIG.find(c => c.id === chainId);
          const contractAddress = chainConfig?.contractAddressOverrided ||
                                  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

          setState(prev => ({
            ...prev,
            provider: ethersProvider,
            signer: signer,
            web3Settings: {
              ...prev.web3Settings,
              isWeb3Connected: true,
              account: address,
              networkId: chainId,
              networkName: chainConfig?.name || "Unknown",
              ethBalance: parseFloat(formatEther(balance)),
              contractAddress: contractAddress
            }
          }));
        } catch (error) {
          console.error("Error updating web3 state:", error);
        }
      } else {
        setState(prev => ({
          ...prev,
          provider: null,
          signer: null,
          web3Settings: {
            ...prev.web3Settings,
            isWeb3Connected: false,
            account: null,
            networkId: null,
            networkName: null,
            ethBalance: 0
          }
        }));
      }
    };

    updateWeb3State();
  }, [isConnected, walletProvider, address, chainId]);

  const connect = useCallback(async () => {
    try {
      await open();
    } catch (error) {
      console.error("Connection error:", error);
    }
  }, [open]);

  const disconnect = useCallback(async () => {
    try {
      await open({ view: 'Account' });
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  }, [open]);

  const truncateAddress = (addr) => {
    if (!addr) return "";
    const begin = addr.substring(0, 6).concat("...");
    const end = addr.substring(addr.length - 4);
    return begin + end;
  };

  return (
    <Layout state={state}>
      <div id="connectWallet">
        {state.web3Settings.isWeb3Connected ? (
          <a className="px-5">
            <button className="btn btn__wallet" onClick={disconnect}>
              {truncateAddress(state.web3Settings.account)}
            </button>
          </a>
        ) : (
          <a href="#Claim" className="px-5">
            <button className="btn btn__wallet" onClick={connect}>
              Connect wallet
            </button>
          </a>
        )}
      </div>

      <Presentation state={state} />

      <Menu state={state} />

      <div id="Multichain" className="bg-trips-5">
        <Multichain state={state} />
      </div>

      <div id="Video" className="bg-trips-4">
        <Video state={state} />
      </div>

      <div id="Claim" className="bg-trips-5">
        <Claim disconnect={disconnect} connect={connect} state={state} />
      </div>

      <div id="DAO" className="bg-trips-4">
        <DAO state={state} />
      </div>

      <div id="Derivatives" className="bg-trips-5">
        <Derivatives />
      </div>

      <div id="Team">
        <Team />
      </div>
    </Layout>
  );
}

export default MyDapp;
