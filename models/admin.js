const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, required: true },
    accountID: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    status: {
        isLoggedIn: { type: Boolean, required: true },
        loginAttempts: { type: Number, required: true },
        isBlocked: { type: Boolean, required: true }
    }
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);


