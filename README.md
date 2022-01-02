[The instructions for install & run the code are at the bottom]

# Traveler Loot: A Loot for the Travel Industry
The Traveler Loot is a Loot derivative for the travel industry and the travel world in general.
The original Loot provided a public good on which the community can create games.
We are creating a public good on which the Travel industry can create marketing campaigns, fidelity programs, airdrops and so on.

In our mission to help the travel industry to transition to Web3, we will assist hotels, houses, airlines, cruise ships, tour operators etc...to drop special discounts, free nights and free trips to the Traveler Loot owners, by targeting the content of the loot itself.
If for instance you own a Loot with "Paris" and "Hotel", you may be targeted by Paris Hotels with free stays as a part of their marketing campaigns.
If you own an "Airplane" NFT, you could get a free ticket from an airline, or maybe early access to discounted NFT tickets for flights.
We will work hard to add value to these NFTs, and if we are successful they will generate a lot of travel opportunities for the owners.


## Who We Are
We are [Trips Community](https://www.tripscommunity.com/ "Trips Community"), a Travel DAO, established in 2017, a recognised as the leader in the transition to Web3 for the travel industry.
We have sold the first ever NFT booking in a [Villa in Ibiza, Spain](https://medium.com/trips-community/nft-nights-book-a-villa-with-an-nft-77e43f178909 "Villa in Ibiza, Spain") and the [first NFT Hotel booking in Venice, Italy ](https://medium.com/trips-community/the-first-nft-hotel-booking-in-history-was-sold-for-1-eth-3000-8f7d5e988ea0 "first NFT Hotel booking in Venice, Italy ").
We are also the first to organize a travel conference [Proof of Attendance NFT at the VRWRS 2021](https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/93380629908989276154329187712159695682604484101294988604591734364126547280072 "roof of Attendance NFT at the VRWRS 2021") summit in Annency, in France.

## Earnings
Traveler Loots on Ethereum are mostly free + gas, except the Patron NFTs.
We are retaining 100 NFTs for the development of the project.
Sales from Patron NFTs + 100 owner Loots will be used to fund the Traveler NFT project and make it grow into the biggest NFT ecosystem of the global travel industry.

## Expenses
We will invest the money in projects which give direct value to the NFT.
E.g.: we'll buy travel related NFTs which you can spend while travelling (there's very few of those now, but they will come).
We will mostly spend them to market the idea to travel incumbents who will then create valuable NFTs and airdrops them to Travel Loot owners.

## Conferences
The Traveler loot has been presented on the 2nd of December 2021 at the [Hicon, Innovation in Travel conference] (https://www.hicon.it/eng/speaker/luca-degiglio/) in Bologna, Italy.


## How it works
Everybody can mint a Traveler Loot NFT on Ethereum, by using Etherscan here:
__ADD_LINK__ or by using our native frontend here: __ADD_LINK__


There are 4 kinds of Traveler Loot NFTs:
1) #1 to #900: Traveler Loots reserved for owners of Loot NFT from selected Loot projects. Free + gas.
2) #901 to #1000: Black and white Traveler Loots reserved to contract deployer (Trips Community).
3) #1001 to #10000: Black and white Traveler Loots (standard). Free + gas.
4) #address: will be Patron Traveler Loots (price starts from 1 ETH and then varies depending on the formula described in *price variability* section).


## PRIORITY FOR ELIGIBLE LOOT PROJECT OWNERS

