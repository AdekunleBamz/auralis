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
NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS=0xd36cF3dD4F20CFCf19ED06b2fe089CBf07a94585
NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_AURALIS_STABLE_FEE_AMOUNT=200000000000000
NEXT_PUBLIC_AURALIS_STABLE_FEE_SYMBOL=USDm
```

The app uses two contracts. `AuralisGenesis` handles normal CELO wallet minting, while `AuralisGenesisStable` handles MiniPay USDm minting. Both contracts hold their own fees and let the owner or treasury withdraw later.

## Agent File

ERC-8004 starter metadata is served from:

```text
public/.well-known/agent.json
```

Update the domain, wallet address, and hosted image URL before registering the agent on Celo mainnet.
