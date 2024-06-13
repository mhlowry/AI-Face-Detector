import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import fetchRoot from './controllers/root.js';
import fetchProfile from './controllers/profile.js';
import updateImage from './controllers/image.js';

const app = express();
app.use(express.json());
app.use(cors());

console.log(bcrypt.hashSync('password'));

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});  

// Get 
app.get('/', fetchRoot(db));
app.get('/profile/:id', fetchProfile(db));

// Post
app.post('/signin', handleSignIn(bcrypt, db));
app.post('/register', handleRegister(bcrypt, db));

// Put
app.put('/image', updateImage(db));
    
app.listen(4000, () => {
    console.log(`app is running on port 4000`);
});