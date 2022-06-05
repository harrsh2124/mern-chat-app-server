const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true
        },

        name: {
            type: String,
            required: [true, 'Username is required.']
        },

        password: {
            type: String,
            required: [true, 'Password is required.']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
