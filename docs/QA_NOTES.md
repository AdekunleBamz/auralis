# QA Notes

## Browser Wallet

- Connect a Celo-compatible wallet.
- Refresh once after connecting and confirm the wallet status remains understandable.
- Confirm the wallet switch prompt is only shown outside MiniPay.
- Shape a prompt before attempting to mint.
- Confirm the mint button stays disabled when the preview is stale.
- Use at least one custom prompt and one built-in example prompt.

## MiniPay

- Open the app inside MiniPay.
- Confirm the app auto-connects when MiniPay exposes an account.
- Confirm the fee label uses USDm.
- Confirm the app does not ask MiniPay to switch chains.
- Save the MiniPay build link beside the wallet address used for the smoke test.

## Metadata API

- Run `npm run typecheck` locally before sharing a preview link.
- Call `/api/nft` with a known prompt and confirm the returned JSON includes `name`, `description`, and `image`.
- Confirm a mismatched prompt hash returns a 400 status instead of metadata.
