
const data=require("./users")
const db=require("../configs/firebase.config")


// Initialize Firestore
const initDB = async () => {
  try {
    const collectionRef = db.collection("users");

    // Delete all existing documents
    const snapshot = await collectionRef.get();
    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    // Insert new data
    const insertPromises = data.users.map(async(user) =>
    {
      docRef= await collectionRef.add(user);
    //   const docId = docRef.id; 
    //   console.log(docId);

    });
    await Promise.all(insertPromises);

    console.log("Data was initialized in Firestore.");
  } catch (error) {
    console.error("Error initializing Firestore data:", error);
  }
};

// Call the function to initialize the database
initDB();
