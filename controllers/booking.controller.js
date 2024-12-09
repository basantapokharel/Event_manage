const hallModel= require("../models/halls.model")
const bookingModel= require("../models/bookings.model")

exports.hall_bookings =async (req, res) => {

    try{
        let halls= await hallModel.find({});
        res.render("hall_bookings",{halls});

    }
    catch(err){ 
        res.status(500).send("Error rendering bookings page");
    }

}

exports.hall_details =async (req, res) => {

    try{
        const id=req.params.id;
        const hall= await hallModel.findById(id);
        res.render("hall_details",{hall});
    }
    catch(err){ 
        res.status(500).send("Error rendering hall_details page");
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
exports.booknowhall = async (req, res) => {
    try {
        const hallId=req.params.hallId;
        const halls = await hallModel.find();
        
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
        const {hallId,date,startTime,endTime,info,capacity}=req.body;
        console.log("hallId:",hallId);
        console.log("date:",date);
        console.log("startTime:",startTime);
        console.log("endTime:",endTime);
        console.log("user_id",req.session.userId);
        console.log("info:",info);
        console.log("capacity:",capacity);

        // Create a new booking
        const newBooking = new bookingModel({
            info,
            hallId,
            userId: req.session.userId,
            date,
            startTime,
            endTime,
            capacity
        });

        await bookingModel.create(newBooking);
        // Send a success response
        console.log("Booking successful!");
        res.status(201).json({ message: "Booking successful!"});
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
       res.render("view-bookings", { bookings,isAdmin:true});
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
            const bookings = await bookingModel
            .find({})
            .populate('hallId', 'name') // Populate hall name from the 'halls' collection
            .populate('userId', 'name email'); // Populate user name and email from the 'users' collection

            console.log("Booking approved successfully.");
            res.render("view-bookings", { bookings,isAdmin:true });
        } else if (action === "reject") {
            booking.status = "cancelled";
            await booking.deleteOne(); // Deletes the booking from the database

            const bookings = await bookingModel
            .find({})
            .populate('hallId', 'name') // Populate hall name from the 'halls' collection
            .populate('userId', 'name email'); // Populate user name and email from the 'users' collection

            console.log("Booking deleted successfully.");
            res.render("view-bookings", { bookings,isAdmin:true });


        }

        

    }
    catch(err){ 
        console.log(err);
        res.status(500).send("Error accepting or rejecting booking");
    }
}

exports.viewallbookingsuser = async (req, res) => {
    try {
        const bookings = await bookingModel
            .find({})
            .populate('hallId', 'name') // Populate hall name from the 'halls' collection
            .populate('userId', 'name email'); // Populate user name and email from the 'users' collection
        
       res.render("view-bookings", { bookings,isAdmin:false});
    } catch (err) {
        res.status(500).send("Error rendering view-bookings page");
    }
};

