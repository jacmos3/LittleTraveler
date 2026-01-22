import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';
import { Tab, Form, Input, Message, Container } from 'semantic-ui-react';
import styles from "../../../styles/components/claimSections/ClaimWithEther.module.scss";

// LittleTraveler ABI (only the methods we need)
const LittleTravelerABI = [
  "function mint(uint256 _mintAmount) external payable",
  "function maxThisChain() external view returns (uint16)",
  "function totalSupply() external view returns (uint256)",
  "function cost() external view returns (uint256)"
];

function ClaimWithEther({ state, goToFetch }) {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  const [loading, setLoading] = useState(false);
  const [howMuchCoin, setHowMuchCoin] = useState(0);
  const [howManyLT, setHowManyLT] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [coin, setCoin] = useState({ name: "ETH", amount: "0.1" });
  const [mintingFinished, setMintingFinished] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      if (!state.web3Settings.networkId || !state.web3Settings.chains) return;

      // Get coin config for current chain
      const chainConfig = state.web3Settings.chains.find(
        chain => chain.id === state.web3Settings.networkId
      );

      if (chainConfig?.options?.coin) {
        setCoin(chainConfig.options.coin);
        setHowMuchCoin(parseFloat(chainConfig.options.coin.amount));
      }

      // Check if minting is finished
      if (!walletProvider || !state.web3Settings.contractAddress) return;

      setLoading(true);
      setErrorMessage("");

      try {
        const ethersProvider = new BrowserProvider(walletProvider);
        const contract = new Contract(
          state.web3Settings.contractAddress,
          LittleTravelerABI,
          ethersProvider
        );

        const [totalSupply, maxThisChain] = await Promise.all([
          contract.totalSupply(),
          contract.maxThisChain()
        ]);

        setMintingFinished(Number(totalSupply) >= Number(maxThisChain));
      } catch (err) {
        console.error("Error fetching supply:", err);
        setErrorMessage("Unable to fetch contract data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [walletProvider, state.web3Settings.networkId, state.web3Settings.contractAddress, state.web3Settings.chains]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 1 || value > 10) {
      return;
    }
    setHowManyLT(value);
    setHowMuchCoin(value * parseFloat(coin.amount));
  }, [coin.amount]);

  const onMint = useCallback(async (event) => {
    event.preventDefault();

    if (!walletProvider || !isConnected) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = new Contract(
        state.web3Settings.contractAddress,
        LittleTravelerABI,
        signer
      );

      const tx = await contract.mint(howManyLT, {
        value: parseEther(howMuchCoin.toString())
      });

      await tx.wait();

      if (goToFetch) {
        goToFetch();
      }
    } catch (err) {
      console.error("Minting error:", err);
      let userMessage = "Transaction failed. Please try again.";
      if (err.code === 4001 || err.code === "ACTION_REJECTED") {
        userMessage = "Transaction was rejected by user.";
      } else if (err.message && err.message.includes("insufficient funds")) {
        userMessage = "Insufficient funds for this transaction.";
      }
      setErrorMessage(userMessage);
    } finally {
      setLoading(false);
    }
  }, [walletProvider, isConnected, state.web3Settings.contractAddress, howManyLT, howMuchCoin, goToFetch]);

  return (
    <Tab.Pane attached={false}>
      <h2 className="text-center">How many Little Travelers do you want?</h2>
      <br />
      <Container>
        <Form onSubmit={onMint} error={!!errorMessage} className={styles.form}>
          <Form.Field>
            <Input
              label={{ basic: true, content: 'Little Traveler', id: "inputLabel" }}
              labelPosition='right'
              placeholder="How many Little Travelers?"
              type='number'
              min={1}
              max={10}
              value={howManyLT}
              onChange={onChange}
            />
          </Form.Field>
          <h3>it will cost you:</h3>
          <Form.Field>
            <Input
              label={{ basic: true, content: coin.name || "ETH", id: "inputLabel" }}
              labelPosition='right'
              placeholder='Amount'
              readOnly
              value={howMuchCoin}
            />
          </Form.Field>
          <div className={styles.buttons__component}>
            <Message error header="Oops!" content={errorMessage} />
            <button
              className="btn btn__primary"
              disabled={loading || mintingFinished || !isConnected}
            >
              {loading ? "Processing..." : "Mint!"}
            </button>
          </div>
          {mintingFinished && (
            <Message
              header="Sorry!"
              content="Minting is Finished for this chain! Try another chain or buy on secondary market!!"
            />
          )}
          {!isConnected && (
            <Message
              warning
              header="Wallet not connected"
              content="Please connect your wallet to mint."
            />
          )}
        </Form>
      </Container>
    </Tab.Pane>
  );
}

export default ClaimWithEther;
