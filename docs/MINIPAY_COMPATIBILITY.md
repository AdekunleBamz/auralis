# MiniPay Compatibility

Auralis is designed around MiniPay USDm minting on Celo.

## USDm Default

The app defaults to Celo Mainnet USDm for MiniPay mint fees:

```text
0x765DE816845861e75A25fCA122bb6898B8B1282a
```

This address is committed in:

- `src/lib/celo.ts`
- `.env.example`
- `docs/REMIX_DEPLOYMENT.md`
- `README.md`

## MiniPay Flow

- The app detects MiniPay through `window.ethereum.isMiniPay` or the browser user agent.
- MiniPay sessions do not call `wallet_switchEthereumChain`.
- MiniPay minting uses `AuralisGenesisStable.mintWithStable(...)`.
- The default MiniPay mint fee is `0.0002 USDm`.
- The user approves USDm, then confirms the stablecoin mint.

## Web Wallet Flow

Normal browser wallets can mint through `AuralisGenesis.mint(...)` with a native CELO fee.

Current default:

```text
0.002 CELO
```

The app keeps both paths visible so reviewers can see the standard web flow and the MiniPay stablecoin flow separately.
