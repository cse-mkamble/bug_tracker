const mongoose = require('mongoose')

const bugsSchema = new mongoose.Schema({
    owner: {
        type: String,
    },
    title: {
        type: String,
    },
    status: {
        type: String,
    },
    priority: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('bugs', bugsSchema)