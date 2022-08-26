const { Schema } = require('mongoose')

const likeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, // single user
        ref: 'User' // string value from the model creation 
    }
})

module.exports = likeSchema