const hallModel = require("../models/halls.model")
const bookingModel = require("../models/bookings.model")

exports.hall_bookings = async (req, res) => {

    try {
        const hallsRef = db.collection('halls');
        const snapshot = await hallsRef.get();
        const halls = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        //console.log("Halls:",halls);
        res.render("hall_bookings", { halls });

    }
    catch (err) {
        res.status(500).send("Error rendering bookings page");
    }

}

exports.hall_details = async (req, res) => {

    try {
        const id = req.params.id;
        const hallRef = db.collection('halls').doc(id);
        const snapshot = await hallRef.get();

        const hall={
            id: snapshot.id,
            ...snapshot.data(),
        }
        console.log("hall:", hall);
        res.render("hall_details", { hall });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error rendering hall_details page");
    }
}

exports.viewuserBookings = async (req, res) => {

    try {
        const userId = req.session.userId;
        console.log("userId:", userId);
        const bookingsRef = db.collection('bookings');
        const bookingsSnapshot = await bookingsRef.where('userId', '==', userId).get();
        const bookings = bookingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        // console.log("Preookings:", bookings);
        // Step 2: Fetch all halls and create a lookup by hallId
        const hallsSnapshot = await db.collection('halls').get();
        const halls = hallsSnapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().name; // Map hallId to hall name
            return acc;
        }, {});


        // Step 3: Replace hallId in bookings with hall name
        const enrichedBookings = bookings.map(booking => ({
            ...booking,
            hallId: { id: booking.hallId, name: halls[booking.hallId] },
        }));


        console.log("Bookings:", enrichedBookings);
        res.render("viewuserBookings", { bookings: enrichedBookings });

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error rendering view-bookings page");

    }
}

exports.booknow = async (req, res) => {
    try {
        const hallRef = await db.collection('halls');
        const snapshot = await hallRef.get();

        const halls = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.render("booking-calender", { halls });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error rendering booking calendar");
    }
};
exports.booknowhall = async (req, res) => {
    try {
        const hallId = req.params.hallId;
        const hallRef = await db.collection('halls');
        const snapshot = await hallRef.get();

        const halls = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.render('booking-calender', { halls, selectedHallId: hallId });

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error rendering booking calendar");
    }
}

exports.getBookings = async (req, res) => {
    try {
        console.log("Inside getBookings");
        const { hallId, date } = req.query;
        console.log("Hall ID:", hallId);
        console.log("Date:", date);

        // Query Firestore for bookings matching the hallId and date
        const bookingsSnapshot = await db
            .collection('bookings')
            .where('hallId', '==', hallId)
            .where('date', '==', date) // Directly match the date string
            .get();

         // Map the query results to an array of bookings
         const bookings = bookingsSnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        console.log("Bookings:", bookings);
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).send("Error fetching bookings");
    }
};


exports.book = async (req, res) => {
    try {
        const { hallId, date, startTime, endTime, info, capacity } = req.body;
        console.log("hallId:", hallId);
        console.log("date:", date);
        console.log("startTime:", startTime);
        console.log("endTime:", endTime);
        console.log("user_id", req.session.userId);
        console.log("info:", info);
        console.log("capacity:", capacity);

        const bookingsRef = db.collection('bookings');

        // Create a new booking
        const newBooking = {
            info,
            hallId,
            userId: req.session.userId,
            date,
            startTime,
            endTime,
            status:"pending",
            capacity

        };

         // Add the new booking to Firestore
         await bookingsRef.add(newBooking);
        // Send a success response
        console.log("Booking successful!");
        res.status(201).json({ message: "Booking successful!" });
    }
    catch (err) {
        console.log("Error in booking", err);
        res.status(500).json({ message: "Error in booking" });
    }

}

