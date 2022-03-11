curl -X POST http://localhost:4001/user \
  -H 'Content-Type: application/json' \
  -H 'trace_id: 65086975-6b55-4ea3-8c8f-f100a0edce27' \
  -d '{"username": "bob123", "emailAddress": "bob@example"}'