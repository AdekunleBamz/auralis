# RPC Fallback Timeout Check

- Simulate a slow Celo RPC response during contract reads.
- Confirm the UI reaches a clear retry or loading state instead of hanging indefinitely.
- Verify retrying does not submit a duplicate mint transaction.
