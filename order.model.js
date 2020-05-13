const mongoose = require('mongoose');
const Book = require('./book.model');
const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    shiped: {
        type: Boolean,
        default: false
    },
    books: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book'
        },
        quantity:{
            type: Number,
            default: 1
        },
        name:{
            type: String
        }
    }]
});
orderSchema.pre('save', async function (next){
    const order = this;
    for(let i = 0; i < order.books.length; i++){
        let book = await Book.findOne({_id:order.books[i].id});
        if(!book){
            order.books[i].name = "NaN";
        }else{
            order.books[i].name = book.title;
        }
    }
    next();
})
module.exports = mongoose.model('Order', orderSchema);