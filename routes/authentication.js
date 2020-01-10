"use strict";
const { Router } = require("express");
const router = new Router();
const User = require("./../models/user");
// const Shop =  require("./../models/shop");
const bcryptjs = require("bcryptjs");
const multerMiddleware = require("./../middleware/multer-configuration");
router.post("/sign-up", multerMiddleware.single("image"), (req, res, next) => {
  console.log("REEEEEEQ BOOOOODY", req.body);
  console.log("REEEEEE;Q FILEEEEE", req.file);
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
    // .then(
    // transporter.sendMail({
    //   from: `Thrift Point<${process.env.EMAIL}>`,
    //   to: req.body.email,
    //   subject: 'Welcome To Thrift Point Community! Please Verify Your email to get access to all the cool features',
    //   // text: `https://new-day-journal.herokuapp.com/auth/confirm/${token}`,
    //       html:`
    //   <style></style>
    //   <div style="background-colour: yellow">
    //   <h1 style="color:  #779FA1; font-size: 50px; text-align: center">Welcome To Thrift Point</h1>
    //   <h2 style="color: #5C7457; font-size: 40px; text-align: center"><strong>
    //   // Please verify your email by clicking <a href="https://new-day-journal.herokuapp.com/auth/confirm/${token}">
    //   here</a></h2
    //   </div>
    //   `
    // }))
    .catch(error => {
      console.log(error);
      next(error);
    });
});
// router.get('/confirm/:code', (req, res, next) => {
//     const code = req.params.code;
//     User.findOneAndUpdate({confirmationCode : code}, {status: "Active"})
//     .then(user => {
//       req.session.user = user._id;
//       res.redirect(`/${user._id}`);
//     })
//     .catch(error => {
//       next(error);
//     });
//   });
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
  console.log("I am loaduser");
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