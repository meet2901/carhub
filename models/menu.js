const { TopologyType } = require('mongodb');
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    ingreediant: {
        type: [String],
        required:false
    },
    prize: {
        type: Number,
        required: false,
        unique:true
    },
    water: {
        type: String,
        enum: ['boil', 'fresh', 'still'],
        required: false
    }
})

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;