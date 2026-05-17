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

If the SDK contract package changes, update the app dependency and repeat the deployment smoke check before changing production addresses.

## Address Sync

When a contract is redeployed, update the environment variables first, then update the root README and deployment guide with the same addresses. Keeping the three locations aligned makes MiniPay support checks easier to audit.

Record the deployment transaction hash beside each synced address so future reviewers can trace the exact contract source.
