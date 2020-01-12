"use strict";
const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
const bcryptjs = require("bcryptjs");
const multerMiddleware = require("./../middleware/multer-configuration");

//Sign Up 
router.post("/sign-up", multerMiddleware.single("image"), (req, res, next) => {
  const { username, email, city, isShop, password, bio } = req.body;
  const image = (req.file.url && req.file.url) || " ";
  console.log(image);
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        username,
        email,
        city,
        isShop,
        image,
        bio,
        passwordHash: hash
      });
    })
    .then(user => {
      console.log(user);
      req.session.user = user._id;
      res.json({ user });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});



//Sign In 
router.get('/sign-in', (req, res, next) => {
  const userId = req.session.user;
  if(req.session.user){
    res.redirect(`/${userId}`);
  } else {
    res.render('authentication/sign-in');}
  });

router.post("/sign-in", (req, res, next) => {
  let userId;
  let auxuser;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        userId = user._id;
        auxuser = user;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = userId;
        res.json({ auxuser });
      } else {
        return Promise.reject(new Error("Wrong password."));
      }
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.post("/sign-out", (req, res, next) => {
  req.session.destroy();
  // res.redirect(`/`);
  res.json({});
});

router.get("/loaduser", async (req, res, next) => {
  console.log("I am a user");
  const userId = req.session.user;
  if (!userId) {
    res.json({});
  } else {
    try {
      const user = await User.findById(userId);
      if (!user) throw new User("Signed in user not found");
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
});
module.exports = router;
