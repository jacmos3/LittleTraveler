import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';
import { Container, Message, Tab } from 'semantic-ui-react';
import styles from "../../../styles/components/claimSections/FetchNFTList.module.scss";

const LittleTravelerABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)"
];

function FetchNFTList({ state }) {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalOwned, setTotalOwned] = useState(0);
  const [chainName, setChainName] = useState("");
  const [opensea, setOpensea] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [openseaCard, setOpenseaCard] = useState("");

  // Initialize chain config
  useEffect(() => {
    if (!state.web3Settings.networkId || !state.web3Settings.chains) return;

    const chain = state.web3Settings.chains.find(
      c => c.id === state.web3Settings.networkId
    );

    if (chain) {
      setChainName(chain.name);
      setOpensea(chain.opensea);
      setBaseUrl(chain.thumbsFolder);
      setOpenseaCard(`${chain.openseaCard}${state.web3Settings.contractAddress}/`);
    }
  }, [state.web3Settings.networkId, state.web3Settings.chains, state.web3Settings.contractAddress]);

  const fetchNFTList = useCallback(async () => {
    if (!walletProvider || !state.web3Settings.contractAddress || !address) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const contract = new Contract(
        state.web3Settings.contractAddress,
        LittleTravelerABI,
        ethersProvider
      );

      const balance = await contract.balanceOf(address);
      const balanceNumber = Number(balance);
      setTotalOwned(balanceNumber);

      if (balanceNumber === 0) {
        setNfts([]);
        setLoading(false);
        return;
      }

      const nftList = [];
      for (let i = balanceNumber - 1; i >= 0; i--) {
        try {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          nftList.push({
            key: balanceNumber - 1 - i,
            header: tokenId.toString(),
            image: `${baseUrl}${tokenId.toString()}.png`
          });
        } catch (err) {
          console.error(`Error fetching token at index ${i}:`, err);
        }
      }

      setNfts(nftList);
    } catch (err) {
      console.error("Error fetching NFT list:", err);
      setErrorMessage("Unable to fetch your NFTs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [walletProvider, state.web3Settings.contractAddress, address, baseUrl]);

  // Fetch NFTs when component mounts or dependencies change
  useEffect(() => {
    if (isConnected && baseUrl) {
      fetchNFTList();
    }
  }, [isConnected, baseUrl, fetchNFTList]);

  return (
    <Tab.Pane attached={false}>
      <Container>
        <div style={{ display: 'flex', flexFlow: 'column' }}>
          <h2 className="text-center">
            You own {totalOwned} Little Travelers on {chainName}
          </h2>

          {errorMessage && <Message header="Oops!" content={errorMessage} />}

          {loading && (
            <div className={styles.image__container}>
              {[...Array(totalOwned || 3)].map((_, index) => (
                <div key={index}>
                  <div className={styles.image}>
                    <img src="/img/incognito.png" alt="Loading..." />
                    <h3>#???</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && (
            <div className={styles.image__container}>
              {nfts.map(nft => (
                <div key={nft.key}>
                  <div className={styles.image}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${openseaCard}${nft.header}`}
                    >
                      <img src={nft.image} alt={`Little Traveler #${nft.header}`} />
                    </a>
                    <h3>#{nft.header}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.buttons}>
            <button
              className="btn btn__primary"
              disabled={loading || !isConnected}
              onClick={fetchNFTList}
            >
              {loading ? "Loading..." : "Refresh List"}
            </button>
            {opensea && (
              <a target="_blank" rel="noopener noreferrer" href={opensea}>
                <button className="btn btn__primary btn__large">
                  Open Full Collection on Opensea
                </button>
              </a>
            )}
          </div>

          {!isConnected && (
            <Message
              warning
              header="Wallet not connected"
              content="Please connect your wallet to view your NFTs."
            />
          )}
        </div>
      </Container>
    </Tab.Pane>
  );
}

export default FetchNFTList;
