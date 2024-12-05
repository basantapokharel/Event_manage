const bookings = [
    {
        "info": "Morning Yoga Session", // Replaced with 'info'
        "hallId": "674890142378e3375d18270a",  // Example hall ID for "Hall 1"
        "userId": "6748a9595416c2c3042f43c5",  // Example user ID for "Adarsha Shrestha"
        "date": "2024-12-01",  // Only the date part (YYYY-MM-DD)
        "startTime": "09:00",
        "endTime": "10:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Team Meeting", // Replaced with 'info'
        "hallId": "674890142378e3375d18270b",  // Example hall ID for "Hall 2"
        "userId": "6748a9595416c2c3042f43c6",  // Example user ID for "Basanta Pokharel"
        "date": "2024-12-02",  // Only the date part (YYYY-MM-DD)
        "startTime": "11:00",
        "endTime": "12:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Workshop on AI", // Replaced with 'info'
        "hallId": "674890142378e3375d18270c",  // Example hall ID for "Hall 3"
        "userId": "6748a9595416c2c3042f43c7",  // Example user ID for "Benit Shrestha"
        "date": "2024-12-05",  // Only the date part (YYYY-MM-DD)
        "startTime": "14:00",
        "endTime": "15:00",
        "capacity": "10",
        "status":"booked"
    },
    {
        "info": "Workshop on ML", // Replaced with 'info'
        "hallId": "674890142378e3375d18270c",  // Example hall ID for "Hall 3"
        "userId": "6748a9595416c2c3042f43c8",  // Example user ID for "Benit Shrestha"
        "date": "2024-12-05",  // Only the date part (YYYY-MM-DD)
        "startTime": "16:00",
        "endTime": "17:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Workshop on web development", // Replaced with 'info'
        "hallId": "674890142378e3375d18270c",  // Example hall ID for "Hall 3"
        "userId": "6748a9595416c2c3042f43c7",  // Example user ID for "Benit Shrestha"
        "date": "2024-12-05",  // Only the date part (YYYY-MM-DD)
        "startTime": "11:00",
        "endTime": "12:00",
        "capacity": "10",
        "status":"booked"
    },


    {
        "info": "Art Exhibition", // Replaced with 'info'
        "hallId": "674890142378e3375d18270d",  // Example hall ID for "Hall 4"
        "userId": "6748a9595416c2c3042f43c8",  // Example user ID for "Hasana Manandhar"
        "date": "2024-12-03",  // Only the date part (YYYY-MM-DD)
        "startTime": "14:00",
        "endTime": "15:00",
        "capacity": "10",
        "status":"pending"
    },
    {
        "info": "Book Club Discussion", // Replaced with 'info'
        "hallId": "674890142378e3375d18270a",  // Example hall ID for "Hall 1"
        "userId": "6748a9595416c2c3042f43cb",  // Example user ID for "Ramesh Khatri"
        "date": "2024-12-06",  // Only the date part (YYYY-MM-DD)
        "startTime": "13:00",
        "endTime": "14:00",
        "capacity": "10",
        "status":"booked"
    }
];

module.exports = { bookings };
