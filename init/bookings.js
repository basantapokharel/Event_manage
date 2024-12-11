const bookings = [
    {
        "info": "Morning Yoga Session", // Replaced with 'info'
        "hallId": "uPLAZ9kq4oWJLRC0GV8R",  // Example hall ID for "Hall 1"
        "userId": "s7pR8TIP20oPyzICvAkW",  // Example user ID for "Adarsha Shrestha"
        "date": "2024-12-01",  // Only the date part (YYYY-MM-DD)
        "startTime": "09:00",
        "endTime": "10:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Team Meeting", // Replaced with 'info'
        "hallId": "5gTTxbtFcDhZBkUvHbeO",  // Example hall ID for "Hall 2"
        "userId": "d8o1GaEpNR8dHKM0kTpc",  // Example user ID for "Basanta Pokharel"
        "date": "2024-12-02",  // Only the date part (YYYY-MM-DD)
        "startTime": "11:00",
        "endTime": "12:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Workshop on AI", // Replaced with 'info'
        "hallId": "tBnSP0b3EfUigqT3cQeW",  // Example hall ID for "Hall 3"
        "userId": "xyGG73vkPTRcuZmzrSN1",  // Example user ID for "Benit Shrestha"
        "date": "2024-12-05",  // Only the date part (YYYY-MM-DD)
        "startTime": "14:00",
        "endTime": "15:00",
        "capacity": "10",
        "status":"booked"
    },
    {
        "info": "Workshop on ML", // Replaced with 'info'
        "hallId": "tBnSP0b3EfUigqT3cQeW",  // Example hall ID for "Hall 3"
        "userId": "xyGG73vkPTRcuZmzrSN1",  // Example user ID for "Benit Shrestha"
        "date": "2024-12-05",  // Only the date part (YYYY-MM-DD)
        "startTime": "16:00",
        "endTime": "17:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Workshop on web development", // Replaced with 'info'
        "hallId": "tBnSP0b3EfUigqT3cQeW",  // Example hall ID for "Hall 3"
        "userId": "xyGG73vkPTRcuZmzrSN1",  // Example user ID for "Benit Shrestha"
        "date": "2024-12-05",  // Only the date part (YYYY-MM-DD)
        "startTime": "11:00",
        "endTime": "12:00",
        "capacity": "10",
        "status":"booked"
    },


    {
        "info": "Art Exhibition", // Replaced with 'info'
        "hallId": "Le4zwHFsO2U3id9MTpVb",  // Example hall ID for "Hall 4"
        "userId": "EKHH9ckxDujPsgcZTWSE",  // Example user ID for "Hasana Manandhar"
        "date": "2024-12-03",  // Only the date part (YYYY-MM-DD)
        "startTime": "14:00",
        "endTime": "15:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Book Club Discussion", // Replaced with 'info'
        "hallId": "uPLAZ9kq4oWJLRC0GV8R",  // Example hall ID for "Hall 1"
        "userId": "96aRi3wNw5abXRXOuCwz",  // Example user ID for "Ramesh Khatri"
        "date": "2024-12-06",  // Only the date part (YYYY-MM-DD)
        "startTime": "13:00",
        "endTime": "14:00",
        "capacity": "10",
        "status":"booked"
    }
];

module.exports = { bookings };
