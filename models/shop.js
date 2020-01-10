"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true
    },

    _owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    shopAdress: {
      type: String
      //default: 'Point'
    },
    
    bio: String, 

    coordinates: {
      type: [Number],
      min: -180,
      max: 180
    },
    telephone: String,

    //MAP LOCATION API SCHEMA HERE

    //confirmationCode: String,

    image: {
      type: String
    },

    workingHours: String,

    status: {
      type: String,
      enum: ["Active", "Pending"],
      default: "Pending"
    }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Shop", schema);
