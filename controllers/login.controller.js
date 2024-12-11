//users model
const listingModel = require("../models/users.model")

//index route
exports.index =async (req, res) =>{
    try {
        res.render("login"); // Renders views/login.ejs
      } catch (err) {
        res.status(500).send("Error rendering login page");
      }
}


//home route

exports.home =async (req, res) => {
    try{
        let {email,password}=req.body;
        // Query Firestore for a user with the provided email
        const usersRef = db.collection('users');
        // console.log("usersRef",usersRef);

        const snapshot = await usersRef.where('email', '==', email).get();
        
        if (snapshot.empty) {
            // User not found
            return res.render("login", { message: "User not found"});
        }

        const userDoc=snapshot.docs[0].data();

        // check password
        if(userDoc.password === password){
            userId=snapshot.docs[0].id;
            console.log(userId);
            req.session.userId = userId;  // Store the userId in the session

            if(userDoc.role=="admin"){
                return res.render("admin_dashboard");
            }else{
                return res.render("user_dashboard");
            }
        } else {
            // Password does not match
            return res.render("login", { message: "Incorrect password"});
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send("Error logging in");
    }
        
}
