//users model
const listingModel = require("../models/users.model")

exports.seeallusers =async (req, res) =>{
    try {
        const usersSnapshot = await db.collection('users').get();
         // Map the snapshot to an array of user data
         const users = usersSnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));
        console.log(users);
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
            const usersRef = db.collection("users");
            const userSnapshot = await usersRef.where("email", "==", email).get();

            if (!userSnapshot.empty){
                return res.render("addnewuser", { message: "Email already exits"});

            }
            else{
                // Add new user to the database
            await usersRef.add({
                name,
                email,
                password,
                role
            });
                return res.redirect("/seeallusers");
            }
        }
        catch(err){
            return res.status(500).send("Error adding new user");
        }
    }
    
}

exports.deleteuser = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the user document from Firestore
        await db.collection("users").doc(id).delete();

        // Redirect to the users listing page
        return res.redirect("/seeallusers");
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).send("Error deleting user");
    }
};


exports.updateuser = async (req, res) => {
    if (req.method === "GET") {
        try {
            const { id } = req.params;

            // Fetch the user's current data from Firestore
            const userSnapshot = await db.collection("users").doc(id).get();

            const user = { id: userSnapshot.id, ...userSnapshot.data() };

            // Render the update user form with the current user data
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
                // Update the user document in Firestore
            await db.collection("users").doc(id).update({
                name,
                email,
                password,
                role,
            });
                res.redirect("/seeallusers");
        }
        catch(err){
            return res.status(500).send("Error updating user");
        }
    }
        
}
exports.seeallhalls =async (req, res) => {
    try {
        const hallsSnapshot = await db.collection('halls').get();
         // Map the snapshot to an array of user data
         const halls = hallsSnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));
        console.log(halls);
        
      } catch (err) {
        res.status(500).send("Error rendering login page");
      }
}   