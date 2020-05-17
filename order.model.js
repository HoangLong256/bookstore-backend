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
    shipped: {
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
        title:{
            type: String
        },
        price:{
            type: Number,
            default: 0
        }
    }]
});
orderSchema.pre('save', async function (next){
    const order = this;
    for(let i = 0; i < order.books.length; i++){
        let book = await Book.findOne({_id:order.books[i].id});
        if(!book){
            order.books[i].title = "NaN";
        }else{
            order.books[i].title = book.title;
        }
    }
    next();
})
module.exports = mongoose.model('Order', orderSchema);