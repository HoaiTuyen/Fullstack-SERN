import express from 'express'
const router = express.Router();
import  homeController  from '../controllers/homeController';
const initWebRouter = (app) => {
    router.get("/", homeController.getHomePage);
    return app.use("/", router);
}
module.exports = initWebRouter