# Auralis Contract Deployment

The Remix-ready Solidity contracts are maintained in the standalone SDK repo and published with the SDK package.

```text
../auralis-sdk/contracts/AuralisGenesis.sol
../auralis-sdk/contracts/AuralisGenesisStable.sol
```

Full deployment guide:

```text
../auralis-sdk/docs/remix-deployment.md
```

## Native CELO Contract

Deploy `AuralisGenesis.sol` for normal wallet minting with native CELO fees:

```text
name_: Auralis
symbol_: AURA
initialOwner_: <owner wallet address>
treasury_: <treasury wallet address>
mintFeeWei_: 2000000000000000
```

If the contract was deployed with a zero mint fee, update it later from Remix:

```text
setMintFee(2000000000000000)
```

## Stablecoin Contract

Deploy `AuralisGenesisStable.sol` for MiniPay minting with USDm fees:

```text
name_: Auralis
symbol_: AURA
initialOwner_: <owner wallet address>
treasury_: <treasury wallet address>
nativeMintFeeWei_: 2000000000000000
stableFeeToken_: 0x765DE816845861e75A25fCA122bb6898B8B1282a
stableMintFee_: 200000000000000
```

## App Configuration

After deploying on Celo mainnet, set the contract addresses in `.env.local`:

```bash
NEXT_PUBLIC_AURALIS_NFT_ADDRESS=<deployed AuralisGenesis address>
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_AURALIS_MINT_FEE_WEI=2000000000000000
NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS=<deployed AuralisGenesisStable address>
NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_AURALIS_STABLE_FEE_AMOUNT=200000000000000
NEXT_PUBLIC_AURALIS_STABLE_FEE_SYMBOL=USDm
```

`AuralisGenesis` holds CELO fees directly. `AuralisGenesisStable` holds native and stablecoin fees directly. The configured owner or treasury can withdraw later.
