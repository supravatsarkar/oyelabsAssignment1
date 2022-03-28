const express = require('express');
const { userInfo } = require('os');
const app = express();
const port = 5000;

const adminUsers = [
    {
        mobileNo: '9876543210',
        name: 'admin1',
        password: '123456',
    }
]

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
