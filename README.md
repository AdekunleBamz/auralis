# Auralis

Auralis is a MiniPay-first Celo app where a user writes a short text seed, the Auralis Agent shapes NFT metadata/artwork, and the user mints the artifact to their wallet.

## Repos

```text
/Users/apple/auralis      Next.js MiniPay app
/Users/apple/auralis-sdk  Standalone SDK package and Solidity contract
```

## Local Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

The app runs on:

```text
http://localhost:3000
```

The app installs `@auralis/sdk` directly from:

```text
https://github.com/adekunlebamz/auralis-sdk
```

For active SDK development from the sibling folder, run:

```bash
npm install ../auralis-sdk
```

## Contract

Deploy manually from Remix using:

```text
/Users/apple/auralis-sdk/contracts/AuralisGenesis.sol
```

Deployment guide:

```text
/Users/apple/auralis-sdk/docs/remix-deployment.md
```

After deployment, set:

```bash
NEXT_PUBLIC_AURALIS_NFT_ADDRESS=0xYourDeployedContract
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_AURALIS_MINT_FEE_WEI=0
```

## Agent File

ERC-8004 starter metadata is served from:

```text
public/.well-known/agent.json
```

Update the domain, wallet address, and hosted image URL before registering the agent on Celo mainnet.
