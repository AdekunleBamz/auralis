# API Compose Empty Body Check

- Submit `POST /api/agent/compose` with an empty JSON body.
- Confirm the endpoint returns a controlled error or draft response without leaking stack details.
- Note the response status and body in the release evidence.
