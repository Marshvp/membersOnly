const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 20
    },
    password: {
        type: String,
        required: true
    },
    membership: {
        type: String,
        required: true,
        enum: ['bronze', 'silver', 'gold'],
        default: 'bronze'
    }
})

module.exports = mongoose.model('User', userSchema)