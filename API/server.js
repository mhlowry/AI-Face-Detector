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

const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'postgres://ai_face_db_user:bHl9jF1ZT9a3SO4OGylExq0Jc2uTTpyp@dpg-cpia5jsf7o1s73bep14g-a/ai_face_db',
    ssl: { rejectUnauthorized: false },
    host: 'dpg-cpia5jsf7o1s73bep14g-a',
    port: '5432',
    user: 'ai_face_db_user',
    password: 'bHl9jF1ZT9a3SO4OGylExq0Jc2uTTpyp',
    database: 'ai_face_db',
  }
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