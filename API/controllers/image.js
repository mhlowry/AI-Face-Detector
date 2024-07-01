const updateImage = db => (req, res) => {
    const { id } = req.body;
    db.select().from('public.users').where('id', '=', id)
    .increment('count', 1)
    .returning('count')
    .then(entries => {
        res.json(entries[0])})
    .catch(err => res.status(400).json('unable to get entries'))
};

export default updateImage;