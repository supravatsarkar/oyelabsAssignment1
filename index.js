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
        const users = database.collection('users');
        const customers = database.collection('customers');

        // API: login with mobile number and password 
        app.post('/login', async (req, res) => {
            const userMobileNo = req.body.mobileNo;
            const password = req.body.password;
            console.log(userMobileNo);
            const findUser = await users.findOne({ mobileNo: userMobileNo });
            if (findUser) {
                if (findUser.password === password) {
                    return res.json({ ...findUser, status: 'login success' });
                } else {
                    return res.send('Password not match.Please enter correct password');
                }
            } else {
                return res.send('Mobile number not exit in database');
            }
        })

        // API: Add customer 
        app.post('/addCustomer', async (req, res) => {
            const userMobileNo = req.query.userMobileNo;
            const findUser = await users.findOne({ mobileNo: userMobileNo });
            if (findUser) {
                if (findUser.role === 'admin') {
                    const customerMobileNo = req.body.mobileNo;
                    const findCustomer = await users.findOne({ mobileNo: customerMobileNo });
                    if (findCustomer) {
                        console.log('Mobile number already exits');
                        return res.send('Mobile number already exits');
                    }

                    const customerDetails = {
                        name: req.body.name,
                        mobileNo: req.body.mobileNo,
                        password: req.body.password,
                        role: 'customer',
                        email: req.body.email,
                        address: req.body.address
                    }
                    // add customer to db 
                    const result = await users.insertOne(customerDetails);
                    console.log(result);
                    res.send(result);
                } else {
                    return res.send('Not authorize. Only admin can add customer');
                }
            }
            res.send('You are not authenticated');

        })

        // API: get all customers 
        app.get('/customers', async (req, res) => {
            const cursor = users.find({ role: 'customer' });
            const customers = await cursor.toArray();
            console.log(customers);
            res.json(customers);

        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    console.log('Server running ok...');
    res.send('Mobile login and add customer API Server running ok...');
})



app.listen(port, () => {
    console.log('Listening from port', port);
})
