const express = require('express')
// const likeController = require('./../controllers/likeController')
const authController = require('../controllers/authController')

const router = express.Router()

//2 Protecred route
router.use(authController.protect)

//& Post: Add a new Like.
// router.post('/new', authController.getUser, likeController.addLike);
// router.get('/', authController.getUser, likeController.getLikes);

module.exports = router
