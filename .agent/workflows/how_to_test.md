---
description: How to test the crypto betting application
---

# Testing Workflow

1.  **Start the Application**:
    ```bash
    npm run dev
    ```

2.  **Seed the Database** (Important!):
    - Open your browser or Postman.
    - Send a POST request to `http://localhost:3000/api/seed`.
    - Or run this command in a separate terminal:
    ```bash
    curl -X POST http://localhost:3000/api/seed
    ```
    - This creates a sample "Premier League Week 1" round with matches.

3.  **Connect Wallet**:
    - Open the app in browser.
    - Click "Connect Wallet".
    - Connect using WalletConnect (mock or real).
    - Ensure you are on Base network (or see the "Wrong Network" prompt).

4.  **Simulate Deposit** (Since we are on localhost, webhooks won't fire):
    - You need to credit your user manually for testing.
    - Open your database or use the API:
    - First, ensure your user is created (happens on wallet connect).
    - Send a webhook simulation:
    ```bash
    curl -X POST http://localhost:3000/api/webhooks/alchemy \
      -H "Content-Type: application/json" \
      -d '{
        "activity": [{
          "category": "token",
          "asset": "USDC",
          "rawContract": { "address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" },
          "fromAddress": "0x...", 
          "toAddress": "YOUR_WALLET_ADDRESS_HERE",
          "value": 100,
          "hash": "0xmocktxhash"
        }]
      }'
    ```
    - Refresh the page to see your updated Internal Balance ($100).

5.  **Place Bets**:
    - Go to "Play Now" / Betting page.
    - Add predictions to Cart.
    - Click "Confirm Bets".
    - Watch your balance deduct.

6.  **Test Admin Scoring**:
    - Trigger the scoring API to simulate match results.
    ```bash
    curl -X POST http://localhost:3000/api/admin/results \
        -H "Content-Type: application/json" \
        -d '{
            "roundId": "ROUND_ID_FROM_SEED_RESPONSE", 
            "scores": [
                { "matchId": "MATCH_ID_1", "homeScore": 2, "awayScore": 1 }
            ]
        }'
    ```
    - If you won, your balance should increase.
