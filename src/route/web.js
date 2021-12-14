import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/show-crud', homeController.showCRUD);
    router.get('/edit-crud', homeController.geteditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    //router.post('/api/get-all-user', userController.handleGetAllUser);
    // router.get("/",(req,res) => {       
    //     return res.send("Hello world with Kurawata")
    // });
    router.get("/hoidanit", (req, res) => {
        return res.send("Hoi dan IT")
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;