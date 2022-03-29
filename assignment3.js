const express = require('express');
const { userInfo } = require('os');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient } = require("mongodb");

// for parsing application/json
app.use(express.json());

const uri =
    `mongodb+srv://${process.env.DB_USER_ID}:${process.env.DB_PASSWORD}@cluster0.m4rht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);
// create new mongo clients 
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('db connected')
        const database = client.db('oyelabs_assignment');
        const newCustomers = database.collection('newCustomers');



        const customersArray = [
            { email: "anurag11@yopmail.com", name: "anurag" },
            { email: "sameer11@yopmail.com", name: "sameer" },
            { email: "rabi11@yopmail.com", name: "rabi" },
            { email: "akash11@yopmail.com", name: "akash" },
            { email: "anjali11@yopmail.com", name: "anjali" },
            { email: "santosh11@yopmail.com", name: "santosh" },
            { email: "madhab11@yopmail.com", name: "madhab11" },
        ];

        for (let i = 0; i < customersArray.length; i++) {
            const filter = { email: customersArray[i].email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: customersArray[i].name
                },
            };
            const result = await newCustomers.updateOne(filter, updateDoc, options);
            console.log(result, i);
        }


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    console.log('Server running ok...');
    res.send('Server running ok...');
})



app.listen(port, () => {
    console.log('Listening from port', port);
})
