const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 200
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    membershipLevel: {
        type: String,
        required: true,
        enum: ['bronze', 'silver', 'gold'],

    }

}, { timestamps: true });


postSchema.virtual('formattedCreatedAt').get( function() {
    return moment(this.createdAt).format('D MMM YYYY HH:mm')
})

postSchema.virtual('postMembershipScore').get( function() {
    const score = {
        bronze: 1,
        silver: 2,
        gold: 3
    }
    return score[this.membershipLevel]
})

postSchema.set('toJSON', {
    virtuals: true
})
postSchema.set('toObject', {
    virtuals: true
})

module.exports = mongoose.model('Post', postSchema)