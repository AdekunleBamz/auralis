# Environment Reference

Auralis reads public deployment settings from `NEXT_PUBLIC_*` variables so the browser can select the right Celo contracts.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Base URL used when the app builds NFT metadata links outside the browser. Falls back to the request origin when not set. |
| `NEXT_PUBLIC_CELO_CHAIN_ID` | Celo chain id. Use `42220` for mainnet and the SDK-supported testnet id for test deploys. |
| `NEXT_PUBLIC_AURALIS_NFT_ADDRESS` | Native CELO mint contract address. |
| `NEXT_PUBLIC_AURALIS_STABLE_NFT_ADDRESS` | Stablecoin mint contract address used by MiniPay. |
| `NEXT_PUBLIC_AURALIS_MINT_FEE_WEI` | Native mint fee in wei. |
| `NEXT_PUBLIC_AURALIS_STABLE_FEE_TOKEN` | Stablecoin fee token address. The production default is Celo Mainnet USDm. |
| `NEXT_PUBLIC_AURALIS_STABLE_FEE_AMOUNT` | Stablecoin fee amount in token base units. |
| `NEXT_PUBLIC_AURALIS_STABLE_FEE_SYMBOL` | Fee label shown in the UI. |

## Unit Notes

The CELO fee is stored in wei. The USDm fee is stored in USDm base units, and USDm uses 18 decimals on Celo mainnet.

## Vercel Notes

Set the same public variables in Vercel before promoting a production deployment. Changing contract addresses in Vercel requires a fresh deployment before browsers can read the new values.

Unset contract address variables keep the UI in a deploy-pending state, which is useful for local development before contracts are available.

Record the Vercel environment, reviewer, and deploy target whenever public contract variables change.

Before sharing a preview link, compare the browser-visible values against Vercel so stale deployments are caught early.
