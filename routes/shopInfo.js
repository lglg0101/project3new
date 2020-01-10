"use strict";

const { Router } = require("express");
const router = new Router();

const Shop = require("./../models/shop");
const routeGuard = require("./../middleware/route-guard");
const uploader = require("../middleware/multer-configuration");

router.post("/shop-info", uploader.single("image"), (req, res, next) => {
  console.log("REQ BODY", req.body);
  const image = (req.file.url && req.file.url) || "";
  const {
    shopName,
    lng,
    lat,
    shopAdress,
    telephone,
    workingHours,
    bio
  } = req.body;
  console.log("shop info", req.body);
  return Shop.create({
    shopName,
    shopAdress,
    coordinates: [lng, lat],
    telephone,
    image,
    workingHours,
    bio,
    _owner: req.session.user
  })
    .then(shop => {
      console.log(shop);
      //req.session.shop = shop._id;
      res.json({ shop });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get("/", async (req, res, next) => {
  try {
    const shops = await Shop.find()
      .populate("_owner")
      .sort({ createdAt: -1 })
      .exec();
    res.json({ shops });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/my-shop", async (req, res, next) => {
  const id = req.session.user;
  console.log("ID ON THE BACKEND", id);
  try {
    const shops = await Shop.findOne({ _owner: id }).exec();
    res.json({ shops });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const shopId = req.params.id;
  try {
    const shops = await Shop.findById(shopId)
      .populate("_owner")
      .sort({ createdAt: -1 })
      .exec();
    res.json({ shops });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
