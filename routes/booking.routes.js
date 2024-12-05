const bookingController=require("../controllers/booking.controller")    


module.exports=(app) =>{
    //booking route

    app.get("/bookings",bookingController.bookings);
    app.get("/viewuserBookings",bookingController.viewuserBookings);
    app.get("/book-now",bookingController.booknow);
    app.get("/get-bookings",bookingController.getBookings);
    app.post("/book",bookingController.book);

    app.get("/viewallbookings",bookingController.viewallbookings);
    app.post("/submit",bookingController.submit);

    app.get('/api/bookings', bookingController.getAllBookings);
}