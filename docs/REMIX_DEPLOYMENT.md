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
mintFeeWei_: 2000000000000000
```

Current deployed contract:

```text
0x3CB6e2fC05B6ab2A9BA2093418Befb0Ed2FE394F
```

Current deployed stable contract:

```text
0xd36cF3dD4F20CFCf19ED06b2fe089CBf07a94585
```

For the deployed contract, call this in Remix if the constructor fee was `0`:

```text
setMintFee(2000000000000000)
```

After deploying on Celo mainnet, add the deployed address to `.env.local`:

```bash
NEXT_PUBLIC_AURALIS_NFT_ADDRESS=0x3CB6e2fC05B6ab2A9BA2093418Befb0Ed2FE394F
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_AURALIS_MINT_FEE_WEI=2000000000000000
NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS=0xd36cF3dD4F20CFCf19ED06b2fe089CBf07a94585
NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_AURALIS_STABLE_FEE_AMOUNT=200000000000000
NEXT_PUBLIC_AURALIS_STABLE_FEE_SYMBOL=USDm
```

`AuralisGenesis` holds CELO fees directly. The owner or treasury can call `withdraw()` later.

MiniPay USDm fees use `AuralisGenesisStable.sol`, because the deployed `AuralisGenesis` contract only accepts native CELO mint fees.
