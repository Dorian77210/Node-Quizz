const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pseudo: { type: String, required: true },
    email: { type: String,
             required: true,
             unique: true,
             match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/
    },
    password: { type: String, required: true },
    lastName: { type: String },
    firstName: { type: String },
    createdAt: { type: String, default: new Date()}
});

module.exports = mongoose.model('User', userSchema);