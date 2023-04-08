const {Router} = require('express');
const api= require('./api/rickandmorty')
const user= require('./user')
const mainRouter = Router();

mainRouter.use("/rickandmorty",api);
mainRouter.use("/user",user);

mainRouter.get('/', (req, res) => {
    res.status(200).json({pareceque:"funcó"})
})


module.exports = mainRouter;