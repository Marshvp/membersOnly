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
    },
    admin: {
        type: Boolean,
        default: false
    }
})

userSchema.virtual('userMembershipScore').get( function() {
    const score = {
        bronze: 1,
        silver: 2,
        gold: 3
    }
    return score[this.membership]
})

userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('User', userSchema)