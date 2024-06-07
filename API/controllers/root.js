const fetchRoot = db => (req, res) => {
    db('users').select().then(data => {
        res.json(data);
    })
};

export default fetchRoot;