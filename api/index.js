const express = require('express')
const router = express.Router()

module.exports = router

router.use('/login', require('./login'))
router.use('/student', require('./student'))
router.use('/movie', require('./movie'))
router.use('/movie_actor',require('./movie_actor'))
router.use('/movie_genres',require('./movie_genres'))
router.use('/movie_production',require('./movie_production'))
router.use('/movie_director',require('./movie_director'))

