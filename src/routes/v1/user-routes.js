const express = require('express');
const { UserMiddleware } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post(
    '/signup',
    UserMiddleware.validateSignupRequest,
    UserController.signup
);


router.post(
    '/signin',
    UserMiddleware.validateSigninRequest,
    UserController.signin
);

module.exports = router;