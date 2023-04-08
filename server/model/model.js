mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        rquired: true,
        unique: true
    },
    gender: String,
    class: String
})

// Custom validation for email, regex taken from https://www.w3resource.com/javascript/form/email-validation.php
schema.path('email').validate((val) => {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');

const userdb = mongoose.model('userdb', schema);

module.exports = userdb;