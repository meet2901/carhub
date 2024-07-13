const { TopologyType } = require('mongodb');
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['waiter', 'chef', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: false
    },

})

const person = mongoose.model('person', personSchema);

module.exports = person;