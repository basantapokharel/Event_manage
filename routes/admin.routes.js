const adminController=require("../controllers/admin.controller")

module.exports=(app) =>{
    //seeallusers route
    app.get("/seeallusers",adminController.seeallusers);
    app.get("/addnewuser",adminController.addnewuser);
    app.post("/addnewuser",adminController.addnewuser);
    app.delete("/deleteuser/:id",adminController.deleteuser);
    app.get("/updateuser/:id",adminController.updateuser);
    app.put("/updateuser/:id",adminController.updateuser);
    
}