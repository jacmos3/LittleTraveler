import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { Tab, Form, Input, Message, Container } from 'semantic-ui-react';
import styles from "../../../styles/components/claimSections/ClaimWithTrips.module.scss";

const LittleTravelerABI = [
  "function mintWithTrips(uint256 _mintAmount) external",
  "function maxThisChain() external view returns (uint16)",
  "function totalSupply() external view returns (uint256)"
];

const ERC20ABI = [
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)"
];

function ClaimWithTrips({ state, goToFetch }) {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, isConnected } = useWeb3ModalAccount();

  const [loading, setLoading] = useState(false);
  const [howMuchTrips, setHowMuchTrips] = useState(0);
  const [howManyLT, setHowManyLT] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [trips, setTrips] = useState({ address: "", amount: "0" });
  const [hasAllowance, setHasAllowance] = useState(false);
  const [mintingFinished, setMintingFinished] = useState(false);

  // Initialize trips config
  useEffect(() => {
    if (!state.web3Settings.networkId || !state.web3Settings.chains) return;

    const chainConfig = state.web3Settings.chains.find(
      chain => chain.id === state.web3Settings.networkId
    );

    if (chainConfig?.options?.trips) {
      const tripsConfig = chainConfig.options.trips;
      setTrips(tripsConfig);
      const amountInEther = formatEther(tripsConfig.amount);
      setHowMuchTrips(parseFloat(amountInEther));
    }
  }, [state.web3Settings.networkId, state.web3Settings.chains]);

  // Check minting status and allowance
  useEffect(() => {
    const checkStatus = async () => {
      if (!walletProvider || !state.web3Settings.contractAddress || !trips.address || !address) return;

      setLoading(true);

      try {
        const ethersProvider = new BrowserProvider(walletProvider);

        // Check minting status
        const ltContract = new Contract(
          state.web3Settings.contractAddress,
          LittleTravelerABI,
          ethersProvider
        );

        const [totalSupply, maxThisChain] = await Promise.all([
          ltContract.totalSupply(),
          ltContract.maxThisChain()
        ]);

        setMintingFinished(Number(totalSupply) >= Number(maxThisChain));

        // Check allowance
        const tripsContract = new Contract(trips.address, ERC20ABI, ethersProvider);
        const allowance = await tripsContract.allowance(address, state.web3Settings.contractAddress);
        const requiredAmount = BigInt(trips.amount) * BigInt(howManyLT);
        setHasAllowance(allowance >= requiredAmount);

      } catch (err) {
        console.error("Error checking status:", err);
        setErrorMessage("Unable to fetch contract data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [walletProvider, state.web3Settings.contractAddress, trips.address, trips.amount, address, howManyLT]);

  const checkAllowance = useCallback(async () => {
    if (!walletProvider || !trips.address || !address || !state.web3Settings.contractAddress) return;

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const tripsContract = new Contract(trips.address, ERC20ABI, ethersProvider);
      const allowance = await tripsContract.allowance(address, state.web3Settings.contractAddress);
      const requiredAmount = BigInt(trips.amount) * BigInt(howManyLT);
      setHasAllowance(allowance >= requiredAmount);
    } catch (err) {
      console.error("Error checking allowance:", err);
    }
  }, [walletProvider, trips.address, trips.amount, address, state.web3Settings.contractAddress, howManyLT]);

  const onChange = useCallback((event) => {
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 1 || value > 10) return;

    setHowManyLT(value);
    const baseAmount = parseFloat(formatEther(trips.amount));
    setHowMuchTrips(baseAmount * value);
  }, [trips.amount]);

  const onApprove = useCallback(async (event) => {
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

      const tripsContract = new Contract(trips.address, ERC20ABI, signer);
      const approveAmount = BigInt(trips.amount) * BigInt(howManyLT);

      const tx = await tripsContract.approve(state.web3Settings.contractAddress, approveAmount);
      await tx.wait();

      await checkAllowance();
    } catch (err) {
      console.error("Approval error:", err);
      let userMessage = "Approval failed. Please try again.";
      if (err.code === 4001 || err.code === "ACTION_REJECTED") {
        userMessage = "Transaction was rejected by user.";
      }
      setErrorMessage(userMessage);
    } finally {
      setLoading(false);
    }
  }, [walletProvider, isConnected, trips.address, trips.amount, howManyLT, state.web3Settings.contractAddress, checkAllowance]);

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

      const tx = await contract.mintWithTrips(howManyLT);
      await tx.wait();

      await checkAllowance();

      if (goToFetch) {
        goToFetch();
      }
    } catch (err) {
      console.error("Minting error:", err);
      let userMessage = "Transaction failed. Please try again.";
      if (err.code === 4001 || err.code === "ACTION_REJECTED") {
        userMessage = "Transaction was rejected by user.";
      } else if (err.message?.includes("insufficient")) {
        userMessage = "Insufficient TRIPS balance.";
      }
      setErrorMessage(userMessage);
    } finally {
      setLoading(false);
    }
  }, [walletProvider, isConnected, state.web3Settings.contractAddress, howManyLT, checkAllowance, goToFetch]);

  return (
    <Tab.Pane attached={false}>
      <Container>
        <h2 className="text-center">How many Little Travelers do you want?</h2>
        <br />
        <Form error={!!errorMessage} className={styles.form}>
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
              fluid
            />
          </Form.Field>
          <h3>it will cost you:</h3>
          <Form.Field>
            <Input
              label={{ basic: true, content: 'TRIPS', id: "inputLabel" }}
              labelPosition='right'
              placeholder='Trips amount'
              readOnly
              value={Math.round(howMuchTrips)}
              fluid
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <div className={styles.buttons__component}>
            <button
              className="btn btn__primary"
              disabled={hasAllowance || loading || mintingFinished || !isConnected}
              onClick={onApprove}
            >
              {loading && !hasAllowance ? "Approving..." : "Approve!"}
            </button>
            <button
              className="btn btn__primary"
              disabled={!hasAllowance || loading || mintingFinished || !isConnected}
              onClick={onMint}
            >
              {loading && hasAllowance ? "Minting..." : "Mint!"}
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

export default ClaimWithTrips;