exports.viewallbookings = async (req, res) => {
    try {
        // Step 1: Fetch all bookings
        const bookingsRef = db.collection('bookings');
        const bookingsSnapshot = await bookingsRef.get();
        const bookings = bookingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Step 2: Fetch all halls and create a lookup by hallId
        const hallsSnapshot = await db.collection('halls').get();
        const halls = hallsSnapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().name; // Map hallId to hall name
            return acc;
        }, {});

        // Step 3: Fetch all users and create a lookup by userId
        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = { name: doc.data().name, email: doc.data().email }; // Map userId to user data
            return acc;
        }, {});

        // Step 4: Enrich bookings with hall and user data
        const enrichedBookings = bookings.map(booking => ({
            ...booking,
            hallId: { id: booking.hallId, name: halls[booking.hallId]},
            userId: { id: booking.userId, ...users[booking.userId] },
        }));

        console.log("Enriched Bookings:", enrichedBookings);

        // Step 5: Render the view-bookings page
        res.render("view-bookings", { bookings: enrichedBookings, isAdmin: true });

    } catch (err) {
        console.error("Error rendering view-bookings page:", err);
        res.status(500).send("Error rendering view-bookings page");
    }
};


exports.submit = async (req, res) => {
    try {
        const { bookingId, action } = req.body;
        console.log("bookingId:", bookingId);
        console.log("action:", action);

        // Step 1: Fetch the booking document
        const bookingRef = db.collection('bookings').doc(bookingId);
        const bookingSnapshot = await bookingRef.get();

        const booking = bookingSnapshot.data();

        if (action === "approve") {
            // Step 2: Update booking status to "booked"
            await bookingRef.update({ status: "booked" });

            console.log("Booking approved successfully.");

        } else if (action === "reject") {
            // Step 3: Delete the booking
            await bookingRef.delete();

            console.log("Booking deleted successfully.");
        }

        // Step 4: Fetch all bookings after the operation
        const bookingsSnapshot = await db.collection('bookings').get();
        const bookings = bookingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Step 5: Fetch all halls and users for enrichment
        const hallsSnapshot = await db.collection('halls').get();
        const halls = hallsSnapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().name;
            return acc;
        }, {});

        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = { name: doc.data().name, email: doc.data().email };
            return acc;
        }, {});

        // Step 6: Enrich bookings with hall and user data
        const enrichedBookings = bookings.map(booking => ({
            ...booking,
            hallId: { id: booking.hallId, name: halls[booking.hallId] },
            userId: { id: booking.userId, ...users[booking.userId]},
        }));

        // Step 7: Render the view-bookings page
        res.render("view-bookings", { bookings: enrichedBookings, isAdmin: true });

    } catch (err) {
        console.error("Error processing booking:", err);
        res.status(500).send("Error accepting or rejecting booking");
    }
};


exports.viewallbookingsuser = async (req, res) => {
    try {
        // Fetch all bookings in parallel
        const bookingsSnapshot = await db.collection('bookings').get();

        // Extract hallIds and userIds from bookings
        const hallIds = new Set();
        const userIds = new Set();
        bookingsSnapshot.docs.forEach(doc => {
            const bookingData = doc.data();
            hallIds.add(bookingData.hallId);
            userIds.add(bookingData.userId);
        });

        // Fetch all halls and users in parallel
        const hallsSnapshot = await db.collection('halls').where('__name__', 'in', Array.from(hallIds)).get();
        const usersSnapshot = await db.collection('users').where('__name__', 'in', Array.from(userIds)).get();

        // Convert halls and users to maps for quick lookup
        const hallsMap = new Map();
        hallsSnapshot.docs.forEach(doc => hallsMap.set(doc.id, doc.data()));

        const usersMap = new Map();
        usersSnapshot.docs.forEach(doc => usersMap.set(doc.id, doc.data()));

        // Combine data
        const bookings = bookingsSnapshot.docs.map(doc => {
            const bookingData = doc.data();
            const hallData = hallsMap.get(bookingData.hallId);
            const userData = usersMap.get(bookingData.userId);

            return {
                id: doc.id,
                ...bookingData,
                hallId: {
                    id: bookingData.hallId,
                    name: hallData.name,
                },
                userId: {
                    id: bookingData.userId,
                    name: userData.name,
                    email: userData.email,
                },
            };
        });

        console.log("Bookings:", bookings);

        // Render the view-bookings page
        res.render("view-bookings", { bookings, isAdmin: false });
    } catch (err) {
        console.error("Error rendering view-bookings page:", err);
        res.status(500).send("Error rendering view-bookings page");
    }
};


