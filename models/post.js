const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postScehma = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})


module.exports = mongoose.model('post', postScehma)