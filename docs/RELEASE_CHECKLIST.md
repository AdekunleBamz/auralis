# Release Checklist

Use this checklist before sharing a production URL.

- Run `npm run lint`.
- Run `npm run build`.
- Confirm the Vercel project has the current `NEXT_PUBLIC_AURALIS_*` values.
- Open the deployed URL in a normal browser wallet.
- Open the deployed URL inside MiniPay.
- Confirm the MiniPay path shows the USDm fee and stable contract.
- Confirm the browser wallet path shows the native CELO fee and native contract.
- Open one generated `/api/nft` URL and confirm it returns metadata JSON.
- Attach one accepted metadata response and mint transaction hash to the release notes.
