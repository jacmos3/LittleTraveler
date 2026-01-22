import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';
import { Tab, Form, Input, Message, Container } from 'semantic-ui-react';
import styles from "../../../styles/components/claimSections/ClaimWithTravelerLoot.module.scss";

const LittleTravelerABI = [
  "function mintByTravelerLoot() external",
  "function maxThisChain() external view returns (uint16)",
  "function totalSupply() external view returns (uint256)"
];

function ClaimWithTravelerLoot({ state, goToFetch }) {
  const { walletProvider } = useWeb3ModalProvider('eip155');
  const { isConnected } = useWeb3ModalAccount();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mintingFinished, setMintingFinished] = useState(false);

  useEffect(() => {
    const checkMintingStatus = async () => {
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

    checkMintingStatus();
  }, [walletProvider, state.web3Settings.contractAddress]);

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

      const tx = await contract.mintByTravelerLoot();
      await tx.wait();

      if (goToFetch) {
        goToFetch();
      }
    } catch (err) {
      console.error("Minting error:", err);
      let userMessage = "Transaction failed. Please try again.";
      if (err.code === 4001 || err.code === "ACTION_REJECTED") {
        userMessage = "Transaction was rejected by user.";
      } else if (err.message?.includes("You do not own any Traveler Loot")) {
        userMessage = "You do not own any Traveler Loot NFT.";
      }
      setErrorMessage(userMessage);
    } finally {
      setLoading(false);
    }
  }, [walletProvider, isConnected, state.web3Settings.contractAddress, goToFetch]);

  return (
    <Tab.Pane attached={false}>
      <Container>
        <h2 className="text-center">
          Do you hold a
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={state.travelerLoot}
            className={`${styles.link} a__link__secondary color2`}
          >
            <span> TRAVELER LOOT</span>
          </a>
          ?
        </h2>
        <Form onSubmit={onMint} error={!!errorMessage} className={styles.form}>
          <h4>If yes, you are eligible for Little Traveler minting by only paying gas!</h4>
          <Form.Field>
            <Input
              label={{ basic: true, content: 'Little Traveler', id: "inputLabel" }}
              labelPosition='right'
              placeholder="How many Little Travelers?"
              min={1}
              max={10}
              value={1}
              readOnly
            />
          </Form.Field>
          <p>
            You can mint as many Little Travelers as you want, by simply holding one single Traveler Loot,
            but we require a really basic <strong>proof of willingness</strong>.
            <br />
            This means that you can't mint more than 1 Little Traveler per transaction,
            but you can do more transactions if you want to mint more Little Travelers!
          </p>
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

export default ClaimWithTravelerLoot;
