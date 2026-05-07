# Contracts

The canonical Auralis contract sources live in the standalone SDK repo so the app and package stay in sync:

```text
../auralis-sdk/contracts/AuralisGenesis.sol
../auralis-sdk/contracts/AuralisGenesisStable.sol
```

Use the deployment guide at:

```text
../auralis-sdk/docs/remix-deployment.md
```

The app reads deployed contract addresses from environment variables:

```bash
NEXT_PUBLIC_AURALIS_NFT_ADDRESS=<deployed AuralisGenesis address>
NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS=<deployed AuralisGenesisStable address>
```
