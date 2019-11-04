# Blockchain-Cryptocurrency-
Core Blockchain Cryptocurrency and the API Around it with Dynamic P2P Server
To run the project:

     npm run dev
     
     
To Connect to peers: (run on different terminal window)

        HTTP_PORT=3002  P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
    
    
To See all blocks on the network:

    localhost:3001/blocks
    
T mine a transaction:

    localhost:3001/mine-transaction
    
To see your public key:

    localhost:3001/public-key
    
To send cryptocurrency:

    localhost:3001/transact
    

To see all transactions:

    localhost:3001/transactions
