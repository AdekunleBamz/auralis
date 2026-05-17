# Metadata API

Auralis exposes generated NFT metadata through the app so minted token URIs can be reproduced from the prompt and creator.

## Compose Endpoint

`POST /api/agent/compose`

Body:

```json
{
  "prompt": "short artifact seed",
  "creator": "0xCreatorAddress"
}
```

The endpoint returns the generated draft, prompt hash, and agent action metadata.

## NFT Endpoint

`GET /api/nft?p=<prompt>&h=<promptHash>&c=<creator>`

The endpoint returns ERC-721 style metadata. If `h` is provided and does not match the generated prompt hash, the request returns a 400 response.

## Cache Behavior

Successful NFT metadata responses are immutable because the prompt, creator, and prompt hash fully describe the generated artifact.

Keep one accepted response body with the mint evidence so reviewers can compare future schema changes.

Store the prompt hash with that response body so support can reproduce the same metadata URL later.
