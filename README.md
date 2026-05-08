# Auralis

Auralis is a MiniPay-first Celo app where a user writes a short text seed, the Auralis Agent shapes NFT metadata/artwork, and the user mints the artifact to their wallet.

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
../auralis-sdk/contracts/AuralisGenesis.sol
../auralis-sdk/contracts/AuralisGenesisStable.sol
```

Deployment guide:

```text
../auralis-sdk/docs/remix-deployment.md
```

After deployment, set:

```bash
NEXT_PUBLIC_AURALIS_NFT_ADDRESS=0xYourDeployedContract
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_AURALIS_MINT_FEE_WEI=2000000000000000
NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS=0xYourStableDeployedContract
NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_AURALIS_STABLE_FEE_AMOUNT=200000000000000
NEXT_PUBLIC_AURALIS_STABLE_FEE_SYMBOL=USDm
```

The app uses two contracts. `AuralisGenesis` handles normal CELO wallet minting, while `AuralisGenesisStable` handles MiniPay USDm minting. Both contracts hold their own fees and let the owner or treasury withdraw later.

## MiniPay

Auralis defaults to USDm for MiniPay minting. See [docs/MINIPAY_COMPATIBILITY.md](docs/MINIPAY_COMPATIBILITY.md).

## Agent File

ERC-8004 starter metadata is served from:

```text
public/.well-known/agent.json
```

Update the domain, wallet address, and hosted image URL before registering the agent on Celo mainnet.