The owners of 15 Loot projects (Original Loot Project and 14 it's derivatives) have the **elegibility** to mint a Traveler Loot in special edition **Guild NFT**, opening the doors for other possible future airdrops or advantages.
The qualification for the Loot projects was based on the trading volume on OpenSea.
The qualified Loot projects are the first 15 in the list, sorted by trading volume on **DECEMBER 2021**.

By using the _**claimForGuilds(tokenId, contractAddress)**_ function, Loot project owners can mint a
Special Edition **Guild NFT** on a first-come-first-served basis.
There are **15 qualified Loot and Loot derivatives projects** that have
been selected to be qualified for this purpose.

E.g.: if you own the Loot #1 from an eligible Loot project, you would be able to mint the Traveler Loot #1 using
the _**claimForGuilds(tokenId, contractAddress)**_, just providing the tokenId you own
and the Loot address.
This will be minted in special edition (it comes out with a coloured flag, and a special property as metadata).

If you own a higher _tokenId_ from a previous eligible Loot project, you can claim your special edition too (for the mathematically inclined: because the tokenId is wrapped by 900. The formula is: (tokenId mod 900)+1.

So everybody can mint their special edition, if they are fast enough to claim it before they go out of supply.

Note that when you mint your number, you take it away from all the others
Loot or Loot-derivatives owners, because there will be one and only one #1, one and only one #2 and so on till #900.
So If you've minted it, the other owners have lost the opportunity to do the same.

Only first one who mints its own number will receive the special edition minting.

There will be only 900 Guild Traveler Loot, at maximum: from #1 to #900.

## DERIVATIVE LOOT "GUILDS"
If you have an NFT from an eligible Loot project, you are part of a Guild.
There are 15 Colors. Each color represents the flag of the Guild.
When all 900 Special Edition Traveler Loots have been minted, the Guild with most NFTs will WIN and becomes the Conqueror.
Conqueror Guild wins the possibility to mint for free + gas a Patron NFT, which otherwise costs about 1 ETH. Price for patrons is dynamic and tend to become as expensive as the hype of the project increases. It is designed to give more value to Conqueror prize since Conqueror members will be able to mint it for free + gas instead.


## PATRON NFT

- Starting cost: **1 ETH**
- Peculiarity: You can mint it whenever you want and nobody can steal it since **your ETH address is the TokenID**. Each address can mint one and only one. Price starts from 1 ETH but it is designed to become unaffordable as soon as the project increases in popularity.

**Price variability**
The minting price varies according to the number of Standard Travel Loot NFTs minted.

- Every time a Standard NFT (#1001 to #10000) is minted the Patron NFT minting price decreases by 1%
- Every time one of the owner-reserved NFTS (#901 to #1000) is minted, the the Patron NFT minting price has no variation: Project owner does not have any influence on prices.
- Every time one an eligible Loot derivate owner mints one Guild Traveler Loot (#1 to #900), the Patron NFT minting price increases by 1%
- Every time a Patron mints one Patron NFT, if the price went back under 1 ether due of previous mintings (see what happens when people mint #1001 to #10000), then it will be reset to 1 ether and increased by 5%. This means that if in a certain moment you find a price of 0.5 ether because of many Standard NFT have been claimed in a raw, then it is possible to mint a Patron NFT for just 0.5 ether, and by doing that the price for the next patrons will be reset to 1 ether (+ 5% caused by your mint).
- Every time an owner of an original Loot (created by @Dof https://opensea.io/collection/lootproject) mints a Patron using *claimForLooters()* function, the Patron NFT minting price goes down by 5%.
Loot owners have the privilege to mint a Patron Traveler Loot for free ()+ fees) for a limited period of time: it expires on the 40th birthday of Dhof [https://twitter.com/dhof] on 27/09/2026 23:59:59 (UTC) OR when all Guild Traveler Loot NFTs (#1 to #900) are minted and we have a Conqueror Guild.
- Every time a Conqueror (member of the winner Guild) mints with its own address using *claimForConquerors()* function, the Patron NFT minting price increases by 2%


## STANDARD "TRAVELER LOOT" NFTs
If you do not own any eligible Loot/Loot Derivative, then you'll be able to claim
a Standard Traveler Loot in black/white edition, just claiming from the function
_**claim(tokenId)**_.
You just need to choose and find a still available number between #1001 and #10000


## ELEMENTS AND RARITY
There are 10 categories:

- Preferred travel environment
- Talent
- Preferred place in the world
- Character
- Preferred Means of Transport
- Languages spoken
- Travel experience
- Occupation
- Preferred Accommodation
- In the bag


And hundreds of elements with variable rarity.
The total possible combinations are much over 100 Trillion.

===

NOTE
All which is explained here is coded in the Smart Contracts and you are free to read it on etherscan [LINK]

------------

## 1. Installing components:
`npm install`

## 2. Configuring the .env files:
`cd ethereum`

`touch .env`

open ".env" file with your preferred text editor and write down this in it:

`MNEMONIC = "[SEED]" #put here your mnemonic seed used to deploy the contract on
the blockchain
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #insert here your infura url (go to
infura.io, create account and new project, then select testnet you want to use
i.e. rinkeby and then copy the link here)`

## 3. Compiling and generating json interface
`node compile.js`

## 4. Deploying on the blockchain
`node deploy.js`

Once the deploy is succeeded, it will be generated `/.env.local` file with a
env variable containing the contract address you have deployed.

This file is used by the frontend to interact with the contract using web3.

## 5. Launch server:
`npm run dev`

go to https://localhost:3000 and feel free to use the dapp

## 6. Launching tests:

`npm run test`

NOTE: Tests are not intended to be completed. Feel free to write your own tests.


## 7. Exporting for hosting:
`npm run build && npm run export`

## 8. Deploy to Firebase (example)
`firebase login`

`firebase deploy`

## 9. Credits:
The Traveler Loot is inspired by Loot Project: https://www.lootproject.com

The solidity smart contract and the frontend-style are taken from Loot Project
and modified for our purpose.
