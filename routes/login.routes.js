const loginController=require("../controllers/login.controller");
module.exports=(app) =>{
    //login route
    app.get("/",loginController.index);

    //home route
    app.post("/home",loginController.home);

    app.get("/logout",loginController.logout);

}