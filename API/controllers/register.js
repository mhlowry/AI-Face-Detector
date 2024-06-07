const handleRegister = (bcrypt, db) => (req, res) => {
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
};

export default handleRegister;