const express = require('express');
const route = require('./controllers/index');

const routers = express.Router();

routers.use('/login', route.authRouter);
routers.use('/user', route.userRouter);
routers.use('/categories', route.categoryRouter);
routers.use('/post', route.postRouter);

module.exports = routers;