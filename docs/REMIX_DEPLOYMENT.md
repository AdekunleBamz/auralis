# Auralis Contract Deployment

The Remix-ready Solidity contract is maintained in the SDK repo:

```text
/Users/apple/auralis-sdk/contracts/AuralisGenesis.sol
```

Full deployment guide:

```text
/Users/apple/auralis-sdk/docs/remix-deployment.md
```

Use these constructor values for the first Proof of Ship deployment:

```text
name_: Auralis
symbol_: AURA
initialOwner_: your deployer wallet address
treasury_: your payout wallet address
mintFeeWei_: 0
```

After deploying on Celo mainnet, add the deployed address to `.env.local`:

```bash
NEXT_PUBLIC_AURALIS_NFT_ADDRESS=0xYourDeployedContract
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_AURALIS_MINT_FEE_WEI=0
```
