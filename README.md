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

The app installs the published SDK from npm:

```text
@bamzzstudio/auralis-sdk
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
NEXT_PUBLIC_AURALIS_MINT_FEE_WEI=2000000000000000
NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS=
NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_AURALIS_STABLE_FEE_AMOUNT=200000000000000
NEXT_PUBLIC_AURALIS_STABLE_FEE_SYMBOL=USDm
```

The deployed `AuralisGenesis` contract holds native CELO fees in the same contract and lets the owner or treasury call `withdraw()`. MiniPay USDm fees require deploying the SDK's `AuralisGenesisStable.sol`, then setting `NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS`.

## Agent File

ERC-8004 starter metadata is served from:

```text
public/.well-known/agent.json
```

Update the domain, wallet address, and hosted image URL before registering the agent on Celo mainnet.
