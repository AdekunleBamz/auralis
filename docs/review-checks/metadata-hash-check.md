# Metadata Hash Check

When testing `/api/nft`, pass both a prompt and its expected hash, then confirm the route rejects mismatched hashes with a `400` response.

This keeps the generated metadata tied to the prompt that the user approved before minting.
