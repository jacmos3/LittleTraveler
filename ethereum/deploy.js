const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy LittleTraveler
  const LittleTraveler = await hre.ethers.getContractFactory("LittleTraveler");

  const constructorArgs = [
    "LittleTraveler",           // _name
    "LT",                        // _symbol
    "ipfs://baseuri/",          // _initBaseURI
    "ipfs://notrevealed/",      // _initNotRevealedUri
    hre.ethers.parseEther("0.1"), // _cost
    hre.ethers.parseEther("2000"), // _costTrips
    0,                           // _chainNumber
    "0x0000000000000000000000000000000000000000", // _tripsAddress
    "0x0000000000000000000000000000000000000000", // _travelerLootAddress
    deployer.address             // _treasurerAddress
  ];

  const littleTraveler = await LittleTraveler.deploy(...constructorArgs);
  await littleTraveler.waitForDeployment();

  const contractAddress = await littleTraveler.getAddress();
  console.log("LittleTraveler deployed to:", contractAddress);

  // Save the contract address to .env.local
  const envPath = path.join(__dirname, "../.env.local");
  const envContent = `# THIS IS AN AUTO-GENERATED FILE. DO NOT ADD ELEMENTS HERE OR THEY WILL BE DELETED AT YOUR NEXT DEPLOY
NEXT_PUBLIC_CONTRACT_ADDRESS="${contractAddress}"
`;
  fs.writeFileSync(envPath, envContent);
  console.log("Contract address saved to .env.local");

  // Verify on Etherscan if not on localhost
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await littleTraveler.deploymentTransaction().wait(5);

    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: constructorArgs,
      });
    } catch (error) {
      console.log("Verification error:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
