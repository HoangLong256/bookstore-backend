// handler.js
'use strict';
require('dotenv').config({ path: './variables.env'});
const connectToDatabase = require("./db");
const Book = require("./book.model");
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    const newBook = new Book(JSON.parse(event.body));
    newBook.save()
    .then(book =>
      callback(null, {
      statusCode: 200,
      body: JSON.stringify(book)
      })
    )
    .catch(error =>
      callback(null, {
      statusCode: error.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the item.'
      })
    );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.findById(event.pathParameters.id)
      .then(book =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(book)
        })
      )
      .catch(error =>
        callback(null, {
          statusCode: error.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the item.'
        })
      );
  });
};

module.exports.getAll =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.find()
      .then(books =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(books)
        })
      )
      .catch(error =>
        callback(null, {
          statusCode: error.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the items.'
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true
      }
    )
      .then(book =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(book)
        })
      )
      .catch(error =>
        callback(null, {
          statusCode: error.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not update the items.'
        })
      );
  });
};
    
module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.findByIdAndRemove(event.pathParameters.id)
      .then(book =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed note with id: ' + book._id,
            book: book
          })
        })
      )
      .catch( error =>
        callback(null, {
          statusCode: error.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not delete the item.'
        })
      );
  });
};