import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';
import { Tab, Form, Input, Message, Container } from 'semantic-ui-react';
import styles from "../../../styles/components/donateDirectSections/ClaimForDonateDirect.module.scss";

const DonateDirectABI = [
  "function mint(uint256 _mintAmount) external payable"
];

function ClaimForDonateDirect({ state, goToFetch }) {
  const { walletProvider } = useWeb3ModalProvider('eip155');
  const { isConnected } = useWeb3ModalAccount();

  const [loading, setLoading] = useState(false);
  const [howMuchCoin, setHowMuchCoin] = useState(0);
  const [howManyNFT, setHowManyNFT] = useState(1);
  const [errorMessage, setErrorMessage] = useState("Minting temporarily suspended");
  const [coin, setCoin] = useState({ name: "ETH", amount: "0.1" });

  useEffect(() => {
    if (state.web3Settings?.donationChain?.coin) {
      const coinConfig = state.web3Settings.donationChain.coin;
      setCoin(coinConfig);
      setHowMuchCoin(parseFloat(formatEther(coinConfig.amount)));
    }
  }, [state.web3Settings?.donationChain?.coin]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 1 || value > 50) return;

    setHowManyNFT(value);
    const baseAmount = parseFloat(formatEther(coin.amount));
    setHowMuchCoin(baseAmount * value);
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
        state.web3Settings.donationChain.contractAddress,
        DonateDirectABI,
        signer
      );

      const tx = await contract.mint(howManyNFT, {
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
      } else if (err.message?.includes("insufficient funds")) {
        userMessage = "Insufficient funds for this transaction.";
      }
      setErrorMessage(userMessage);
    } finally {
      setLoading(false);
    }
  }, [walletProvider, isConnected, state.web3Settings?.donationChain?.contractAddress, howManyNFT, howMuchCoin, goToFetch]);

  const displayAmount = howMuchCoin.toFixed(4);

  return (
    <Tab.Pane attached={false}>
      <h2 className="text-center">How many NFT donations do you want to do?</h2>
      <br />
      <Container>
        <Form onSubmit={onMint} error={!!errorMessage} className={styles.form}>
          <Form.Field>
            <Input
              label={{ basic: true, content: 'NFT', id: "inputLabel" }}
              labelPosition='right'
              placeholder="How many NFT?"
              type='number'
              min={1}
              max={50}
              value={howManyNFT}
              onChange={onChange}
            />
          </Form.Field>
          <h3>you are donating {displayAmount} {coin.name}</h3>
          <div className={styles.buttons__component}>
            <Message error header="Oops!" content={errorMessage} />
            <button
              className="btn btn__primary"
              disabled={true || loading || !isConnected}
            >
              {loading ? "Processing..." : "Mint!"}
            </button>
          </div>
        </Form>
      </Container>
    </Tab.Pane>
  );
}

export default ClaimForDonateDirect;
