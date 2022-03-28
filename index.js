const express = require('express');
const { userInfo } = require('os');
const app = express();
const port = 5000;
require('dotenv').config()
const { MongoClient } = require("mongodb");


const uri =
    `mongodb+srv://${process.env.DB_USER_ID}:${process.env.DB_PASSWORD}@cluster0.m4rht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);
// create new mongo clients 
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('oyelabs_assignment');
        const movies = database.collection('adminUsers');

        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);

        // console.log(movie);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    console.log('Server running ok...');
    res.send('Server running ok...');
})

app.post('/login', (req, res) => {
    const mobileNo = req.body.mobileNo;
    const findAdmin = adminUsers.find(mobileNoFromDB => mobileNoFromDB === mobileNo);

})

app.listen(port, () => {
    console.log('Listening from port', port);
})
