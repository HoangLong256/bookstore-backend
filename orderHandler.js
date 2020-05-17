// handler.js
'use strict';
require('dotenv').config({ path: './variables.env'});
const connectToDatabase = require("./db");
const Order = require("./order.model");
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    const newOrder = new Order(JSON.parse(event.body));
    newOrder.save()
    .then(order =>
      callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(order)
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
    Order.findById(event.pathParameters.id)
      .then(order =>
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(order)
        })
      )
      .catch(error =>
        callback(null, {
          statusCode: error.statusCode || 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the item.'
        })
      );
  });
};

module.exports.getAll =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Order.find()
      .then(orders =>
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(orders)
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
    Order.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true
      }
    )
      .then(order =>
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(order)
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
    Order.findByIdAndRemove(event.pathParameters.id)
      .then(order =>
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({
            message: 'Removed note with id: ' + order._id,
            order: order
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