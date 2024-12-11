//firebase
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../service_acc/service_account.json");
try{
    const firebaseApp=initializeApp({
        credential: cert(serviceAccount)
      });
        // Initialize Firestore
        db = getFirestore(firebaseApp);
        console.log("Connected to Firestore successfully.");



}

catch(err)
{
    console.log("Error connecting to Firestore:", err);
}

module.exports = db;