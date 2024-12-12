const adminController=require("../controllers/admin.controller")
const auth = require("../middlewares/auth.mw");
module.exports=(app) =>{
    //seeallusers route
    app.get("/seeallusers",auth.isAuthenticated,adminController.seeallusers);
    app.get("/addnewuser",auth.isAuthenticated,adminController.addnewuser);
    app.post("/addnewuser",auth.isAuthenticated,adminController.addnewuser);
    app.delete("/deleteuser/:id",auth.isAuthenticated,adminController.deleteuser);
    app.get("/updateuser/:id",auth.isAuthenticated,adminController.updateuser);
    app.put("/updateuser/:id",auth.isAuthenticated,adminController.updateuser);
    app.get("/seeallhalls",auth.isAuthenticated,adminController.seeallhalls);

    app.get("/addnewhall",auth.isAuthenticated,adminController.addnewhall);
    app.post("/addnewhall",auth.isAuthenticated,adminController.addnewhall);

    app.delete("/deletehall/:id",auth.isAuthenticated,adminController.deletehall);
    app.get("/updatehall/:id",auth.isAuthenticated,adminController.updatehall);
    app.put("/updatehall/:id",auth.isAuthenticated,adminController.updatehall);
    app.get("/dashboard/:role",auth.isAuthenticated,adminController.dashboard);

    
}