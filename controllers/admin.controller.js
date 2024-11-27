//users model
const listingModel = require("../models/users.model")

exports.seeallusers =async (req, res) =>{
    try {
        let users=await listingModel.find({role:"user"})
        res.render("seeallusers", { users }); 
      } catch (err) {
        res.status(500).send("Error rendering login page");
      }
}


exports.addnewuser = async (req, res) => {
    if (req.method === "GET") {
        try {
            res.render("addnewuser"); 
          } catch (err) {
            res.status(500).send("Error adding new user");
          }
    }

    else if (req.method === "POST") {
        try {
            const {name,email,password,role}=req.body;
            //email should be unique
            if (await listingModel.findOne({email:email})){
                return res.render("addnewuser", { message: "Email already exits"});

            }
            else{
                await listingModel.create({name,email,password,role});
                return res.redirect("/seeallusers");
            }
        }
        catch(err){
            return res.status(500).send("Error adding new user");
        }
    }
    
}

exports.deleteuser = async (req, res) => {
    try{
        const {id}=req.params;
        await listingModel.findByIdAndDelete(id);
        return res.redirect("/seeallusers");
    }
    catch(err){
        return res.status(500).send("Error deleting user");
    }

    }


exports.updateuser = async (req, res) => {
    if (req.method === 'GET'){
        try{
            const {id}=req.params;
            let user=await listingModel.findById(id);
            res.render("updateuser", { user });
        }
        catch(err){
            return res.status(500).send("Error updating user");
        }
    }
    else if (req.method === 'PUT'){
        try{
                const {id} = req.params;
                const {name,email,password,role} = req.body;
                await listingModel.findByIdAndUpdate(id, { name, email, password, role }); // Update user
                res.redirect("/seeallusers");
        }
        catch(err){
            return res.status(500).send("Error updating user");
        }
    }
        
}
