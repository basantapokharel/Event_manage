const bookingController=require("../controllers/booking.controller")    


module.exports=(app) =>{
    //booking route
    app.get("/hall_bookings",bookingController.hall_bookings);
    app.get("/viewuserBookings",bookingController.viewuserBookings);
    app.get("/book-now",bookingController.booknow);
    app.get("/book-now-hall/:hallId",bookingController.booknowhall);
    app.get("/get-bookings",bookingController.getBookings);
    app.post("/book",bookingController.book);

    app.get("/viewallbookings",bookingController.viewallbookings);
    app.get("/viewallbookings/user",bookingController.viewallbookingsuser);
    app.post("/submit",bookingController.submit);


    app.get('/hall_details/:id',bookingController.hall_details);
}