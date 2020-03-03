const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const orderModel   = require('../models/Order').Order;
const rateModel   = require('../models/Rate').Rate;

//Read Last 5 Orders Made
router.get('/', (req, res) => {
  return mongoose
    .model('Order')
    .find({}).sort({'createdAt': 'desc'}).limit(5)
    .then (Order => res.json(Order))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

//show order By ID
router.get('/find', (req, res) => {
  return mongoose
    .model('Order')
    .findById({'_id': req.body.id})
    .then (Order => res.json(Order))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new Order
router.post('/new', (req, res) => {

    return new orderModel({
      from     : req.body.from,
      to       : req.body.to,
      sendAmount : req.body.sendAmount,
      receiveAmount : req.body.receiveAmount,
      account       : req.body.account
    })
    .save()
    //.then (order => orderModel.populate(order, {path: '_id'}))
    .then (order => res.json(order))
    .catch(err => res
      .status(400)
      .json({ok: false, error: err.message + " kizzo1"})
    );
  });


  //Update Order Send And Receive Amount
router.put('/update', (req, res) => {
  return mongoose
    .set('useFindAndModify', false)
    .model('Order')
    .findByIdAndUpdate(
      {'_id': req.body.id}, 
      {
        sendAmount  : req.body.sendAmount,
        receiveAmount : req.body.receiveAmount,
        account       : req.body.account
      },
      {new: true}
    )
    .then (Order => res.json({ok: true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});


//Delete Order By Id
router.delete('/delete', (req, res) => {
  return mongoose
    .model('Order')
    .findByIdAndDelete({_id : req.body.id})
    .then (Order => res.json({ok: true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

//Read Rates
router.get('/rate', (req, res) => {
  return mongoose
    .model('Rate')
    .find({})
    .then (Rate => res.json(Rate))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});


module.exports = router;