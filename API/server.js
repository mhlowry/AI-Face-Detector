/*
    /                -> res = this is working
    /signin          -> POST = success/fail
    /register        -> POST = user
    /profile/:userId -> GET = user
    /image           -> PUT = user
*/

import express from 'express';

const app = express();
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'cookies',
            count: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            count: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
    } else res.status(400).json('error logging in');       
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        count: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    const user = findUser(id);
    if (user) {
        return res.json(user);
    } else {
        res.status(404).json('no such user');
    }
});

app.post('/image', (req, res) => {
    const { id } = req.body;
    const user = findUser(id);
    if (user) {
        user.count++;
        return res.json(user.count);
    } else {
        res.status(404).json('no such user');
    }
});

app.listen(3000, () => {
    console.log("app is running on port 3000");
});

const findUser = (id) => {
    return database.users.find(user => user.id === id);
}