const fetchProfile = db => (req, res) => {
    const { id } = req.params;

    db.select().from('public.users')
    .where({ id })
    .then(user => {
        console.log(user[0]);
        res.json(user[0]);
    })
    .catch(() => res.status(404).json('no such user'))
};

export default fetchProfile;