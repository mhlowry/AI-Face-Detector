const updateImage = db => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('count', 1)
    .returning('count')
    .then(count => {
        res.json(count[0])})
    .catch(err => res.status(400).json('unable to get count'))
};

export default updateImage;