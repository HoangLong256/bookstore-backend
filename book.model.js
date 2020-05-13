const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: String,
        required: true,
        trim: true
    },
    pages:{
        type: Number,
        default: 0
    },
    year:{
        type: Number,
        default: 0
    },
    publisher:{
        type: String,
        default: 'NaN'
    },
    price:{
        type: Number,
        required: true
    },
    availability:{
        type:Boolean,
        default: true
    },
    description:{
        type: String,
        default: 'NaN'
    },
    image:{
        type: String,
        default: 'defaul.jpg'
    }
});
module.exports = mongoose.model('Book', bookSchema);