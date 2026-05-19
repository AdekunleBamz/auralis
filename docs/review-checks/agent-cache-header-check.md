# Agent Cache Header Check

- Confirm the hosted `/.well-known/agent.json` response does not use a cache policy that hides release-day updates.
- Verify a hard refresh returns the current agent name, wallet, and image URL after deployment.
- Record the checked production URL in the release notes.
