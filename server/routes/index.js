const { notFound, errHandler } = require("../middlewares/errorHandler");
const userRouter = require("./userRouter");


const initRoutes = (app)=>{
    app.use('/api/user',userRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes