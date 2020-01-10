'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  shopId: String,
  userId: String

},
  {
    timestamps: true
  });

module.exports = mongoose.model('Favorites', schema);
