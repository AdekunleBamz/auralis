# Security Notes

- Treat all contract addresses as release-critical configuration.
- Verify the owner and treasury wallets before setting production variables.
- Keep private keys out of the repository and out of Vercel public variables.
- Do not share production deploy links until the MiniPay and browser wallet flows have both been checked.
- Recheck fee values after every contract redeploy.
- Review the treasury wallet in production settings before each stablecoin mint release.
