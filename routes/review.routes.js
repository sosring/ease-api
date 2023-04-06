const router = require('express').Router({ mergeParams: true })
const reviewCtrl = require('../controllers/reviewCtrl')
const authCtrl = require('../controllers/authCtrl')

router.route('/')
  .get(reviewCtrl.getAllReviews)
  .post(authCtrl.protect, reviewCtrl.postReview)

router.route('/:id')
  .get(reviewCtrl.getReview)
  .patch(authCtrl.protect, reviewCtrl.updateReview)

module.exports = router
