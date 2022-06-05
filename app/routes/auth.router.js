const SignIn = require('../controllers/Signin');

const AuthRouter = require('express').Router();

AuthRouter.post('/signin', SignIn);

module.exports = AuthRouter;
