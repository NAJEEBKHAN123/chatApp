const express = require('express')
const router = express.Router();

const {signup, login, logout, updatePrfile, checkAuth}  = require('../controller/authController');
const protectRoute = require('../middleware/authMiddleware');

router.post('/signup', signup)
router.post('/login', login);
router.post('/logout', logout);


router.put('/update-profile', protectRoute, updatePrfile)

router.get('/check', protectRoute, checkAuth)


module.exports = router;