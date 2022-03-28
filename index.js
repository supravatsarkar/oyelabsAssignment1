const express = require('express');
const { userInfo } = require('os');
const app = express();
const port = 5000;
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
        const users = database.collection('users');

        //API: creating user 
        app.post('/createUser', async (req, res) => {
            const userDetails = {
                name: req.body.name,
                mobileNo: req.body.mobileNo,
                role: req.body.role,
                password: req.body.password
            }
            console.log(userDetails);
            const result = await users.insertOne(userDetails);
            console.log(result);
            res.json(result);
        })

        // API: login with mobile number and password 
        app.post('/login', async (req, res) => {
            const userMobileNo = req.body.mobileNo;
            const password = req.body.password;
            console.log(userMobileNo);
            const findUser = await users.findOne({ mobileNo: userMobileNo });
            if (findUser) {
                if (findUser.password === password) {
                    return res.send('Login Success');
                } else {
                    return res.send('Password not match.Please enter correct password');
                }
            } else {
                return res.send('Mobile number not exit in database');
            }
        })

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
