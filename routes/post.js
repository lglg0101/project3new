const { Router } = require("express");
const router = new Router();
const Post = require("./../models/post");
const Shop = require("./../models/shop");
const multerMiddleware = require("./../middleware/multer-configuration");

router.get("/list", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("_author")
      .populate("_shop")
      .sort({ createdAt: -1 })
      .exec();
    //console.log(posts);
    res.json({ posts });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  multerMiddleware.single("image"),
  async (req, res, next) => {
   
    try {
      const shop = await Shop.findOne({_owner: req.session.user})
      const data = {
      text: req.body.content,
      image: req.file.url,
      _author: req.session.user,
      _shop: shop._id
    };
    console.log("DATA BEFORE CREATE", data);

      const post = await Post.create(data);
      res.json({ post });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.get("/posts-from-shop/:shopId", async (req, res, next) => {
const shopId = req.params.shopId
console.log("SHOP-USER ON POST ROUTE", shopId)
  try {
    const posts = await Post.find({_shop: shopId})
    .sort({ createdAt: -1 })
    console.log("RESULT OF POSTS", posts);
    res.json({ posts });
  } catch (error) {
    console.log(error)
    next(error);
  }
});




router.get("/post-for-shop", async (req, res, next) => {
const userId = req.session.user
console.log("USER ON POST ROUTE", userId)
  try {
    const shop = await Shop.findOne({_owner: userId})
    const posts = await Post.find({_shop: shop._id})
    .sort({ createdAt: -1 })
    console.log("RESULT OF POSTS", posts);
    res.json({ posts });
  } catch (error) {
    console.log(error)
    next(error);
  }
});

    //REVIEWS OF MY SHOP
    // const shop = await Shop.findOne(_owner: req.session.user)
    // const reviews = await Review.find(_shop: shop._id)

router.patch('/:id', async (req, res, next) => {
  const { text } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
     
      ...(text ? { text } : {})
    }).exec();
    res.json({ post });
  } catch (error) {
    next(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    .populate("_author")
    .sort({ createdAt: -1 })
    .exec();
    res.json({ post });
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    await Post.findByIdAndRemove(req.params.id).exec();
    res.json({});
  } catch (error) {
    next(error);
  }
});



module.exports = router;