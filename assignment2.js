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
        const customers = database.collection('customers');
        const subjects = database.collection('subjects');
        const subjectStudentsMapping = database.collection('subjectStudentsMapping');

        // getSubjects api 
        app.get('/getSubjects', async (req, res) => {
            const studentId = req.query.studentId;
            const findStudent = await customers.findOne({ customerId: studentId });
            if (findStudent) {
                const cursor = await subjectStudentsMapping.find({ customerId: findStudent.customerId })
                const filterSubjects = await cursor.toArray();
                const subjectsArray = []
                for (let i = 0; i < filterSubjects.length; i++) {
                    const subjectId = filterSubjects[i].subjectId;
                    const findSubject = await subjects.findOne({ subjectId: subjectId });
                    subjectsArray.push(findSubject.subjectName)
                    console.log(findSubject.subjectName);
                }
                const result = { customerId: findStudent.customerId, name: findStudent.name, subjects: subjectsArray.join(', ') }
                console.log(result);
                return res.send(result)
            }
            console.log('Not found');
            res.send('Not found')
        })


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    console.log('student subjects Server running ok...');
    res.send('student subjects Server running ok...');
})



app.listen(port, () => {
    console.log('Listening from port', port);
})
