const express = require('express');
const { id } = require("tigerbeetle-node");
const { createClient, CreateAccountError, CreateTransferError } = require("tigerbeetle-node");

// Create a client object that we use as a sort of middleman object to do all the cool shit
const client = createClient({
    cluster_id: 0n,
    replica_addresses: [process.env.PORT || '3000'],
})
const app = express();

async function test(){
    const account0 = {
        id: 102n,
        debits_pending: 0n,
        debits_posted: 0n,
        credits_pending: 0n,
        credits_posted: 0n,
        user_data_128: 0n,
        user_data_64: 0n,
        user_data_32: 0,
        reserved: 0,
        ledger: 1,
        code: 1,
        timestamp: 0n,
        flags: 0,
      };
      
    const account_errors = await client.createAccounts([account0]);
    const accountodata = await client.lookupAccounts([102n]);
    console.log("Didnt break")
    console.log(accountodata.id);
}

test();
  // Error handling omitted.

// Middleware to parse incoming JSON requests
app.use(express.json());
console.log("Initialisation completed successfully");
// GET endpoint
app.get('/', (req, res) => {
    res.send("Shit be bussin'");
});

// POST endpoint
app.post('/yeet', async (req, res) => {
    const { name, age } = req.body;
    console.log("Hello");


        const account = {
            id: id(), // TigerBeetle time-based ID.
            debits_pending: 0n,
            debits_posted: 0n,
            credits_pending: 0n,
            credits_posted: 0n,
            user_data_128: 0n,
            user_data_64: 0n,
            user_data_32: 0,
            reserved: 0,
            ledger: 1,
            code: 718,
            flags: 0,
            timestamp: 0n,
          };
          
        // const account_errors = await client.createAccounts([account]);
          // Error handling omitted.

        console.log("It didnt break yet");

        // Send response after successful operation
        res.json({
            message: 'Data received successfully!',
            name,
            age
        });

   
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
