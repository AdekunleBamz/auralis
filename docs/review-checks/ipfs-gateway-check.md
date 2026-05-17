# IPFS Gateway Check

- Test metadata and image links through the configured gateway.
- Confirm the gateway response does not require a private session.
- Keep the tested gateway URL in release evidence.
- Record the first successful HTTP status code for the gateway check.
- Retry once after a short delay if the first gateway response is still propagating.
