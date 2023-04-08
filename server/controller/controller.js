const userdb = require('../model/model');

// Create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Empty content!'});
        return;
    }

    // new user
    const user = new userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        class: req.body.class
    });

    // save user in db
    user.save(user)
    .then(data => {
        // redirect to home page
        res.redirect('/');
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error occurred while create operation'
        })
    })
}

// Retrieve all users or Retrieve single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        userdb.findById(id).then(data => {
            if (!data) {
                res.status(404).send({ message: `User with id: ${id} not found.`});
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send({ message: 'Error retrieving user with id: '+ id});
        })
    } else {
        userdb.find().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Error occurred while retrieving user information.'
            })
        })
    }
    
}

// Update user data
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Empty content!'});
    }

    const id = req.params.id;

    userdb.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `User with id: ${id} not found.`});
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error occurred while updating user information'
        })
    })
}

// Delete user 
exports.delete = (req, res) => {
    const id = req.params.id;

    userdb.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `User with id: ${id} not found.`});
        } else {
            res.send({
                message: 'User deleted successfully!'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error occurred while deleting user information.'
        })
    })
}