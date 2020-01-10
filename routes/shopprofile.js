'use strict';

const { Router } = require('express');
const router = new Router();

const Shop = require('./../models/shop')
;
const routeGuard = require('./../middleware/route-guard');
const uploader = require('../middleware/multer-configuration');

router.get('/shopprofile', routeGuard, (req, res, next) => {
  const shopId = req.session.shop;
  res.redirect(`/${shopId}`);
});

// router.get('/:shopId',routeGuard, (req, res, next) => {
//   const shopId = req.params.shopId;
//   let shop;
//   Shop.findById(shopId)
//     .then(document => {
//       shop = document;
//       return Post.find({ author: shopId })
//       .sort({ createdAt: -1 })
//       .populate('author');
//     })
//     .then(posts => {
//       res.render('profile', { shop, posts });
//     })
//     .catch(error => {
//       next(error);
//     });
// });


//EDITING USER INFORMATION 
//general
  router.get('/:shopId/edit',routeGuard, (req, res, next) => {
    const shopId = req.params.shopId;
    Shop.findById(shopId)
    .then(shop => {
      res.render('shop-edit', { shop });
    })
    .catch(error => {
      next(error);
    });
  });

  router.post('/:shopId/edit', (req, res, next) => {
    const shopId = req.params.shopId;
    Shop.findByIdAndUpdate(
         shopId
      ,
      {
        name: req.body.shopName,
        location: req.body.location,
        telephone: req.body.telephone,
        workingHours: req.body.workingHours,
        bio: req.body.bio
        

      }
    )
      .then(data => {
        res.redirect(`/${shopId}`);
      })
      .catch(error => {
        next(error);
      });
  });

// picture

router.get('/:shopId/edit/pic',routeGuard, (req, res, next) => {
  const shopId = req.params.shopId;
  Shop.findById(shopId)
  .then(shop => {
    res.render('shop-edit-pic', { shop });
  })
  .catch(error => {
    next(error);
  });
});

router.post('/:shopId/edit/pic',routeGuard, uploader.single('profile'), (req, res, next) => {
  const shopId = req.params.shopId;
  Shop.findByIdAndUpdate(
       shopId
    ,
    {
      imgPath: req.file.originalname,
      imgName: req.file.url
    }
  )
    .then(data => {
      res.redirect(`/${shopId}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/shopprofile', async (req, res, next) => {
  const shopId = req.session.shop;
  if (!shopId) {
    res.json({});
  } else {
    try {
      const shop = await Shop.findById(shopId);
      if (!shop) throw new Error('Signed in shop not found');
      res.json({ shop });
    } catch (error) {
      next(error);
    }
  }
});


module.exports = router;
