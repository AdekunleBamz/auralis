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
- The detection result only selects the wallet flow; the connected account still comes from `eth_requestAccounts`.
- MiniPay sessions do not call `wallet_switchEthereumChain`.
- MiniPay minting uses `AuralisGenesisStable.mintWithStable(...)`.
- The default MiniPay mint fee is `0.0002 USDm`.
- The user approves USDm, then confirms the stablecoin mint.

## Stablecoin Handoff Checks

- Confirm `NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS` points to the latest stablecoin contract.
- Confirm `NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN` matches Celo Mainnet USDm before a production MiniPay test.
- Confirm the approval transaction completes before asking the user to mint.
- Confirm the mint transaction is sent only after the approval receipt is available.
- Keep the MiniPay flow on the configured chain instead of prompting a chain switch.

## Web Wallet Flow

Normal browser wallets can mint through `AuralisGenesis.mint(...)` with a native CELO fee.

Current default:

```text
0.002 CELO
```

The app keeps both paths visible so reviewers can see the standard web flow and the MiniPay stablecoin flow separately.

## Reviewer Notes

When sharing a MiniPay review build, include the deployed stable contract address and the USDm token address beside the URL so reviewers can verify both prompts against the configured environment.

Capture the MiniPay app version used for the review when fee or wallet behavior changes.

Repeat the MiniPay review after any stablecoin token address change, even when the UI copy stays the same.
