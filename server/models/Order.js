const mongoose  = require('mongoose');
const validator = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};

const OrderSchema  = new mongoose.Schema({
    from: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
    to: {
        type      : String,
        required  : true,
        validator : value => !validator.isEmpty(value)
      },
    sendAmount: {
    type      : Number,
    required  : true,
    validator : value => !validator.isEmpty(value)
    },
    receiveAmount: {
        type      : Number,
        required  : true,
        validator : value => !validator.isEmpty(value)
      },
    account: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    }

  }, SchemeConfig);
  
  module.exports.Order = mongoose.model('Order', OrderSchema, 'orders');