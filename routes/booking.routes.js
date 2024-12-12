const bookingController=require("../controllers/booking.controller")    
const auth = require("../middlewares/auth.mw");

module.exports=(app) =>{
    //booking route
    app.get("/hall_bookings",auth.isAuthenticated,bookingController.hall_bookings);
    app.get("/viewuserBookings",auth.isAuthenticated,bookingController.viewuserBookings);
    app.get("/book-now",auth.isAuthenticated,bookingController.booknow);
    app.get("/book-now-hall/:hallId",auth.isAuthenticated,bookingController.booknowhall);
    app.get("/get-bookings",auth.isAuthenticated,bookingController.getBookings);
    app.post("/book",auth.isAuthenticated,bookingController.book);

    app.get("/viewallbookings",auth.isAuthenticated,bookingController.viewallbookings);
    app.get("/viewallbookings/user",auth.isAuthenticated,bookingController.viewallbookingsuser);
    app.post("/submit",auth.isAuthenticated,bookingController.submit);


    app.get('/hall_details/:id',auth.isAuthenticated,bookingController.hall_details);
}