'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  image: {
    type: String
  },

  city :{
    type : String,
    // required: true,
    trim: true
  },

  isShop: {
    type: Boolean,
    default: false
    // required: true
  },

  confirmationCode: String,
  bio: String,

  status: {
    type: String,
    enum: ["Active", "Pending"],
    default: "Pending"
  },
 
  passwordHash: {
    type: String
  },

  shopName: {
    type: String,
    // required: true,
    trim: true,
    lowercase: true
  },
  
  shopAdress: {
    type: String
  },

  coordinates: [{ 
    type: Number
  }],

  telephone: String,
  workingHours: String
},

 {
    timestamps: true
  }
  );

module.exports = mongoose.model('User', schema);

