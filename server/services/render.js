const axios = require('axios'); // allows to make API requests


exports.homeRoutes = (req, res) => {
    // Make a GET request to /api/users
    axios.get('http://localhost:3000/api/users')
    .then((response) => {
        res.render('index', { users: response.data});
    }).catch(err => {
        res.send(err);
    });
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
    .then((user) => {
        res.render('update_user', { user: user.data});
    }).catch(err => {
        res.send(err);
    });
}