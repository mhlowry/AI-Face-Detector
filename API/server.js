import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: 'test',
    database: 'smart-brains',
  },
});

app.get('/', (req, res) => {
    db('users').select().then(data => {
        res.json(data);
    })
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    db.select('email', 'hash').from('login')
        .where({ email })
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                .where({ email })
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json('unable to get user'));   
            }
            else res.status(400).json('wrong credentials');
        })
        .catch(err => res.status(400).json('wrong credentials'));
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            trx('public.users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date() 
            })
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Email already exists'))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    });
    
    
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;

    db.select().from('public.users')
    .where({ id })
    .then(user => {
        console.log(user[0]);
        res.json(user[0]);
    })
    .catch(() => res.status(404).json('no such user'))
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('count', 1)
    .returning('count')
    .then(count => {
        res.json(count[0])})
    .catch(err => res.status(400).json('unable to get count'))
    });
    

app.listen(3001, () => {
    console.log("app is running on port 3001");
});

const findUser = (id) => {
    return database.users.find(user => user.id === id);
}

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });