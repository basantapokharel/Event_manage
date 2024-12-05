const hallModel= require("../models/halls.model")
const bookingModel= require("../models/bookings.model")

exports.bookings =async (req, res) => {

    try{
        let halls= await hallModel.find({});
        res.render("bookings",{halls});

    }
    catch(err){ 
        res.status(500).send("Error rendering bookings page");
    }

}

exports.viewuserBookings =async (req, res) => {

    try{
        const userId= req.session.userId;
        const bookings= await bookingModel.find({userId:userId}).populate("hallId","name");
        console.log("Bookings:",bookings);
        res.render("viewuserBookings",{bookings});

    }
    catch(err){ 
        res.status(500).send("Error rendering view-bookings page");
    }
}

exports.booknow = async (req, res) => {
    try {
        const halls = await hallModel.find({});
        
        res.render("booking-calender", { halls});
    } catch (err) {
        res.status(500).send("Error rendering booking calendar");
    }
};

exports.getBookings = async (req, res) => {
    try {
        console.log("Inside getBookings");
        const { hallId, date } = req.query;
        console.log("Hall ID:", hallId);
        console.log("Date:", date);

        // Convert the date from string (YYYY-MM-DD) to Date object
        const startOfDay = new Date(date); // match the str of date in db
        const endOfDay = new Date(date);   
        console.log("Start of the day:", startOfDay);
        console.log("End of the day:", endOfDay);
        // Set the time for start and end of the day
        startOfDay.setHours(0, 0, 0, 0);  // 00:00:00
        endOfDay.setHours(23, 59, 59, 999); // 23:59:59.999

        // Find bookings for the specific hall and date range
        const bookings = await bookingModel.find({
            hallId,
            date: {
                $gte: startOfDay,  // Greater than or equal to the start of the day
                $lte: endOfDay,    // Less than or equal to the end of the day
            },
        });

        console.log("Bookings:", bookings);
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).send("Error fetching bookings");
    }
};


exports.book = async (req, res) => {
    try{
        const {hallId,date,startTime,endTime,info}=req.body;
        console.log("hallId:",hallId);
        console.log("date:",date);
        console.log("startTime:",startTime);
        console.log("endTime:",endTime);
        console.log("user_id",req.session.userId);
        console.log("info:",info);

        // Create a new booking
        const newBooking = new bookingModel({
            info,
            hallId,
            userId: req.session.userId,
            date,
            startTime,
            endTime
        });

        await bookingModel.create(newBooking);
        // Send a success response
        res.status(201).json({ message: "Booking successful!", booking: newBooking });
    }
    catch(err){
        console.log("Error in booking",err);
        res.status(500).json({ message: "Error in booking" });
    }

}

exports.viewallbookings = async (req, res) => {
    try {
        const bookings = await bookingModel
            .find({})
            .populate('hallId', 'name') // Populate hall name from the 'halls' collection
            .populate('userId', 'name email'); // Populate user name and email from the 'users' collection
        console.log("Bookings:", bookings);
       res.render("view-bookings", { bookings });
    } catch (err) {
        res.status(500).send("Error rendering view-bookings page");
    }
};


exports.submit = async (req, res) => {
    try {
        const { bookingId, action } = req.body;
        console.log("bookingId:", bookingId);
        console.log("action:", action);

        const booking = await bookingModel.findById(bookingId);

        if (action === "approve") {
            booking.status = "booked";
            await booking.save();
            res.status(200).send("Booking approved successfully.");
        } else if (action === "reject") {
            booking.status = "cancelled";
            await booking.deleteOne(); // Deletes the booking from the database
            console.log("Booking deleted successfully.");
            res.status(200).send("Booking rejected and removed successfully.");


        }

        

    }
    catch(err){ 
        res.status(500).send("Error accepting or rejecting booking");
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel
            .find({})
            .populate('hallId', 'name') // Populate hall name
            .populate('userId', 'name email'); // Populate user details

        // Format bookings for FullCalendar
        const formattedBookings = bookings.map(booking => ({
            id: booking._id,
            title: `${booking.info} (By: ${booking.userId.name})`,
            start: `${booking.date.toISOString().split('T')[0]}T${booking.startTime}`,
            end: `${booking.date.toISOString().split('T')[0]}T${booking.endTime}`,
            description: `Hall: ${booking.hallId.name}, Email: ${booking.userId.email}`,
            color: booking.status === "approved" ? "#4CAF50" : "#f44336" // Example: green for approved, red for others
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        console.error("Error fetching bookings for API:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

