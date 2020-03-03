const mongoose  = require('mongoose');
const validator = require('validator');

//const SchemeConfig = {timestamps: true, skipVersioning: true};

const rateSchema  = new mongoose.Schema({
    ltceur: {
      type      : Number,
      required  : false,
      validator : value => !validator.isEmpty(value)
    },
    btceur: {
        type      : Number,
        required  : false,
        validator : value => !validator.isEmpty(value)
      },

  });

module.exports.Rate = mongoose.model('Rate', rateSchema, 'rate');